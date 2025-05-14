import { RouteObject } from 'react-router-dom';

import { paths } from './paths';
import LoginPage from '../pages/auth/login.page';
import AuthPage from '../pages/auth/auth.page';
import CubexPage from '../pages/cubex/cubex.page';
import LandingPage from '../pages/landing/landing.page';
import DashboardPage from '../pages/dashboard/dashboard.page';
import MultistepFormPage from '../pages/multistep-form/multistep-form.page';
import PatientListPage from '../pages/patient-list/patient-list.page';
import PatientAppointment from '../pages/patient-appointment/patient-appointment.page';
import HospitalAppointment from '../pages/hospital-appointment/hospital-appointment.page';
import PatientManagement from '../pages/patient-management/patient-management.page';
import PersonnelManagement from '../pages/personnel-management/personnel-management.page';
import InsuranceInformation from '../pages/insurance-information/insurance-information.page';
import PatientDashboard from '../pages/patient-dashboard/patient-dashboard.page';
import WaitingBoard from '../pages/waiting-board/waiting-board.page';
import Agenda from '../pages/agenda/agenda.page';
import LaboratoryAnalysis from '../pages/laboratory-analysis/laboratory-analysis.page';
import TreatmentDocumentation from '../pages/treatment-documentation/treatment-documentation.page';
import MedicationManagementPage from '../pages/medication/medication-management/medication-management.page';
import MedicationInventoryPage from '../pages/medication/medication-inventory/medication-inventory.page';
import TaskManagementPage from '../pages/task/task-management/task-management.page';
import TaskViewPage from '../pages/task/task-view/task-view.page';
import UserActivityPage from '../pages/user-activity/user-activity.page';
import TemplateViewPage from '../pages/template/template-view/template-view.page';
import TemplateManagementPage from '../pages/template/template-management/template-management.page';
import Email from '../pages/email/email.page';
import BillingPage from '../pages/billing/billing.page';
import VitalMonitoring from '../pages/vital-monitoring/vital-monitoring.page';

export const routesData: RouteObject[] = [
   {
      id: '1',
      path: paths.login,
      element: <LoginPage />,
   },
   {
      id: '2',
      path: paths.auth,
      element: <AuthPage />,
   },
   {
      id: '4',
      path: paths.app,
      element: <LandingPage />,
   },
   {
      id: '3',
      path: paths.cubex,
      element: <CubexPage />,
      children: [
         {
            id: '11-dashboard',
            path: paths.cubex,
            element: <DashboardPage />,
         },
         {
            id: '12-multistepForm',
            path: paths.multistepForm,
            element: <MultistepFormPage />,
         },
         {
            id: '13-patientList',
            path: paths.patientList,
            element: <PatientListPage />,
         },
         {
            id: '14-patientAppointment',
            path: paths.patientAppointment,
            element: <PatientAppointment />,
         },
         {
            id: '15-hospitalAppointment',
            path: paths.hospitalAppointment,
            element: <HospitalAppointment />,
         },
         {
            id: '16-patientManagement',
            path: paths.patientManagement,
            element: <PatientManagement />,
         },
         {
            id: '17-personnelManagement',
            path: paths.personnelManagement,
            element: <PersonnelManagement />,
         },
         {
            id: '18-insuranceInformation',
            path: paths.insuranceInformation,
            element: <InsuranceInformation />,
         },
         {
            id: '19-patientDashboard',
            path: paths.patientDashboard,
            element: <PatientDashboard />,
         },
         {
            id: '20-waitingBoard',
            path: paths.waitingBoard,
            element: <WaitingBoard />,
         },
         {
            id: '21-agenda',
            path: paths.agenda,
            element: <Agenda />,
         },
         {
            id: '22-laboratoryAnalysis',
            path: paths.laboratoryAnalysis,
            element: <LaboratoryAnalysis />,
         },
         {
            id: '23-treatmentDocumentation',
            path: paths.treatmentDocumentation,
            element: <TreatmentDocumentation />,
         },
         {
            id: '24-medicationManagement',
            path: paths.medicationManagement,
            element: <MedicationManagementPage />,
         },
         {
            id: '25-medicationInventory',
            path: paths.medicationInventory,
            element: <MedicationInventoryPage />,
         },
         {
            id: '26-taskManagement',
            path: paths.taskManagement,
            element: <TaskManagementPage />,
         },
         {
            id: '27-taskView',
            path: paths.taskView,
            element: <TaskViewPage />,
         },
         {
            id: '28-taskCreate',
            path: paths.taskCreate,
            element: <TaskViewPage />,
         },
         {
            id: '29-userActivity',
            path: paths.userActivity,
            element: <UserActivityPage />,
         },
         {
            id: '30-templateManagement',
            path: paths.templateManagement,
            element: <TemplateManagementPage />,
         },
         {
            id: '31-templateView',
            path: paths.templateView,
            element: <TemplateViewPage />,
         },
         {
            id: '32-email',
            path: paths.email,
            element: <Email />,
         },
         {
            id: '33-billing',
            path: paths.billing,
            element: <BillingPage />,
         },
         {
            id: '34-vitalMonitoring',
            path: paths.vitalMonitoring,
            element: <VitalMonitoring />,
         },
      ],
   },
];
