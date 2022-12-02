export interface Criteria {
  id: string;
  check: (user: any, value: any) => boolean;
}
