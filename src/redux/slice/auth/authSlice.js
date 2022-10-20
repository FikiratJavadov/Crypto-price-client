import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const token = localStorage.getItem("token");
const layout = localStorage.getItem("layout");

const initialState = {
  user: null,
  token: token ? token : "",
  isLoading: false,
  status: null,
  layouts: {
    lg: [],
    md: [],
    sm: [],
    xs: [],
  },
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password, navigate }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        navigate("/");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, navigate }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        navigate("/");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const profile = createAsyncThunk("auth/loginUser", async () => {
  try {
    const { data } = await axios.get("/auth/profile");

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addCoins = createAsyncThunk(
  "auth/add-coins",
  async ({ symbol, type }) => {
    try {
      const { data } = await axios.post("/auth/profile/coin", {
        symbol,
        type,
      });

      

      return data.data.coins;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCoins = createAsyncThunk("auth/remove-coins", async (id) => {
  
  try {
    const { data } = await axios.delete(`/auth/profile/coin/${id}`);

    

    return data.data.coins;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
      state.coins = [];
    },

    changeLayout: (state, { payload }) => {
      state.layouts.lg = payload;
    },
  },
  extraReducers: {
    // Register user
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.newUser;
      state.token = action.payload.token;
    },
    [registerUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Login user
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Auth check
    [profile.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [profile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [profile.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },

    [addCoins.fulfilled]: (state, action) => {
      state.user.coins = action.payload;
    },
    [removeCoins.fulfilled]: (state, action) => {
      state.user.coins = action.payload;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout, changeLayout } = authSlice.actions;
export default authSlice.reducer;
