import React, { Fragment, useContext, useState } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
	// Obtener el state del formulario
	const proyectosContext = useContext(ProyectoContext);
	const {
		formulario,
		errorFormulario,
		mostrarFormulario,
		agregarProyecto,
		mostrarError,
	} = proyectosContext;

	// State del proyecto
	const [proyecto, setProyecto] = useState({
		nombre: '',
	});

	const { nombre } = proyecto;

	const handleChange = e => {
		setProyecto({
			...proyecto,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		// Validar el proyecto
		if (nombre === '') {
			mostrarError()
			return;
		}

		// Agregar el state
		agregarProyecto(proyecto);

		// Reiniciar el form
		setProyecto({
			nombre: '',
		});
	};

	// Mostrar el formulario de Nuevo Proyecto
	const handleNuevoProyecto = () => {
		mostrarFormulario();
	};

	return (
		<Fragment>
			<button
				type='button'
				className='btn btn-block btn-primario'
				onClick={handleNuevoProyecto}
			>
				Nuevo Proyecto
			</button>
			{formulario ? (
				<form onSubmit={handleSubmit} className='formulario-nuevo-proyecto'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre del Proyecto'
						name='nombre'
						value={nombre}
						onChange={handleChange}
					/>
					<input
						type='submit'
						className='btn btn-primario btn-block'
						value='Agregar Proyecto'
					/>
				</form>
			) : null}
			{errorFormulario ? (
				<p className='mensaje error'>
					Debes incluir algún nombre para tu proyecto
				</p>
			) : null}
		</Fragment>
	);
};

export default NuevoProyecto;
