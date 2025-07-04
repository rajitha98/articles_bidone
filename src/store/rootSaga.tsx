// src/app/rootSaga.ts
import { all } from "redux-saga/effects";
import {
  createArticleSaga,
  deleteArticleSaga,
  fetchArticleSaga,
  updateArticleSaga,
} from "../data/articleSlice/saga";

export function* rootSaga() {
  yield all([
    fetchArticleSaga(),
    createArticleSaga(),
    updateArticleSaga(),
    deleteArticleSaga(),
  ]);
}
