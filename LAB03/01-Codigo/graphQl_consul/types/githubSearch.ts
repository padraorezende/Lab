export type DadosSearch = {
  pageInfo: DadosPageInfo;
  nodes: DadosNodesSearch[];
};

export type DadosPageInfo = {
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string;
};

export type DadosNodesSearch = {
  nameWithOwner: string;
  url: string;
  createdAt: string;
  stargazers: { totalCount: number };
  prClosed: { totalCount: number  };
  prMerged: { totalCount: number };
};


