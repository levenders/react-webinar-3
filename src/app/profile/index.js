import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileActions from '../../components/profile-actions';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  let store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    isAuth: state.profile.isAuth,
    profile: state.profile.user,
    waiting: state.profile.waiting,
  }));

  useEffect(() => {
    if (!select.isAuth) {
      navigate('/login');
    } else {
      store.actions.profile.getProfile();
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
        <ProfileCard t={t} profile={select.profile} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
