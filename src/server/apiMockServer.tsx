import { createServer, Model } from "miragejs";
import { articlesList } from "./mockData";

export function makeServer() {
  createServer({
    models: {
      article: Model,
    },

    seeds(server) {
      articlesList.forEach((article: any) => {
        server.create("article", article);
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/articles", (schema, request) => {
        const page = Number(request.queryParams.page || 1);
        const perPage = 10;
        const all = schema.all("article").models;
        const paginated = all.slice((page - 1) * perPage, page * perPage);
        return { articles: paginated };
      });

      this.post("/articles", (schema: any, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.create("article", {
          ...attrs,
          createdAt: new Date().toISOString(),
        });
      });

      this.put("/articles/:id", (schema: any, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        let article = schema.find("article", id);
        return article?.update(attrs);
      });

      this.delete("/articles/:id", (schema: any, request) => {
        let id = request.params.id;
        return schema.find("article", id).destroy();
      });
    },
  });
}
