import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo, useMemo, useState } from 'react';
import CommentForm from '../../components/comment-form';
import CommentList from '../../components/comment-list';
import GuestComment from '../../components/guest-comment';
import listToTree from '../../utils/list-to-tree/index';
import './style.css';

function CommentsZone({ comments, count, t, articleId, onAdd, isAuth }) {
  const cn = bem('CommentsZone');

  const [isOpenComment, setIsOpenComment] = useState();

  const callbacks = {
    onAddComment: (text, onSuccess) =>
      onAdd({ parent: { _type: 'article', _id: articleId }, text }, onSuccess),
    onCancel: () => setIsOpenComment(null),
  };

  const builtComments = useMemo(() => {
    const commentsTree = listToTree(comments);
    return commentsTree.length > 0 ? commentsTree[0].children : [];
  }, [comments]);

  const hasBuiltCommentsExist = Boolean(builtComments.length);
  const maxDepth = Math.min(4, ...builtComments.map(comment => comment.level || 1));

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>
        {t('comments.title')} ({count})
      </h2>
      {hasBuiltCommentsExist && (
        <CommentList
          comments={builtComments}
          onAdd={onAdd}
          isOpenComment={isOpenComment}
          onCancel={callbacks.onCancel}
          onOpen={setIsOpenComment}
          isAuth={isAuth}
          maxDepth={maxDepth}
          t={t}
        />
      )}
      {isAuth && !isOpenComment && (
        <CommentForm
          onAdd={callbacks.onAddComment}
          title={t('comments.newComment')}
          parentId={articleId}
          onCancel={callbacks.onCancel}
          t={t}
        />
      )}
      {!isAuth && !isOpenComment && <GuestComment text={t('comments.notAuth')} t={t} />}
    </div>
  );
}

CommentsZone.propTypes = {
  articleId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  count: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  t: PropTypes.func,
};

export default memo(CommentsZone);
