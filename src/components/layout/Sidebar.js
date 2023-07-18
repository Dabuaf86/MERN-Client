import React from 'react';
import ListaProyectos from '../proyectos/ListaProyectos';
import NuevoProyecto from '../proyectos/NuevoProyecto';

const Sidebar = () => {
	return (
		<aside>
			<h1>
				MERN<span>Tasks</span>
			</h1>
			<NuevoProyecto />
			<div className='proyectos'>
				<h2>Tus Proyectos</h2>
				<ListaProyectos />
			</div>
		</aside>
	);
};

export default Sidebar;
