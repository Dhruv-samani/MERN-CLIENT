import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";
import { motion } from "framer-motion";

const CardTour = ({
  imageFile,
  description,
  category,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;
  const dispatch = useDispatch();

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };

  return (
    <MDBCardGroup>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <MDBCard className="h-100 mt-2 d-sm-flex shadow-lg" style={{ width: "20rem", borderRadius: "15px", overflow: "hidden" }}>
          <div className="position-relative">
            <Link to={`/tour/${_id}`}>
              <MDBCardImage
                src={imageFile}
                alt={title}
                position="top"
                style={{ maxWidth: "100%", height: "200px", objectFit: "cover" }}
              />
            </Link>
            <div className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-white rounded-pill">
              <small className="fw-bold">{name}</small>
            </div>
            <div className="position-absolute top-0 end-0 m-2 px-2 py-1 bg-info text-white rounded-pill">
              <small>{category}</small>
            </div>
          </div>
          <MDBCardBody className="d-flex flex-column">
            <MDBCardTitle className="fw-bold mb-2">{title}</MDBCardTitle>
            <MDBCardText className="text-muted mb-3">
              {excerpt(description)}
              <Link to={`/tour/${_id}`} className="text-info"> Read More</Link>
            </MDBCardText>
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {tags.map((tag, index) => (
                    <Link key={index} to={`/tours/tag/${tag}`} className="text-decoration-none">
                      <span className="badge bg-light text-dark me-1">#{tag}</span>
                    </Link>
                  ))}
                </div>
                <MDBBtn
                  color="none"
                  className="m-0 p-1"
                  onClick={!user?.result ? null : handleLike}
                >
                  {!user?.result ? (
                    <MDBTooltip title="Please login to like tour" tag="a">
                      <Link to="/login"><Likes /></Link>
                    </MDBTooltip>
                  ) : (
                    <Likes />
                  )}
                </MDBBtn>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </motion.div>
    </MDBCardGroup>
  );
};

export default CardTour;