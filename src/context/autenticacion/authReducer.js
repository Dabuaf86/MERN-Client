import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from '../../types';

const AuthReducer = (state, { type, payload }) => {
	switch (type) {
		case REGISTRO_EXITOSO:
		case LOGIN_EXITOSO:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				token: payload.token,
				autenticado: true,
				mensaje: null,
				cargando: false,
			};
		case OBTENER_USUARIO:
			return {
				...state,
				usuario: payload,
				autenticado: true,
				cargando: false,
			};
		case CERRAR_SESION:
		case LOGIN_ERROR:
		case REGISTRO_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				usuario: null,
				autenticado: null,
				mensaje: payload,
				cargando: false,
			};
		default:
			return state;
	}
};

export default AuthReducer;
