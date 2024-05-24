import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchHeroData,
  fetchHighlightsData,
  fetchRecentData,
  fetchShowsData,
} from "./dashboardAPI";
import {
  HeroContent,
  HeroState,
  HighlightContent,
  HighlightState,
  RecentContent,
  RecentState,
  ShowContent,
  ShowState,
} from "@/shared/interfaces/interfaces";

const defaultState = {
  data: [],
  loading: false,
  error: null,
};

const initialState = {
  hero: { ...defaultState } as HeroState,
  recent: { ...defaultState } as RecentState,
  highlights: { ...defaultState } as HighlightState,
  show: { ...defaultState } as ShowState,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroData.pending, (state) => {
        state.hero.loading = true;
      })
      .addCase(
        fetchHeroData.fulfilled,
        (state, action: PayloadAction<HeroContent[]>) => {
          state.hero.data = action.payload;
          state.hero.loading = false;
        }
      )
      .addCase(fetchHeroData.rejected, (state, action) => {
        state.hero.error = action.payload as string;
        state.hero.loading = false;
      })

      .addCase(fetchRecentData.pending, (state) => {
        state.recent.loading = true;
      })
      .addCase(
        fetchRecentData.fulfilled,
        (state, action: PayloadAction<RecentContent[]>) => {
          state.recent.data = action.payload;
          state.recent.loading = false;
        }
      )
      .addCase(fetchRecentData.rejected, (state, action) => {
        state.recent.error = action.payload as string;
        state.recent.loading = false;
      })

      .addCase(fetchHighlightsData.pending, (state) => {
        state.highlights.loading = true;
      })
      .addCase(
        fetchHighlightsData.fulfilled,
        (state, action: PayloadAction<HighlightContent[]>) => {
          state.highlights.data = action.payload;
          state.highlights.loading = false;
        }
      )
      .addCase(fetchHighlightsData.rejected, (state, action) => {
        state.highlights.error = action.payload as string;
        state.highlights.loading = false;
      })

      .addCase(fetchShowsData.pending, (state) => {
        state.show.loading = true;
      })
      .addCase(
        fetchShowsData.fulfilled,
        (state, action: PayloadAction<ShowContent[]>) => {
          state.show.data = action.payload;
          state.show.loading = false;
        }
      )
      .addCase(fetchShowsData.rejected, (state, action) => {
        state.show.error = action.payload as string;
        state.show.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
