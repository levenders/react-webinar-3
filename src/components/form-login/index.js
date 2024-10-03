import { cn as bem } from '@bem-react/classname';
import React, { memo } from 'react';
import './style.css';

function FormLogin({ onLogin, t, error }) {
  const cn = bem('FormLogin');

  const onSubmit = e => {
    e.preventDefault();
    onLogin(e.target.login.value, e.target.password.value);
  };

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.login')}</h2>
      <form className={cn('form')} onSubmit={e => onSubmit(e)}>
        <label className={cn('label')}>
          {t('profile.label.login')}
          <input type="text" name="login" />
        </label>
        <label className={cn('label')}>
          {t('profile.label.password')}
          <input type="password" name="password" />
        </label>
        {error && <p className={cn('error')}>{error}</p>}
        <button type="submit" className={cn('button')}>
          {t('profile.button.login')}
        </button>
      </form>
    </div>
  );
}

export default memo(FormLogin);
