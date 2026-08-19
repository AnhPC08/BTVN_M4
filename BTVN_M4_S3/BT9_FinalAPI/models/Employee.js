let employees = [];
let nextId = 1;

export const getAll = () => employees;

export const findById = (id) =>
  employees.find((emp) => emp.id === parseInt(id));

export const findByEmail = (email) =>
  employees.find((emp) => emp.email === email);

export const create = (data) => {
  const newEmp = {
    id: nextId++,
    name: data.name,
    email: data.email,
    avatarUrl: null,
  };
  employees.push(newEmp);
  return newEmp;
};

export const updateAvatar = (id, filename) => {
  const emp = findById(id);
  if (emp) {
    emp.avatarUrl = filename;
  }
  return emp;
};
