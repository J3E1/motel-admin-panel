import {
	Pie,
	ResponsiveContainer,
	PieChart,
	Cell,
	Tooltip,
	Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle } from './ui/card';

const startDataLight = [
	{
		duration: '1 night',
		value: 1,
		color: '#ef4444',
	},
	{
		duration: '2 nights',
		value: 3,
		color: '#f97316',
	},
	{
		duration: '3 nights',
		value: 5,
		color: '#eab308',
	},
	{
		duration: '4-5 nights',
		value: 4,
		color: '#84cc16',
	},
	{
		duration: '6-7 nights',
		value: 7,
		color: '#22c55e',
	},
	{
		duration: '8-14 nights',
		value: 3,
		color: '#14b8a6',
	},
	{
		duration: '15-21 nights',
		value: 4,
		color: '#3b82f6',
	},
	{
		duration: '21+ nights',
		value: 5,
		color: '#a855f7',
	},
];
export default function DurationPieChart() {
	return (
		<Card className='col-span-4 md:col-span-2 row-span-2 shadow-sm rounded-xl bg-background/75 backdrop-blur-2xl backdrop-saturate-200 border-none'>
			<CardHeader>
				<CardTitle>Stay duration summary</CardTitle>
			</CardHeader>

			<ResponsiveContainer width='95%' height={230}>
				<PieChart>
					<Pie
						data={startDataLight}
						nameKey='duration'
						dataKey='value'
						innerRadius={75}
						outerRadius={95}
						cx='25%'
						cy='45%'
						paddingAngle={3}>
						{startDataLight.map(entry => (
							<Cell
								fill={entry.color}
								stroke={entry.color}
								key={entry.duration}
							/>
						))}
					</Pie>
					<Tooltip />
					{/* <Legend
						verticalAlign='middle'
						align='right'
						width={30}
						layout='vertical'
						iconSize={15}
						iconType='circle'
					/> */}
				</PieChart>
			</ResponsiveContainer>
		</Card>
	);
}
