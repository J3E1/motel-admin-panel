import DataTable from '../components/DataTable';
import { CabinColumns as columns } from '../components/CabinColumns';
import cabins from '../data/cabins.json';
import CabinForm from '../components/CabinForm';

import { Button } from '../components/ui/button';
import trpc from '../utils/trpc';

export default function Cabins() {
	const { data, isLoading } = trpc.cabin.getAll.useQuery(undefined, {
		queryKey: ['cabin.getAll'],
	});
	console.log('🚀 ~ file: Cabins.tsx:13 ~ Cabins ~ data:', data);

	if (isLoading) return <h4>Loading...</h4>;
	return (
		<DataTable
			columns={columns}
			data={data?.cabins!}
			searchItem='cabinName'
			searchPlaceholder='Search cabin..'
			addNewData={
				<CabinForm
					triggerButton={
						<Button className='rounded-lg ml-4'>Add New Cabin</Button>
					}
				/>
			}
		/>
	);
}
