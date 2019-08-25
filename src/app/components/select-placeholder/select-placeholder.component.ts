import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface SelectOption {
  value: string;
  viewValue: string;
  selected: boolean;
}

@Component({
  selector: 'app-select-placeholder',
  templateUrl: './select-placeholder.component.html',
  styleUrls: ['./select-placeholder.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectPlaceholderComponent),
      multi: true
    }
  ]
})
export class SelectPlaceholderComponent implements ControlValueAccessor {
  private value;

  @Input() placeholder: string;
  @Input() id: string;
  @Input() selectOptions: SelectOption[];

  constructor() {
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.onChange(this.value);
    }
  }

  addEvent(event) {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

}
