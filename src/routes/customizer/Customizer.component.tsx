import { lazy } from 'react';

const RemoteCustomizer = lazy(() => import('remoteApp/ShirtCustomizer'));

const Customizer = () => {
  return <RemoteCustomizer />;
};

export default Customizer;
