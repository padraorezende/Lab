export type DadosSearch = {
  pageInfo: DadosPageInfo;
  nodes: DadosNodesRepository[];
};

export type DadosPageInfo = {
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string;
};

export type DadosNodesRepository = {
  id: string;
  title: string;
  state: string;
  createdAt: string;
  closedAt: string;
  changedFiles: number;
  additions: number;
  deletions: number;
  reviews: {
    totalCount: number;
  };
  body: string;
  participants: {
    totalCount: number;
  };
  comments: {
    totalCount: number;
  };
};
