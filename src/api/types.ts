export type Page<AllIds extends string = string, Id extends AllIds = AllIds> = {
  id: Id,
  title: string,
  url?: string,
  level: number,
  parentId: AllIds,
  pages?: AllIds[],
};

export type PagesData<PageIds extends string = string> = {
  entities: {
    pages: { [Id in PageIds]: Page<PageIds, Id> },
  },
  topLevelIds: PageIds[],
};