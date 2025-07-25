import { createSlice } from "@reduxjs/toolkit";
import { Article } from "./interface";

export interface ArticleState {
  isFetching: boolean;
  articleUpdated: boolean;
  error?: string;
  articles: Article[];
  newArticleCount: number;
  deleted: boolean;
}

const initialState: ArticleState = {
  isFetching: false,
  articleUpdated: false,
  newArticleCount: 0,
  articles: [],
  error: "",
  deleted: false,
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
      state.articles = actions.payload.articles;
      state.newArticleCount = actions.payload.newArticleCount;
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
    deleteSuccess: (state) => {
      state.isFetching = false;
      state.deleted = true;
    },
    updateArticleStart: (state, actions) => {
      state.isFetching = true;
    },
    actionFailed: (state, actions) => {
      state.isFetching = false;
      state.error = actions.payload;
    },
    reset: (state) => {
      state.isFetching = false;
      state.articleUpdated = false;
      state.deleted = false;
    },
  },
});

export const { actions: ArticleAction, reducer: ArticleReducer } = ArticleSlice;
