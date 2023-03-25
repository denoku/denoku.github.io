import React from "react";
import { Link, useNavigate } from "react-router-dom";
import usersService from "./services/usersService";
import toastr from "toastr";
import debug from 'sabio-debug';

const logger = debug.extend('Ingredients');

function SiteNav(props) {
  const navigate = useNavigate();

  const onLogoutClicked = () => {
    usersService.userLogout().then(userLogoutSuccess).catch(userLogoutError);
  }

  logger('props', props)

  const userLogoutSuccess = (response) => {
    console.log("userLogoutSuccess", response);
    toastr.success("Logout success");
    const logoutState = {
      type: "LOGGED_OUT", payload: {
        firstName: "",
        lastName: "",
        email: "",
        avatarUrl: "",
        isLoggedIn: false
      }
    }
    navigate("/", { state: logoutState })
  }

  const userLogoutError = (err) => {
    console.log("userLogoutError", err);
  }

  return (

    <React.Fragment>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container ">
          <a className="navbar-brand" href="/">

          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link px-2 text-white link-button">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/friends"}
                  className="nav-link px-2 text-white link-button">
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/jobs"}
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/techCompanies"}
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/events"}
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/us/pokedex"}
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Pokédex
                </Link>
              </li>
            </ul>
            <div className="text-end">

              {props.user.isLoggedIn && (<a
                href="/"
                className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none"
              >
                {props.user.firstName} {props.user.lastName}
                <img
                  src={`${props.user.avatarUrl}`}
                  padding="2"
                  width="35"
                  height="35"
                  className="d-inline-block align-top"
                  alt="userAvatar"
                />
              </a>)}
              {props.user.isLoggedIn && (<button
                onClick={onLogoutClicked}
                type="button" className="btn btn-outline-light me-2">
                Logout
              </button>)}
              {!props.user.isLoggedIn && (<Link
                to={"/login"}
                type="button" className="btn btn-outline-light me-2">
                Login
              </Link>)}
              <Link
                to={"/register"}
                type="button" className="btn btn-warning">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>

  )
}

export default SiteNav;