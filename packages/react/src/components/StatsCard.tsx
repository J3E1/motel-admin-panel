import { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../components/ui/card';
import type { IconType } from 'react-icons';
type Props = {
	icon: IconType;
	title: string;
	symbol?: string;
	value: string;
	extra?: string;
	format?: 'USD' | 'percentage';
};
export default function StatsCard({
	icon: Icon,
	title,
	value,
	extra,
	format,
}: Props) {
	const amount = parseFloat(value);
	const formatted = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);

	return (
		<Card className='col-span-2 md:col-span-1 shadow-sm rounded-xl bg-background/75 backdrop-blur-2xl backdrop-saturate-200 border-none'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>{title}</CardTitle>
				<CardTitle className='font-medium'>
					<Icon />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<StatCount value={value} format={format} />
				<p className='text-xs text-muted-foreground'>{extra}</p>
			</CardContent>
		</Card>
	);
}

function StatCount({
	value,
	format,
}: {
	value: string;
	format?: 'USD' | 'percentage';
}) {
	const [formattedValue] = useState(() => {
		if (format === 'USD') {
			const amount = parseFloat(value);
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);
			return formatted;
		} else if (format === 'percentage') {
			return value + '%';
		} else return value;
	});
	return <div className='text-2xl font-bold'>{formattedValue}</div>;
}

// function Counter({ endValue }: { endValue: string }) {
// 	const [count, setCount] = useState(0);

// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			if (count < +endValue) {
// 				setCount(prevCount => prevCount + 1);
// 			} else {
// 				clearInterval(interval);
// 			}
// 		}, 10); // You can adjust the interval duration (in milliseconds) as needed.

// 		return () => {
// 			clearInterval(interval);
// 		};
// 	}, [count, endValue]);

// 	return <>{count}</>;
// }
