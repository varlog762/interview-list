export interface TableColumnInterface {
  name: string;
  label: string;
  field: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: (a: string, b: string) => number;
  rawSort?: (a: string, b: string) => number;
}
