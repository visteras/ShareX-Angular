import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input-placeholder',
  templateUrl: './input-placeholder.component.html',
  styleUrls: ['./input-placeholder.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPlaceholderComponent),
      multi: true
    }
  ]
})
export class InputPlaceholderComponent implements ControlValueAccessor {
  private value;

  @Input() type: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() name: string;


  constructor() {
  }


  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange =fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any) {
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
