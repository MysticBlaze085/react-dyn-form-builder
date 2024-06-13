import { IControlBaseModel, INPUT_ENUMS } from '@core/shared/modules/lyn-dyn-form/models';

import { DropdownDefaultInputControl } from '@core/shared/modules/lyn-dyn-form/helpers';
import { DropdownMultiControl } from '@core/shared/modules/lyn-dyn-form/helpers/dropdown-multi-control.helper';
import { Validators } from '@angular/forms';

export const GatewaysMultiInputControls: (gateways: any[]) => IControlBaseModel = (gateways: any[]) => {
  const mapGatewayOptions = gateways.map((gateway) => {
    return {
      key: gateway.name,
      value: gateway.id,
    };
  });

  return new DropdownMultiControl({
    controlType: INPUT_ENUMS.DROPDOWN_MULTI,
    controlName: 'gateways',
    label: 'API Proxies',
    placeholder: 'API Proxies',
    options: mapGatewayOptions,
    value: [],
    multiple: true,
    displaySelectAllOption: true,
  });
};

export const GatewaysInputControls: (gateways: any[]) => IControlBaseModel = (gateways: any[]) => {
  const mapGatewayOptions = gateways.map((gateway) => {
    return {
      key: gateway.name,
      value: gateway.id,
    };
  });

  return new DropdownDefaultInputControl({
    controlName: 'gateways',
    label: 'API Proxies',
    placeholder: 'API Proxies',
    options: mapGatewayOptions,
    value: null,
    displaySelectAllOption: true,
    validators: [Validators.required],
    required: true,
    errorMessage: 'Must select a API Proxies',
  });
};
