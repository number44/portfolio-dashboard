import Box from '../../layouts/Box';

interface PropsI {}
const Facebook = ({}: PropsI) => {
	return (
		<div>
			<Box>Publikacje na Facebook</Box>
			<Box className="max-w-sm mt-4">
				<form className=" flex gap-3 flex-wrap">
					<label className="" htmlFor="price">
						Ile dni przed Zwolnieniem
						<input type="number" className="mx-auto w-full mt-2  rounded-sm dark:bg-zinc-700" />
					</label>
					<label htmlFor="price" className="">
						Która godzina
						<input type="number" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
					</label>
					<div className="flex items-center">
						<label className="uppercase mr-3" htmlFor="internet">
							Publikuj
						</label>

						<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
					</div>

					<button type="submit" className="w-full hover:opacity-90  font-semibold cursor-pointer  bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
						Zmień
					</button>
				</form>
			</Box>
		</div>
	);
};

export default Facebook;
