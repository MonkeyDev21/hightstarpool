import { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeService from "../../services/HomeService";
import { UserContext } from "../../../contexts/UserContext";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useContext(UserContext);

  const [loadingPage, setLoadingPage] = useState(false); // này để load cho toàn bộ trang dữ liệu
  const [originalRatings, setOriginalRatings] = useState({}); // Khai báo state để lưu rating ban đầu của mỗi huấn luyện viên
  const [hoveredRatings, setHoveredRatings] = useState({}); // State cho hoveredRating của từng huấn luyện viên
  const [selectedTrainer, setSelectedTrainer] = useState(null); // Huấn luyện viên được chọn
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const fetchData = async () => {
    try {
      setLoadingPage(true);
      const listCourseData = await HomeService.getCourses();
      setCourses(listCourseData); // lưu course vào state
      const listTrainerData = await HomeService.getTrainers();
      setTrainers(listTrainerData); // lưu course vào state
    } catch (error) {
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fake data for testimonials
  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      location: "Hà Nội, Việt Nam",
      message:
        "Tôi rất hài lòng với dịch vụ của HightStarPool. Các huấn luyện viên rất tận tình và chuyên nghiệp.",
      image: "assets/img/testimonial-1.jpg",
    },
    {
      id: 2,
      name: "Trần Thị B",
      location: "TP. HCM, Việt Nam",
      message:
        "Cơ sở vật chất hiện đại và đội ngũ nhân viên thân thiện. Tôi sẽ tiếp tục tham gia các khóa học tại đây.",
      image: "assets/img/testimonial-2.jpg",
    },
    {
      id: 3,
      name: "Phạm Minh C",
      location: "Đà Nẵng, Việt Nam",
      message:
        "Không gian bơi rất sạch sẽ và thoải mái. Đội ngũ hướng dẫn viên rất chuyên nghiệp.",
      image: "assets/img/testimonial-3.jpg",
    },
    {
      id: 4,
      name: "Lê Thị D",
      location: "Cần Thơ, Việt Nam",
      message:
        "HightStarPool là lựa chọn hàng đầu của tôi khi tìm kiếm nơi học bơi an toàn và hiệu quả.",
      image: "assets/img/testimonial-4.jpg",
    },
  ];

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleStarClick = (trainerId, starRating) => {
    // Lưu rating ban đầu của huấn luyện viên nếu chưa lưu
    if (!originalRatings[trainerId]) {
      setOriginalRatings((prevOriginalRatings) => ({
        ...prevOriginalRatings,
        [trainerId]: trainers.find((trainer) => trainer.id === trainerId)
          .rating,
      }));
    }

    // Cập nhật rating của huấn luyện viên khi click vào sao
    setTrainers((prevTrainers) =>
      prevTrainers.map((trainer) =>
        trainer.id === trainerId
          ? { ...trainer, rating: starRating, review: "" } // Xóa nhận xét cũ khi thay đổi rating
          : trainer
      )
    );
    setSelectedTrainer(trainerId); // Cập nhật huấn luyện viên được chọn
    setModalVisible(true); // Hiển thị modal
  };

  const handleStarHover = (trainerId, starRating) => {
    setHoveredRatings((prevHoveredRatings) => ({
      ...prevHoveredRatings,
      [trainerId]: starRating, // Lưu hoveredRating cho từng huấn luyện viên
    }));
  };

  const handleStarLeave = (trainerId) => {
    setHoveredRatings((prevHoveredRatings) => ({
      ...prevHoveredRatings,
      [trainerId]: 0, // Reset số sao khi hover rời khỏi sao của huấn luyện viên
    }));
  };
  // Hàm render sao
  const renderStars = (trainer) => {
    const stars = [];
    const { rating } = trainer;
    const currentRating = hoveredRatings[trainer.id] || rating; // Lấy giá trị hoveredRating riêng biệt cho từng huấn luyện viên

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(currentRating)) {
        // Sao đầy
        stars.push(
          <i
            key={i}
            className="bi bi-star-fill text-warning mx-1"
            onClick={() => handleStarClick(trainer.id, i)} // Xử lý click
            onMouseEnter={() => handleStarHover(trainer.id, i)} // Xử lý hover
            onMouseLeave={() => handleStarLeave(trainer.id)} // Xử lý khi mouse rời khỏi sao
            style={{ cursor: "pointer" }}
          />
        );
      } else if (i === Math.ceil(currentRating) && currentRating % 1 !== 0) {
        // Sao nửa (half-star)
        stars.push(
          <i
            key={i}
            className="bi bi-star-half text-warning mx-1"
            onClick={() => handleStarClick(trainer.id, i)} // Xử lý click
            onMouseEnter={() => handleStarHover(trainer.id, i)} // Xử lý hover
            onMouseLeave={() => handleStarLeave(trainer.id)} // Xử lý khi mouse rời khỏi sao
            style={{ cursor: "pointer" }}
          />
        );
      } else {
        // Sao trống
        stars.push(
          <i
            key={i}
            className="bi bi-star text-warning mx-1"
            onClick={() => handleStarClick(trainer.id, i)} // Xử lý click
            onMouseEnter={() => handleStarHover(trainer.id, i)} // Xử lý hover
            onMouseLeave={() => handleStarLeave(trainer.id)} // Xử lý khi mouse rời khỏi sao
            style={{ cursor: "pointer" }}
          />
        );
      }
    }

    return stars;
  };

  const handleReviewCancel = () => {
    // Khi hủy bỏ đánh giá, khôi phục lại rating ban đầu của huấn luyện viên
    setTrainers((prevTrainers) =>
      prevTrainers.map((trainer) =>
        trainer.id === selectedTrainer
          ? { ...trainer, rating: originalRatings[selectedTrainer] }
          : trainer
      )
    );
    setModalVisible(false); // Đóng modal khi hủy bỏ
    setReviewText(""); // Reset nhận xét
  };

  const handleReviewSubmit = async () => {
    // Cập nhật nhận xét của huấn luyện viên
    console.log(
      "Nhận xét về HLV" +
        selectedTrainer +
        ":" +
        reviewText +
        "---" +
        "Số sao:" +
        hoveredRatings
    );
    // Gom tất cả dữ liệu thành 1 đối tượng duy nhất
    const reviewData = {
      trainerId: selectedTrainer,
      rating: hoveredRatings[selectedTrainer],
      comment: reviewText,
    };
    await HomeService.addOrUpdate(reviewData);
    toast.success("Đánh giá thành công");
    setModalVisible(false);
    setReviewText("");
  };

  return (
    <>
      <Helmet>
        <title>Trang chủ - Hight Star</title>
      </Helmet>
      {loadingPage ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" className=""></Spinner>
        </div>
      ) : (
        <div>
          <div className="container-fluid bg-primary py-5 mb-5 hero-header">
            <div className="container py-5">
              <div className="row justify-content-center py-5">
                <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                  <h1 className="display-3 text-white mb-3 animated slideInDown">
                    Mỗi người biết bơi.
                    <br />
                    Đánh dấu sứ mệnh hoàn thành.
                  </h1>
                  <p className="fs-4 text-white mb-4 animated slideInDown">
                    Kỹ năng bơi lội không chỉ là môn thể thao, mà là sự bảo vệ
                    cho bản thân, gia đình và mọi người.
                  </p>
                  <div className="position-relative w-75 mx-auto animated slideInDown">
                    <input
                      className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                      type="text"
                      placeholder="Tìm Khóa học, huấn luyện viên..."
                    />
                    <button
                      type="button"
                      className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                      style={{ marginTop: 7 }}
                    >
                      Tìm Kiếm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* About Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-5">
                <div
                  className="col-lg-6 wow fadeInUp"
                  style={{ minHeight: 400 }}
                >
                  <div className="position-relative h-100">
                    <img
                      className="img-fluid position-absolute w-100 h-100"
                      src="assets/img/about.jpg"
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                  <h6 className="section-title bg-white text-start text-primary pe-3">
                    Về Chúng Tôi
                  </h6>
                  <h1 className="mb-4">
                    Chào Mừng Đến Với{" "}
                    <span className="text-primary">HightStarPool</span>
                  </h1>
                  <p className="mb-4">
                    Chào mừng bạn đến với HightStarPool – nơi khơi nguồn niềm
                    đam mê với nước và hành trình trở thành người bơi lội tự
                    tin!
                  </p>
                  <p className="mb-4">
                    Tại HightStarPool, chúng tôi tin rằng bơi lội không chỉ là
                    một kỹ năng sống thiết yếu mà còn là cách tuyệt vời để cải
                    thiện sức khỏe, thư giãn tinh thần và tận hưởng cuộc sống.
                    Được thành lập bởi những huấn luyện viên bơi lội giàu kinh
                    nghiệm và tâm huyết, sứ mệnh của chúng tôi là mang đến cho
                    bạn môi trường học tập an toàn, hiệu quả và tràn đầy cảm
                    hứng.
                  </p>
                  <div className="row gy-2 gx-4 mb-4">
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Huấn Luyện Viên Chuyên Nghiệp
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Hồ Bơi Đạt Chuẩn Quốc Tế
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Lịch học linh động
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Học bơi cam kết chất lượng
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Giáo viên 1 kèm 1 xuống hồ cùng bạn!
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Hỗ Trợ 24/7
                      </p>
                    </div>
                  </div>
                  {user ? (
                    <NavLink
                      className="btn btn-primary py-2 px-5 mt-2"
                      to={"/course"}
                    >
                      Khám phá ngay
                    </NavLink>
                  ) : (
                    <NavLink
                      className="btn btn-primary py-2 px-5 mt-2"
                      to={"/register"}
                    >
                      Đăng ký ngay
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* About End */}
          {/* Benefit Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="text-center wow fadeInUp">
                <h6 className="section-title bg-white text-center text-primary px-3">
                  Cam Kết Chất Lượng
                </h6>
                <h1 className="mb-5">Lợi Ích Khi Học Bơi Với Chúng Tôi</h1>
              </div>
              <div className="row g-4">
                {/* Card 1 */}
                <div className="col-lg-3 col-sm-6 wow fadeInUp">
                  <div className="benefit-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      <i className="fa fa-swimmer fa-3x text-primary mb-3"></i>
                      <h5>Khóa Học Hiệu Quả</h5>
                      <p>
                        Hướng dẫn bơi bài bản từ cơ bản đến nâng cao, phù hợp
                        với mọi lứa tuổi.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Card 2 */}
                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="benefit-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      <i className="fa fa-heartbeat fa-3x text-primary mb-3"></i>
                      <h5>Cải Thiện Sức Khỏe</h5>
                      <p>
                        Giúp tăng cường thể lực, sức bền, và giảm căng thẳng
                        hiệu quả.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Card 3 */}
                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.0s"
                >
                  <div className="benefit-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      <i className="fa fa-child fa-3x text-primary mb-3"></i>
                      <h5>An Toàn Hơn</h5>
                      <p>
                        Nắm vững kỹ năng bơi và cứu hộ cơ bản để tự tin hơn khi
                        tham gia bơi lội.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Card 4 */}
                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="benefit-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      <i className="fa fa-users fa-3x text-primary mb-3"></i>
                      <h5>Kết Nối Cộng Đồng</h5>
                      <p>
                        Gặp gỡ bạn bè và xây dựng mối quan hệ qua các lớp học
                        nhóm.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Card 5 */}
                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.9s"
                >
                  <div className="benefit-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      <i className="fa fa-grin-beam fa-3x text-primary mb-3"></i>
                      <h5>Giảm Stress</h5>
                      <p>
                        Thư giãn tinh thần và giảm áp lực với các bài tập bơi
                        thú vị.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Card 6 */}
                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="1.1s"
                >
                  <div className="benefit-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      <i className="fa fa-clock fa-3x text-primary mb-3"></i>
                      <h5>Thời Gian Linh Hoạt</h5>
                      <p>
                        Lịch học đa dạng, dễ dàng sắp xếp với công việc và cuộc
                        sống.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Card 7 */}
                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="1.3s"
                >
                  <div className="benefit-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      <i className="fa fa-book fa-3x text-primary mb-3"></i>
                      <h5>Kiến Thức Hữu Ích</h5>
                      <p>
                        Cung cấp kiến thức cần thiết để bơi an toàn và hiệu quả
                        hơn.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Card 8 */}
                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="1.5s"
                >
                  <div className="benefit-item rounded pt-3 h-100">
                    <div className="p-4 text-center">
                      <i className="fa fa-medal fa-3x text-primary mb-3"></i>
                      <h5>Đạt Thành Tích Cao</h5>
                      <p>
                        Được đào tạo chuyên sâu, giúp bạn nâng cao khả năng bơi
                        lội.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Benefit End */}
          {/* Destination Start */}
          <div className="container-xxl py-5 destination">
            <div className="container">
              <div className="text-center wow fadeInUp">
                <h6 className="section-title bg-white text-center text-primary px-3">
                  Tiện Ích
                </h6>
                <h1 className="mb-5">Một Vài Tiện Ích Của Hồ Bơi</h1>
              </div>
              <div className="row g-3">
                <div className="col-lg-7 col-md-6">
                  <div className="row g-3">
                    <div className="col-lg-12 col-md-12 wow zoomIn">
                      <Link
                        className="position-relative d-block overflow-hidden"
                        href=""
                      >
                        <img
                          className="img-fluid"
                          src="assets/img/destination-1.jpg"
                          alt=""
                        />
                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                          AnhHoBoi
                        </div>
                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                          HoBoiChinh
                        </div>
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 wow zoomIn"
                      data-wow-delay="0.3s"
                    >
                      <Link
                        className="position-relative d-block overflow-hidden"
                        href=""
                      >
                        <img
                          className="img-fluid"
                          src="assets/img/destination-2.jpg"
                          alt=""
                        />
                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                          AnhHoBoi
                        </div>
                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                          VanDongVien
                        </div>
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 wow zoomIn"
                      data-wow-delay="0.0s"
                    >
                      <Link
                        className="position-relative d-block overflow-hidden"
                        href=""
                      >
                        <img
                          className="img-fluid"
                          src="assets/img/destination-3.jpg"
                          alt=""
                        />
                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                          AnhHoBoi
                        </div>
                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                          VanDongVien
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-5 col-md-6 wow zoomIn"
                  data-wow-delay="0.7s"
                  style={{ minHeight: 350 }}
                >
                  <Link
                    className="position-relative d-block h-100 overflow-hidden"
                    href=""
                  >
                    <img
                      className="img-fluid position-absolute w-100 h-100"
                      src="assets/img/destination-4.jpg"
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                      AnhHoBoi
                    </div>
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      HoThiDau
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Destination Start */}
          {/* Course Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="text-center">
                <h6 className="section-title bg-white text-center text-primary px-3">
                  Khóa Học
                </h6>
                <h1 className="mb-5">Khám Phá Các Khóa Học Bơi</h1>
              </div>
              <div className="row g-4 justify-content-center">
                {courses.slice(0, 3).map((course) => (
                  <div className="col-lg-4 col-md-6" key={course.id}>
                    <div className="course-item rounded overflow-hidden shadow">
                      <div
                        className="overflow-hidden"
                        style={{
                          height: "250px",
                          width: "100%",
                        }}
                      >
                        <img
                          className="img-fluid w-100 h-100"
                          src={course.image}
                          alt={course.courseName}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="d-flex border-bottom">
                        <div className="flex-fill text-center border-end py-2">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                        </div>
                        <small className="flex-fill text-center border-end py-2 m-auto">
                          {course.numberOfSessions} Buổi
                        </small>
                        <small className="flex-fill text-center py-2 m-auto">
                          {formatCurrency(course.price)}
                        </small>
                      </div>
                      <div className="text-center p-4">
                        <h5 className="mb-3 fw-bold">{course.courseName}</h5>
                        <p className="mb-3 text text-truncate">
                          {course.description}
                        </p>
                        <div className="d-flex justify-content-center mb-2">
                          <Link
                            href="#"
                            className="btn btn-sm btn-primary px-3 border-end"
                            style={{ borderRadius: "30px 0 0 30px" }}
                          >
                            Xem chi tiết
                          </Link>
                          <Link
                            href="#"
                            className="btn btn-sm btn-primary px-3"
                            style={{ borderRadius: "0 30px 30px 0" }}
                          >
                            Đăng Ký Ngay
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                <NavLink
                  className="btn-link link-primary border-0 bg-transparent py-2 mt-5"
                  to={"/course"}
                >
                  Xem nhiều hơn
                </NavLink>{" "}
              </div>
            </div>
          </div>
          {/* Course End */}
          {/* Booking Start */}
          <div className="container-xxl py-5 text-light">
            <div className="container">
              <div
                className="booking p-5"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "5px",
                }}
              >
                <div className="row g-5 align-items-center">
                  {/* Left Section */}
                  <div className="col-md-6">
                    <h6 className="text-uppercase text-light">Đăng Ký</h6>
                    <h1 className="mb-4 text-light">
                      Đăng Ký Ngay – Đừng Chần Chừ!
                    </h1>
                    <p className="mb-4">
                      Chúng tôi hiểu rằng mỗi người có nhu cầu và mục tiêu học
                      bơi khác nhau. Vì vậy, đội ngũ tư vấn chuyên nghiệp của
                      HightStarPool luôn sẵn sàng hỗ trợ bạn bất cứ khi nào!
                    </p>
                    <p className="mb-4">
                      Hãy để chúng tôi giúp bạn chọn ra khóa học phù hợp nhất
                      với trình độ, lịch trình, và mong muốn cá nhân. Dù bạn là
                      người chưa từng xuống nước, đang muốn cải thiện kỹ năng
                      bơi lội, hay mong muốn con mình phát triển toàn diện với
                      bơi lội – chúng tôi đều có giải pháp hoàn hảo dành cho
                      bạn.
                    </p>
                    <Link
                      className="btn btn-outline-light py-3 px-5 mt-2 rounded-1"
                      href=""
                    >
                      Đọc Thêm
                    </Link>
                  </div>

                  {/* Right Section */}
                  <div className="col-md-6">
                    <h1 className="text-white mb-4">Điền Thông Tin Liên Hệ</h1>
                    <form>
                      <div className="row g-3">
                        {/* Tên */}
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control rounded-1 py-3"
                            placeholder="Tên Của Bạn"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.0)",
                              color: "#fff",
                              border: "1px solid rgba(255, 255, 255, 0.6)",
                            }}
                          />
                        </div>

                        {/* Email */}
                        <div className="col-md-6">
                          <input
                            type="email"
                            className="form-control rounded-1 py-3"
                            placeholder="Email Của Bạn"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.0)",
                              color: "#fff",
                              border: "1px solid rgba(255, 255, 255, 0.6)",
                            }}
                          />
                        </div>

                        {/* Số Điện Thoại */}
                        <div className="col-md-6">
                          <input
                            type="tel"
                            className="form-control rounded-1 py-3"
                            placeholder="Số Điện Thoại"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.0)",
                              color: "#fff",
                              border: "1px solid rgba(255, 255, 255, 0.6)",
                            }}
                          />
                        </div>

                        {/* Khóa học cần tư vấn */}
                        <div className="col-md-6">
                          <select
                            className="form-select rouded-1 py-3"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.0)", // Màu nền sáng cho select
                              border: "1px solid rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            <option value={1}>Khóa Cơ Bản</option>
                            <option value={2}>Khóa Nâng Cao</option>
                            <option value={3}>Khóa Gia Đình</option>
                          </select>
                        </div>

                        {/* Ghi Chú */}
                        <div className="col-12">
                          <textarea
                            className="form-control rounded-1"
                            placeholder="Ghi Chú"
                            style={{
                              height: 100,
                              backgroundColor: "rgba(255, 255, 255, 0.0)",
                              color: "#fff",
                              border: "1px solid rgba(255, 255, 255, 0.6)",
                            }}
                          />
                        </div>

                        {/* Nút Submit */}
                        <div className="col-12">
                          <button
                            className="btn btn-outline-light w-100 py-3 rounded-1"
                            type="submit"
                          >
                            Đăng Ký Ngay
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Booking End */}
          {/* Process Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="text-center pb-4 wow fadeInUp">
                <h6 className="section-title bg-white text-center text-primary px-3">
                  Xử Lý Đơn Hàng
                </h6>
                <h1 className="mb-5">3 Bước Đơn Giản</h1>
              </div>
              <div className="row gy-5 gx-4 justify-content-center align-items-stretch">
                {/* Box 1 */}
                <div className="col-lg-4 col-sm-6">
                  <div
                    className="h-100 border border-primary rounded shadow-sm text-center p-4 position-relative step-item"
                    style={{
                      backgroundColor: "#f9f9f9",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="bi bi-person-lines-fill fs-3"></i>
                    </div>
                    {/* Content */}
                    <h5 className="mt-5">Bước 1: Đăng ký và tư vấn miễn phí</h5>
                    <hr className="w-25 mx-auto bg-primary mb-1" />
                    <hr className="w-50 mx-auto bg-primary mt-0" />
                    <p className="mb-0">
                      Liên hệ với chúng tôi qua hotline, email, hoặc nhắn tin
                      trên mạng xã hội. Chia sẻ nhu cầu của bạn (trình độ hiện
                      tại, mục tiêu học bơi, lịch trình phù hợp). Đội ngũ tư vấn
                      chuyên nghiệp sẽ gợi ý khóa học phù hợp nhất và giải đáp
                      mọi thắc mắc của bạn.
                    </p>
                  </div>
                </div>

                {/* Box 2 */}
                <div className="col-lg-4 col-sm-6" data-wow-delay="0.3s">
                  <div
                    className="h-100 border border-primary rounded shadow-sm text-center p-4 position-relative step-item"
                    style={{
                      backgroundColor: "#f9f9f9",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="bi bi-credit-card-fill fs-3"></i>
                    </div>
                    {/* Content */}
                    <h5 className="mt-5">Bước 2: Xác nhận và thanh toán</h5>
                    <hr className="w-25 mx-auto bg-primary mb-1" />
                    <hr className="w-50 mx-auto bg-primary mt-0" />
                    <p className="mb-0">
                      Sau khi chọn được khóa học ưng ý, bạn sẽ nhận được thông
                      tin chi tiết về lịch học, huấn luyện viên, và mức phí.
                      Thanh toán đơn giản qua các hình thức: Chuyển khoản ngân
                      hàng. Thanh toán trực tiếp tại trung tâm. Thanh toán qua
                      ví điện tử (nếu có). Nhận hóa đơn và xác nhận đăng ký qua
                      email hoặc tin nhắn.
                    </p>
                  </div>
                </div>

                {/* Box 3 */}
                <div className="col-lg-4 col-sm-6" data-wow-delay="0.0s">
                  <div
                    className="h-100 border border-primary rounded shadow-sm text-center p-4 position-relative step-item"
                    style={{
                      backgroundColor: "#f9f9f9",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="bi bi-clipboard-check-fill fs-3"></i>
                    </div>
                    {/* Content */}
                    <h5 className="mt-5">Bước 3: Bắt đầu hành trình học bơi</h5>
                    <hr className="w-25 mx-auto bg-primary mb-1" />
                    <hr className="w-50 mx-auto bg-primary mt-0" />
                    <p className="mb-0">
                      Tham gia buổi học đầu tiên theo lịch đã chọn. Gặp gỡ huấn
                      luyện viên và làm quen với môi trường học an toàn, chuyên
                      nghiệp. Chúng tôi sẽ đồng hành cùng bạn trong suốt quá
                      trình học, đảm bảo bạn đạt được kết quả tốt nhất.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Process End */}
          {/* Team Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="text-center wow fadeInUp">
                <h6 className="section-title bg-white text-center text-primary px-3">
                  Huấn Luyện Viên
                </h6>
                <h1 className="mb-5">Đội Ngũ Huấn Luyện Viên</h1>
              </div>
              <div className="row g-4">
                {trainers.map((trainer) => (
                  <div
                    className="col-lg-3 col-md-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                    key={trainer.id}
                  >
                    <div className="team-item">
                      <div className="overflow-hidden">
                        <img
                          className="img-fluid object-fit-cover w-100"
                          style={{ height: "350px" }}
                          src={trainer.avatar}
                          alt={trainer.name}
                        />
                      </div>
                      <div
                        className="position-relative d-flex justify-content-center"
                        style={{ marginTop: "-19px" }}
                      >
                        <Link className="btn btn-square mx-1" href={"#"}>
                          <i className="fab fa-facebook-f" />
                        </Link>
                        <Link className="btn btn-square mx-1" href={"#"}>
                          <i className="fab fa-twitter" />
                        </Link>
                        <Link className="btn btn-square mx-1" href={"#"}>
                          <i className="fab fa-instagram" />
                        </Link>
                      </div>
                      <div className="text-center p-4">
                        <div className="flex-fill text-center mb-3">
                          {renderStars(trainer)} {/* Render sao */}
                        </div>
                        <h5 className="mb-0">{trainer.name}</h5>
                        <small>{trainer.title}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Modal
            show={modalVisible}
            onHide={handleReviewCancel}
            centered
            backdrop="static" // Backdrop là cố định, không đóng khi click vào backdrop
            size="md"
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Đánh Giá Huấn Luyện Viên
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>
                Sao đã chọn:{" "}
                {
                  trainers.find((trainer) => trainer.id === selectedTrainer)
                    ?.rating
                }{" "}
                sao
              </h6>
              <Form.Group controlId="reviewText">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Nhập nhận xét của bạn"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleReviewCancel}>
                Đóng
              </Button>
              <Button
                variant="primary"
                onClick={() => handleReviewSubmit(reviewText)}
              >
                Gửi Đánh Giá
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Team End */}
          {/* Review */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="text-center">
                <h6 className="section-title bg-white text-center text-primary px-3">
                  HightStarPool
                </h6>
                <h1 className="mb-5">Học viên đã nói gì về HightStarPool?</h1>
              </div>
              <Slider {...settings} className="testimonial-carousel">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="testimonial-item bg-white text-center  p-4"
                  >
                    <img
                      className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                      src={testimonial.image}
                      alt={testimonial.name}
                      style={{ width: 80, height: 80 }}
                    />
                    <h5 className="mb-0">{testimonial.name}</h5>
                    <p>{testimonial.location}</p>
                    <p className="mt-2 mb-0">{testimonial.message}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          {/* Review */}
        </div>
      )}
    </>
  );
}
