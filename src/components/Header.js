import React, { useState, useEffect } from "react";
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
import { DEFAULT_IMAGE } from '../constants';
import { getProfile } from '../redux/features/profileSlice';



const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userDetail } = useSelector((state) => state.profile);
  // eslint-disable-next-line no-unused-vars
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;
  const _userId = user?.result?._id;



  useEffect(() => {
    if (_userId) dispatch(getProfile({ _id: _userId }));
  }, [_userId, dispatch]);


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
          <Link to="/" style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}>Touropedia</Link>
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
            {/* {user?.result?._id && (
              <h5 className="mb-0" style={{ color: "CaptionText" }}>
                Logged in as :- {user?.result?.name}
              </h5>
            )} */}
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
            <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Tour Here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon="search"
              />
              <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                <MDBIcon fas icon="search" />
              </div>
            </form>
            <br />

            {_userId && (
              <>
                <div
                  style={{
                    display: isOpenSideMenu ? 'inline-block' : 'block',
                    margin: isOpenSideMenu ? '15px 0 5px 0' : '',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/profile/${userDetail?._id}`)}
                >
                  <img
                    src={userDetail?.imageFile || DEFAULT_IMAGE}
                    alt={userDetail?.name}
                    style={{
                      width: '30px ',
                      height: '30px',
                      borderRadius: '50%',
                    }}
                  />
                  {/* <h5 style={{ color: "CaptionText" }}> */}
                  {user?.result?.name}
                  {/* </h5> */}
                </div>
              </>
            )}


          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
      {/* <div style={{ paddingRight: "15px" }}>
      </div> */}
    </MDBNavbar>
  );
};

export default Header;
