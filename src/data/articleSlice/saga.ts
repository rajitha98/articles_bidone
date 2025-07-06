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

function* fetchArticle(action: any): SagaIterator {
  try {
    const { articles: existingArticles } = yield select(
      (state: State) => state.article
    );

    const { articles: newArticles } = yield call(
      fetchArticleApi,
      action.payload
    );

    const allArticles = [...existingArticles, ...newArticles];

    const filtered = Array.from(
      new Map(allArticles.map((item: Article) => [item.id, item])).values()
    );

    yield put(
      ArticleAction.fetchSuccess({
        articles: filtered,
        newArticleCount: newArticles.length,
      })
    );
  } catch (e: any) {
    yield put(
      ArticleAction.actionFailed("Something went wrong please try again later")
    );
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
    yield put(
      ArticleAction.actionFailed("Something went wrong please try again later")
    );
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
    yield put(
      ArticleAction.actionFailed("Something went wrong please try again later")
    );
  }
}

function* updateArticleSaga() {
  yield takeLatest(ArticleAction.updateArticleStart.type, updateArticle);
}

function* deleteArticle(action: any): SagaIterator {
  try {
    yield call(deleteArticleApi, action.payload);

    const { articles } = yield select((state: State) => state.article);

    const data = articles.filter(
      (item: Article) => item.id !== action.payload.id
    );

    yield put(ArticleAction.updateSuccess(data));

    yield put(ArticleAction.deleteSuccess());
  } catch (e: any) {
    yield put(
      ArticleAction.actionFailed("Something went wrong please try again later")
    );
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
