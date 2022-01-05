import React from 'react';
interface PropsI {}
const Loader = ({}: PropsI) => {
	return (
		<div className="w-full h-full flex-center">
			<div className="loader"></div>
		</div>
	);
};

export default Loader;
