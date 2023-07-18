import { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	ESTADO_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
} from '../../types/index';
import { v4 } from 'uuid';

const TareaState = props => {
	const initialState = {
		tareas: [
			{ id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
			{ id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
			{
				id: 3,
				nombre: 'Elegir Plataformas de Pago',
				estado: false,
				proyectoId: 3,
			},
			{ id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 3 },
		],
		tareasProyecto: null,
		errorTarea: false,
		tareaSeleccionada: null,
	};

	const [state, dispatch] = useReducer(TareaReducer, initialState);

	// Funciones del CRUD

	// Obtener las tareas por proyectoId
	const obtenerTareas = proyectoId => {
		dispatch({
			type: TAREAS_PROYECTO,
			payload: proyectoId,
		});
	};

	// Agregar una tarea al proyecto seleccionado
	const agregarTarea = tarea => {
		tarea.id = v4();
		dispatch({
			type: AGREGAR_TAREA,
			payload: tarea,
		});
	};

	// Valida y muestra un error
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	// Eliminar tarea
	const eliminarTarea = tareaId => {
		dispatch({
			type: ELIMINAR_TAREA,
			payload: tareaId,
		});
	};

	// Cambia estado de una tarea
	const editarEstadoTarea = tarea => {
		dispatch({
			type: ESTADO_TAREA,
			payload: tarea,
		});
	};

	// Extrae una tarea para editarla
	const guardarTareaACtual = tarea => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};

	// Actualizar una tarea existente
	const actualizarTarea = tarea => {
		dispatch({
			type: ACTUALIZAR_TAREA,
			payload: tarea,
		});
	};

	// Deseleccionar una tarea
	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA,
		});
	};

	return (
		<TareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasProyecto: state.tareasProyecto,
				errorTarea: state.errorTarea,
				tareaSeleccionada: state.tareaSeleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				editarEstadoTarea,
				guardarTareaACtual,
				actualizarTarea,
				limpiarTarea,
			}}
		>
			{props.children}
		</TareaContext.Provider>
	);
};

export default TareaState;
