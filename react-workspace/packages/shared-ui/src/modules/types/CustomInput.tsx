import { useFormControlContext } from '@mui/base/FormControl';

export const CustomInput = ({...props}) => {
  const formControlContext = useFormControlContext();

  if (formControlContext === undefined) {
    return null;
  }

  const { value, required, onChange, disabled, onFocus, onBlur } =
    formControlContext;

  return (
    <input
      value={value as string}
      required={required}
      onChange={onChange}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      className={props.className}
      {...props}
    />
  );
}

export const ControlStateDisplay = () => {
  const formControlContext = useFormControlContext();
  if (formControlContext === undefined) {
    return null;
  }

  const { filled, focused } = formControlContext;

  return (
    <p>
      {filled ? 'filled' : 'empty'}&nbsp;|&nbsp;
      {focused ? 'focused' : 'not focused'}
    </p>
  );
}
