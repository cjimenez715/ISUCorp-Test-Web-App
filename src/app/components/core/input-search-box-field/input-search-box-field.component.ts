import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList, ElementRef, forwardRef } from '@angular/core';
import { KeyCodeEnum } from '../../models/key-code-enum';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'input-search-box-field',
  templateUrl: './input-search-box-field.component.html',
  styleUrls: ['./input-search-box-field.component.css']
})
export class InputSearchBoxComponent implements OnInit {

  @ViewChildren('sbx') sbx: QueryList<ElementRef>;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  searchBoxControl = new FormControl();
  filter: string;
  private _itemSource: Array<any>;
  @Input() set itemSource(itemSource: Array<any>) {
    if (itemSource) {
      this._itemSource = itemSource;
    }
  }
  get itemSource() {
    return this._itemSource;
  }

  @Input() displayPropertie: string;
  @Input() allowNullable: boolean;

  @Input() placeHolder = '';
  @Input() set isDisabled(isDisabled: boolean) {
    if (isDisabled) {
      this.searchBoxControl = new FormControl({ value: this.searchBoxControl, disabled: true });
    } else {
      this.searchBoxControl = new FormControl({ value: this.searchBoxControl, disabled: false });
    }
  }

  @Output() itemChanged = new EventEmitter<any>();

  private _selectedItem: any;
  @Output() selectedItemChange = new EventEmitter<any>();
  @Input() set selectedItem(selectedItem: any) {
    this._selectedItem = selectedItem;
    this.filter = this._selectedItem ? this._selectedItem.Name : '';
    this.searchBoxControl.setValue(this._selectedItem);
    this.itemChanged.emit(this._selectedItem);
  }

  get selectedItem(): any {
    return this._selectedItem;
  }

  @Output() searchExecuted = new EventEmitter<string>();

  constructor() {
    this.itemSource = new Array<any>();
    this.filter = '';
    this.allowNullable = false;
  }

  ngOnInit(): void {
    const searchBox = document.getElementById('inputAutoComplete');
    const keyup$ = fromEvent(searchBox, 'keyup');

    keyup$.pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(500)
    ).subscribe(p => {
      this.searchExecuted.emit(p);
    })
  }

  onSelectedItem(isSelected: boolean, item: any): void {
    if (isSelected) {
      this.selectedItem = item;
      this.itemSource = new Array<any>();
      this.selectedItemChange.emit(this._selectedItem);
    }
  }

  displayFn(item: any): string {
    return item ? item.Name : '';
  }

  keyUpEvent(keyCode: number, filter: string): void {
    this.filter = filter;
    if (keyCode !== KeyCodeEnum.ENTER && keyCode !== KeyCodeEnum.DOWN_ARROW
      && keyCode !== KeyCodeEnum.UP_ARROW && keyCode !== KeyCodeEnum.TAB
      && keyCode !== KeyCodeEnum.CONTROL && keyCode !== KeyCodeEnum.SHIFT
      && keyCode !== KeyCodeEnum.ALT && keyCode !== KeyCodeEnum.CAPS_LOCK
      && this.itemSource.length !== 0) {
      this.itemSource = new Array<any>();
    }

    if (keyCode === KeyCodeEnum.ESC) {
      this.autocomplete.openPanel();
    }
  }

  keyDownEvent(keyCode: number, filter: string): void {
    if ((keyCode === KeyCodeEnum.BACKSPACE) && this.selectedItem) {
      if (!this.allowNullable) {
        this.selectedItem = null;
        this.selectedItemChange.emit(null);
      }
      this.itemSource = new Array<any>();
      this.autocomplete.openPanel();
    }
  }

  lostFocus(): void {
    this.filter = this.filter !== undefined ? this.filter.trim() : '';

    if ((!this.selectedItem && this.filter && this.filter.length > 0)
      || (this.selectedItem && this.filter && this.filter.length > 0 && this.selectedItem.Name !== this.filter)) {

      if (this.allowNullable) {
        this.itemChanged.emit(this.selectedItem ? this.searchBoxControl.value : this.selectedItem);
      }
      else {
        this.filter = '';
        this.selectedItem = null;
        this.selectedItemChange.emit(null);
      }
    } else {
      if (this.filter !== null && this.filter.length === 0 && this.allowNullable) {
        this.itemChanged.emit('');
        this.searchBoxControl.setValue(null);
      }
    }
  }

  getFocus(): void {
    if (this.itemSource) {
      this.itemSource = new Array<any>();
    }
  }

  onItemClick(item: any): void {
    this.selectedItem = item;
  }

  focus(): void {
    if (this.sbx) {
      this.sbx.first.nativeElement.focus();
    }
  }
}
