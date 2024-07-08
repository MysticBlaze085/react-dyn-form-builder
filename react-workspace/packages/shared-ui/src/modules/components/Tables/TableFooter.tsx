// @ts-nocheck
import React, { Suspense } from 'react';

const CardFooter = React.lazy(() => import('@material-tailwind/react/components/Card/CardFooter'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));
const Tab = React.lazy(() => import('@material-tailwind/react/components/Tabs/Tab'));
const ButtonDefault = React.lazy(() => import('../Button'));

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const TableFooter: React.FC<TableFooterProps> = ({ currentPage, totalPages, onPreviousClick, onNextClick }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <ButtonDefault size="sm" onClick={onPreviousClick} color="blue" disabled={currentPage <= 1}>
            Previous
          </ButtonDefault>
          <ButtonDefault size="sm" onClick={onNextClick} color="blue" disabled={currentPage >= totalPages}>
            Next
          </ButtonDefault>
        </div>
      </CardFooter>
    </Suspense>
  );
};

export default TableFooter;