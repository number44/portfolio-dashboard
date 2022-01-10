import Box from '../layouts/Box';
import useStore from '../store/about';
interface PropsI {}
const Home = ({}: PropsI) => {
	const aboutPl = useStore((state) => state.aboutPl);
	const aboutEn = useStore((state) => state.aboutEn);
	const changePl = useStore((state) => state.changeAboutPl);
	function createMarkup() {
		return {
			__html: aboutPl,
		};
	}
	return (
		<>
			<Box>xx</Box>
			<Box>
				<div dangerouslySetInnerHTML={createMarkup()}></div>
			</Box>
			<div className="h-8"></div>
			<Box>En : {aboutEn}</Box>
		</>
	);
};

export default Home;
