import { useReducer } from 'react';
import ProyectoContext from './proyectoContext';
import ProyectoReducer from './proyectoReducer';
import {
	AGREGAR_PROYECTO,
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	VALIDAR_FORMULARIO,
	SELECCIONAR_PROYECTO,
	ELIMINAR_PROYECTO,
} from '../../types';
import { v4 } from 'uuid';

const ProyectoState = props => {
	const proyectos = [
		{ id: 1, nombre: 'Tienda Virtual' },
		{ id: 2, nombre: 'Intranet' },
		{ id: 3, nombre: 'Diseño de Sitio Web' },
	];
	const initialState = {
		proyectos: [],
		formulario: false,
		errorFormulario: false,
		proyecto: null,
	};

	// Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(ProyectoReducer, initialState);

	// Funciones para el CRUD
	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO,
		});
	};

	// Obtener los proyectos actuales
	const obtenerProyectos = () => {
		dispatch({
			type: OBTENER_PROYECTOS,
			payload: proyectos,
		});
	};

	// Agregar nuevo proyecto
	const agregarProyecto = proyecto => {
		proyecto.id = v4();

		// Agregar proyecto en el state
		dispatch({
			type: AGREGAR_PROYECTO,
			payload: proyecto,
		});
	};

	// Validar formulario
	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO,
		});
	};

	// Seleccionar proyecto
	const proyectoActual = proyectoId => {
		dispatch({
			type: SELECCIONAR_PROYECTO,
			payload: proyectoId,
		});
	};

	// Eliminar proyecto
	const eliminarProyecto = proyectoId => {
		dispatch({
			type: ELIMINAR_PROYECTO,
			payload: proyectoId,
		});
	};

	return (
		<ProyectoContext.Provider
			value={{
				formulario: state.formulario,
				proyectos: state.proyectos,
				errorFormulario: state.errorFormulario,
				proyecto: state.proyecto,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
				eliminarProyecto,
			}}
		>
			{props.children}
		</ProyectoContext.Provider>
	);
};

export default ProyectoState;
