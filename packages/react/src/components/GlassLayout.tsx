import { HTMLProps } from 'react';
import { cn } from '../lib/utils';

export default function GlassLayout({
	children,
	className,
}: HTMLProps<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'shadow-sm rounded-xl bg-background/75 backdrop-blur-2xl backdrop-saturate-200',
				className
			)}>
			{children}
		</div>
	);
}
