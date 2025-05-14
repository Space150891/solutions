export interface Alert {
  type: string;
  value: number | string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}