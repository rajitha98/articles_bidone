import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  createArticleApi,
  deleteArticleApi,
  fetchArticleApi,
  updateArticleApi,
} from "./api";

import { SagaIterator } from "redux-saga";
import { ArticleAction } from ".";
import { State } from "../../store/store";
import { Article } from "./interface";

function* fetchArticle(): SagaIterator {
  try {
    const { articles } = yield call(fetchArticleApi);
    yield put(ArticleAction.fetchSuccess(articles));
  } catch (e: any) {
    console.log("error message:", e.response?.data);
  }
}

function* fetchArticleSaga() {
  yield takeLatest(ArticleAction.fetchArticleStart.type, fetchArticle);
}

function* createArticle(action: any): SagaIterator {
  try {
    const { article } = yield call(createArticleApi, action.payload);

    yield put(ArticleAction.createArticleSuccess(article));
  } catch (e: any) {
    console.log("error message:", e.response?.data);
  }
}

function* createArticleSaga() {
  yield takeLatest(ArticleAction.createArticle.type, createArticle);
}

function* updateArticle(action: any): SagaIterator {
  try {
    const { article } = yield call(updateArticleApi, action.payload);
    const { articles } = yield select((state: State) => state.article);

    const data = articles.filter((item: Article) => item.id !== article.id);

    yield put(ArticleAction.updateSuccess([...data, article]));
  } catch (e: any) {
    console.log("error message:", e.response?.data);
  }
}

function* updateArticleSaga() {
  yield takeLatest(ArticleAction.updateArticleStart.type, updateArticle);
}

function* deleteArticle(action: any): SagaIterator {
  try {
    const data = yield call(deleteArticleApi, action.payload);
    yield put(ArticleAction.fetchArticleStart({}));
  } catch (e: any) {
    console.log("error message:", e.response?.data);
  }
}

function* deleteArticleSaga() {
  yield takeLatest(ArticleAction.deleteArticleStart.type, deleteArticle);
}

export {
  fetchArticleSaga,
  createArticleSaga,
  updateArticleSaga,
  deleteArticleSaga,
};
