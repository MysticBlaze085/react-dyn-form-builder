import React from 'react';
import Button from '@material-ui/core/Button';

const FormButtons = (props) => {
  const {classes, disabled, buttonText, onClickAction, ...other} = props;
  const classesConfig = classes();
  const disabledExists = disabled ? disabled : false;
  const buttonTextExists = buttonText ? buttonText : 'Submit';
  console.log(props)

  return (
    <Button
      disabled={disabledExists}
      classes={{
        root: classesConfig.root,
        disabled: classesConfig.disabled,
        label: classesConfig.label
      }}
      {...other}
      onClick={onClickAction}
    >
       { buttonTextExists } 
    </Button>
  )
}

export default FormButtons;