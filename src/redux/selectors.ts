import { RootState } from './store';

export const controlledData = (state: RootState) => state.controlledForm.data;
export const controlledCountrySearch = (state: RootState) => state.controlledForm.search;
export const controlledFilteredCountries = (state: RootState) =>
  state.controlledForm.filteredCountries;
export const controlledIsSuggestions = (state: RootState) =>
  state.controlledForm.isSuggestionsVisible;
export const controlledBase64 = (state: RootState) => state.controlledForm.base64;

export const uncontrolledData = (state: RootState) => state.uncontrolledForm.data;
export const uncontrolledCountrySearch = (state: RootState) => state.uncontrolledForm.search;
export const uncontrolledFilteredCountries = (state: RootState) =>
  state.uncontrolledForm.filteredCountries;
export const uncontrolledIsSuggestions = (state: RootState) =>
  state.uncontrolledForm.isSuggestionsVisible;
export const uncontrolledBase64 = (state: RootState) => state.uncontrolledForm.base64;
export const uncontrolledErrors = (state: RootState) => state.uncontrolledForm.errors;

export const isNotificationActive = (state: RootState) => state.notitication.isActive;
