import { call, put, takeLatest } from "redux-saga/effects";
import { createArticleApi, fetchArticleApi } from "./api";

import { SagaIterator } from "redux-saga";
import { ArticleAction } from ".";

function* fetchArticle(): SagaIterator {
  try {
    const { articles } = yield call(fetchArticleApi);
    yield put(ArticleAction.fetchArticleSuccess(articles));
  } catch (e: any) {
    console.log("error message:", e.response?.data);
  }
}

function* fetchArticleSaga() {
  yield takeLatest(ArticleAction.fetchArticleStart.type, fetchArticle);
}

function* createArticle(action: any): SagaIterator {
  try {
    const {article} = yield call(createArticleApi, action.payload);

    yield put(ArticleAction.createArticleSuccess(article));
  } catch (e: any) {
    console.log("error message:", e.response?.data);
  }
}

function* createArticleSaga() {
  yield takeLatest(ArticleAction.createArticle.type, createArticle);
}

export { fetchArticleSaga, createArticleSaga };
