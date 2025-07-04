import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../data/articleSlice/interface";
import { useDispatch, useSelector } from "react-redux";
import { ArticleAction, ArticleState } from "../data/articleSlice";
import { State } from "../store/store";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

interface Props {
  onEdit: (selected: Article) => void;
  onDelete: (id: string) => void;
  search: string;
  filter: string;
}

const ArticleList = ({ search, filter, onEdit, onDelete }: Props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { articles, newArticleCount } = useSelector<State, ArticleState>(
    (state) => state.article
  );

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

  const fetchMore = () => {
    const nextPage = page + 1;
    dispatch(ArticleAction.fetchArticleStart({ page: nextPage }));

    if (newArticleCount === 0) setHasMore(false);
    else setPage(nextPage);
  };
  return (
    <InfiniteScroll
      className="article-list"
      dataLength={articles.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={null}
    >
      {sortArticlesByDate(filtered)?.map((item) => (
        <ArticleCard
          id={item.id}
          title={item.title}
          status={item.status}
          author={item.author}
          createdAt={item.createdAt}
          onClickEdit={(id) => {
            const selected = articles.find((item) => item.id === id);
            if (selected) {
              onEdit(selected);
            }
          }}
          onClickDelete={onDelete}
        />
      ))}
    </InfiniteScroll>
  );
};

export default ArticleList;
