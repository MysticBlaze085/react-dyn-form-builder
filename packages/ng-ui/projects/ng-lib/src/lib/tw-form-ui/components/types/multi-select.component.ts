import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges, output } from '@angular/core';
import { Field, FieldOptions } from '../../models';

import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'adk-multi-select',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    @if (field) {
    <div class="w-full flex items-center justify-center">
      <div class="w-full relative">
        <label *ngIf="label" [for]="field.key" [ngClass]="labelClass">{{ label }}</label>
        <div
          (click)="toggle()"
          tabindex="0"
          aria-expanded="true"
          [id]="field.id"
          class="mt-2 m-auto flex text-sm cursor-pointer text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-purple-500 focus:ring focus:ring-purple-500/20"
        >
          <div class="grow pl-2.5 py-2 pr-2 flex flex-wrap gap-1">
            @if(isMultipleTag) { @for (option of selectedOptions; track $index) {
            <div class="bg-gray-200 border rounded-sm flex space-x-1 pl-1 items-center">
              <p class="truncate cursor-default select-none">
                {{ option.label }}
              </p>
              <div
                (click)="toggleOption(option)"
                class="flex items-center px-1 cursor-pointer rounded-r-sm hover:bg-red-200 hover:text-red-600"
              >
                <span class="material-symbols-outlined text-sm"> close </span>
              </div>
            </div>
            } } @else {
            <p class="truncate cursor-default select-none self-center">
              @if (selectedOptions[0]){
              {{ selectedOptions[0].label }}
              }
            </p>
            }
          </div>
          <div class="flex flex-none items-center gap-1 py-1.5 px-1">
            <div (click)="clearOption()" class="mt-1">
              <span class="cursor-pointer p-0 !m-auto material-symbols-outlined"> restart_alt </span>
            </div>
            <div class="h-full w-px bg-gray-300 inline-block"></div>
            <span class="material-symbols-outlined"> @if (open) { expand_less } @else { expand_more } </span>
          </div>
        </div>
        @if (open) {
        <div class="absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700" tabindex="-1">
          <div class="relative py-1 px-2.5">
            <span class="absolute w-5 h-5 mt-2.5 pb-0.5 ml-2 text-gray-500 material-symbols-outlined"> search </span>
            <input
              #searchInput
              type="text"
              name="Search"
              id="Search"
              [(ngModel)]="searchText"
              (input)="onSearchChange()"
              placeholder="Search..."
              class="w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none"
            />
          </div>
          <div role="option" class="max-h-72 overflow-y-auto">
            @if (filteredOptions.length !== 0) { @for (option of filteredOptions; track $index) {
            <div class="px-2.5 last:border-0 border-b-[1px] py-2 border-gray-200">
              @if (option.category) {
              <div class="pr-2 py-2 cursor-default select-none truncate font-bold text-gray-700">
                {{ option.category }}
              </div>
              }
              <li
                class="block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500"
                role="option"
                aria-selected="false"
                (click)="toggleOption(option)"
              >
                {{ option.label }}
              </li>
            </div>
            } } @else {
            <div class="px-2 py-2 cursor-not-allowed truncate text-gray-400 select-none">No options found</div>
            }
          </div>
        </div>

        }
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
export class MultiSelectComponent implements OnChanges {
  @Input() field!: Field;

  formControl: { [key: string]: AbstractControl | any } = {};
  open = false;
  selectedOptions: FieldOptions[] = [];
  filteredOptions: FieldOptions[] = this.options;
  selectedOptionChange = output<FieldOptions[]>();
  clearOptionChange = output();
  searchText = '';

  get props() {
    return this.field?.props;
  }

  get isMultipleTag() {
    return this.props?.isMultipleTag ?? false;
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
    return (
        this.props?.inputClass ??
        'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
    );
  }

  ngOnChanges({ field }: SimpleChanges): void {
    if (field) {
      this.field = field.currentValue;
      this.filteredOptions = this.field?.props?.options
        ? this.field?.props?.options.filter((opt) => opt.label.toLowerCase().includes(this.searchText.toLowerCase()))
        : [];
      this.initFormControl();
    }
  }

  onOptionSelected(value: string) {
    this.formControl[this.field.key].setValue(value);
  }

  private initFormControl(): void {
    this.formControl[this.field.key] = this.field.formControl;
  }

  onSearchChange() {
    if (!this.searchText || this.searchText === '') {
      this.filteredOptions = this.options;
    } else {
      this.filteredOptions = this.options.filter((opt) => opt.label.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }

  toggle() {
    this.open = !this.open;
  }

  toggleOption(option: FieldOptions) {
    if (this.isMultipleTag) {
      if (this.selectedOptions.includes(option)) {
        this.selectedOptions = this.selectedOptions.filter((value) => value !== option);
        this.filteredOptions.push(option);
        const selectedOptionVal = this.selectedOptions.map((opt) => opt.value);
        this.formControl[this.field.key].setValue(selectedOptionVal);
      } else {
        this.selectedOptions.push(option);
        this.filteredOptions = this.filteredOptions.filter((value) => value !== option);
        const selectedOptionVal = this.selectedOptions.map((opt) => opt.value);
        this.formControl[this.field.key].setValue(selectedOptionVal);
      }
    } else {
      this.selectedOptions = [option];
      this.filteredOptions = this.options.filter((value) => value !== option);
      const selectedOptionVal = option.value;
      this.formControl[this.field.key].setValue(selectedOptionVal);
    }

    this.selectedOptionChange.emit(this.selectedOptions);
  }

  clearOption() {
    this.filteredOptions = this.filteredOptions.concat(this.selectedOptions);
    this.selectedOptions = [];
    this.selectedOptionChange.emit(this.selectedOptions);
    this.formControl[this.field.key].setValue('');
  }
}
