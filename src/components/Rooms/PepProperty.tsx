import { motion } from 'framer-motion';
import { useState } from 'react';
import PepRoom from './PepRoom';

interface PropsI {
	property: PpropertyI;
}

const PepProperty = ({ property }: PropsI) => {
	const [show, toggle] = useState<boolean>(false);
	const handler = () => {
		toggle(!show);
	};
	return (
		<>
			<button onClick={handler} className="mx-auto bg-slate-100 rounded dark:bg-slate-800  shadow-sm p-3 w-full h-full">
				{property.label}
			</button>
			<motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3" animate={{ height: !show ? 0 : 'auto', opacity: !show ? 0 : 1, visibility: !show ? 'hidden' : 'visible' }}>
				{property.room && property.room.map((room, index) => <PepRoom key={room.room_id} room={room} />)}
			</motion.div>
		</>
	);
};
export default PepProperty;
