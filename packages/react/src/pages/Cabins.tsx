import DataTable from '../components/DataTable';
import { CabinColumns as columns } from '../components/CabinColumns';
import cabins from '../data/cabins.json';
import CabinForm from '../components/CabinForm';

import { Button } from '../components/ui/button';

export default function Cabins() {
	return (
		<DataTable
			columns={columns}
			data={cabins}
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
