import React, { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../../components/form-login';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileActions from '../../components/profile-actions';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Login() {
  const navigate = useNavigate();
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
    error: state.auth.error,
  }));

  const callbacks = {
    // Удаление из корзины
    logIn: useCallback((login, password) => store.actions.auth.logIn(login, password), [store]),
  };

  useEffect(() => {
    if (select.isAuth && !select.waiting) {
      navigate('/profile');
    }
  }, [select.isAuth]);

  useLayoutEffect(() => {
    store.actions.auth.resetError();
  }, []);

  return (
    <PageLayout>
      <ProfileActions t={t} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <FormLogin error={select.error} t={t} onLogin={callbacks.logIn} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
