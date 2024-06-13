import { FieldControlEnums, FieldControlHelper } from '../../components/field/api';

import { FGControlBuilderHelper } from './form-group-builder.helper';
import { Validators } from '@angular/forms';

describe('FormGroupBuilderHelper', () => {
  let helper: FGControlBuilderHelper;

  it('should output flat form group object values', () => {
    helper = new FGControlBuilderHelper(FlatInputs);
    expect(helper.formGroup.value).toEqual({ gatewayType: null, id: null, name: 'New Gateway', basePath: null });
    expect(helper.formGroup.invalid).toBeTruthy();
  });

  it('should output two layer nested form group object values', () => {
    helper = new FGControlBuilderHelper(NestTwoInputs);
    expect(helper.formGroup.value).toEqual({
      gatewayType: null,
      id: null,
      name: 'New Gateway',
      basePath: null,
      value: { id: null, name: null, baseUrl: null },
    });
    expect(helper.formGroup.invalid).toBeTruthy();
  });

  it('should output three layer nested form group object values and disabled values', () => {
    helper = new FGControlBuilderHelper(NestThreeInputs);
    expect(helper.formGroup.value).toEqual({
      basePath: null,
      value: {
        id: null,
      },
      third: {
        value: {
          name: null,
          baseUrl: null,
        },
      },
    });
    expect(helper.formGroup.invalid).toBeTruthy();
  });

  it('should output disabled form group controls', () => {
    helper = new FGControlBuilderHelper(NestsDisabledInputs);
    expect(helper.formGroup.value).toEqual({
      gatewayType: null,
      id: null,
      name: 'New Gateway',
      basePath: null,
      value: { id: null, name: null, baseUrl: null },
    });
    expect(helper.formGroup.invalid).toBeFalsy();
  });
});

export const FlatInputs: FieldControlHelper[] = [
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'gatewayType',
    hidden: true,
    label: 'Gateway Type',
    placeholder: 'Gateway Type',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'id',
    hidden: true,
    label: 'ID',
    placeholder: 'ID',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'name',
    hint: 'Name of the gateway.',
    info: 'The name field contains the name of the gateway.',
    label: 'Name',
    placeholder: 'Name',
    required: true,
    validators: [Validators.required],
    value: 'New Gateway',
    dataCy: 'gatewayName',
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'basePath',
    errorMessage: 'Base Path is required and less than 50 characters',
    hint: 'Uniquely identify your gateway address.',
    info: 'The Base URL field is the URL paths that will be added to the domain name and “rapid.lyniate.com” to uniquely identify your gateway address. For example, if you enter “/FHIR” and your domain name is “MedCo”, the path to your gateway will be “https://MedCo.rapid.lyniate.com/FHIR.”',
    label: 'Base Path',
    placeholder: 'Base Path',
    required: true,
    validators: [Validators.required],
    dataCy: 'basePath',
    value: null,
  }),
];

export const NestTwoInputs: FieldControlHelper[] = [
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'gatewayType',
    hidden: true,
    label: 'Gateway Type',
    placeholder: 'Gateway Type',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'id',
    hidden: true,
    label: 'ID',
    placeholder: 'ID',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'name',
    hint: 'Name of the gateway.',
    info: 'The name field contains the name of the gateway.',
    label: 'Name',
    placeholder: 'Name',
    required: true,
    validators: [Validators.required],
    value: 'New Gateway',
    dataCy: 'gatewayName',
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'basePath',
    errorMessage: 'Base Path is required and less than 50 characters',
    hint: 'Uniquely identify your gateway address.',
    info: 'The Base URL field is the URL paths that will be added to the domain name and “rapid.lyniate.com” to uniquely identify your gateway address. For example, if you enter “/FHIR” and your domain name is “MedCo”, the path to your gateway will be “https://MedCo.rapid.lyniate.com/FHIR.”',
    label: 'Base Path',
    placeholder: 'Base Path',
    required: true,
    validators: [Validators.required],
    dataCy: 'basePath',
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: `value.id`,
    hidden: true,
    label: 'Endpoint ID',
    placeholder: 'ID',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: `value.name`,
    errorMessage: 'Endpoint Name is required',
    label: 'Endpoint Name',
    placeholder: 'Endpoint Name',
    required: true,
    validators: [Validators.required],
    dataCy: 'endpointName',
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.InsightText,
    controlName: `value.baseUrl`,
    errorMessage: 'Endpoint Path is required',
    label: 'Endpoint Path',
    required: true,
    placeholder: 'Endpoint Path',
    validators: [Validators.required],
    dataCy: 'endpointPath',
    value: null,
  }),
];

