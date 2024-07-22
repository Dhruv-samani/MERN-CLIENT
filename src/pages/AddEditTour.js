import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBTextArea,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
  category: "",
};

const categoryOptions = ["City", "Beach", "Mountain", "Forest", "Historic"];

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const { error, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags, category } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select a category");
    }
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setTourData({ ...tourData, category: e.target.value });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [], category: "" });
  };

  // Animation styles
  const fadeInUpAnimation = {
    animation: "fadeInUp 0.5s ease-out",
  };

  const buttonHoverStyle = {
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
        ...fadeInUpAnimation,
      }}
      className="container"
    >
      <MDBBtn
        tag="a"
        color="none"
        style={{
          float: "left",
          color: "#000",
          marginTop: "5px",
          ...buttonHoverStyle,
        }}
        onClick={() => navigate(id ? "/dashboard" : "/")}
      >
        <MDBIcon
          fas
          size="lg"
          icon="long-arrow-alt-left"
          style={{ float: "left" }}
        />
      </MDBBtn>
      <h5>{id ? "Update Tour" : "Add Tour"}</h5>
      <hr style={{ maxWidth: "600px" }} />
      <MDBCard alignment="center" className="mb-5">
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <MDBValidationItem
              feedback="Please provide title."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                style={{ transition: "all 0.3s ease" }}
              />
            </MDBValidationItem>

            <MDBValidationItem
              feedback="Please provide description."
              invalid
              className="col-md-12"
            >
              <MDBTextArea
                label="Enter Description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                rows={4}
                style={{ transition: "all 0.3s ease" }}
              />
            </MDBValidationItem>

            <div className="col-md-12">
              <select
                className={`form-select ${
                  categoryErrMsg ? "is-invalid" : ""
                }`}
                onChange={handleCategoryChange}
                value={category}
                style={{ transition: "all 0.3s ease" }}
              >
                <option value="">Please select category</option>
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {categoryErrMsg && (
                <div className="invalid-feedback">{categoryErrMsg}</div>
              )}
            </div>

            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
                style={{ transition: "all 0.3s ease" }}
              />
              {tagErrMsg && (
                <div className="text-danger mt-1">{tagErrMsg}</div>
              )}
            </div>

            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>

            <div className="col-12">
              <MDBBtn
                style={{
                  width: "100%",
                  ...buttonHoverStyle,
                }}
                className="mt-2"
              >
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{
                  width: "100%",
                  ...buttonHoverStyle,
                }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;