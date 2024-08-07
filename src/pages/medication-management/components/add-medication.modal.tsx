import { Grid, ModalProps } from '@mui/material';
import CustomModal from '../../../components/custom-modal/custom-modal';
import { useAddMedicationModalLogic } from './add-medication.modal.logic';
import { newMedicationFields } from '../medication-management.mock';

type Props = Omit<ModalProps, 'children'> & {
   onClose: () => void;
};

const AddMedicationModal = (props: Props) => {
   const { open } = props;
   const { handlers } = useAddMedicationModalLogic(props);

   return (
      <CustomModal
         open={open}
         onClose={handlers.handleClose}
         heading={'Add new medication'}
         additionalStyles={{ maxWidth: '700px' }}
         cancelButtonProps={{ onClick: handlers.handleClose }}
         //  confirmButtonProps={{
         //     disabled: !state.link,
         //     loading: state.isLoading,
         //     onClick: handlers.handleUpdateUserLink,
         //  }}
      >
         <Grid container gap={1.3}>
            {newMedicationFields.map(({ label, field, type }) => {
               return (
                  <Grid item xs={field === 'name' ? 12 : 5.9} key={field}>
                     {handlers.handleRenderField({ label, field, type })}
                  </Grid>
               );
            })}
         </Grid>
      </CustomModal>
   );
};

export default AddMedicationModal;
