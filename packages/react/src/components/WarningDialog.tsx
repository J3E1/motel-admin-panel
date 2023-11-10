import { ReactNode } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import GlassLayout from './GlassLayout';
import { Button } from './ui/button';

type Props = { trigger: ReactNode };
export default function WarningDialog({ trigger }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<GlassLayout>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. Are you sure you want to permanently
							delete this file from our servers?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant={'destructive'} className='rounded-lg'>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			</GlassLayout>
		</Dialog>
	);
}
