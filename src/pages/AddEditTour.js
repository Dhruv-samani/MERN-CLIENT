/* eslint-disable react-hooks/exhaustive-deps */
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
  category: '',
};

const categoryOptions = ['City', 'Beach', 'Mountain', 'Forest', 'Historic'];


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
      console.log(singleTour);
      setTourData({ ...singleTour });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg('Please select a category');
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
      // handleClear();
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

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
        {id ? <MDBBtn
          tag="a"
          color="none"
          style={{ float: "left", color: "#000", marginTop: "5px" }}
          onClick={() => navigate("/deshboard")}
        >
          <MDBIcon
            fas
            size="lg"
            icon="long-arrow-alt-left"
            style={{ float: "left" }}
          />
        </MDBBtn> : 
        <MDBBtn
        tag="a"
        color="none"
        style={{ float: "left", color: "#000", marginTop: "5px" }}
        onClick={() => navigate("/")}
      >
        <MDBIcon
          fas
          size="lg"
          icon="long-arrow-alt-left"
          style={{ float: "left" }}
        />
      </MDBBtn>
      }
        <h5>{id ? "Update Tour" : "Add Tour"}</h5>
        <hr style={{ maxWidth: "600px" }} />
      <MDBCard alignment="center">
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>

            <div>
            <MDBValidationItem feedback='Please provide title.' invalid className="col-md-12">
              <MDBInput
                label="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
              />
            </MDBValidationItem>
            </div>

            <div>
            <MDBValidationItem feedback='Please provide description.' invalid className="col-md-12">
              <MDBTextArea
                label="Enter Description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                rows={4}
              />
            </MDBValidationItem>
            </div>

            <div className="col-md-12">
              <select
                className={`category-dropdown  ${
                  categoryErrMsg ? 'form-input-error' : ''
                }`}
                onChange={handleCategoryChange}
                value={category}
              >
                <option>Please select category</option>
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {categoryErrMsg && (
                <div className="categoryErrMsg">{categoryErrMsg}</div>
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
              />
              {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
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
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
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
