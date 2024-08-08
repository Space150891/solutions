import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { useCustomDataGridStyle } from './custom-data-grid.style';

const CustomDataGrid = (props: DataGridProps) => {
   const sx = useCustomDataGridStyle();

   return <DataGrid {...props} disableRowSelectionOnClick sx={sx.dataGrid} />;
};

export default CustomDataGrid;
