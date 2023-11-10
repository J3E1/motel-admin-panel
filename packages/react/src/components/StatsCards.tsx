import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2';
import StatsCard from './StatsCard';

export default function StatsCards() {
	return (
		<>
			<StatsCard icon={HiOutlineBriefcase} title='Bookings' value='168' />
			<StatsCard
				icon={HiOutlineBanknotes}
				title='Sales'
				value='177680'
				format='USD'
			/>
			<StatsCard icon={HiOutlineCalendarDays} title='Check Ins' value='18' />
			<StatsCard
				icon={HiOutlineChartBar}
				title='Occupancy Rate'
				value='47'
				format='percentage'
			/>
		</>
	);
}
