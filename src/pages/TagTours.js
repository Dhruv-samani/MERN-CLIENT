/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getToursByTag } from "../redux/features/tourSlice";
import { excerpt } from "../utility";

const TagTours = () => {
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
  }, [tag]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000", marginTop: '10px' }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
      <h3 className="text-center">Tours with tag :-) {tag}</h3>
      <hr style={{ maxWidth: "600px" }} />
      {tagTours &&
        tagTours.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                <Link to={`/tour/${item._id}`}>
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                  </Link>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      {excerpt(item.description, 40)}
                    </MDBCardText>
                    <div style={{ float: "left", marginTop: "-10px" }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => navigate(`/tour/${item._id}`)}
                      >
                        Read More
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default TagTours;