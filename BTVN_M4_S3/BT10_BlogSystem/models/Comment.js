let comments = [];
let nextId = 1;

export const create = (data) => {
  const newComment = { id: nextId++, ...data };
  comments.push(newComment);
  return newComment;
};

export const findByPostId = (postId) =>
  comments.filter((c) => c.postId === parseInt(postId));

export const deleteByPostId = (postId) => {
  comments = comments.filter((c) => c.postId !== parseInt(postId));
};
