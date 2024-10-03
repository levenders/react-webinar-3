import React, { memo, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';

function ProfileActions({ t }) {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.profile.isAuth,
    profile: state.profile.user,
  }));

  const callbacks = {
    logOut: useCallback(() => {
      store.actions.profile.logOut();
    }, [store]),
  };

  useEffect(() => {
    if (!select.isAuth) {
      store.actions.profile.getProfile();
    }
  }, [select.isAuth]);

  return (
    <div className="ProfileActions">
      {select.isAuth ? (
        <>
          <Link to={'/profile'}>{select.profile.username}</Link>
          <button onClick={() => callbacks.logOut()}>{t('profile.logout')}</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')}>{t('profile.login')}</button>
      )}
    </div>
  );
}

export default memo(ProfileActions);
