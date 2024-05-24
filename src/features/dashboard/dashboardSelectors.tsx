import { RootState } from "@/rootReducer";

export const selectHeroData = (state: RootState) => state.dashboard.hero.data;
export const selectHeroLoading = (state: RootState) =>
  state.dashboard.hero.loading;
export const selectHeroError = (state: RootState) => state.dashboard.hero.error;

export const selectRecentData = (state: RootState) =>
  state.dashboard.recent.data;
export const selectRecentLoading = (state: RootState) =>
  state.dashboard.recent.loading;
export const selectRecentError = (state: RootState) =>
  state.dashboard.recent.error;

export const selectHighlightsData = (state: RootState) =>
  state.dashboard.highlights.data;
export const selectHighlightsLoading = (state: RootState) =>
  state.dashboard.highlights.loading;
export const selectHighlightsError = (state: RootState) =>
  state.dashboard.highlights.error;

export const selectShowsData = (state: RootState) => state.dashboard.show.data;
export const selectShowsLoading = (state: RootState) =>
  state.dashboard.show.loading;
export const selectShowsError = (state: RootState) =>
  state.dashboard.show.error;
