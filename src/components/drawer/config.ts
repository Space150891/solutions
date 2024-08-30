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
      id: 3,
      path: paths.patientList,
      name: IPages.PATIENT_LIST,
   },
   {
      id: 4,
      path: paths.patientAppointment,
      name: IPages.PATIENT_APPOINTMENT,
   },
   {
      id: 5,
      path: paths.hospitalAppointment,
      name: IPages.HOSPITAL_APPOINTMENT,
   },
   {
      id: 6,
      path: paths.patientManagement,
      name: IPages.PATIENT_MANAGEMENT,
   },
   {
      id: 7,
      path: paths.personnelManagement,
      name: IPages.PERSONNEL_MANAGEMENT,
   },
   {
      id: 8,
      path: paths.insuranceInformation,
      name: IPages.INSURANCE_INFORMATION,
   },
   {
      id: 9,
      path: paths.patientDashboard,
      name: IPages.PATIENT_DASHBOARD,
   },
   {
      id: 10,
      path: paths.waitingBoard,
      name: IPages.WAITING_BOARD,
   },
   {
      id: 11,
      path: paths.agenda,
      name: IPages.AGENDA,
   },
   {
      id: 12,
      path: paths.laboratoryAnalysis,
      name: IPages.LABORATORY_ANALYSIS,
   },
   {
      id: 13,
      path: paths.treatmentDocumentation,
      name: IPages.TREATMENT_DOCUMENTATION,
   },
   {
      id: 14,
      path: paths.medicationManagement,
      name: IPages.MEDICATION_MANAGEMENT,
   },
   {
      id: 15,
      path: paths.medicationInventory,
      name: IPages.MEDICATION_INVENTORY,
   },
   {
      id: 16,
      path: paths.taskManagement,
      name: IPages.TASK_MANAGEMENT,
   },
   {
      id: 17,
      path: paths.userActivity,
      name: IPages.USER_ACTIVITY,
   },
   {
      id: 18,
      path: paths.templateManagement,
      name: IPages.TEMPLATE_MANAGEMENT,
   },
];
