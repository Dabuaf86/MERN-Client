import { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {
	// Extraer data del proyecto está activo
	const proyectosContext = useContext(ProyectoContext);
	const { proyecto } = proyectosContext;

	// Obtener la función del context de tarea
	const tareasContext = useContext(TareaContext);
	const {
		eliminarTarea,
		obtenerTareas,
		editarEstadoTarea,
		guardarTareaACtual,
	} = tareasContext;

	// Array destructuring al proyecto
	const [proyectoActual] = proyecto;

	// Manejador de eliminación de tarea
	const handleEliminar = id => {
		eliminarTarea(id);
		obtenerTareas(proyectoActual.id);
	};

	// Función que modifica el estado de una tarea
	const modificarTarea = tarea => {
		if (tarea.estado) {
			tarea.estado = false;
		} else tarea.estado = true;
		editarEstadoTarea(tarea);
	};

	// Función que selecciona una tarea para editarla
	const seleccionarTarea = tarea => {
		guardarTareaACtual(tarea);
	};

	return (
		<li className='tarea sombra'>
			<p>{tarea.nombre}</p>
			<div className='estado'>
				{tarea.estado ? (
					<button
						type='button'
						className='completo'
						onClick={() => modificarTarea(tarea)}
					>
						Completo
					</button>
				) : (
					<button
						type='button'
						className='incompleto'
						onClick={() => modificarTarea(tarea)}
					>
						Incompleto
					</button>
				)}
			</div>
			<div className='acciones'>
				<button
					type='button'
					className='btn btn-primario'
					onClick={() => seleccionarTarea(tarea)}
				>
					Editar
				</button>
				<button
					type='button'
					className='btn btn-secundario'
					onClick={() => handleEliminar(tarea.id)}
				>
					Eliminar
				</button>
			</div>
		</li>
	);
};

export default Tarea;
