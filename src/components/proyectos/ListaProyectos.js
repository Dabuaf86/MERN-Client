import React, { useContext, useEffect } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListaProyectos = () => {
	// Obtener proyectos del state inicial
	const proyectosContext = useContext(ProyectoContext);
	const { proyectos, obtenerProyectos } = proyectosContext;

	// Obtener proyectos cuando carga el componente
	useEffect(() => {
		obtenerProyectos();
		// eslint-disable-next-line
	}, []);

	// Render condicional si hay proyectos en el arreglo
	if (proyectos.length === 0)
		return <p>Aún no hay ningún proyecto. Comienza uno nuevo</p>;

	return (
		<ul className='listado-proyectos'>
			<TransitionGroup>
				{proyectos.map(proyecto => (
					<CSSTransition key={proyecto.id} timeout={200} classNames='proyecto'>
						<Proyecto proyecto={proyecto} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
};

export default ListaProyectos;
