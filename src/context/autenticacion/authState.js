import { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from '../../types';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = props => {
	const initialState = {
		token: null,
		autenticado: null,
		usuario: null,
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// Funciones
	// Cuando el usuario se registra
	const registrarUsuario = async datos => {
		try {
			const respuesta = await clienteAxios.post('/api/usuarios', datos);
			dispatch({
				type: REGISTRO_EXITOSO,
				payload: respuesta.data,
			});

			// Obtener el usuario
			usuarioAutenticado();
		} catch (error) {
			const alerta = {
				message: error.response.data.message,
				categoria: 'alerta-error',
			};
			dispatch({
				type: REGISTRO_ERROR,
				payload: alerta,
			});
		}
	};

	// Retorna el usuario autenticado
	const usuarioAutenticado = async token => {
		let miToken = token;
		if (!token) {
			miToken = localStorage.getItem('token');
		}
		tokenAuth(miToken);

		try {
			const response = await clienteAxios.get('/api/auth');
			dispatch({
				type: OBTENER_USUARIO,
				payload: response.data.usuario,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: LOGIN_ERROR,
			});
		}
	};

	// Cuando el usuario inicia sesión
	const iniciarSesion = async datos => {
		try {
			const response = await clienteAxios.post('/api/auth', datos);
			dispatch({
				type: LOGIN_EXITOSO,
				payload: response.data,
			});

			// Obtener el usuario
			usuarioAutenticado(response.data.token);
		} catch (error) {
			// console.log(error.response.data.message);
			const alerta = {
				message: error.response.data.message,
				categoria: 'alerta-error',
			};
			dispatch({
				type: LOGIN_ERROR,
				payload: alerta,
			});
		}
	};

	// Cuando el usuario cierra la sesión
	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				cargando: state.cargando,
				registrarUsuario,
				usuarioAutenticado,
				iniciarSesion,
				cerrarSesion,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
