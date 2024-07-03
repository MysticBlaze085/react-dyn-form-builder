// @ts-nocheck
import { Card, CardBody } from "@material-tailwind/react";

import React from "react"; // Ensure React is imported if using its features directly
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

interface TableCardProps {
    children?: React.ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
    [key: string]: any;
}

const TableCard: React.FC<TableCardProps> = ({ children, showHeader = true, showFooter = true, ...props }) => {
    const [isHeaderVisible, setIsHeaderVisible] = React.useState(showHeader);
    const [isFooterVisible, setIsFooterVisible] = React.useState(showFooter);

    React.useEffect(() => {
        setIsHeaderVisible(showHeader);
        setIsFooterVisible(showFooter);
    }, [showHeader, showFooter]);
    
    return (
        <Card className="h-full w-full overflow-auto">
            {isHeaderVisible && <TableHeader {...props} />}
            {(children && isHeaderVisible) || (children && isFooterVisible) ? (
                <CardBody className="overflow-auto px-0 p-2">{children}</CardBody>
            ) : (
                children
            )}
            {isFooterVisible && <TableFooter {...props} />}
        </Card>
    );
}

export default TableCard;