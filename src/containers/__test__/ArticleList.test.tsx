import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import ArticleList from "../ArticleList";
import { Article } from "../../data/articleSlice/interface";

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);

const sampleArticles: Article[] = [
  {
    id: "1",
    title: "First Article",
    status: "Published",
    author: "Alice",
    createdAt: "2025-07-01T12:00:00Z",
  },
  {
    id: "2",
    title: "Second Article",
    status: "Draft",
    author: "Bob",
    createdAt: "2025-06-30T10:00:00Z",
  },
];

const renderComponent = (customState = {}) => {
  const store = mockStore({
   role: { role: "editor" },
    article: {
      articles: sampleArticles,
      newArticleCount: 1,
      ...customState,
    },
  });

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  return render(
    <Provider store={store}>
      <ArticleList
        search=""
        filter="All"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    </Provider>
  );
};

describe("ArticleList Component", () => {
  test("WHEN component renders THEN it should show articles", () => {
    renderComponent();

    expect(screen.getByText("First Article")).toBeInTheDocument();
    expect(screen.getByText("Second Article")).toBeInTheDocument();
  });

  test("WHEN filter is set to Published THEN only published articles should be shown", () => {
    const store = mockStore({
     role: { role: "editor" },
      article: { articles: sampleArticles, newArticleCount: 1 },
    });

    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <Provider store={store}>
        <ArticleList
          search=""
          filter="Published"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      </Provider>
    );

    expect(screen.getByText("First Article")).toBeInTheDocument();
    expect(screen.queryByText("Second Article")).not.toBeInTheDocument();
  });

  test("WHEN search term is entered THEN articles are filtered", () => {
    const store = mockStore({
     role: { role: "editor" },
      article: { articles: sampleArticles, newArticleCount: 1 },
    });

    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <Provider store={store}>
        <ArticleList
          search="alice"
          filter="All"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      </Provider>
    );

    expect(screen.getByText("First Article")).toBeInTheDocument();
    expect(screen.queryByText("Second Article")).not.toBeInTheDocument();
  });

  test("WHEN Edit button is clicked THEN onEdit callback is triggered", async () => {
    const store = mockStore({
     role: { role: "editor" },
      article: { articles: sampleArticles, newArticleCount: 1 },
    });

    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <Provider store={store}>
        <ArticleList
          search=""
          filter="All"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      </Provider>
    );

    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(sampleArticles[0]);
    });
  });

  test("WHEN Delete button is clicked THEN onDelete callback is triggered", async () => {
    const store = mockStore({
      role: { role: "editor" },
      article: { articles: sampleArticles, newArticleCount: 1 },
    });

    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <Provider store={store}>
        <ArticleList
          search=""
          filter="All"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      </Provider>
    );

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith("1");
    });
  });
});
