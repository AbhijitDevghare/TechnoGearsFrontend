import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import NewArrivals from "../../components/cards/newarrival/NewArrival";

const initialState = {
  products: [],
  NewArrivalsProducts:[],
  popularProducts:[],
  categories: [],
  productsWithId: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  lowStockProducts:[],
  loading: false,
  error: null,
};

// Add Product
export const AddProducts = createAsyncThunk(
  "product/add",
  async (data) => {
    try {
      console.log("DATA : ",data)
      const res =  axiosInstance.post("/product/add", data);
      toast.promise(res, {
        loading: "Wait! creating the product",
        success: (data) => {
            console.log("RETURN DATA : ",data)
            return data?.data?.message;  
        }
      
      });
    console.log(res)
    return (await res).data;
  } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);


export const updateProductDetails = createAsyncThunk(
  "product/update",
  async ({ formData, productId }, { rejectWithValue }) => {
    try {
      console.log("Updating product ID:", formData.get("name"));
      const res =  axiosInstance.post(`/product/updateProduct/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res)
      toast.promise(res, {
        loading: "Updating product...",
        success: (data) => data?.data?.message || "Product updated successfully!",
        error: (err) => err?.response?.data?.message || "Error updating product",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);



export const getProducts = createAsyncThunk(
  "product/",
  async ({filter,pageNumber}) => {
    console.log("PRODUCTS DISPAACH CALL")
    try {
      const res =   axiosInstance.get(`/product`, {
        params: {
          pageNumber,
          filter: JSON.stringify(filter), // Ensure filter is sent as a string
        },
      });


    return (await res).data;
  } catch (error) {
      toast.error(error?.response?.data?.message);
    } 
  }
);

export const getPopularProducts = createAsyncThunk(
  "product/getPopularProducts",
  async ({ filter, pageNumber }, { rejectWithValue }) => {
    try {
      console.log("POPULAR PRODUCTS DISPATCH CALL", filter)

      const res = await axiosInstance.get("/product", {
        params: {
          pageNumber,
          filter: JSON.stringify(filter), 
        },
      })
      console.log("POPULAR PRODUCTS DISPATCH CALL response: ",res)
      return res.data
    } catch (error) {
      toast.error(error?.response?.data?.message)
      return rejectWithValue(error?.response?.data)
    }
  }
)




// Thunk for searching products
export const searchProducts = createAsyncThunk(
  'products/search',
  async ({ regex, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/product/search', {
        params: {
          q: regex,
          page,
          limit,
          sortBy,
          sortOrder,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);




  // Update Product
  export const updateProductStock = createAsyncThunk(
    'product/updateProduct',
    async ({ productId, newStock }, thunkAPI) => {
      try {
        const response =  axiosInstance.put(`/product/update/${productId}`, {
          quantity :newStock
        });
        toast.success("Product updated successfully!");
        return response.data;
      } catch (error) {
        toast.error("Failed to update product");
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// Get Product by ID
export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (productId, thunkAPI) => {
    try {
      const response =  axiosInstance.get(`/product/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ productIds }, { rejectWithValue }) => {
    try {
      const res =  axiosInstance.delete("/product/delete", {
        data: { productIds },
      });
      toast.success("Product deleted successfully!");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete product");
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchLowStockProducts = createAsyncThunk(
  "products/fetchLowStock",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/product/low-stock");
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const fetchCategories = createAsyncThunk("products/categories",async()=>{
//   try {
//       const res = await axiosInstance.get("/product/categories");
//       console.log("LOW STOCK PRODUCTS : ",res)
//       return res.data.products;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
// })



const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action?.payload;
        console.log(action)
      })
      .addCase(getPopularProducts.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.popularProducts=action?.payload;
      })
      .addCase(fetchLowStockProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLowStockProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.lowStockProducts = action.payload;
      })
      .addCase(fetchLowStockProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
      
  },
});

export default productSlice.reducer;
