import React from 'react';
import TextField from '@material-ui/core/TextField';
import DynamicFormOptionItemsBuilder from '../helpers/DynamicFormOptionItemsBuilder';

const InputFields = (props) => {
    const { type } = props;

    switch (type) {
        case 'Textarea': {
            return (
                <div>
                    <div>
                        <TextField
                            multiline
                            fullWidth
                            inputProps={{ className: props.classes.textarea }}
                            placeholder={props.meta.placeholder}
                            {...props.handler()}
                        />
                    </div>
                </div>
            );
        }
        case 'RadioButton': {
            return (
                <div>
                    <div>
                        {DynamicFormOptionItemsBuilder({ ...props.handler, type: 'RadioButtons', ...props.options })}
                    </div>
                </div>
            );
        }
        case 'CheckBoxs': {
            return (
                <div>
                    <input {...props.handler('checkbox')} />
                    <label>{props.label}</label>
                </div>
            );
        }
        case 'Selector': {
            return (
                <div>
                    <select {...props.handler()}>
                        {DynamicFormOptionItemsBuilder({ ...props.handler, type: 'SelectBox', ...props.options })}
                    </select>
                </div>
            );
        }
        default: {
            console.log('text', props.label)
            return (
                <div>
                    <TextField id="filled-basic" label={props.label} variant="filled" />
                </div>
            );
        }
    }
};

export default InputFields;
