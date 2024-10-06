import React, { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileActions from '../../components/profile-actions';
import ProfileCard from '../../components/profile-card';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    profile: state.profile.user,
  }));

  return (
    <PageLayout>
      <ProfileActions t={t} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.profile && <ProfileCard t={t} profile={select.profile} />}
    </PageLayout>
  );
}

export default memo(Profile);
