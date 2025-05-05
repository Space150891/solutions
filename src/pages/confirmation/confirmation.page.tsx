import {
   Box,
   Button,
   Card,
   CardContent,
   Grid,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../routes/paths';

interface BillingDetails {
   patient: {
      name: string;
      dob: string;
      age: string;
      primaryDiagnosis: string;
      secondaryDiagnosis: string;
      doctor: string;
   };
   treatment: {
      documentName: string;
      evaluationDate: string;
      duration: number;
   };
   billingItems: Array<{
      id: string;
      description: string;
      quantity: number;
      unitPrice: number;
      total: number;
   }>;
   total: number;
   paymentMethod: string;
   insuranceDetails?: {
      provider: string;
      policyNumber: string;
      groupNumber: string;
   };
   notes?: string;
}

export default function ConfirmationPage() {
   const navigate = useNavigate();
   const location = useLocation();
   const billingDetails = location.state as BillingDetails;

   if (!billingDetails) {
      navigate(paths.billing);
      return null;
   }

   return (
      <Box p={3}>
         <Typography variant='h4' gutterBottom>
            Billing Confirmation
         </Typography>

         {/* Patient Information */}
         <Card sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant='h6' gutterBottom>
                  Patient Information
               </Typography>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <Typography>Name: {billingDetails.patient.name}</Typography>
                     <Typography>Date of Birth: {billingDetails.patient.dob}</Typography>
                     <Typography>Age: {billingDetails.patient.age}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Typography>Primary Diagnosis: {billingDetails.patient.primaryDiagnosis}</Typography>
                     <Typography>Secondary Diagnosis: {billingDetails.patient.secondaryDiagnosis}</Typography>
                     <Typography>Doctor: {billingDetails.patient.doctor}</Typography>
                  </Grid>
               </Grid>
            </CardContent>
         </Card>

         {/* Treatment Details */}
         <Card sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant='h6' gutterBottom>
                  Treatment Details
               </Typography>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                     <Typography>Document: {billingDetails.treatment.documentName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                     <Typography>Evaluation Date: {billingDetails.treatment.evaluationDate}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                     <Typography>Duration: {billingDetails.treatment.duration} minutes</Typography>
                  </Grid>
               </Grid>
            </CardContent>
         </Card>

         {/* Billing Items */}
         <Card sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant='h6' gutterBottom>
                  Billing Items
               </Typography>
               <TableContainer>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>Description</TableCell>
                           <TableCell align='right'>Quantity</TableCell>
                           <TableCell align='right'>Unit Price</TableCell>
                           <TableCell align='right'>Total</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {billingDetails.billingItems.map((item) => (
                           <TableRow key={item.id}>
                              <TableCell>{item.description}</TableCell>
                              <TableCell align='right'>{item.quantity}</TableCell>
                              <TableCell align='right'>${item.unitPrice.toFixed(2)}</TableCell>
                              <TableCell align='right'>${item.total.toFixed(2)}</TableCell>
                           </TableRow>
                        ))}
                        <TableRow>
                           <TableCell colSpan={3} align='right'>
                              <Typography variant='subtitle1'>Total:</Typography>
                           </TableCell>
                           <TableCell align='right'>
                              <Typography variant='subtitle1'>${billingDetails.total.toFixed(2)}</Typography>
                           </TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </TableContainer>
            </CardContent>
         </Card>

         {/* Payment Information */}
         <Card sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant='h6' gutterBottom>
                  Payment Information
               </Typography>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Typography>Payment Method: {billingDetails.paymentMethod}</Typography>
                  </Grid>
                  {billingDetails.insuranceDetails && (
                     <>
                        <Grid item xs={12} sm={4}>
                           <Typography>
                              Insurance Provider: {billingDetails.insuranceDetails.provider}
                           </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                           <Typography>
                              Policy Number: {billingDetails.insuranceDetails.policyNumber}
                           </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                           <Typography>
                              Group Number: {billingDetails.insuranceDetails.groupNumber}
                           </Typography>
                        </Grid>
                     </>
                  )}
               </Grid>
            </CardContent>
         </Card>

         {/* Additional Notes */}
         {billingDetails.notes && (
            <Card sx={{ mb: 3 }}>
               <CardContent>
                  <Typography variant='h6' gutterBottom>
                     Additional Notes
                  </Typography>
                  <Typography>{billingDetails.notes}</Typography>
               </CardContent>
            </Card>
         )}

         {/* Action Buttons */}
         <Box display='flex' gap={2}>
            <Button variant='contained' onClick={() => navigate(paths.cubex)} sx={{ flex: 1 }}>
               Return to Dashboard
            </Button>
            <Button variant='outlined' onClick={() => navigate(-1)} sx={{ flex: 1 }}>
               Back
            </Button>
         </Box>
      </Box>
   );
}
