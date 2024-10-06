import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function ProtectedLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
  }));

  const isProtectedPage = pathname === '/profile';

  useEffect(() => {
    if (!select.isAuth && isProtectedPage) {
      navigate('/login');
    }
  }, [select.isAuth, isProtectedPage, navigate]);

  useLayoutEffect(() => {
    if (select.isAuth) {
      store.actions.profile.getProfile();
    }
  }, [store, select.isAuth]);

  return <>{children}</>;
}

ProtectedLayout.propTypes = {
  children: PropTypes.node,
};

export default ProtectedLayout;
