import HBox from '../layouts/HBox';

interface PropsI {
	src: string;
	id: number;
}
const Picture = ({ src }: PropsI) => {
	return (
		<HBox>
			<div className="pt-10">
				<img src={src} alt="" />
			</div>
		</HBox>
	);
};

export default Picture;
