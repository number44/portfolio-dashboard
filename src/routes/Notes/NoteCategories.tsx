import { useMutation, useQuery, useQueryClient } from 'react-query';
import Box from '../../layouts/Box';
import { fetchCategories } from '../../utils/fetching';
import { IoClose } from 'react-icons/io5';
import CreateCategoryForm from '../../components/CreateCategoryForm';
import axios from 'axios';
interface PropsI {}

const NoteCategories = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<CategoryI[], Error>('categories', fetchCategories);
	const queryClient = useQueryClient();

	const mutation = useMutation((id: number) => {
		return axios.delete(`/categories/${id}`);
	});

	const deleteCategory = (id?: number) => {
		if (!id) {
			return;
		}
		mutation.mutate(id, {
			onSuccess: () => queryClient.invalidateQueries('categories'),
		});
	};
	if (isError) {
		return (
			<>
				<Box>Error : {error?.message}</Box>
			</>
		);
	}
	if (isLoading) {
		return (
			<>
				<Box>Loading...</Box>
			</>
		);
	}

	return (
		<div className="">
			<CreateCategoryForm />
			<div className="my-2 grid gap-3 grid-cols-1 sm:grid-cols-2">
				{data?.map((cat) => (
					<Box key={cat.id}>
						<div className="flex justify-between items-center">
							<span>{cat.name}</span>
							<IoClose className="curso cursor-pointer h-10 w-10 p-2" onClick={() => deleteCategory(cat.id)} />
						</div>
					</Box>
				))}
			</div>
		</div>
	);
};

export default NoteCategories;
