import { Button } from '@material-tailwind/react';
import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    variant?: 'filled' | 'outlined' | 'gradient' | 'text';
    [key: string]: any;
  }
  
 const ButtonDefault: React.FC<ButtonProps | any> = ({variant = 'filled', ...props}) => {
  const validVariant = ['filled', 'outlined', 'gradient', 'text'].includes(variant) ? variant : 'filled';
    return (
      <Button
        ripple={true}
        variant={validVariant}
        {...props}>
        {props.children}
      </Button>
    );
  };

  export default ButtonDefault;