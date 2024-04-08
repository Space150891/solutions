export interface IHeadCells {
   id: string;
   align: 'left' | 'right';
   disablePadding: boolean;
   label: string;
}

export interface IRow {
   trackingNo: number;
   name: string;
   fat: number;
   carbs: number;
   protein: number;
}
