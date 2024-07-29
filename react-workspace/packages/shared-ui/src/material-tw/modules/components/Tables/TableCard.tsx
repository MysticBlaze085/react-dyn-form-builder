// @ts-nocheck
import React, { Suspense } from "react"; // Ensure React is imported if using its features directly

const Card = React.lazy(() => import('@material-tailwind/react/components/Card'));
const CardBody = React.lazy(() => import('@material-tailwind/react/components/Card/CardBody'));
const TableHeader = React.lazy(() => import('./TableHeader'));
const TableFooter = React.lazy(() => import('./TableFooter'));


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
        <Suspense fallback={<div>Loading...</div>}>
            <Card className="h-full w-full overflow-auto">
                {isHeaderVisible && <TableHeader {...props} />}
                {(children && isHeaderVisible) || (children && isFooterVisible) ? (
                    <CardBody className="overflow-auto px-0 pt-2 pb-0">{children}</CardBody>
                ) : (
                    children
                )}
                {isFooterVisible && <TableFooter {...props} />}
            </Card>
        </Suspense>
    );
}

export default TableCard;