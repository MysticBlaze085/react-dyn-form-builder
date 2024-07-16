//@ts-nocheck
import React, { Suspense } from 'react';

const Alert = React.lazy(() => import('@material-tailwind/react/components/Alert'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));
const CubeTransparentIcon = React.lazy(() => import('@heroicons/react/24/solid/CubeTransparentIcon'));

export interface AlertContentProps {
  title: string;
  description: string;
  dismissText: string;
  upgradeText: string;
}

const SidebarAlert: React.FC<AlertContentProps> = ({ ...props }) => {
    const { title, description, dismissText, upgradeText } = props;
  const [openAlert, setOpenAlert] = React.useState(true);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          {title ?? 'No title'}
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          {description ?? 'No description'}
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            {dismissText ?? 'Dismiss'}
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            {upgradeText ?? 'Upgrade'}
          </Typography>
        </div>
      </Alert>
    </Suspense>
  );
};

export default SidebarAlert;