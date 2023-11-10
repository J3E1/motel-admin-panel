import SalesChart from '../components/SalesChart';
import { Card } from '../components/ui/card';
import DurationPieChart from '../components/DurationPieChart';
import StatsCards from '../components/StatsCards';
import TodayActivity from '../components/TodayActivity';

type Props = {};
export default function Home({}: Props) {
	return (
		<div className='w-full h-fit grid grid-cols-4 grid-rows-6 md:grid-rows-5 gap-3'>
			<StatsCards />

			<TodayActivity />

			<DurationPieChart />

			<SalesChart />
		</div>
	);
}
