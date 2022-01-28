import { Tab } from '@headlessui/react';
import PolicyEditorPl from './PolicyEditorPL';
import PolicyEditorEn from './PolicyEditorEn';
import Box from '../../layouts/Box';
import PureBox from '../../layouts/PureBox';

import { useQuery } from 'react-query';
import { fetchPolicy } from '../../utils/fetching';
import Loader from '../Loader';
import { useEffect, useRef, useState } from 'react';
import useStore from '../../store/policyStore';
interface PropsI {}
const PolicyEditors = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<PolicyI, Error>('policy', () => fetchPolicy());
	const changePolicy = useStore((state) => state.changePolicy);
	const policyPl = useStore((state) => state.policyPl);
	const policyEn = useStore((state) => state.policyEn);
	const policyPlRef = useRef<UploadPolicyEditorI>(null);
	const policyEnRef = useRef<UploadPolicyEditorI>(null);
	const [lang, setLang] = useState('pl');
	const handler = () => {
		changePolicy();
		policyPlRef.current?.uploadEditor();
		policyEnRef.current?.uploadEditor();
	};
	if (isError) {
		return <Box>Error</Box>;
	}
	if (isLoading) {
		return <Loader />;
	}
	return (
		<div>
			<PureBox className="grid grid-cols-2 py-3 gap-3 mb-3  rounded-3xl px-3 ">
				<div onClick={() => setLang('pl')} className={`${lang === 'pl' ? 'dark:bg-slate-700 bg-slate-100' : ''} py-3 text-center cursor-pointer transition-colors duration-300 rounded-3xl`}>
					PL
				</div>
				<div onClick={() => setLang('en')} className={`${lang === 'en' ? 'dark:bg-slate-700 bg-slate-100' : ''} py-3 text-center cursor-pointer transition-colors duration-300 rounded-3xl`}>
					EN
				</div>
			</PureBox>
			<div>
				<div className={`${lang === 'pl' ? 'visible' : 'invisible hidden'}`}>
					<PolicyEditorPl text={data?.etext ? data?.etext : ''} />
				</div>
				<div className={`${lang === 'en' ? 'visible' : 'invisible hidden'}`}>
					<PolicyEditorEn text={data?.etext ? data?.etext : ''} />
				</div>
			</div>
			<button onClick={handler} className="bg-primary w-full text-center py-2 my-3 rounded-lg hover:opacity-95">
				Edutuj
			</button>
		</div>
	);
};

export default PolicyEditors;
interface UploadPolicyEditorI {
	uploadEditor: () => void;
}
