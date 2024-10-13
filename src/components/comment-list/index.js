import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import Comment from '../comment';
import './style.css';

function CommentList({
  comments,
  onAdd,
  isOpenComment,
  onCancel,
  onOpen,
  t,
  isChildList,
  isAuth,
  maxDepth,
  userName,
}) {
  const cn = bem('CommentList');

  return (
    <ul className={cn({ child: isChildList, depth: maxDepth <= 4 && maxDepth >= 2 })}>
      {comments?.map(commentItem => (
        <li key={commentItem._id}>
          <Comment
            isOpenComment={isOpenComment}
            comment={commentItem}
            onAdd={onAdd}
            onCancel={onCancel}
            onOpen={onOpen}
            isAuth={isAuth}
            userName={userName}
            maxDepth={maxDepth}
            t={t}
          />
        </li>
      ))}
    </ul>
  );
}

CommentList.propTypes = {
  isOpenComment: PropTypes.string,
  comments: PropTypes.array,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onOpen: PropTypes.func,
  isChildList: PropTypes.bool,
  isAuth: PropTypes.bool,
  userName: PropTypes.string,
  t: PropTypes.func,
};

export default memo(CommentList);
