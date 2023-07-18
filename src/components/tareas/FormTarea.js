import { useContext, useEffect, useState } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
	// Mostrar tareas si hay un proyecto activo
	const proyectosContext = useContext(ProyectoContext);
	const { proyecto } = proyectosContext;

	// Obtener el context de tareas
	const tareasContext = useContext(TareaContext);
	const {
		tareaSeleccionada,
		errorTarea,
		agregarTarea,
		validarTarea,
		obtenerTareas,
		actualizarTarea,
		limpiarTarea,
	} = tareasContext;

	// Effect que detecta si hay una tarea seleccionada
	useEffect(() => {
		if (tareaSeleccionada) setTarea(tareaSeleccionada);
		else
			setTarea({
				nombre: '',
			});
	}, [tareaSeleccionada]);

	// State del formulario
	const [tarea, setTarea] = useState({
		nombre: '',
	});

	const { nombre } = tarea;

	// Si no hay proyecto seleccionado
	if (!proyecto) return null;

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	// Leer los valores del formulario
	const handleChange = e => {
		setTarea({
			...tarea,
			[e.target.name]: e.target.value,
		});
	};

	// Manejador para gregar una tarea
	const submitTarea = e => {
		e.preventDefault();

		// Validar
		if (nombre.trim() === '') return validarTarea(true);

		// Validar si es edición o una nueva tarea
		if (!tareaSeleccionada) {
			// Agregar nueva tarea
			tarea.proyectoId = proyectoActual.id;
			tarea.estado = false;
			agregarTarea(tarea);
		} else {
			actualizarTarea(tarea);
			limpiarTarea();
		}

		// Obtener y filtrar las tareas del proyecto actual
		obtenerTareas(proyectoActual.id);

		// Reiniciar el formulario
		setTarea({
			nombre: '',
		});
	};

	return (
		<div className='formulario'>
			<form onSubmit={submitTarea}>
				<div className='contenedor-input'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre tarea...'
						name='nombre'
						value={nombre}
						onChange={handleChange}
					/>
				</div>
				<div className='contenedor-input'>
					<input
						type='submit'
						className='btn btn-primario btn-block btn-submit'
						value={tareaSeleccionada ? 'Guardar Tarea' : 'Agregar Tarea'}
					/>
				</div>
			</form>
			{errorTarea ? (
				<p className='mensaje error'>Necesitas un nombre para esta tarea</p>
			) : null}
		</div>
	);
};

export default FormTarea;
