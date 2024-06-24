import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Field } from '../../models';

@Component({
  standalone: true,
  selector: 'adk-checkbox',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @for (option of options; track (option.id)) {
    <div [ngClass]="class" class="relative flex gap-x-3 mt-2">
      <div class="flex h-6 items-center">
        <input
          type="checkbox"
          [checked]="formControl[field.key][option.id].value"
          [name]="option.id"
          [id]="option.id"
          [value]="option.value"
          [formControl]="formControl[field.key][option.id]"
          [ngClass]="inputClass"
          (change)="onCheckChange($event, option.id)"
        />
      </div>
      <div class="text-sm leading-6">
        <label [for]="option.id" [ngClass]="labelClass">{{ option.label }}</label>
        <p *ngIf="option.description" class="text-gray-500">{{ option.description }}</p>
      </div>
    </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class CheckboxComponent implements OnChanges {
  @Input() field!: Field;
  formControl: { [key: string]: AbstractControl | any } = {};

  get props() {
    return this.field?.props;
  }

  get options() {
    return this.props?.options ?? [];
  }

  get autocomplete() {
    return this.props?.autocomplete ?? 'off';
  }

  get label() {
    return this.field.label;
  }

  get description() {
    return this.field?.description;
  }

  get placeholder() {
    return this.field.placeholder ?? '';
  }

  get class() {
    return this.props?.class ?? 'sm:col-span-3';
  }

  get labelClass() {
    return this.props?.labelClass ?? 'font-medium text-gray-900';
  }

  get inputClass() {
    return this.props?.inputClass ?? 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600';
  }

  ngOnChanges({ field }: SimpleChanges): void {
    if (field) {
      this.field = field.currentValue;
      this.initFormControl();
    }
  }

  private initFormControl(): void {
    this.formControl[this.field.key] = this.field.formControl;
  }

  onCheckChange(event: any, id: any) {
    if (!this.formControl[this.field.key][id].value) {
      this.formControl[this.field.key][id].patchValue('');
      return;
    }
    try {
      const parseValue = JSON.parse(event.target.value); // Assuming event.target.value contains JSON data
      this.formControl[this.field.key][id].patchValue(parseValue);
      // Continue with your logic using the parsed JSON data
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the parsing error, such as logging or displaying an error message
    }
  }
}
