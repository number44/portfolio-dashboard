import { Link } from 'react-router-dom';

interface PropsI {}
const Login = ({}: PropsI) => {
	return (
		<main className="min-h-screen max-w-screen  flex-center flex-col bg-zinc-100">
			<div className="box p-7 shadow-lg bg-white">
				<h1 className="text-zinc-700 mb-2 text-3xl font-semibold  text-center">Login </h1>
				<form className="flex  flex-col max-w-full">
					<label className="my-0" htmlFor="email">
						Email
					</label>
					<input className="  my-0 rounded " type="text" name="email" />
					<label className="my-0" htmlFor="password">
						Passowrd
					</label>

					<input className="appearance-non  my-0 rounded" type="password" name="passowrd" />
					<input type="button" value="Login" className="mt-3 bg-purple-800 py-3 font-bold text-zinc-100 uppercase" />
				</form>
			</div>
			<Link to="/auth/register">Register</Link>
		</main>
	);
};

export default Login;
