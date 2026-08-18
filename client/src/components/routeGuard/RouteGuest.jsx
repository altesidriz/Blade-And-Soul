import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteGuest = ({children}) => {
    const currentUser = useSelector((state) => state.user.currentUser);

    if (currentUser) {
      return <Navigate to="/" />;
    }
  
    return children;
}

export default RouteGuest