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
  createdAt: string;
  updatedAt: string;
  releases: { totalCount: number };
  primaryLanguage: { name: string };
  pullRequests: { totalCount: number };
};