export const NestThreeInputs: FieldControlHelper[] = [
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'basePath',
    errorMessage: 'Base Path is required and less than 50 characters',
    hint: 'Uniquely identify your gateway address.',
    info: 'The Base URL field is the URL paths that will be added to the domain name and “rapid.lyniate.com” to uniquely identify your gateway address. For example, if you enter “/FHIR” and your domain name is “MedCo”, the path to your gateway will be “https://MedCo.rapid.lyniate.com/FHIR.”',
    label: 'Base Path',
    placeholder: 'Base Path',
    required: true,
    validators: [Validators.required],
    dataCy: 'basePath',
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: `value.id`,
    hidden: true,
    label: 'Endpoint ID',
    placeholder: 'ID',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: `third.value.name`,
    errorMessage: 'Endpoint Name is required',
    label: 'Endpoint Name',
    placeholder: 'Endpoint Name',
    required: true,
    validators: [Validators.required],
    dataCy: 'endpointName',
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.InsightText,
    controlName: `third.value.baseUrl`,
    errorMessage: 'Endpoint Path is required',
    label: 'Endpoint Path',
    required: true,
    placeholder: 'Endpoint Path',
    validators: [Validators.required],
    dataCy: 'endpointPath',
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.InsightText,
    controlName: `third.value.disabled`,
    errorMessage: 'Endpoint Path is required',
    label: 'Endpoint Path',
    required: true,
    placeholder: 'Endpoint Path',
    validators: [Validators.required],
    dataCy: 'endpointPath',
    disabled: true,
    value: null,
  }),
];

export const NestsDisabledInputs: FieldControlHelper[] = [
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'gatewayType',
    hidden: true,
    label: 'Gateway Type',
    placeholder: 'Gateway Type',
    required: true,
    validators: [Validators.required],
    disabled: true,
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'id',
    hidden: true,
    label: 'ID',
    placeholder: 'ID',
    required: true,
    validators: [Validators.required],
    disabled: true,
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'name',
    hint: 'Name of the gateway.',
    info: 'The name field contains the name of the gateway.',
    label: 'Name',
    placeholder: 'Name',
    required: true,
    validators: [Validators.required],
    value: 'New Gateway',
    dataCy: 'gatewayName',
    disabled: true,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'basePath',
    errorMessage: 'Base Path is required and less than 50 characters',
    hint: 'Uniquely identify your gateway address.',
    info: 'The Base URL field is the URL paths that will be added to the domain name and “rapid.lyniate.com” to uniquely identify your gateway address. For example, if you enter “/FHIR” and your domain name is “MedCo”, the path to your gateway will be “https://MedCo.rapid.lyniate.com/FHIR.”',
    label: 'Base Path',
    placeholder: 'Base Path',
    required: true,
    validators: [Validators.required],
    dataCy: 'basePath',
    disabled: true,
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: `value.id`,
    hidden: true,
    label: 'Endpoint ID',
    placeholder: 'ID',
    required: true,
    validators: [Validators.required],
    disabled: true,
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: `value.name`,
    errorMessage: 'Endpoint Name is required',
    label: 'Endpoint Name',
    placeholder: 'Endpoint Name',
    required: true,
    validators: [Validators.required],
    dataCy: 'endpointName',
    disabled: true,
    value: null,
  }),
  new FieldControlHelper({
    controlType: FieldControlEnums.InsightText,
    controlName: `value.baseUrl`,
    errorMessage: 'Endpoint Path is required',
    label: 'Endpoint Path',
    required: true,
    placeholder: 'Endpoint Path',
    validators: [Validators.required],
    dataCy: 'endpointPath',
    disabled: true,
    value: null,
  }),
];
