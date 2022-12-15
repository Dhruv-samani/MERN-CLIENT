import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api";


export const login = createAsyncThunk("auth/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.signIn(formValue);
    toast.success("Login Successfully");
    navigate("/");
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});


export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success("Google Sign-in Successfully");
      console.log('...');
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loding: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state, action) => {
      console.log('...', setLogout);
      localStorage.clear();
      state.user = null;
    }
  },
  setProfile(state, action) {
    state.user.result = action.payload;
    let localStorageResult = JSON.parse(localStorage.getItem('profile'));
    localStorageResult.result = action.payload;
    localStorage.setItem('profile', JSON.stringify(localStorageResult));
  },

  removeUser(state) {
    localStorage.removeItem('profile');
    state.user = null;
  },

  clearError(state) {
    state.error = '';
  },


  extraReducers: {
    [login.pending]: (state, action) => {
      state.loding = true
    },
    [login.fulfilled]: (state, action) => {
      state.loding = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loding = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout, setProfile } = authSlice.actions;


export default authSlice.reducer;
