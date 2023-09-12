import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => { // Give the functional component a name
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => !!state.auth.user);

    // If the user is authenticated, render the wrapped component
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      // If the user is not authenticated, redirect to the login page
      return navigate('/login');
    }
  };

  return AuthComponent; // Return the named functional component
};

export default withAuth;