import { createSlice } from '@reduxjs/toolkit';
import { countryList } from '../../utils/validation';

const initialState = {
  data: {},
  search: '',
  filteredCountries: countryList,
  isSuggestionsVisible: false,
  image: '',
  base64: '',
  errors: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    file: '',
    country: '',
    terms: '',
  },
};

export const uncontrolledFormSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    filterCountries(state, action) {
      state.filteredCountries = countryList.filter((item) =>
        item.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSuggestions(state, action) {
      state.isSuggestionsVisible = action.payload;
    },
    setBase64(state, action) {
      state.base64 = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export default uncontrolledFormSlice.reducer;
