import { Fragment, useContext } from 'react';
import Tarea from '../tareas/Tarea';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListaTareas = () => {
	// Extraer el proyecto actual del state
	const proyectosContext = useContext(ProyectoContext);
	const { proyecto, eliminarProyecto } = proyectosContext;

	// Obtener las tareas de proyecto
	const tareasContext = useContext(TareaContext);
	const { tareasProyecto } = tareasContext;

	// Validación inicial, ningún proyecto seleccionado
	if (!proyecto) return <h2>Seleccionar un proyecto</h2>;

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	// Manejador para eliminar proyecto
	const eliminar = () => {
		eliminarProyecto(proyectoActual.id);
	};

	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className='listado-tareas'>
				{tareasProyecto.length === 0 ? (
					<li className='tareas'>
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasProyecto.map(tarea => (
							<CSSTransition key={tarea.id} timeout={200} classNames='tarea'>
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>
			<button type='button' className='btn btn-eliminar' onClick={eliminar}>
				Eliminar Proyecto &times;
			</button>
		</Fragment>
	);
};

export default ListaTareas;
