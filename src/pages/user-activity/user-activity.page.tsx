import CustomDataGrid from '../../components/custom-data-grid/custom-data-grid.component';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import { IPages } from '../../types/common.types';
import { useUserActivityLogic } from './user-activity.logic';

export default function UserActivityPage() {
   const { data, state } = useUserActivityLogic();

   return (
      <PageWrapper heading={IPages.USER_ACTIVITY.toUpperCase()}>
         <CustomDataGrid columns={data.columns} rows={state.rows} />
      </PageWrapper>
   );
}
