import {
   Box,
   Button,
   Card,
   CardContent,
   Grid,
   MenuItem,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { paths } from '../../routes/paths';

interface BillingItem {
   id: string;
   description: string;
   quantity: number;
   unitPrice: number;
   total: number;
}

interface TreatmentData {
   patient: {
      name: string;
      dob: string;
      age: string;
      nativeLanguage: string;
      primaryDiagnosis: string;
      secondaryDiagnosis: string;
      doctor: string;
   };
   treatment: {
      documentName: string;
      evaluationDate: string;
      duration: number;
      significantHistory: string;
      medicalHistory: string;
      medications: string;
      developmentalHistory: Record<string, unknown>;
      educationalStatus: string;
      behavioral: {
         attendingSkills: string;
         coop: string;
         awarenessOfOthers: string;
         prognosisForICF: string;
         responseRate: string;
         socialInteractions: string;
         reliabilityOfScores: string;
         levelOfActivity: string;
         communicativeIntent: string;
         awarenessOfEnvironmentalEvents: string;
      };
   };
}

export default function BillingPage() {
   const navigate = useNavigate();
   const location = useLocation();
   const treatmentData = location.state as TreatmentData;

   const [billingItems, setBillingItems] = useState<BillingItem[]>([
      {
         id: '1',
         description: 'Initial Evaluation',
         quantity: 1,
         unitPrice: 150,
         total: 150,
      },
   ]);

   const [paymentMethod, setPaymentMethod] = useState('insurance');
   const [insuranceDetails, setInsuranceDetails] = useState({
      provider: '',
      policyNumber: '',
      groupNumber: '',
   });
   const [notes, setNotes] = useState('');

   useEffect(() => {
      if (!treatmentData) {
         navigate(paths.treatmentDocumentation);
      }
   }, [treatmentData, navigate]);

   const handleAddItem = () => {
      const newItem: BillingItem = {
         id: (billingItems.length + 1).toString(),
         description: '',
         quantity: 1,
         unitPrice: 0,
         total: 0,
      };
      setBillingItems([...billingItems, newItem]);
   };

   const handleUpdateItem = (id: string, field: keyof BillingItem, value: string | number) => {
      setBillingItems(
         billingItems.map((item) => {
            if (item.id === id) {
               const updatedItem = { ...item, [field]: value };
               if (field === 'quantity' || field === 'unitPrice') {
                  updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
               }
               return updatedItem;
            }
            return item;
         }),
      );
   };

   const handleSubmit = () => {
      const billingDetails = {
         patient: treatmentData.patient,
         treatment: treatmentData.treatment,
         billingItems,
         total: billingItems.reduce((sum, item) => sum + item.total, 0),
         paymentMethod,
         insuranceDetails: paymentMethod === 'insurance' ? insuranceDetails : undefined,
         notes,
      };

      navigate(paths.confirmation, { state: billingDetails });
   };

   if (!treatmentData) {
      return null;
   }

   return (
      <Box p={3}>
         <Typography variant='h4' gutterBottom>
            Billing
         </Typography>

         {/* Patient Information */}
         <Card sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant='h6' gutterBottom>
                  Patient Information
               </Typography>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <Typography>Name: {treatmentData.patient.name}</Typography>
                     <Typography>Date of Birth: {treatmentData.patient.dob}</Typography>
                     <Typography>Age: {treatmentData.patient.age}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Typography>Primary Diagnosis: {treatmentData.patient.primaryDiagnosis}</Typography>
                     <Typography>Secondary Diagnosis: {treatmentData.patient.secondaryDiagnosis}</Typography>
                     <Typography>Doctor: {treatmentData.patient.doctor}</Typography>
                  </Grid>
               </Grid>
            </CardContent>
         </Card>

         {/* Billing Items */}
         <Card sx={{ mb: 3 }}>
            <CardContent>
               <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
                  <Typography variant='h6'>Billing Items</Typography>
                  <Button variant='outlined' onClick={handleAddItem}>
                     Add Item
                  </Button>
               </Box>
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
                        {billingItems.map((item) => (
                           <TableRow key={item.id}>
                              <TableCell>
                                 <TextField
                                    fullWidth
                                    value={item.description}
                                    onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                                 />
                              </TableCell>
                              <TableCell align='right'>
                                 <TextField
                                    type='number'
                                    value={item.quantity}
                                    onChange={(e) =>
                                       handleUpdateItem(item.id, 'quantity', parseInt(e.target.value))
                                    }
                                    sx={{ width: '80px' }}
                                 />
                              </TableCell>
                              <TableCell align='right'>
                                 <TextField
                                    type='number'
                                    value={item.unitPrice}
                                    onChange={(e) =>
                                       handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value))
                                    }
                                    sx={{ width: '100px' }}
                                 />
                              </TableCell>
                              <TableCell align='right'>${item.total.toFixed(2)}</TableCell>
                           </TableRow>
                        ))}
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
                     <TextField
                        select
                        fullWidth
                        label='Payment Method'
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                     >
                        <MenuItem value='insurance'>Insurance</MenuItem>
                        <MenuItem value='cash'>Cash</MenuItem>
                        <MenuItem value='credit'>Credit Card</MenuItem>
                     </TextField>
                  </Grid>
                  {paymentMethod === 'insurance' && (
                     <>
                        <Grid item xs={12} sm={4}>
                           <TextField
                              fullWidth
                              label='Insurance Provider'
                              value={insuranceDetails.provider}
                              onChange={(e) =>
                                 setInsuranceDetails({ ...insuranceDetails, provider: e.target.value })
                              }
                           />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                           <TextField
                              fullWidth
                              label='Policy Number'
                              value={insuranceDetails.policyNumber}
                              onChange={(e) =>
                                 setInsuranceDetails({ ...insuranceDetails, policyNumber: e.target.value })
                              }
                           />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                           <TextField
                              fullWidth
                              label='Group Number'
                              value={insuranceDetails.groupNumber}
                              onChange={(e) =>
                                 setInsuranceDetails({ ...insuranceDetails, groupNumber: e.target.value })
                              }
                           />
                        </Grid>
                     </>
                  )}
               </Grid>
            </CardContent>
         </Card>

         {/* Additional Notes */}
         <Card sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant='h6' gutterBottom>
                  Additional Notes
               </Typography>
               <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
               />
            </CardContent>
         </Card>

         {/* Action Buttons */}
         <Box display='flex' gap={2}>
            <Button variant='contained' onClick={handleSubmit} sx={{ flex: 1 }}>
               Submit Billing
            </Button>
            <Button variant='outlined' onClick={() => navigate(-1)} sx={{ flex: 1 }}>
               Cancel
            </Button>
         </Box>
      </Box>
   );
}
