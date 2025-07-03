import React, { useEffect, useState } from "react";
import ArticleForm from "../components/ArticleForm";
import ArticleList from "../components/ArticleList";
import { useDispatch, useSelector } from "react-redux";
import { ArticleAction, ArticleState } from "../data/articleSlice";
import { State } from "../store/store";
import ModalAlert from "../components/Modal";
import "./style.css";

const Home = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const { articles, isFetching, error } = useSelector<State, ArticleState>(
    (s) => s.article
  );

  const filtered = articles?.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || a.status === filter)
  );

  const handleEdit = (article: any) => {
    setShowForm(true);
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
          articles={filtered}
          onEdit={handleEdit}
          onDelete={() => {}}
        />
      </section>

      <ModalAlert
        isVisible={showForm}
        children={<ArticleForm onCancel={() => setShowForm(false)} />}
        onClose={() => setShowForm(false)}
      />
    </main>
  );
};

export default Home;
