import { stringify } from "csv";
import dotenv from "dotenv";
import fs from "fs/promises";
import api from "./services/api";
import { DadosNodesSearch } from "./types/githubSearch";

dotenv.config();

const token = process.env.TOKEN;

export const consultaGraphQLGithub = async () => {
  let dados = [];
  let queryGraphQL = `
  query{
    search(query: "stars:>1000 sort:stars", type: REPOSITORY, first: 25) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Repository {
          nameWithOwner
          url
          createdAt
          stargazers {
            totalCount
          }
          prClosed: pullRequests(states: [CLOSED]) {
              totalCount
          }
          prMerged: pullRequests(states: [MERGED]) {
              totalCount
          }
        }
      }
    }
}
`;
  for (let i = 0; i < 8; i++) {
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
          search(query: "stars:>1000", type: REPOSITORY, first: 25, after: "${endCursor}") {
            pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                ... on Repository {
                  nameWithOwner
                  url
                  createdAt
                  stargazers {
                    totalCount
                  }
                  prClosed: pullRequests(states: [CLOSED]) {
                      totalCount
                  }
                  prMerged: pullRequests(states: [MERGED]) {
                      totalCount
                  }
                }
            }
          }
        }
      `;

    dados = dados.concat(
      response.data.data.search.nodes.filter(
        (x) => x.prClosed.totalCount + x.prMerged.totalCount > 100
      )
    );

    let x = dados as DadosNodesSearch[];

    x.sort((a, b) =>
      a.stargazers.totalCount > b.stargazers.totalCount ? 1 : 0
    );

    x = x.filter((x, index) => index <= 99);

    stringify(
      x,
      {
        header: true,
        columns: [
          "nameWithOwner",
          "url",
          "createdAt",
          "stargazers.totalCount",
          "prClosed.totalCount",
          "prMerged.totalCount",
        ],
      },
      function (err, output) {
        fs.writeFile(__dirname + "/csv/data.csv", output, "utf-8");
      }
    );
  }
};

consultaGraphQLGithub();
