import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterI } from '../../types/auth';

interface PropsI {}
const Register = ({}: PropsI) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterI>();
	const onSubmit: SubmitHandler<RegisterI> = (data) => console.log(data);

	return (
		<main className="min-h-screen max-w-screen  flex-center flex-col bg-zinc-100">
			<div className="box p-7 shadow-lg bg-white">
				<h1 className="text-zinc-700 mb-2 text-3xl font-semibold  text-center">Register </h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col max-w-full">
					<label className="my-0" htmlFor="email">
						Name
					</label>
					<input {...register('name', { required: true })} className="  my-0 rounded " type="text" />

					<label className="my-0" htmlFor="email">
						Email
					</label>
					<input {...register('email', { required: true })} className="my-0 rounded " type="text" />
					<label className="my-0" htmlFor="password">
						Passowrd
					</label>

					<input {...register('password', { required: true })} className="appearance-non  my-0 rounded" type="password" />
					<input type="submit" value="Register" className="mt-3 bg-purple-800 py-3 font-bold text-zinc-100 uppercase" />
				</form>

				<Link to="/login">Login</Link>
			</div>
		</main>
	);
};

export default Register;
