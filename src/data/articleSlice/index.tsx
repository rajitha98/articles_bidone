import { createSlice } from "@reduxjs/toolkit";
import { Article } from "./interface";

export interface ArticleState {
  isFetching: boolean;
  articleUpdated: boolean;
  error?: string;
  articles: Article[];
  newArticleCount: number;
}

const initialState: ArticleState = {
  isFetching: false,
  articleUpdated: false,
  newArticleCount: 0,
  articles: [],
  error: "",
};

export const ArticleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    createArticle: (state, actions) => {
      state.isFetching = false;
    },
    fetchArticleStart: (state, actions) => {
      state.isFetching = true;
    },
    fetchSuccess: (state, actions) => {
      state.isFetching = false;
      state.articles = [...state.articles, ...actions.payload];
      state.newArticleCount = actions.payload.length;
    },
    createArticleSuccess: (state, actions) => {
      state.isFetching = false;
      state.articles = [...state.articles, actions.payload];
    },
    updateSuccess: (state, actions) => {
      state.isFetching = false;
      state.articleUpdated = true;
      state.articles = actions.payload;
    },
    deleteArticleStart: (state, actions) => {
      state.isFetching = true;
    },
    updateArticleStart: (state, actions) => {
      state.isFetching = true;
    },
    actionFailed: (state, actions) => {
      state.isFetching = false;
      state.error = actions.payload;
    },
  },
});

export const { actions: ArticleAction, reducer: ArticleReducer } = ArticleSlice;
