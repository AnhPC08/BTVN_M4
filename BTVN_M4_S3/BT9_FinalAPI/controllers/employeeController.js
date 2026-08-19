import * as EmployeeModel from "../models/Employee.js";
import AppError from "../utils/AppError.js";

export const getAllEmployees = (req, res, next) => {
  try {
    const employees = EmployeeModel.getAll();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Validate bắt buộc
    if (!name || !email) {
      throw new AppError("Thiếu name hoặc email", 400);
    }

    // Kiểm tra trùng email
    const existingEmp = EmployeeModel.findByEmail(email);
    if (existingEmp) {
      throw new AppError("Email đã tồn tại", 409);
    }

    const newEmp = EmployeeModel.create({ name, email });
    res.status(201).json(newEmp);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = (req, res, next) => {
  try {
    const emp = EmployeeModel.findById(req.params.id);
    if (!emp) {
      throw new AppError("Không tìm thấy nhân viên", 404);
    }
    res.status(200).json(emp);
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = (req, res, next) => {
  try {
    const empId = req.params.id;

    // Kiểm tra xem nhân viên có tồn tại không trước khi update
    const emp = EmployeeModel.findById(empId);
    if (!emp) {
      throw new AppError("Không tìm thấy nhân viên", 404);
    }

    if (!req.file) {
      throw new AppError("Vui lòng chọn file ảnh để upload", 400);
    }

    // Cập nhật field avatarUrl bằng tên file vừa upload
    const updatedEmp = EmployeeModel.updateAvatar(empId, req.file.filename);
    res.status(200).json(updatedEmp);
  } catch (error) {
    next(error);
  }
};
