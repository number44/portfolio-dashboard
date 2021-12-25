import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '../layouts/Box';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
interface PropsI {}
const CreateCategoryForm = ({}: PropsI) => {
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<CategoryI>();
	const onSubmit: SubmitHandler<CategoryI> = (data) => {
		mutation.mutate({ name: data.name });
		console.log(data);
	};

	const mutation = useMutation(
		(newCategory: CategoryI) => {
			return axios.post('/categories', newCategory);
		},
		{ onSuccess: () => queryClient.invalidateQueries('categories') }
	);

	return (
		<Box>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="w-full">
				<label htmlFor="name"></label>
				<input className="w-full dark:bg-zinc-700 " placeholder="create new category" type="text" {...register('name', { required: true })} id="name" />
				{errors.name && <span>This field is required</span>}

				<button className="bg-cyan-500 font-semibold cursor-pointer  w-full mt-2 hover:bg-cyan-600 text-zinc-100 px-3 py-2 rounded-sm" type="submit">
					{mutation.isLoading ? 'loading' : 'Create'}
				</button>
			</form>
		</Box>
	);
};

export default CreateCategoryForm;
