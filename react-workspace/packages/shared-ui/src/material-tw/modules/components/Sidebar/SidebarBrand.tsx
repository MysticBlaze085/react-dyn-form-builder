//@ts-nocheck
import React from 'react';
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));

export interface BrandSectionProps {
    logoSrc: string;
    altText: string;
    sidebarTitle: string;
}

const BrandSection: React.FC<BrandSectionProps> = ({ logoSrc, altText, sidebarTitle }) => (
    <div className="mb-2 flex items-center gap-4 p-4">
        <img src={logoSrc} alt={altText} className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
            {sidebarTitle}
        </Typography>
    </div>
);

export default BrandSection;
