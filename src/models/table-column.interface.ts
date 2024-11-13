export interface TableColumnInterface {
  name: string;
  label: string;
  field: string;
  align?: 'left' | 'right' | 'center';
  required?: boolean;
  sortable?: boolean;
  sortOrder?: 'ad' | 'da';
  style?: string;
  classes?: string;
  headerStyle?: string;
  headerClasses?: string;
}
