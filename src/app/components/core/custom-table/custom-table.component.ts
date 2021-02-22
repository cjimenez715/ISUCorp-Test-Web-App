import { Router } from '@angular/router';
import { PropertyTypeEnum } from './../../models/property-type';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CustomActionTable } from '../../models/custom-action-table';
import { Column } from '../../models/columns';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  public get propertyType(): typeof PropertyTypeEnum {
    return PropertyTypeEnum;
  }

  private _itemSource: Array<any>;

  dataSource: any;

  private _columnsDefinition = Array<Column>();
  private _isLoading = false;

  @Input() set columnsDefinition(columns: Array<Column>) {
    this._columnsDefinition = columns;
    this.getPropertyColumns(this._columnsDefinition);
  }

  @Input() set actionsDefinition(actions: Array<CustomActionTable>) {
    this.getActions(actions);
  }

  @Input() set itemSource(itemSource: Array<any>) {
    if (itemSource) {
      this.selectedRowIndex = -1;
      let index = 1;
      itemSource.forEach(item => {
        item.Index = index++;
        item.highlighted = false;
        item.hovered = false;
      });
      this._itemSource = itemSource;
      this.dataSource = new MatTableDataSource(itemSource);
      this.dataSource.sort = this.sort;
    }
  }
  get itemSource() {
    return this._itemSource;
  }

  @Input() set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
    if (this._isLoading) {
      this._itemSource = new Array<any>();
    }
  }
  get isLoading(): boolean {
    return this._isLoading;
  }

  @Input() routerLinkString: string;
  @Input() isSelectable = false;
  @Input() isMultiSelectable = false;
  @Output() selectedItemsChanged = new EventEmitter<Array<any>>();

  columns: Array<any> = new Array<any>();
  displayedColumns: Array<any> = new Array<any>();
  selectedRowIndex: number;
  actions: Array<any> = new Array<any>();

  @Input() showEditIcon: boolean;
  @Input() showDeleteIcon: boolean;

  // pager
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() totalRows: number;
  @Input() usePaginator: boolean;
  @Input() isTableContainer: boolean;
  @Input() actionLabel: string;

  //It will return ItemId in order to be deleted to the
  //component that implements it
  @Output() deleteExecuted = new EventEmitter<number>();
  @Output() actionExecuted = new EventEmitter<any>();

  constructor(
    private router: Router,
    public el: ElementRef
  ) {
    this.selectedRowIndex = -1;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.usePaginator = false;
    this.isTableContainer = false;
    this.dataSource = null;
    this.actionLabel = $localize`Actions`;
  }

  ngOnInit(): void {

  }

  private getObjectKeys(selectedItem: any): string[] {
    return Object.keys(selectedItem);
  }

  private getColumnParse(item: Column): any {
    return {
      columnDef: item.PropertyBinding,
      header: item.Header,
      propertyType: item.PropertyType,
      isSortable: item.IsSortable,
      width: item.Width, cell: (element: any, propType: PropertyTypeEnum, prop: string) => {
        const value = element[prop];
        switch (propType) {
          case PropertyTypeEnum.String:
            return `${value}`;
            break;
          case PropertyTypeEnum.Boolean:
            return value;
            break;
          case PropertyTypeEnum.Number:
            return value;
            break;
          case PropertyTypeEnum.Money:
            return value;
            break;
          case PropertyTypeEnum.Date:
            return value;
            break;
          default:
            return;
        }
      }
    };
  }

  private filterColumnsId(column: string): boolean {
    return !column.toLocaleLowerCase().includes('id');
  }

  private getPropertyColumns(columnsDefinition: Array<Column>): void {
    this.columns = columnsDefinition.map(this.getColumnParse);
    const aux = this.columns.map(p => p.columnDef).filter(this.filterColumnsId);

    if (this.showEditIcon || this.showDeleteIcon) {
      aux.push('action');
    }
    this.displayedColumns = aux;
  }

  private getActions(actions: Array<CustomActionTable>): void {
    this.actions = actions;
    if (this.actions.length > 0) {
      this.displayedColumns.push('action');
    }
  }

  getRouterLink(item: any): string {
    return `/${this.routerLinkString}/${this.getRowId(item)}`;
  }

  getRowId(item: any): number {
    const propId = this.getObjectKeys(item).filter(p => p.toLocaleLowerCase().includes('id'))[0];
    const id = item[propId];
    if (id) {
      return id;
    } else {
      return 0;
    }
  }

  highlight(row: any): void {
    this.selectedRowIndex = row.Index;
    if (this.isSelectable) {
      this.unSelectOthersExcept(this.selectedRowIndex);
    }
    row.highlighted = !row.highlighted;
  }

  private unSelectOthersExcept(selectedRowIndex: number): void {
    this.itemSource.filter(p => p.selectedRowIndex !== selectedRowIndex).forEach(p => {
      p.highlighted = false;
    });
  }

  isSelected(row: any): boolean {
    return this.selectedRowIndex === row.Index && this.isSelectable;
  }

  arrowUpEvent(): void {
    if (this.isSelectable) {
      const prevRow = this.itemSource[this.selectedRowIndex - 2];
      if (prevRow) {
        this.highlight(prevRow);
      }
    }
  }

  arrowDownEvent(): void {
    if (this.isSelectable) {
      const nextRow = this.itemSource[this.selectedRowIndex];
      if (nextRow) {
        this.highlight(nextRow);
      }
    }
  }

  navigateTo(): void {
    if (this.showEditIcon && this.routerLinkString) {
      const currentRow = this.itemSource[this.selectedRowIndex - 1];
      this.router.navigate([`/${this.routerLinkString}/${this.getRowId(currentRow)}`]);
    }
    else if (this.isMultiSelectable) {
      const selectedItems = this.itemSource.filter(p => p.highlighted === true);
      if (selectedItems && selectedItems.length > 0) {
        this.selectedItemsChanged.emit(selectedItems);
      }
    }
  }

  getServerData(event?: PageEvent): void {
    this.pageChanged.emit(event);
  }

  editEvent(item: any): void {
    this.router.navigate([this.getRouterLink(item)]);
  }

  deleteEvent(row: any): void {
    this.deleteExecuted.emit(this.getRowId(row));
  }

  actionEvent(row: any, functionName: string): void {
    this.actionExecuted.emit([functionName, row]);
  }
}

