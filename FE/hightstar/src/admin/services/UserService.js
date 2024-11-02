import axios from "axios";
import { formatDateTimeToDMY } from "../utils/FormatDate";

// Cấu hình axios với URL API chung
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/users",
  // headers: { Authorization: "Bearer <your_token>" }, // Nếu cần thêm mã thông báo
});

// Hàm xử lý lỗi chung
const handleError = (error, message) => {
  console.error(message, error);
  throw error;
};

// Hàm lấy tất cả người dùng
const getUsers = async () => {
  try {
    const response = await axiosInstance.get("");
    const users = response.data;

    // Chuyển đổi định dạng ngày giờ cho từng phần tử
    return users.map((user) => ({
      ...user,
      registeredDate: formatDateTimeToDMY(user.registeredDate),
      lastLogin: formatDateTimeToDMY(user.lastLogin),
    }));
  } catch (error) {
    handleError(error, "Lỗi khi lấy danh sách người dùng:");
  }
};

// Hàm lấy một người dùng theo ID
const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    const user = response.data;

    // Chuyển đổi định dạng ngày giờ
    return {
      ...user,
      registeredDate: formatDateTimeToDMY(user.registeredDate),
      lastLogin: formatDateTimeToDMY(user.lastLogin),
    };
  } catch (error) {
    handleError(error, `Lỗi khi lấy người dùng với ID: ${id}`);
  }
};

// Hàm thêm mới người dùng
const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("", userData);
    return response.data;
  } catch (error) {
    handleError(error, "Lỗi khi thêm mới người dùng:");
  }
};

// Hàm cập nhật người dùng
const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, userData);
    return response.data;
  } catch (error) {
    handleError(error, `Lỗi khi cập nhật người dùng với ID: ${id}`);
  }
};

// Hàm xóa người dùng
const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
  } catch (error) {
    handleError(error, `Lỗi khi xóa người dùng với ID: ${id}`);
  }
};

// Gán object vào một biến trước khi export
const UserService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default UserService;