import { configureStore } from "@reduxjs/toolkit";

import { rootSaga } from "./rootSaga";
import { ArticleReducer } from "../data/articleSlice";
import { ThemeReducer } from "../data/themeSlice";

const createSagaMiddleware = require("redux-saga").default;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    article: ArticleReducer,
    theme: ThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof store.getState>;
