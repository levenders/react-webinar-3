import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import './style.css';

function ProfileCard({ profile, t }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <p className={cn('data')}>
        {t('profile.name')}: <span>{profile.name}</span>
      </p>
      <p className={cn('data')}>
        {t('profile.phone')}: <span>{profile.phone}</span>
      </p>
      <p className={cn('data')}>
        {t('profile.email')}: <span>{profile.email}</span>
      </p>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
};

export default memo(ProfileCard);
