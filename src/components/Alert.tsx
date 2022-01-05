import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
interface PropsI {
	children: ReactNode;
}
const Alert = ({ children }: PropsI) => {
	return (
		<AnimatePresence>
			<motion.div className="text-red-800" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default Alert;
