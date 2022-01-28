import React from 'react';
interface PropsI {
	images: ImageI[];
}
const Images = ({ images }: PropsI) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
			{images.map((i, index) => (
				<div className=" w-full" key={index}>
					<img className="aspect-video" src={i.url} alt="" />
				</div>
			))}
		</div>
	);
};

export default Images;
