import React, { useState, useEffect } from "react";
import "../../assets/css/profilePage.css";
import { userApi } from "../../service/user/userApi";
import OrderHistory from "../Profile/OrderHistory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setOrderHistory } from "../../redux/reducers/orderHistorySlice";
import { useDispatch } from "react-redux";
import Favourite from "./Favourite";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [imageAvatar, setImageAvatar] = useState(
    "https://via.placeholder.com/150"
  );

  const {
    isLoading,
    data: profileData,
    error,
  } = useQuery({
    queryKey: ["getProfileApi"],
    queryFn: userApi.postGetProfile,
    staleTime: 5 * 60 * 1000,
    cacheTime: 12 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationFn: userApi.postUpdateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getProfileApi"]);
    },
    onError: (error) => {},
  });

  useEffect(() => {
    if (profileData) {
      formik.setValues(profileData);
      setImageAvatar(profileData.avatar);
      dispatch(setOrderHistory(profileData.ordersHistory));
    }
  }, [profileData, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      gender: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      gender: Yup.boolean().required("Required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="row">
        <div className="col-md-3 text-center">
          <img
            src={imageAvatar}
            alt="Profile"
            className="img-fluid rounded-circle mb-3"
          />
        </div>
        <div className="col-md-9">
          <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  id="phone"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-danger">{formik.errors.phone}</div>
                )}
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  {" "}
                  <input
                    type={showPassword ? "text" : "password"}
                    style={{ marginTop: "0" }}
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    {...formik.getFieldProps("password")}
                  />
                  <div
                    className="input-group-text"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer", width: "12%" }}
                  >
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger">{formik.errors.password}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 d-flex align-items-center">
                <span>Gender: </span>
                <div className="form-check form-check-inline ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value={true}
                    id="gender-male"
                    checked={formik.values.gender === true}
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value={false}
                    id="gender-female"
                    checked={formik.values.gender === false}
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label">Female</label>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-danger">{formik.errors.gender}</div>
                )}
              </div>
              <div className="col-md-6 text-end">
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="tabs mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              href="#order-history"
              data-bs-toggle="tab"
            >
              Order History
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#favourite" data-bs-toggle="tab">
              Favourite
            </a>
          </li>
        </ul>
        <div className="tab-content mt-4">
          <div className="tab-pane fade show active" id="order-history">
            <OrderHistory />
          </div>
          <div className="tab-pane fade" id="favourite">
            <Favourite />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
