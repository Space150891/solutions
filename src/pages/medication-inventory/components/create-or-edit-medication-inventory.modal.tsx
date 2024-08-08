import { ModalProps } from '@mui/material';
import CustomModal from '../../../components/custom-modal/custom-modal';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { MedicationInventoryItem, newMedicationInventoryItemFields } from '../medication-inventory.mock';
import { useCreateOrEditMedicationInventoryModalLogic } from './create-or-edit-medication-inventory.moda..logic';

type Props = Omit<ModalProps, 'children'> & {
   selectedItem: MedicationInventoryItem | null;
   onClose: () => void;
   onConfirm: (medication: MedicationInventoryItem) => void;
};

const CreateOrEditMedicationInventoryModal = (props: Props) => {
   const { open } = props;
   const { data, state, handlers } = useCreateOrEditMedicationInventoryModalLogic(props);

   return (
      <CustomModal
         open={open}
         onClose={handlers.handleClose}
         heading={'Add new item to inventory'}
         additionalStyles={{ maxWidth: '700px' }}
         cancelButtonProps={{ onClick: handlers.handleClose }}
         confirmButtonProps={{
            disabled: data.isDisabledConfirmButton,
            loading: state.isAdding,
            onClick: handlers.handleConfirm,
         }}
      >
         <Grid2 container spacing={2}>
            {newMedicationInventoryItemFields.map(({ label, field, type }) => {
               return (
                  <Grid2 xs={field === 'name' || type === 'radio' ? 12 : 6} key={field}>
                     {handlers.handleRenderField({ label, field, type })}
                  </Grid2>
               );
            })}
         </Grid2>
      </CustomModal>
   );
};

export default CreateOrEditMedicationInventoryModal;
