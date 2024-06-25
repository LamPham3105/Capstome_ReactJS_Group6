import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gray">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={`nav-link text-dark ${
                  activeItem === "Home" ? "active fw-bold" : ""
                }`}
                href="/"
                onClick={() => handleItemClick("Home")}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link text-dark ${
                  activeItem === "Men" ? "active fw-bold" : ""
                }`}
                href="#"
                onClick={() => handleItemClick("Men")}
              >
                Men
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link text-dark ${
                  activeItem === "Women" ? "active fw-bold" : ""
                }`}
                href="#"
                onClick={() => handleItemClick("Women")}
              >
                Women
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link text-dark ${
                  activeItem === "Kids" ? "active fw-bold" : ""
                }`}
                href="#"
                onClick={() => handleItemClick("Kids")}
              >
                Kids
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link text-dark ${
                  activeItem === "Sport" ? "active fw-bold" : ""
                }`}
                href="#"
                onClick={() => handleItemClick("Sport")}
              >
                Sport
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
