import { stringify } from "csv";
import fs from "fs/promises";
import api from "./services/api";
import dotenv from "dotenv";
import { DadosNodes } from "./types/github";

dotenv.config();

const token = process.env.TOKEN;

export const consultaGraphQLGithub = async () => {
  let dados = [];
  let queryGraphQL = `
query{
  search(query: "stars:>1000", type: REPOSITORY, first: 10) {
    pageInfo {
      startCursor
      hasNextPage
      endCursor
    }
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
        closedIssues: issues(filterBy: {states: CLOSED}) {
          totalCount
        }
      }
    }
  }
}
`;
  for (let i = 0; i < 100; i++) {
    let response = await api.post(
      "graphql",
      JSON.stringify({ query: queryGraphQL }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let endCursor = response.data.data.search.pageInfo.endCursor;
    console.log(endCursor);
    queryGraphQL = `
        query{
          search(query: "stars:>1000", type: REPOSITORY, first: 10, after: "${endCursor}") {
            pageInfo {
              startCursor
              hasNextPage
              endCursor
            }
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
                totalIssues: issues { totalCount }
                closedIssues: issues(filterBy: {states: CLOSED}) {
                  totalCount
                }
              }
            }
          }
        }
      `;
    dados = dados.concat(response.data.data.search.nodes);
    stringify(
      dados,
      {
        header: true,
        columns: [
          "nameWithOwner",
          "createdAt",
          "updatedAt",
          "releases.totalCount",
          "primaryLanguage.name",
          "pullRequests.totalCount",
          "totalIssues.totalCount",
          "closedIssues.totalCount"
        ],
      },
      function (err, output) {
        fs.writeFile(__dirname + "/csv/data.csv", output, "utf-8");
      }
    );
  }
};

consultaGraphQLGithub();
