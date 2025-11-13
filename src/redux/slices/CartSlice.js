import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  cart: { items: [] },
  loading: false,
  error: null,
};

// Get Cart
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const res = await axiosInstance.get("cart/");
  return res.data;
});

// Add to Cart
export const addCart = createAsyncThunk("cart/addCart", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("cart/add", data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Remove from Cart
export const removeCart = createAsyncThunk("cart/removeCart", async (itemId, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`cart/remove/${itemId}`);
    return res.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update Cart
export const updateCart = createAsyncThunk("cart/updateCart", async ({ itemId, data }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`cart/update/${itemId}`, data);
    return res.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeInCartItem: (state, action) => {
      const { productId, newQty } = action.payload;
      const existingItem = state.cart.items.find(item => item.product._id === productId);

      if (existingItem) {
        existingItem.quantity = newQty;
        existingItem.totalPrice = existingItem.product.price * newQty;
      }
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;

        if (!state.cart.items) state.cart.items = [];

        const existingItem = state.cart.items.find(
          (item) => item.product._id === newItem.product._id
        );

        if (existingItem) {
          existingItem.quantity = newItem.quantity;
          existingItem.totalPrice = newItem.totalPrice;
        } else {
          state.cart.items.push(newItem);
        }
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeInCartItem, setCart } = cartSlice.actions;

export const selectCartTotal = createSelector(
  (state) => state.cart.cart.items || [],
  (items) =>
    items.reduce((total, item) => {
      const discount =
        item.product.discount?.percentage > 0
          ? item.product.price * (1 - item.product.discount.percentage / 100)
          : item.product.price;
      return total + discount * item.quantity;
    }, 0)
);

export default cartSlice.reducer;
