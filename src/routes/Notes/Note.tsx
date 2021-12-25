import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Box from '../../layouts/Box';
import Layout from '../../layouts/Layout';
interface PropsI {}
const example = ({}: PropsI) => {
	const params = useParams();

	return (
		<>
			<Box>Note : {params.id}</Box>
			<Outlet />
		</>
	);
};

export default example;
