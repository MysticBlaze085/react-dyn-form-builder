import { FormControl, useFormControlContext } from "@mui/base";
import React, { Suspense } from "react";

const Textarea = React.lazy(() => import('@material-tailwind/react/components/Textarea'));

export interface TextareaFieldProps {
  handler: () => any;
  meta: {
    label: string;
    required: boolean;
    disabled: boolean;
  };
  [key: string]: any; // Allow additional props
}

const TextareaField: React.FC<TextareaFieldProps> = ({ ...props }) => {
  const formControlContext = useFormControlContext();

  if (formControlContext === undefined) {
    return null;
  }

  const { value, required, onChange, disabled, onFocus, onBlur } =
    formControlContext;

  let { handler, meta: { label } } = props;
  handler = handler instanceof Function ? handler : () => { };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Textarea
        className="w-full"
        variant="outlined"
        label={label}
        required={required}
        onChange={onChange}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        {...handler()}
      />
    </Suspense>
  )
};

const TextareaFieldControl:React.FC<TextareaFieldProps>  = ({ ...props }) => {
  const { meta: { required, disabled } } = props;
  return (
      <FormControl className='grow' defaultValue="" required={required} disabled={disabled ?? false}>
          <TextareaField {...props} />
          <HelperText />
      </FormControl>
  )
}

export default TextareaFieldControl;

const HelperText = (props: {}) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
}