import { Button } from '@material-tailwind/react';
import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    variant?: 'filled' | 'outlined' | 'gradient' | 'text';
    color?: string;
    [key: string]: any;
  }
  
 const ButtonDefault: React.FC<ButtonProps | any> = ({variant = 'filled', ...props}) => {
  const [buttonProps, setButtonProps] = React.useState(props);
  const validVariant = ['filled', 'outlined', 'gradient', 'text'].includes(variant) ? variant : 'filled';

  React.useEffect(() => {
    setButtonProps(props);
  }, [props.color, props.disabled, ...Object.keys(props).filter(key => key !== 'children')]);

    return (
      <Button
        ripple={true}
        variant={validVariant}
        {...buttonProps}>
        {buttonProps.children}
      </Button>
    );
  };

  export default ButtonDefault;