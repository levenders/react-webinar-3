import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import Head from '../head';
import './style.css';

function ModalLayout({ children, titleModal, closeModal }) {
  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <Head title={titleModal}>
          <button className={cn('close')} onClick={closeModal}>
            Закрыть
          </button>
        </Head>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
};

export default React.memo(ModalLayout);
