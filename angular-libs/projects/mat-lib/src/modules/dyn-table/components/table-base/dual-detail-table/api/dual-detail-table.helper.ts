export class DynTableOptions {
  maxTableHeight: string = '100%';
  filterBy: string | undefined = undefined;
  findTextColumn: string | string[] = 'message';
  showPagination: boolean = true;
  pageSizeOptions: number[] = [5, 10, 25, 100, 500, 1000];
  defaultPageSize: number = 25;
}

export class DualDetailTableOptions extends DynTableOptions {
  isMainFilterAction: boolean = false;
  mainTableTitle: string = 'Main Data';
  detailTableTitle: string = 'Details';
  isDualFilterAction: boolean = false;
  isDualTextToFind: boolean = false;
  dualFindTextColumn: string = '';
  dualFilterBy: string = '';
}
