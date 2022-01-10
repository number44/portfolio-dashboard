import { Fragment, useState } from 'react';
import EditorAboutPl from './EditorAboutPl';
import EditorAboutEn from './EditorAboutEn';
import { Tab } from '@headlessui/react';

interface PropsI {}
const Editors = ({}: PropsI) => {
	const [lang, setLang] = useState<string>('pl');
	return (
		<>
			{/* dark:bg-slate-700 bg-slate-100 */}
			<Tab.Group>
				<Tab.List className={`grid grid-cols-2 py-3`}>
					<Tab as={'div'}>{({ selected }) => <div className={`${selected ? 'dark:bg-slate-700 bg-slate-100' : ''} py-3 text-center cursor-pointer transition-colors duration-300`}>PL</div>}</Tab>
					<Tab as={'div'}>{({ selected }) => <div className={`${selected ? 'dark:bg-slate-700 bg-slate-100' : ''} py-3 text-center cursor-pointer transition-colors duration-300`}>EN</div>}</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>
						<EditorAboutPl />
					</Tab.Panel>
					<Tab.Panel>
						<EditorAboutEn />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</>
	);
};

export default Editors;
