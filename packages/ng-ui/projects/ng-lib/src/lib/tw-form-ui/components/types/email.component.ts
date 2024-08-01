import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Field } from '../../models';

@Component({
  standalone: true,
  selector: 'adk-email-input',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (field) {
    <div [ngClass]="class">
      @if (field ) {
      <label [for]="field.key" [ngClass]="labelClass">{{ label }}</label>
      }
      <div class="mt-2">
        <input
          type="email"
          [formControl]="formControl[field.key]"
          [pattern]="pattern"
          [placeholder]="placeholder"
          [name]="field.key"
          [id]="field.key"
          [autocomplete]="autocomplete"
          [ngClass]="formControl[field.key].invalid && formControl[field.key].touched ? errorClass : inputClass"
          [required]="required"
        />
      </div>
      @if (description && !formControl[field.key].touched){
      <p *ngIf="description" class="mt-3 text-sm leading-6 text-gray-600">
        {{ description }}
      </p>
      } @else {
      <div *ngIf="formControl[field.key].invalid && formControl[field.key].touched" class="text-red-500 text-xs mt-1">
        <div *ngIf="formControl[field.key].errors['required']">{{ label ?? 'field' }} is required</div>
        <div *ngIf="formControl[field.key].errors['minlength']">
          Must be at least
          {{ formControl[field.key].errors['minlength'].requiredLength }}
          characters
        </div>
        <div *ngIf="formControl[field.key].errors['maxlength']">
          Must not exceed
          {{ formControl[field.key].errors['maxlength'].requiredLength }}
          characters
        </div>
        <div *ngIf="formControl[field.key].errors['pattern']">{{ errorMessage }}</div>
      </div>
      }
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
export class EmailComponent implements OnChanges {
  @Input() field!: Field;
  formControl: { [key: string]: AbstractControl | any } = {};
  errorClass = `${this.inputClass} mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500`;

  get props() {
    return this.field?.props;
  }

  get autocomplete() {
    return this.props?.autocomplete ?? 'off';
  }

  get label() {
    return this.field.label;
  }

  get description() {
    return this.field.description;
  }

  get errorMessage() {
    return this.props?.errorMessage ?? 'Invalid pattern entered';
  }

  get placeholder() {
    return this.field.placeholder ?? '';
  }

  get class() {
    return this.props?.class ?? 'sm:col-span-3';
  }

  get labelClass() {
    return this.props?.labelClass ?? 'block text-sm font-medium leading-6 text-gray-900';
  }

  get pattern() {
    return this.props?.pattern ?? '';
  }

  get required() {
    return this.props?.required ?? true;
  }

  get inputClass() {
    if (this.props && this.props.inputClass) {
      return this.props.inputClass;
    }
    return 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
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
}
