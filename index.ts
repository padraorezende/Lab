import { stringify } from "csv";
import fs from "fs/promises";
import api from "./services/api";
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.TOKEN;

console.log(token)

const queryGraphQL = `
  query{
    search(query: "stars:>1000", type: REPOSITORY, first: 100) {
      nodes {
        ... on Repository {
          nameWithOwner
          createdAt
          updatedAt
          releases {
            totalCount
          }
          primaryLanguage {
            name
          }
          pullRequests(states: [MERGED]) {
            totalCount
          }
        }
      }
    }
  }
`;

export const consultaGraphQLGithub = () => {
  api
    .post("graphql", JSON.stringify({ query: queryGraphQL }), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(
      (response) =>
        stringify(
          response.data.data.search.nodes,
          {
            header: true,
            columns: ["nameWithOwner","createdAt","updatedAt","releases.totalCount","primaryLanguage.name","pullRequests.totalCount"],
          },
          function (err, output) {
            fs.writeFile(__dirname + "/csv/data.csv", output, "utf-8");
          }
        )
    );
};

consultaGraphQLGithub();
