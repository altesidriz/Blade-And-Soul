import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteProtect = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RouteProtect;