import { MatPaginatorIntl } from '@angular/material/paginator';

const genericRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} ${$localize`of`} ${length}`;
}


export function GenericPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = $localize`Items per page:`;
  paginatorIntl.nextPageLabel = $localize`Next page`;
  paginatorIntl.previousPageLabel = $localize`Previous page`;
  paginatorIntl.getRangeLabel = genericRangeLabel;
  return paginatorIntl;
}
