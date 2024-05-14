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
      ],
   },
];
