import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API CALL
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredData: [],
    loading: false,
  },
  reducers: {
    searchProduct: (state, action) => {
      state.filteredData = state.products.filter(item =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    filterCategory: (state, action) => {
      if (action.payload === "all") {
        state.filteredData = state.products;
      } else {
        state.filteredData = state.products.filter(item =>
          item.category.toLowerCase().includes(action.payload)
        );
      }
    },

    setSelectedProduct: (state, action) => {
  state.selectedProduct = action.payload;
},

clearSelectedProduct: (state) => {
  state.selectedProduct = null;
},
  },

  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredData = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  searchProduct,
  filterCategory,
  setSelectedProduct,
  clearSelectedProduct
} = productSlice.actions;
export default productSlice.reducer;