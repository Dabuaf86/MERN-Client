import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	SELECCIONAR_PROYECTO,
	ELIMINAR_PROYECTO,
} from '../../types';

const ProyectoReducer = (state, { type, payload }) => {
	switch (type) {
		case FORMULARIO_PROYECTO:
			return {
				...state,
				formulario: true,
			};
		case OBTENER_PROYECTOS:
			return {
				...state,
				proyectos: payload,
			};
		case AGREGAR_PROYECTO:
			return {
				...state,
				proyectos: [...state.proyectos, payload],
				formulario: false,
				errorFormulario: false,
			};
		case VALIDAR_FORMULARIO:
			return {
				...state,
				errorFormulario: true,
			};
		case SELECCIONAR_PROYECTO:
			return {
				...state,
				proyecto: state.proyectos.filter(proyecto => proyecto.id === payload),
			};
		case ELIMINAR_PROYECTO:
			return {
				...state,
				proyectos: state.proyectos.filter(proyecto => proyecto.id !== payload),
				proyecto: null,
			};
		default:
			return state;
	}
};

export default ProyectoReducer;
