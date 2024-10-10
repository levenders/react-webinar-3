import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { dateParser } from '../../utils/date-parser';
import CommentForm from '../comment-form';
import CommentList from '../comment-list';
import GuestComment from '../guest-comment';
import './style.css';

function Comment({ comment, isOpenComment, onCancel, onAdd, onOpen, isAuth, t }) {
  const cn = bem('Comment');
  const { author, text, dateCreate, isDeleted, children, _id } = comment;

  const handleAddAnswer = (text, onSuccess) => {
    onAdd({ parent: { _id, _type: 'comment' }, text }, onSuccess);
  };

  const hasChildren = Boolean(children?.length);

  return (
    <div className={cn()}>
      <div className={cn('user-date')}>
        <div className={cn('user')}>{author.profile.name}</div>
        <div className={cn('date')}>{dateParser(dateCreate)}</div>
      </div>
      <p className={cn('text')}>{isDeleted ? t('comments.deleteComment') : text}</p>
      <button className={cn('answer-btn')} onClick={() => onOpen(_id)}>
        {t('comments.answer')}
      </button>
      {isAuth && isOpenComment === _id ? (
        <CommentForm
          onAdd={handleAddAnswer}
          onCancel={onCancel}
          title={t('comments.newAnswer')}
          cancelButtonText={t('comments.cancel')}
          t={t}
        />
      ) : null}
      {!isAuth && isOpenComment === _id && (
        <GuestComment
          onCancel={onCancel}
          buttonText={t('comments.cancel')}
          text={t('comments.noAuthText')}
          t={t}
        />
      )}
      {hasChildren && (
        <CommentList
          comments={children}
          onAdd={onAdd}
          isOpenComment={isOpenComment}
          onCancel={onCancel}
          onOpen={onOpen}
          isAuth={isAuth}
          isChildList
          t={t}
        />
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    children: PropTypes.array,
    _id: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      _id: PropTypes.string,
      _type: PropTypes.oneOf(['article', 'comment']),
    }),
    text: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  onCancel: PropTypes.func,
  onAdd: PropTypes.func,
  onOpen: PropTypes.func,
  isAuth: PropTypes.bool,
  t: PropTypes.func,
};

export default memo(Comment);
