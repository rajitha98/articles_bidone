// src/app/rootSaga.ts
import { all } from "redux-saga/effects";
import { createArticleSaga, fetchArticleSaga } from "../data/articleSlice/saga";

export function* rootSaga() {
  yield all([fetchArticleSaga(),createArticleSaga()]);
}
