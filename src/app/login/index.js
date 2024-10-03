import React, { memo, useCallback, useEffect } from 'react';
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
    isAuth: state.profile.isAuth,
    waiting: state.profile.waiting,
    error: state.profile.error,
  }));

  const callbacks = {
    // Удаление из корзины
    logIn: useCallback((login, password) => store.actions.profile.logIn(login, password), [store]),
  };

  useEffect(() => {
    if (select.isAuth) {
      navigate('/profile');
    }
  }, [select.isAuth]);

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
