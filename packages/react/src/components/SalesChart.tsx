import { useDarkMode } from '../hooks/useDarkMode';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const fakeData = [
	{ label: 'Jan 09', totalSales: 480, extrasSales: 20 },
	{ label: 'Jan 10', totalSales: 580, extrasSales: 100 },
	{ label: 'Jan 11', totalSales: 550, extrasSales: 150 },
	{ label: 'Jan 12', totalSales: 600, extrasSales: 50 },
	{ label: 'Jan 13', totalSales: 700, extrasSales: 150 },
	{ label: 'Jan 14', totalSales: 800, extrasSales: 150 },
	{ label: 'Jan 15', totalSales: 700, extrasSales: 200 },
	{ label: 'Jan 16', totalSales: 650, extrasSales: 200 },
	{ label: 'Jan 17', totalSales: 600, extrasSales: 300 },
	{ label: 'Jan 18', totalSales: 550, extrasSales: 100 },
	{ label: 'Jan 19', totalSales: 700, extrasSales: 100 },
	{ label: 'Jan 20', totalSales: 800, extrasSales: 200 },
	{ label: 'Jan 21', totalSales: 700, extrasSales: 100 },
	{ label: 'Jan 22', totalSales: 810, extrasSales: 50 },
	{ label: 'Jan 23', totalSales: 950, extrasSales: 250 },
	{ label: 'Jan 24', totalSales: 970, extrasSales: 100 },
	{ label: 'Jan 25', totalSales: 900, extrasSales: 200 },
	{ label: 'Jan 26', totalSales: 950, extrasSales: 300 },
	{ label: 'Jan 27', totalSales: 850, extrasSales: 200 },
	{ label: 'Jan 28', totalSales: 900, extrasSales: 100 },
	{ label: 'Jan 29', totalSales: 800, extrasSales: 300 },
	{ label: 'Jan 30', totalSales: 950, extrasSales: 200 },
	{ label: 'Jan 31', totalSales: 1100, extrasSales: 300 },
	{ label: 'Feb 01', totalSales: 1200, extrasSales: 400 },
	{ label: 'Feb 02', totalSales: 1250, extrasSales: 300 },
	{ label: 'Feb 03', totalSales: 1400, extrasSales: 450 },
	{ label: 'Feb 04', totalSales: 1500, extrasSales: 500 },
	{ label: 'Feb 05', totalSales: 1400, extrasSales: 600 },
	{ label: 'Feb 06', totalSales: 1450, extrasSales: 400 },
];

const data = [
	{
		average: 400,
		today: 240,
	},
	{
		average: 300,
		today: 139,
	},
	{
		average: 200,
		today: 980,
	},
	{
		average: 278,
		today: 390,
	},
	{
		average: 189,
		today: 480,
	},
	{
		average: 239,
		today: 380,
	},
	{
		average: 349,
		today: 430,
	},
];

type Props = {};
export default function SalesChart({}: Props) {
	const [isDarkMode] = useDarkMode();

	return (
		<Card className='col-span-full row-span-2 shadow-sm rounded-xl bg-background/75 backdrop-blur-2xl backdrop-saturate-200 border-none'>
			<CardHeader>
				<CardTitle>Sales from -- to --</CardTitle>
				{/* <CardDescription>
					Your excercise minutes are ahead of where you normally are.
				</CardDescription> */}
			</CardHeader>
			<CardContent className='pb-4'>
				<div className='h-[200px]'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={fakeData}
							margin={{
								top: 5,
								right: 10,
								left: 10,
								bottom: 0,
							}}>
							<XAxis
								dataKey='label'
								tick={{ fill: isDarkMode ? '#e5e7eb' : '#000' }}
								tickLine={{ stroke: isDarkMode ? '#e5e7eb' : '#000' }}
							/>
							<YAxis
								unit='$'
								tick={{ fill: isDarkMode ? '#e5e7eb' : '#000' }}
								tickLine={{ stroke: isDarkMode ? '#e5e7eb' : '#000' }}
							/>
							<Tooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										return (
											<div className='rounded-lg border bg-background p-2 shadow-sm'>
												<div className='grid grid-cols-2 gap-2'>
													<div className='flex flex-col'>
														<span className='text-[0.70rem] uppercase text-muted-foreground'>
															Total Sales
														</span>
														<span className='font-bold text-muted-foreground'>
															{payload[0].value}
														</span>
													</div>
													<div className='flex flex-col'>
														<span className='text-[0.70rem] uppercase text-muted-foreground'>
															Extra Sales
														</span>
														<span className='font-bold'>
															{payload[1].value}
														</span>
													</div>
												</div>
											</div>
										);
									}

									return null;
								}}
							/>
							<Line
								type='monotone'
								strokeWidth={2}
								dataKey='extrasSales'
								activeDot={{
									r: 6,
									style: { fill: '#18181b', opacity: 0.25 },
								}}
								style={
									{
										stroke: '#18181b',
										opacity: 0.25,
										// '--theme-primary': `hsl(${
										// 	theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary
										// })`,
									} as React.CSSProperties
								}
							/>
							<Line
								type='monotone'
								dataKey='totalSales'
								strokeWidth={2}
								activeDot={{
									r: 8,
									style: { fill: '#18181b' },
								}}
								style={
									{
										stroke: '#18181b',
									} as React.CSSProperties
								}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
