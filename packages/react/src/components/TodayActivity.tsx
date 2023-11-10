import { Card, CardHeader, CardTitle } from './ui/card';

export default function TodayActivity() {
	return (
		<Card className='col-span-4 md:col-span-2 row-span-2 shadow-sm rounded-xl bg-background/75 backdrop-blur-2xl backdrop-saturate-200 border-none'>
			<CardHeader>
				<CardTitle>Today</CardTitle>
			</CardHeader>
		</Card>
	);
}
