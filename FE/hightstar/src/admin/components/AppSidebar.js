import { useState } from "react";
import Logo from "../../assets/brand/Logo";
import { Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Sử dụng NavLink để có trạng thái active
import { useTheme } from "./common/ThemeContext";

const AppSidebar = ({ isSidebarOpen }) => {
  const { theme } = useTheme();
  const [menuState, setMenuState] = useState({
    // lưu trạng thái đóng mở của các menu có menu con
    ticket: false,
    stock: false,
  });

  // Toggle function for submenus
  const toggleMenu = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "open" : "closed"}  p-0 ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <div
        className="logo d-flex justify-content-center align-items-center border-dark-subtle  border-bottom "
        style={{ height: "66px" }}
      >
        <NavLink to="/admin/dashboard">
          <Logo />
        </NavLink>
      </div>
      <ul className="menu list-unstyled overflow-auto custom-scrollbar">
        <li className="mt-3">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 fs-5 bi bi-house-door"></i> Bảng điều khiển
          </NavLink>
        </li>
        <li className="sidebar__title text-uppercase fw-bold opacity-50">
          Quản lý
        </li>
        <li>
          <NavLink
            to="/admin/sell"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 fa fa-shopping-cart"></i> Bán hàng
          </NavLink>
        </li>
        {/* menu có menu con */}
        <li>
          <div
            className={`d-flex justify-content-center align-items-center ${
              menuState.ticket ? "active-link" : "inactive-link"
            }`}
            onClick={() => toggleMenu("ticket")}
            style={{ cursor: "pointer" }}
          >
            <i className="me-2 bi bi-ticket-perforated"></i> Vé bơi
            <i
              className={`ms-auto bi ${
                menuState.ticket
                  ? "bi-chevron-compact-up"
                  : "bi-chevron-compact-down"
              }`}
            ></i>
          </div>
          {/* Submenu collapse */}
          <Collapse in={menuState.ticket}>
            <ul className="list-unstyled ms-2">
              <li>
                <NavLink
                  to="/admin/ticket/ticket-management"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive-link"
                  }
                >
                  <i className="me-2 bi bi-calendar-day"></i> Quản lý vé
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/ticket/ticket-check"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive-link"
                  }
                >
                  <i className="me-2 bi bi-qr-code"></i> Soát vé
                </NavLink>
              </li>
            </ul>
          </Collapse>
        </li>
        <li>
          <NavLink
            to="/admin/user-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 bi bi-people-fill"></i> Người dùng
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/student-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 fa-solid fa-people-roof"></i> Học viên
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/course-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 bi bi-journal-bookmark"></i> Khóa học
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/trainer-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 fa-solid fa-building-user"></i> Huấn Luyện Viên
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/class-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 fa fa-university"></i> Lớp học
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/discount-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 fa fa-gift"></i> Giảm giá
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/review-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 fa fa-gift"></i> Đánh giá
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/category-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            <i className="me-2 fa fa-gift"></i> Phân loại
          </NavLink>
        </li>

        <li>
          <div
            className={`d-flex justify-content-center align-items-center ${
              menuState.stock ? "active-link" : "inactive-link"
            }`}
            onClick={() => toggleMenu("stock")}
            style={{ cursor: "pointer" }}
          >
            <i className="me-2 fa fa-archive"></i> Kho hàng
            <i
              className={`ms-auto bi ${
                menuState.stock
                  ? "bi-chevron-compact-up"
                  : "bi-chevron-compact-down"
              }`}
            ></i>
          </div>
          {/* Submenu collapse */}
          <Collapse in={menuState.stock}>
            <ul className="list-unstyled ms-2">
              <li className="text-nowrap">
                <NavLink
                  to="/admin/stock/category-management"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive-link"
                  }
                >
                  <i className="me-2 bi bi-table"></i> Quản lý danh mục
                </NavLink>
              </li>
              <li className="text-nowrap">
                <NavLink
                  to="/admin/stock/product-management"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive-link"
                  }
                >
                  <i className="me-2 bi bi-inboxes-fill"></i> Quản lý sản phẩm
                </NavLink>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className="sidebar__title text-uppercase fw-bold opacity-50">
          Tiện ích
        </li>
        <li>
          <NavLink
            to="/admin/setting-management"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
            style={{ marginBottom: "12px" }}
          >
            <i className="me-2 fa fa-cogs"></i> Cài đặt
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AppSidebar;
