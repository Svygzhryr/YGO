import { createSlice } from '@reduxjs/toolkit';
import { countryList } from '../../utils/validation';

const initialState = {
  data: {},
  search: '',
  filteredCountries: countryList,
  isSuggestionsVisible: false,
  image: '',
  base64: '',
};

export const controlledFormSlice = createSlice({
  name: 'controlledForm',
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
  },
});

export default controlledFormSlice.reducer;
