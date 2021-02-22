import { PropertyTypeEnum } from './property-type';
export class Column {
  Header: string;
  PropertyBinding: string;
  PropertyType: PropertyTypeEnum;
  Width: number;
  IsSortable: boolean;

  constructor(Header: string, PropertyBinding: string, PropertyType: PropertyTypeEnum, Width: number = null, IsSortable = false) {
    this.Header = Header;
    this.PropertyBinding = PropertyBinding;
    this.PropertyType = PropertyType;
    this.Width = Width;
    this.IsSortable = IsSortable;
  }
}
