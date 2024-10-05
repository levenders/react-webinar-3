import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function ProtectedLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.profile.isAuth,
  }));

  const isProtectedPage = pathname === '/profile';

  useEffect(() => {
    if (!select.isAuth && isProtectedPage) {
      navigate('/login');
    }
  }, [select.isAuth, isProtectedPage, navigate]);

  return <>{children}</>;
}

ProtectedLayout.propTypes = {
  children: PropTypes.node,
};

export default ProtectedLayout;
