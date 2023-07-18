import { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListaTareas from '../tareas/ListaTareas';
import { Navigate } from 'react-router-dom';

const Proyectos = ({ isAuth }) => {
	// Extraer la información de auth
	const authContext = useContext(AuthContext);
	const { usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();
	}, []);

	if (!isAuth) return <Navigate to='/' />;

	return (
		<div className='contenedor-app'>
			<aside>
				<Sidebar />
			</aside>
			<div className='seccion-principal'>
				<Barra />
				<main>
					<FormTarea />
					<div className='contenedor-tareas'>
						<ListaTareas />
					</div>
				</main>
			</div>
		</div>
	);
};

export default Proyectos;
