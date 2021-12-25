import React from 'react';
interface PropsI {}
const Back = ({}: PropsI) => {
	return (
		<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
		</svg>
	);
};

export default Back;
