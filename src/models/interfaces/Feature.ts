export interface Feature {
  id: string;
  criteria?: { [key: string]: any }[];
  disableCriteria?: boolean;
  disabled?: boolean;
}
