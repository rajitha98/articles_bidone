import axios from "axios";

export const fetchArticleApi = () => {
  return axios
    .get("/api/articles", {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
    .then((data) => data.data);
};

export const createArticleApi = (payload: any) => {
  return axios
    .post("/api/articles", payload, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
    .then((data) => data.data);
};

export const updateArticleApi = (payload: any) => {
  return axios
    .put(`/api/articles/${payload.id}`, payload, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
    .then((data) => data.data);
};

export const deleteArticleApi = (payload: any) => {
  return axios
    .delete(`/api/articles/${payload.id}`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
    .then((data) => data.data);
};
