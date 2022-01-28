import PolicyEditors from '../components/Policy/PolicyEditors';
import Box from '../layouts/Box';

interface PropsI {}
const Policy = ({}: PropsI) => {
	return (
		<>
			<Box className="text-2xl mb-5">Policy</Box>
			<div>
				<PolicyEditors />
			</div>
		</>
	);
};

export default Policy;
