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
  query {
    search(query:"language:java stars:>1000",
           type:REPOSITORY, first:50){
               pageInfo {
            startCursor
            hasNextPage
            endCursor
          }
     nodes {
          ... on Repository {
            nameWithOwner
            sshUrl
            stargazers {
          totalCount
        } 
            releases {
              totalCount
            }
            createdAt
            }
          }
      }
    }
`;
  for (let i = 0; i < 20; i++) {
    let response = await api.post(
      "graphql",
      JSON.stringify({ query: queryGraphQL }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let endCursor = response?.data?.data?.search.pageInfo.endCursor;
    console.log(endCursor);
    queryGraphQL = `
        query{
          search(query:"language:java stars:>1000", type: REPOSITORY, first: 50, after: "${endCursor}") {
            pageInfo {
              startCursor
              hasNextPage
              endCursor
            }
            nodes {
              ... on Repository {
                nameWithOwner
                sshUrl
                stargazers {
              totalCount
            } 
                releases {
                  totalCount
                }
                createdAt
                }
              }
          }
        }   
        
      `;
    dados = dados.concat(response?.data?.data?.search.nodes);
    stringify(
      dados,
      {
        header: true,
        columns: [
          "nameWithOwner",
          "sshUrl",
          "stargazers.totalCount",
          "releases.totalCount",
          "createdAt",
        ],
      },
      function (err, output) {
        fs.writeFile(__dirname + "/csv/data.csv", output, "utf-8");
      }
    );
  }
};

consultaGraphQLGithub();
