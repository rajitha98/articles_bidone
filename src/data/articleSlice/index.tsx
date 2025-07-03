import { createSlice } from "@reduxjs/toolkit";
import { Article } from "./interface";

export interface ArticleState {
  isFetching: boolean;
  error?: string;
  articles: Article[];
}

const initialState: ArticleState = {
  isFetching: false,
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
    fetchArticleSuccess: (state, actions) => {
      state.isFetching = false;
      state.articles = actions.payload;
    },
    createArticleSuccess: (state, actions) => {
      state.isFetching = false;
      state.articles = [...state.articles, actions.payload];
    },
    fetchArticleFail: (state, actions) => {
      state.isFetching = false;
    },
    deleteArticle: (state, actions) => {
      state.isFetching = true;
    },
    updateArticle: (state, actions) => {
      state.isFetching = true;
    },
  },
});

export const { actions: ArticleAction, reducer: ArticleReducer } = ArticleSlice;
