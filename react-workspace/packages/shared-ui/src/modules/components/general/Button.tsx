import { Button } from '@material-tailwind/react';
import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    [key: string]: any;
  }
  
 const ButtonDefault: React.FC<ButtonProps> = (props) => {
    return (
      <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} {...props}>
        {props.children}
      </Button>
    );
  };

  export default ButtonDefault;