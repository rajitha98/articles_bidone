import React, { useEffect, useState } from "react";
import ArticleForm from "../components/ArticleForm";
import ArticleList from "../components/ArticleList";
import { useDispatch, useSelector } from "react-redux";
import { ArticleAction, ArticleState } from "../data/articleSlice";
import { State } from "../store/store";
import ModalAlert from "../components/Modal";
import "./style.css";
import { Article } from "../data/articleSlice/interface";

const Home = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const { articles, isFetching, error, articleUpdated } = useSelector<
    State,
    ArticleState
  >((s) => s.article);

  useEffect(() => {
    if (articleUpdated) {
      setSelectedArticle(undefined);
      dispatch(ArticleAction.resetArticles());
    }
  }, [articleUpdated]);

  const filtered = articles?.filter(
    (a) =>
      (a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.author.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "All" || a.status === filter)
  );

  const sortArticlesByDate = (articles: Article[]): Article[] => {
    return [...articles].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const handleEdit = (id: string) => {
    const selected = articles.find((item) => item.id === id);
    setSelectedArticle(selected);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    dispatch(ArticleAction.deleteArticleStart({ id }));
  };

  useEffect(() => {
    dispatch(ArticleAction.fetchArticleStart({}));
  }, []);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="container">
      <h1>Article List</h1>
      <button
        onClick={() => {
          setShowForm(true);
        }}
      >
        Add Article
      </button>

      <input
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
        <option value="Archived">Archived</option>
      </select>
      <section className="article-list">
        <ArticleList
          articles={sortArticlesByDate(filtered)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>

      <ModalAlert
        isVisible={showForm}
        children={
          <ArticleForm
            initialData={selectedArticle}
            onCancel={() => setShowForm(false)}
          />
        }
        onClose={() => setShowForm(false)}
      />
    </main>
  );
};

export default Home;
