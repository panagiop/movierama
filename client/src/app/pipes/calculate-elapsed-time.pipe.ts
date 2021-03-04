import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'calculateElapsedTime'
})
export class CalculateElapsedTime implements PipeTransform {
	transform(value: string | number | any): string {
		const now: any = new Date();
		const datePosted: any = new Date(value);
		const numberOfDays = (now - datePosted) / 8.64e7;
		if (numberOfDays < 1) {
			if (Math.ceil(numberOfDays * 24) > 1) {
				return `${Math.ceil(numberOfDays * 24)} hours ago`;
			}
			return `${Math.ceil(numberOfDays * 24 * 60)} min ago`;
		}
		if (Math.floor(numberOfDays) === 1) {
			return `${Math.floor(numberOfDays)} day ago`;
		}
		return `${Math.floor(numberOfDays)} days ago`;
	}
}
