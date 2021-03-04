import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core';

@Component({
	selector: 'app-sorting',
	templateUrl: './sorting.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingComponent {
	@Input() field = 'createdDate';
	@Input() direction = 1;
	@Output() sort = new EventEmitter();
	@Output() clearFilters = new EventEmitter();

	orderBy(field: string): void {
		this.direction = field === this.field ? -this.direction : 1;
		this.field = field;
		this.sort.emit({ field: this.field, direction: this.direction });
	}

	onClearFilters(): void {
		this.clearFilters.emit();
	}
}
