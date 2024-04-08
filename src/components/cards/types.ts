import { SxProps } from '@mui/material';

export interface AnalyticEcommerceProps {
   color?: string;
   title: string;
   count: string;
   percentage: number;
   isLoss?: boolean;
   extra: string;
}

export interface MainCardProps {
   contentSX?: SxProps;
   sx?: SxProps;
   children: React.ReactNode;
   border?: boolean;
   boxShadow?: boolean;
   darkTitle?: boolean;
   elevation?: number;
   divider?: boolean;
   title?: string;
   codeHighlight?: boolean;
   content?: boolean;
   shadow?: string;
   secondary?: React.ReactNode;
}
