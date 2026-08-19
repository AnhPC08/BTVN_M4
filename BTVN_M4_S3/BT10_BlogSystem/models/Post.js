let posts = [];
let nextId = 1;

export const getAll = () => posts;

export const findById = (id) => posts.find((p) => p.id === parseInt(id));

export const create = (data) => {
  const newPost = { id: nextId++, ...data };
  posts.push(newPost);
  return newPost;
};

export const deleteById = (id) => {
  const index = posts.findIndex((p) => p.id === parseInt(id));
  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  }
  return false;
};
