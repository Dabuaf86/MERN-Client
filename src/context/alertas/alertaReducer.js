import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertaReducer = (state, { type, payload }) => {
	switch (type) {
		case MOSTRAR_ALERTA:
			return { alerta: payload };
		case OCULTAR_ALERTA:
			return { alerta: null };
		default:
			return state;
	}
};

export default AlertaReducer;
