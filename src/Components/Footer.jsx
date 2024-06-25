import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ background: "gray" }}
      className="text-white text-center text-lg-start py-4"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase">GET HELP</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Nike
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Adidas
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase">SUPPORT</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Phone
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <h5 className="text-uppercase">REGISTER</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Register
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center py-3">
          <p className="mb-0">© 2024 Shoes Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
