import React, { useEffect } from 'react';

import { Button } from '@material-tailwind/react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'filled' | 'outlined' | 'gradient' | 'text';
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    [key: string]: any;
}

const ButtonDefault: React.FC<ButtonProps | any> = ({ variant = 'filled', ...props }) => {
    const [buttonProps, setButtonProps] = React.useState(props);
    const validVariant = ['filled', 'outlined', 'gradient', 'text'].includes(variant) ? variant : 'filled';
    const validSize = ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md';

    useEffect(() => {
        setButtonProps(props);
    }, [props.color, props.disabled, props.onClick, ...Object.keys(props).filter((key) => key !== 'children')]);

    return (
        <Button ripple={true} variant={validVariant} size={validSize} {...buttonProps}>
            {buttonProps.children}
        </Button>
    );
};

export default ButtonDefault;
