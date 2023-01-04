interface IListItem {
  title: string;
  input_date: string;
  article_id: string;
  publishdate: string;
  publishdep: string;
  origin_name: string;
}

export default interface IGetRes {
  status: 'success';
  keywords: '';
  total: number;
  pages: string;
  curPage: number;
  origin: '';
  list: IListItem[];
}
