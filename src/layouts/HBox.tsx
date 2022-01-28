import { ReactNode } from 'react';
import { motion } from 'framer-motion';
interface PropsI {
	children: ReactNode;
	my?: number;
	onClick?: () => void;
	className?: string;
}
const HBox = ({ children, className, my, onClick }: PropsI) => {
	return (
		<motion.section whileHover={{ scale: 0.95 }} onClick={onClick} className={` ${className}  my-${my}  mx-auto bg-white rounded dark:bg-slate-800 shadow-sm p-3 w-full h-full`}>
			{children}
		</motion.section>
	);
};

export default HBox;
