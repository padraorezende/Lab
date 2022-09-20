export type DadosSearch = {
  pageInfo: DadosPageInfo;
  nodes: DadosNodes[];
};

export type DadosPageInfo = {
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string;
};

export type DadosNodes = {
  nameWithOwner: string;
  sshUrl: string
  stargazers: { totalCount: number };
  releases: { totalCount: number };
  createdAt: string;
};
