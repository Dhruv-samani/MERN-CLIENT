import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import { Link, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand>
          <Link to="/" style={{ color: "#606080", fontWeight: "600", fontSize: "22px", marginLeft: "50px" }}>Touropedia</Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5 className="mb-0" style={{ marginRight: '8px' }}>
                Logged in as :- {user?.result?.name}
              </h5>
            )}
            <MDBNavbarLink>
              <Link to="/">
                <p className="header-text mb-0">Home</p>
              </Link>
            </MDBNavbarLink>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <Link to="/addTour">
                      <p className="header-text mb-0">Add Tour</p>
                    </Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <Link to="/deshboard">
                      <p className="header-text mb-0">Dashboard</p>
                    </Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Link to="/login">
                    <p className="header-text mb-0" onClick={() => handleLogout()}>
                      Logout
                    </p>
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Link to="/login">
                    <p className="header-text mb-0">Login</p>
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
      <div style={{ paddingRight: "15px" }}>

        <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Tour"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{ marginTop: "5px", marginLeft: "5px" }}>
            <MDBIcon fas icon="search" />
          </div>
        </form>
      </div>
    </MDBNavbar>
  );
};


export default Header;
