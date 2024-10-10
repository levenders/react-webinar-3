import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import './style.css';

function CommentForm({ onAdd, onCancel, title, cancelButtonText, t }) {
  const cn = bem('CommentForm');

  const [textInput, setTextInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!textInput.trim()) {
      return;
    }
    const handleSuccess = () => {
      setTextInput('');
      onCancel();
    };
    onAdd(textInput, handleSuccess);
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h3 className={cn('title')}>{title}</h3>
      <textarea
        value={textInput}
        onChange={e => setTextInput(e.target.value)}
        className={cn('textarea')}
        placeholder={t('comments.placeholder')}
      />
      <div className={cn('actions')}>
        <button type="submit">{t('comments.send')}</button>
        {cancelButtonText && (
          <button type="button" onClick={onCancel}>
            {cancelButtonText}
          </button>
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string,
  t: PropTypes.func,
};

export default memo(CommentForm);
