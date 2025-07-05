import React, { Suspense, useEffect, useMemo, useState } from "react";
import ArticleForm from "../components/ArticleForm";
import { useDispatch, useSelector } from "react-redux";
import { ArticleAction, ArticleState } from "../data/articleSlice";
import { State } from "../store/store";
import ModalAlert from "../components/Modal";
import { Article } from "../data/articleSlice/interface";
import CoverLoader from "../components/Clover";
import Input from "../components/Input";
import searchIcon from "../assets/icons/search.png";
import addIcon from "../assets/icons/plus-square.png";
import Dropdown from "../components/Dropdown";
import { AddArticle, Container, ErrorAlert, SearchBox } from "./style";
import { ThemeAction } from "../data/themeSlice";
import Button from "../components/Button";
import { RoleAction, RoleState } from "../data/roleSlice";

const ArticleList = React.lazy(() => import("../containers/ArticleList"));

const Home = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [userRole, setUserRole] = useState("reader");

  const { isFetching, error, articleUpdated } = useSelector<
    State,
    ArticleState
  >((s) => s.article);
  const { role } = useSelector<State, RoleState>((s) => s.role);

  useEffect(() => {
    dispatch(ArticleAction.fetchArticleStart({}));
  }, []);

  useEffect(() => {
    if (articleUpdated) {
      setSelectedArticle(undefined);
    }
  }, [articleUpdated]);

  const handleEdit = (selected: Article) => {
    setSelectedArticle(selected);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    dispatch(ArticleAction.deleteArticleStart({ id }));
  };

  const modalDismiss = () => {
    setSelectedArticle(undefined);
    setShowForm(false);
  };

  const Options = [
    { label: "All", value: "All" },
    { label: "Published", value: "Published" },
    { label: "Draft", value: "Draft" },
    { label: "Archived", value: "Archived" },
  ];

  const roleOptions = [
    { label: "Reader", value: "reader" },
    { label: "Editor", value: "editor" },
  ];

  return (
    <Container>
      {isFetching && <CoverLoader />}
      <h1>Article List</h1>
      <Button
        onClick={() => dispatch(ThemeAction.toggleTheme())}
        label="Change Theme"
        style={{ fontSize: 12 }}
      />
      <SearchBox className="search-box">
        <Input
          icon={searchIcon}
          placeholder="Search by title or author"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />

        <Dropdown
          options={Options}
          value={filter}
          onChange={(value) => setFilter(value)}
        />
        <Dropdown
          options={roleOptions}
          value={userRole}
          onChange={(value) => {
            setUserRole(value);
            dispatch(RoleAction.changeRole(value));
          }}
        />
      </SearchBox>

      {role === "editor" && (
        <AddArticle onClick={() => setShowForm(true)} className="add-article">
          <img src={addIcon} alt="" />
          <label>Add Article</label>
        </AddArticle>
      )}
      {error && <ErrorAlert className="error-alert">{error}</ErrorAlert>}

      <Suspense fallback={<CoverLoader />}>
        <ArticleList
          search={search}
          filter={filter}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Suspense>

      <ModalAlert
        isVisible={showForm}
        children={
          <ArticleForm initialData={selectedArticle} onCancel={modalDismiss} />
        }
        onClose={modalDismiss}
      />
    </Container>
  );
};

export default Home;
