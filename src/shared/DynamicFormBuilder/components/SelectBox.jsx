import * as React from "react";
import DynamicFormOptionItemsBuilder from '../helpers/DynamicFormOptionItemsBuilder';

const SelectBox = ({ handler, meta: {label, options} }) => (
  <div>
    <label>{label}:</label>
    <select {...handler()}>
      {DynamicFormOptionItemsBuilder({handler, type: 'SelectBox', options})}
    </select>
  </div>
);
export default SelectBox;