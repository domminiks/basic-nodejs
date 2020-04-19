const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const { checkPostInputs, checkId } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/repositories/:id', checkId);

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", checkPostInputs, (request, response) => {
  const { title, url, techs } = request.body;
  const id = uuid();
  const repo = {
    "id" : id,
    "title" : title,
    "url" : url,
    "techs" : techs,
    "likes" : 0
  }
  repositories.push(repo);
  return response.status(200).json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params; 
  const { title, url, techs } = request.body;
  const repoIndex = repositories.findIndex(repo => (repo.id === id));
  if (repoIndex < 0) {
    return response.status(400).json({
      "error" : "ID not found."
    })
  }
  const repo = {
    "id" : id,
    "title" : (title ? title : repositories[repoIndex].title),
    "url" : (url ? url : repositories[repoIndex].url),
    "techs" : (techs ? techs : repositories[repoIndex].techs),
    "likes" : repositories[repoIndex].likes
  }
  repositories[repoIndex] = repo;
  return response.status(200).json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => (repo.id === id));
  if (repoIndex < 0) {
    return response.status(400).json({
      "error" : "ID not found."
    })
  }
  repositories.splice(repoIndex, 1);
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => (repo.id === id));
  if (repoIndex < 0) {
    return response.status(400).json({
      "error" : "ID not found."
    })
  }
  repositories[repoIndex].likes++;
  return response.status(200).json(repositories[repoIndex]);
});

module.exports = app;
