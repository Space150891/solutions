import { paths } from '../../routes/paths';
import { IPages } from '../../types/common.types';

export const config = [
   {
      id: 1,
      path: paths.cubex,
      name: IPages.DASHBOARD,
      category: 'Common',
   },
   {
      id: 2,
      path: paths.multistepForm,
      name: IPages.MULTISTEP_FORM,
   },
   {
      id: 2,
      path: paths.patientList,
      name: IPages.PATIENT_LIST,
   },
   {
      id: 4,
      path: paths.patientAppointment,
      name: IPages.PATIENT_APPOINTMENT,
   },
];
