import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

// Initial state
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

// Async thunk to place an order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // console.log("ORDER DATA : ",orderData)
      const res = await axiosInstance.post("/payment/create-order", orderData);
      toast.success("Order placed successfully!");
      console.log(res)
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Async thunk to get user orders
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/user");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Async thunk to get an order by ID
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/orders/${orderId}`);
      console.log(res.data)
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Async thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/orders/${orderId}`, { status });
      toast.success("Order status updated successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Async thunk to cancel an order
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/orders/cancel/${orderId}`, { status: "Cancelled" });
      toast.success("Order cancelled successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        console.log(action.payload.orders)
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
