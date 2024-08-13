import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Field } from '../../models';

@Component({
  standalone: true,
  selector: 'adk-radio',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (field) {
    <div [ngClass]="class">
      @for (option of options; track option; let i = $index) {
      <div class="relative flex gap-x-3 mt-2">
        <div class="flex items-center gap-x-3">
          <input type="radio" [id]="option.id" [value]="option.value" [formControl]="formControl[field.key]" [ngClass]="inputClass" />
        </div>
        <div class="text-sm leading-6">
          <label [for]="option.id" [ngClass]="labelClass">{{ option.label }}</label>
          <p *ngIf="option.description" class="text-gray-500">{{ option.description }}</p>
        </div>
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
export class RadioComponent implements OnChanges {
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
    return this.props?.labelClass ?? 'block text-sm font-medium leading-6 text-gray-900';
  }

  get inputClass() {
    return this.props?.inputClass ?? 'h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600';
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
