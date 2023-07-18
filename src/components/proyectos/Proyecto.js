import { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {
	// Obtener el state de proyectos
	const ProyectosContext = useContext(ProyectoContext);
	const { proyectoActual } = ProyectosContext;

	// Obtener la función del context de tareas
	const tareasContext = useContext(TareaContext);
	const { obtenerTareas } = tareasContext;

	// Función para agregar el proyecto actual
	const seleccionarProyecto = id => {
		proyectoActual(id); // Fijar un proyecto
		obtenerTareas(id); // Filtrar tareas cuand se haga click
	};

	return (
		<li>
			<button
				type='button'
				className='btn btn-blank'
				onClick={() => seleccionarProyecto(proyecto.id)}
			>
				{proyecto.nombre}
			</button>
		</li>
	);
};

export default Proyecto;
