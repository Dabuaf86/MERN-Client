import {
	AGREGAR_TAREA,
	ELIMINAR_TAREA,
	TAREAS_PROYECTO,
	VALIDAR_TAREA,
	ESTADO_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
} from '../../types/index';

const TareaReducer = (state, { type, payload }) => {
	switch (type) {
		case TAREAS_PROYECTO:
			return {
				...state,
				tareasProyecto: state.tareas.filter(
					tarea => tarea.proyectoId === payload
				),
			};
		case AGREGAR_TAREA:
			return {
				...state,
				tareas: [payload, ...state.tareas],
				errorTarea: false,
			};
		case VALIDAR_TAREA:
			return { ...state, errorTarea: true };
		case ELIMINAR_TAREA:
			return {
				...state,
				tareas: state.tareas.filter(tarea => tarea.id !== payload),
			};
		case ESTADO_TAREA:
		case ACTUALIZAR_TAREA:
			return {
				...state,
				tareas: state.tareas.map(tarea =>
					tarea.id === payload.id ? payload : tarea
				),
			};
		case TAREA_ACTUAL:
			return {
				...state,
				tareaSeleccionada: payload,
			};
		case LIMPIAR_TAREA:
			return {
				...state,
				tareaSeleccionada: null,
			};
		default:
			return state;
	}
};

export default TareaReducer;
