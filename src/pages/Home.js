/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage, getAllTags } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import PopularTags from '../components/PopularTags';
import Categories from '../components/Categories';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { tours, loading, currentPage, numberOfPages, totalToursData, totalTags } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );


  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const counts = totalToursData.reduce((prevValue, currentValue) => {
    let name = currentValue.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }

    prevValue[name]++;
    delete prevValue['undefined'];
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });

  const checkScreenSize = () => {
    if (window.innerWidth < 950) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);


  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "20px",
        maxWidth: "1280px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}

        {tours.length === 0 && location.pathname !== "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            We couldn't find any matches for "{searchQuery}"
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours &&
                tours.map((item) => <CardTour key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>

      {isSmallScreen ? (
          <div className="mt-4">
            <PopularTags totalTags={totalTags} />
            <Categories categoryCount={categoryCount} />
            <MDBBtn
              className="mt-3"
              style={{ width: '100%' }}
              onClick={() => navigate('/tours')}
            >
              View all Tours
            </MDBBtn>
          </div>
        ) : (
          <MDBCol size="3" className="mt-4">
            <PopularTags totalTags={totalTags} />
            <Categories categoryCount={categoryCount} />
            <MDBBtn
              className="mt-3"
              style={{ width: '100%' }}
              onClick={() => navigate('/tours')}
            >
              View all Tours
            </MDBBtn>
          </MDBCol>
        )}


      {tours.length > 0 && !searchQuery && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Home;
