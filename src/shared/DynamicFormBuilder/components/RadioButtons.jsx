import * as React from "react";
import DynamicFormOptionItemsBuilder from '../helpers/DynamicFormOptionItemsBuilder';

const RadioButtons = ({handler, meta: {label, options}}) => {
  
  return (
  <div>
    <div>
      <label>{label}:</label>
    </div>
    <div>
      {DynamicFormOptionItemsBuilder({handler, type:'RadioButtons', options})}
    </div>
  </div>
)};

export default RadioButtons;