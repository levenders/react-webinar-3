/**
 * @param {Array} comments - Массив комментариев
 * @returns {Array} - Cтруктура комментариев
 */
export const buildComments = comments => {
  const topLevelComments = [];
  const map = comments.reduce((acc, comment) => {
    acc[comment._id] = { ...comment, children: [] };
    return acc;
  }, {});

  comments.forEach(({ parent, _id }) => {
    if (parent._type === 'comment') {
      const parentComment = map[parent._id];
      if (parentComment) {
        parentComment.children.push(map[_id]);
      }
    } else {
      topLevelComments.push(map[_id]);
    }
  });

  return topLevelComments;
};
