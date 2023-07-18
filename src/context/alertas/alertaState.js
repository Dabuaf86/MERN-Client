import { useReducer } from 'react';
import AlertaContext from './alertaContext';
import AlertaReducer from './alertaReducer';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertaState = props => {
	const initialState = {
		alerta: null,
	};

	// Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(AlertaReducer, initialState);

	// Funciones
	const mostrarAlerta = (message, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: {
				message,
				categoria,
			},
		});

        // Después de 5 seg limpia el alerta
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA,
			});
		}, 5000);
	};

	return (
		<AlertaContext.Provider value={{ alerta: state.alerta, mostrarAlerta }}>
			{props.children}
		</AlertaContext.Provider>
	);
};

export default AlertaState;
