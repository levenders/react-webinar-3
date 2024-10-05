import React, { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileActions from '../../components/profile-actions';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    profile: state.profile.user,
    waiting: state.profile.waiting,
  }));

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
