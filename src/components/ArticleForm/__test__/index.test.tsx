import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ArticleForm from "..";
import { ArticleAction } from "../../../data/articleSlice";
import { Article } from "../../../data/articleSlice/interface";

const mockStore = configureStore([]);
const mockOnCancel = jest.fn();

describe("ArticleForm", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    mockOnCancel.mockClear();
  });

  test("WHEN the form is rendered THEN it shows empty fields", () => {
    render(
      <Provider store={store}>
        <ArticleForm onCancel={mockOnCancel} />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Author")).toBeInTheDocument();
    expect(screen.getByText("Add Article")).toBeInTheDocument();
  });

  test("WHEN submit is clicked with empty fields THEN it shows error", () => {
    render(
      <Provider store={store}>
        <ArticleForm onCancel={mockOnCancel} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Please enter the article title")).toBeInTheDocument();
    expect(screen.getByText("Author name is required")).toBeInTheDocument();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  test("WHEN form is submitted with valid input THEN it dispatches createArticle", () => {
    render(
      <Provider store={store}>
        <ArticleForm onCancel={mockOnCancel} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Author"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByDisplayValue("Draft"), {
      target: { value: "Published" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ArticleAction.createArticle.type,
        payload: expect.objectContaining({
          title: "Test Title",
          author: "John Doe",
          status: "Published",
        }),
      })
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("WHEN form is submitted with initial data THEN it dispatches updateArticleStart", () => {
    const initialData: Article = {
      id: "123",
      title: "Existing Title",
      author: "Alice",
      status: "Draft",
      createdAt: "2023-01-01T00:00:00Z",
    };

    render(
      <Provider store={store}>
        <ArticleForm onCancel={mockOnCancel} initialData={initialData} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Title" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(store.dispatch).toHaveBeenCalledWith(
      ArticleAction.updateArticleStart(
        expect.objectContaining({
          id: "123",
          title: "Updated Title",
          author: "Alice",
          status: "Draft",
        })
      )
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("WHEN Cancel button is clicked THEN onCancel is called", () => {
    render(
      <Provider store={store}>
        <ArticleForm onCancel={mockOnCancel} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
