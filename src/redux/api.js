import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

// const API = axios.create({
//   baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
// });

const API = axios.create({
  baseURL: "https://2aa8-2401-4900-8898-6503-6dad-d5fd-b2fd-eb3.ngrok-free.app",
});

// const API = axios.create({ baseURL: "http://localhost:4000" })

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return req;
// });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  req.headers["ngrok-skip-browser-warning"] = "69420";
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createTour = (tourData) => API.post("/tour", tourData);
export const getTours = (page) => API.get(`/tour?page=${page}`);
export const getTour = (id) => API.get(`/tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData, id) =>
  API.patch(`/tour/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);

export const getToursBySearch = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);

export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);
export const likeTour = (id) => API.patch(`/tour/like/${id}`);

export const loadMoreTours = ({ skip, limit }) =>
  API.get(`/tours/load-more?skip=${skip}&limit=${limit}`);
export const getAllTags = () => API.get("/tours/tags");

export const getProfile = ({ _id }) => API.get(`/profiles/${_id}`);
export const updateProfile = ({ _id, data }) =>
  API.put(`/profiles/${_id}`, data);
export const uploadImage = (imageData) =>
  API.post("/uploads/images", imageData);
