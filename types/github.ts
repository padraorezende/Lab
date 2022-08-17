export type DadosGithub = {
  nameWithOwner: string;
  createdAt: string;
  updatedAt: string;
  releases: { totalCount: number };
  primaryLanguage: { name: string };
  pullRequests: { totalCount: number };
};
