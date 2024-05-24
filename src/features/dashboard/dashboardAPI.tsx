import { baseUrl } from "@/shared/constants/constants";
import {
  HeroContent,
  HighlightContent,
  RecentContent,
  ShowContent,
} from "@/shared/interfaces/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHeroData = createAsyncThunk<HeroContent[]>(
  "hero/fetchData",
  async () => {
    const response = await fetch(`${baseUrl}/gethero`);
    const allContent: any[] = await response.json();

    return allContent.map((item) => ({
      heroImageURL: item.imageUrl,
      heroVideoURL: item.videoUrl,
      heroContentTitle: item.contentTitle,
      contentTitle: item.contentTitle,
      category: item.category,
      subCategory: item.subCategory,
      videoUrl: item.videoUrl,
      imageUrl: item.imageUrl,
    }));
  }
);

export const fetchRecentData = createAsyncThunk<RecentContent[]>(
  "recent/fetchData",
  async () => {
    const response = await fetch(`${baseUrl}/getrecentupload`);
    const allContent: any[] = await response.json();

    return allContent.map((item) => ({
      recentImageURL: item.imageUrl,
      recentVideoURL: item.videoUrl,
      recentContentTitle: item.contentTitle,
    }));
  }
);

export const fetchHighlightsData = createAsyncThunk<HighlightContent[]>(
  "highlights/fetchData",
  async () => {
    const response = await fetch(`${baseUrl}/gethighlights`);
    const allContent: any[] = await response.json();

    return allContent.map((item) => ({
      highlightImageURL: item.imageUrl,
      highlightVideoURL: item.videoUrl,
      highlightContentTitle: item.contentTitle,
    }));
  }
);

export const fetchShowsData = createAsyncThunk<ShowContent[]>(
  "shows/fetchData",
  async () => {
    const response = await fetch(`${baseUrl}/getshows`);
    const allContent: any[] = await response.json();

    return allContent.map((item) => ({
      showImageURL: item.imageUrl,
      showVideoURL: item.videoUrl,
      showContentTitle: item.contentTitle,
    }));
  }
);
