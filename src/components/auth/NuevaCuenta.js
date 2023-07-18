import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = () => {
	const navigate = useNavigate()

	// Extraer los valores del context de alerta
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	// Extraer los valores del context de autenticación
	const authContext = useContext(AuthContext);
	const { autenticado, mensaje, registrarUsuario } = authContext;

	// Usuario autenticado o registrado o sea un registro duplicado
	useEffect(() => {
		if (autenticado) {
			// console.log('HISTORY:', props.history);
			// props.history.push('/proyectos');
			navigate('/proyectos')
		}
		if (mensaje) {
			mostrarAlerta(mensaje.message, mensaje.categoria);
		}
	}, [autenticado, mensaje, navigate]);

	// State del usuario
	const [usuario, setUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmar: '',
	});

	const { nombre, email, password, confirmar } = usuario;

	const handleChange = e => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	// Enviar forulario de inicio de sesión
	const handleSubmit = e => {
		e.preventDefault();

		// Validar campos vacíos
		if (
			nombre.trim() === '' ||
			email.trim() === '' ||
			password.trim() === '' ||
			confirmar.trim() === ''
		) {
			return mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
		}

		// Validar password mínimo 6 caracteres
		if (password.length < 6) {
			return mostrarAlerta(
				'La contraseña debe tener al menos 6 caracteres',
				'alerta-error'
			);
		}

		// Validar que ambos passwords sean iguales
		if (password !== confirmar) {
			return mostrarAlerta('Las contraseñas deben ser iguales', 'alerta-error');
		}

		// Pasarlo al action
		registrarUsuario({
			nombre,
			email,
			password,
		});
	};

	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.message}</div>
			) : null}
			<div className='contenedor-form sombra-dark'>
				<h1>Nueva Cuenta</h1>
				<form onSubmit={handleSubmit}>
					<div className='campo-form'>
						<label htmlFor='nombre'>Nombre</label>
						<input
							type='nombre'
							id='nombre'
							name='nombre'
							placeholder='Juan Pérez'
							value={nombre}
							onChange={handleChange}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='nombre@mail.com'
							value={email}
							onChange={handleChange}
							autoComplete='email'
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Contraseña'
							value={password}
							onChange={handleChange}
							autoComplete='new-password'
							/>
					</div>
					<div className='campo-form'>
						<label htmlFor='password'>Repetir contraseña</label>
						<input
							type='password'
							id='confirmar'
							name='confirmar'
							placeholder='Repetir Contraseña'
							value={confirmar}
							onChange={handleChange}
							autoComplete='new-password'
						/>
					</div>
					<div className='campo-form'>
						<input
							type='submit'
							className='btn btn-primario btn-block'
							value='Registrarme'
						/>
					</div>
				</form>
				<Link to='/' className='enlace-cuenta'>
					Ya tienes cuenta? - Iniciar Sesión
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
