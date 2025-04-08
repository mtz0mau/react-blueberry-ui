import { TableProps } from "antd";

export interface IDataTable {
  columns: TableProps<any>['columns'];
  data: any[];
  title?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  searchPlaceholder?: string;
  hideButton?: boolean;
  hideSearch?: boolean;
  headless?: boolean;
  disableSelection?: boolean;
  disablePagination?: boolean;
  onRowClick?: (record: any) => void;
  selectionActions?: (ids: string[]) => React.ReactNode[];
  rowClassName?: (record: any) => string;
}
