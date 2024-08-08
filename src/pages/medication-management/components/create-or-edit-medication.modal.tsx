import { ModalProps } from '@mui/material';
import CustomModal from '../../../components/custom-modal/custom-modal';
import { useCreateOrEditMedicationModalLogic } from './create-or-edit-medication.modal.logic';
import { Medication, newMedicationFields } from '../medication-management.mock';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

type Props = Omit<ModalProps, 'children'> & {
   selectedMedication: Medication | null;
   onClose: () => void;
   onConfirm: (medication: Medication) => void;
};

const CreateOrEditMedicationModal = (props: Props) => {
   const { open } = props;
   const { data, state, handlers } = useCreateOrEditMedicationModalLogic(props);

   return (
      <CustomModal
         open={open}
         onClose={handlers.handleClose}
         heading={'Add new medication'}
         additionalStyles={{ maxWidth: '700px' }}
         cancelButtonProps={{ onClick: handlers.handleClose }}
         confirmButtonProps={{
            disabled: data.isDisabledConfirmButton,
            loading: state.isAdding,
            onClick: handlers.handleConfirm,
         }}
      >
         <Grid2 container spacing={2}>
            {newMedicationFields.map(({ label, field, type }) => {
               return (
                  <Grid2 xs={field === 'name' ? 12 : 6} key={field}>
                     {handlers.handleRenderField({ label, field, type })}
                  </Grid2>
               );
            })}
         </Grid2>
      </CustomModal>
   );
};

export default CreateOrEditMedicationModal;
