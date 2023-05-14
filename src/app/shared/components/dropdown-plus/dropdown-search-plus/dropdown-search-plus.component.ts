import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown-search-plus',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dropdown-search-plus.component.html',
  styleUrls: ['./dropdown-search-plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownSearchPlusComponent implements OnInit, OnDestroy {
  @Output() findElement: EventEmitter<string> = new EventEmitter();

  form!: UntypedFormGroup;
  private _subscription!: Subscription;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.listenFromSearchField();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  get searchField(): AbstractControl {
    return this.form.get('search') as AbstractControl;
  }

  listenFromSearchField(): void {
    this._subscription = this.searchField?.valueChanges
    .pipe(debounceTime(100))
    .subscribe(value => this.changeValues(value));
  }

  changeValues(value: string): void {
    this.findElement.emit(value);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      search: [''],
    });
  }
}
