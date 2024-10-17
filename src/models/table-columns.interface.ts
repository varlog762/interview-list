export interface TableColumnsInterface {
  name: string;
  label: string;
  field: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
}
