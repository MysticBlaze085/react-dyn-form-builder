//@ts-nocheck
import React, { Suspense } from 'react';
import { setCurrentPage, setPagination } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';

const CardFooter = React.lazy(() => import('@material-tailwind/react/components/Card/CardFooter'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));
const Tab = React.lazy(() => import('@material-tailwind/react/components/Tabs/Tab'));
const ButtonDefault = React.lazy(() => import('../Button'));

interface TableFooterProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const TableFooter: React.FC<TableFooterProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state['tableDataSource']['pagination']['currentPage']);
  const totalPages = useSelector((state) => state['tableDataSource']['pagination']['totalPages']);
  const pageSize = useSelector((state) => state['tableDataSource']['pagination']['pageSize']);

  const handleNextClick = () => {
    const action = setCurrentPage(currentPage + 1);
    dispatch(action);
  };

  const handlePreviousClick = () => {
    const action = setCurrentPage(currentPage - 1);
    dispatch(action);
  };

  const handleInitialPagination = () => {
    const action = setPagination({ currentPage: 1, pageSize: 5 });
    dispatch(action);
  }

  React.useEffect(() => {
    handleInitialPagination();
  }, []);

  console.log('currentPage', currentPage, pageSize, totalPages);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <ButtonDefault size="sm" onClick={handlePreviousClick} color="blue" disabled={currentPage <= 1}>
            Previous
          </ButtonDefault>
          <ButtonDefault size="sm" onClick={handleNextClick} color="blue" disabled={currentPage >= totalPages}>
            Next
          </ButtonDefault>
        </div>
      </CardFooter>
    </Suspense>
  );
};

export default TableFooter;