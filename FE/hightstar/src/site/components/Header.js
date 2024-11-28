import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import avatarDefault from "../../assets/images/avatars/user.png";
import { Dropdown } from "react-bootstrap";
import { logout } from "../services/AuthService";

function Header() {
  const { user, updateUser } = useContext(UserContext);

  const handleLogout = async () => {
    logout();
    updateUser(null);
  };
  return (
    <div>
      {/* Topbar Start */}
      <div className="container-fluid bg-dark px-5 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: 45 }}
            >
              <small className="me-3 text-light">
                <i className="fa fa-map-marker-alt me-2" />
                123 Ton Duc Thang, lien chieu, danang.
              </small>
              <small className="me-3 text-light">
                <i className="fa fa-phone-alt me-2" />
                +012 345 6789
              </small>
              <small className="text-light">
                <i className="fa fa-envelope-open me-2" />
                hightstarpoolcompany@gmail.com
              </small>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: 45 }}
            >
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-twitter fw-normal" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-facebook-f fw-normal" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-linkedin-in fw-normal" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-instagram fw-normal" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle"
                to=""
              >
                <i className="fab fa-youtube fw-normal" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar & Hero Start */}
      <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
          <Link to="/" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              {/* <i className="fa fa-map-marker-alt me-3" /> */}
              HightStarPool
            </h1>
            {/* <img src="img/logo.png" alt="Logo"> */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <NavLink to="/" className="nav-item nav-link">
                Trang Chủ
              </NavLink>
              <NavLink to="/about" className="nav-item nav-link">
                Thông tin
              </NavLink>
              <NavLink to="/course" className="nav-item nav-link">
                Khóa học
              </NavLink>
              <NavLink to="/services" className="nav-item nav-link">
                Dịch Vụ
              </NavLink>

              <Dropdown align="start">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="nav-link"
                  style={{ background: "none" }}
                >
                  Học tập
                </Dropdown.Toggle>

                <Dropdown.Menu className="m-0">
                  <Dropdown.Item as={NavLink} to="/myCourse">
                    Khóa học của tôi
                  </Dropdown.Item>{" "}
                  <Dropdown.Item as={NavLink} to="/schedule">
                    Lịch học
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/studyHistory">
                    Lịch sử học tập
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/studyHistory">
                    Đánh giá & Nhận xét
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <NavLink to="/Contact" className="nav-item nav-link">
                Liên Hệ
              </NavLink>
            </div>
            {!user ? (
              <NavLink
                to="/login"
                className="btn btn-primary rounded-pill py-2 px-4"
              >
                Đăng Nhập
              </NavLink>
            ) : (
              <Dropdown align="start" className="ms-4">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="border-0"
                  bsPrefix="custom-toggle"
                  style={{ background: "none" }}
                >
                  <img
                    src={user?.avatar || avatarDefault} // userData có tồn tại và userData.avatar không null thì lấy còn ng lại thì lấy mặc định
                    alt="User"
                    className="rounded-circle"
                    width={40}
                    height={40}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="m-0 mt-3">
                  <Dropdown.Item as={NavLink} to="/profile">
                    Thông tin cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/settings">
                    Cài đặt
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </nav>
      </div>
      {/* Navbar & Hero End */}
    </div>
  );
}

export default Header;