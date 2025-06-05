export interface IPagination {
  page: number;
  limit: number;
  total: number;
  hasMore?: boolean;
}

export class Paginated<T> {
  items: T[];
  pagination: IPagination;

  constructor(items: T[], page: number, limit: number, total: number, hasMore: boolean = total > page * limit) {
    this.items = items;
    this.pagination = { page, limit, total, hasMore };
  }
}
