import { configureStore } from "@reduxjs/toolkit";

import { rootSaga } from "./rootSaga";
import { ArticleReducer } from "../data/articleSlice";

const createSagaMiddleware = require("redux-saga").default;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    article: ArticleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof store.getState>;
