import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import DisclaimerDialog from './components/DisclaimerDialog';

export default function App() {
  return (
    <>
      <DisclaimerDialog />
      <RouterProvider router={router} />
    </>
  );
}