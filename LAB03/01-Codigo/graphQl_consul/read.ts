import { stringify } from "csv";
import { readFileSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { DadosNodesSearch } from "./types/githubSearch";
import dotenv from "dotenv";
import api from "./services/api";
import moment from "moment";

dotenv.config();

const token = process.env.TOKEN;

const readCsvQuery = () => {
  const csvFilePath = path.resolve(__dirname, "./csv/data.csv");

  const fileContent = readFileSync(csvFilePath, { encoding: "utf-8" });

  const csvArray = [] as any;
  const csvString = String(fileContent).split("\n");
  const csvObject = [] as DadosNodesSearch[];

  for (const complementer of csvString) {
    csvArray.push(complementer.split(","));
  }

  for (const complementer of csvArray) {
    csvObject.push({
      nameWithOwner: complementer[0],
      url: complementer[1],
      createdAt: complementer[2],
      stargazers: {
        totalCount: complementer[3],
      },
      prClosed: {
        totalCount: complementer[4],
      },
      prMerged: {
        totalCount: complementer[3],
      },
    });
  }

  return csvObject;
};

const verificarHorario = (createdAt: string, closedAt: string) => {
  let convertedCreatedAt = moment(createdAt)
    .utc()
    .format("YYYY-MM-DD HH:mm:ss");
  let convertedClosedAt = moment(closedAt).utc().format("YYYY-MM-DD HH:mm:ss");
  let ms = moment(convertedClosedAt, "YYYY-MM-DD HH:mm:ss").diff(
    moment(convertedCreatedAt, "YYYY-MM-DD HH:mm:ss")
  );
  let d = moment.duration(ms);
  let s = d.asHours();
  return s >= 1 ? true : false;
};

export const consultaPullRequests = async () => {
  let lista = readCsvQuery();
  lista = lista.filter((x) => x.nameWithOwner != "nameWithOwner");
  let hasNextPage = true;
  let counter = 0;
  let endCursor = "";
  let dados = [];
  let inicio = true;
  let queryGraphQL = "";

  while (hasNextPage) {
    let ownerName = lista?.[counter].nameWithOwner.split("/");

    inicio
      ? (queryGraphQL = `
        query{
          repository(owner: "${ownerName[0]}", name: "${ownerName[1]}") {
            pullRequests(states: [CLOSED, MERGED], first: 100) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                id
                title
                state
                createdAt
                closedAt
                changedFiles
                additions
                deletions
                reviews { totalCount }
                body
                participants { totalCount }
                comments { totalCount }
              }
            }
          }
        }
      `)
      : {};

    let response = await api.post(
      "graphql",
      JSON.stringify({ query: queryGraphQL }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    hasNextPage =
      response.data.data?.repository?.pullRequests.pageInfo.hasNextPage;
    console.log(hasNextPage);
    endCursor = response.data.data?.repository?.pullRequests.pageInfo.endCursor;
    console.log(endCursor);
    queryGraphQL = `
          query{
              repository(owner: "${ownerName[0]}", name: "${ownerName[1]}") {
                pullRequests(states: [CLOSED, MERGED], first: 100, after: "${endCursor}") {
                    pageInfo {
                        endCursor
                        hasNextPage
                      }
                nodes {
                  id
                  title
                  state
                  createdAt
                  closedAt
                  changedFiles
                  additions
                  deletions
                  reviews { totalCount }
                  body
                  participants { totalCount }
                  comments { totalCount }
                }
              }
            }
            }
        `;
    inicio = false;

    dados = dados.concat(
      response.data.data.repository.pullRequests.nodes.filter(
        (x) =>
          x.reviews?.totalCount > 0 && verificarHorario(x.createdAt, x.closedAt)
      )
    );

    stringify(
      dados,
      {
        header: true,
        columns: [
          "id",
          "title",
          "state",
          "createdAt",
          "closedAt",
          "changedFiles",
          "additions",
          "deletions",
          "reviews.totalCount",
          "body",
          "participants.totalCount",
          "comments.totalCount",
        ],
      },
      function (err, output) {
        fs.writeFile(__dirname + "/csv/pullRequest/pullRequest1.csv", output, "utf-8");
      }
    );

    counter++;
  }
};

consultaPullRequests();
