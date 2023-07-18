import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = () => {
	const navigate = useNavigate();

	// Extraer los valores del context de alerta
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	// Extraer los valores del context de autenticación
	const authContext = useContext(AuthContext);
	const { autenticado, mensaje, iniciarSesion } = authContext;

	// En caso de que el password o el usuario no existan
	useEffect(() => {
		if (autenticado) navigate('/proyectos');

		if (mensaje) mostrarAlerta(mensaje.message, mensaje.categoria);
	}, [mensaje]);

	// State del usuario
	const [usuario, setUsuario] = useState({
		email: '',
		password: '',
	});

	const { email, password } = usuario;

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
		if (email.trim() === '' || password.trim() === '') {
			return mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
		}

		// Pasarlo al action
		iniciarSesion({ email, password });
	};

	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.message}</div>
			) : null}
			<div className='contenedor-form sombra-dark'>
				<h1>Iniciar Sesión</h1>
				<form onSubmit={handleSubmit}>
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
						<label htmlFor='password'>Contraseña</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Contraseña'
							value={password}
							onChange={handleChange}
							autoComplete='current-password'
						/>
					</div>
					<div className='campo-form'>
						<input
							type='submit'
							className='btn btn-primario btn-block'
							value='Iniciar Sesión'
						/>
					</div>
				</form>
				<Link to='/nueva-cuenta' className='enlace-cuenta'>
					Crear Cuenta
				</Link>
			</div>
		</div>
	);
};

export default Login;
