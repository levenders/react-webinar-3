import React, { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';

function ProfileActions({ t }) {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    profileName: state.profile.user?.name,
  }));

  const callbacks = {
    logOut: useCallback(() => {
      store.actions.auth.logOut();
    }, [store]),
  };

  return (
    <div className="ProfileActions">
      {select.isAuth ? (
        <>
          <Link to={'/profile'}>{select.profileName}</Link>
          <button onClick={() => callbacks.logOut()}>{t('profile.logout')}</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')}>{t('profile.login')}</button>
      )}
    </div>
  );
}

export default memo(ProfileActions);
