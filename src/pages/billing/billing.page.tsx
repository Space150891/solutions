import React, { useState, useEffect } from 'react';
import {
   Box,
   Button,
   Card,
   CardContent,
   Typography,
   TextField,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

interface ManualProcedure {
   id: string;
   description: string;
   frequency: string;
   amount: number;
}

export default function BillingPage() {
   const location = useLocation();
   const { treatmentType, treatmentStatus, referralSource } = location.state || {};

   const [procedures, setProcedures] = useState<ManualProcedure[]>([]);
   const [form, setForm] = useState({ description: '', frequency: '', amount: '' });
   const [errors, setErrors] = useState({ description: false, frequency: false, amount: false });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: false }); // Скидаємо помилку при зміні
   };

   const handleAdd = () => {
      const newErrors = {
         description: form.description.trim() === '',
         frequency: form.frequency.trim() === '',
         amount: form.amount.trim() === '' || isNaN(Number(form.amount)) || Number(form.amount) <= 0,
      };

      setErrors(newErrors);

      const hasError = Object.values(newErrors).some((e) => e);
      if (hasError) return;

      setProcedures([
         ...procedures,
         {
            id: (procedures.length + 1).toString(),
            description: form.description,
            frequency: form.frequency,
            amount: Number(form.amount),
         },
      ]);
      setForm({ description: '', frequency: '', amount: '' });
   };

   const calculatePrice = (type: string, status: string, referral: string): number => {
      let price = 0;
      if (type === 'accident') price += 150;
      else if (type === 'illness') price += 100;
      else if (type === 'chronic') price += 200;
      else if (type === 'preventive') price += 80;
      else if (type === 'rehabilitation') price += 120;
      else if (type === 'surgical') price += 300;

      if (status === 'completed') price += 0;
      else if (status === 'ongoing') price += 50;
      else if (status === 'discontinued') price -= 20;
      else if (status === 'follow-up required') price += 30;

      if (referral === 'self') price += 0;
      else if (referral === 'physician') price += 20;
      else if (referral === 'school') price += 10;
      else if (referral === 'emergency') price += 40;

      return price;
   };

   useEffect(() => {
      if (treatmentType && treatmentStatus && referralSource) {
         const autoAmount = calculatePrice(treatmentType, treatmentStatus, referralSource);

         setProcedures([
            {
               id: 'auto',
               description: `Auto-generated: ${treatmentType}, ${treatmentStatus}, ${referralSource}`,
               frequency: '1x',
               amount: autoAmount,
            },
         ]);
      }
   }, [treatmentType, treatmentStatus, referralSource]);

   const total = procedures.reduce((sum, p) => sum + p.amount, 0);

   return (
      <Box p={3} maxWidth={800} mx='auto'>
         <Typography variant='h4' mb={3}>
            Billing
         </Typography>
         <Card sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant='h6' mb={2}>
                  Add Manual Procedure
               </Typography>
               <Box display='flex' gap={2} alignItems='center' flexWrap='wrap'>
                  <TextField
                     label='Description'
                     name='description'
                     value={form.description}
                     onChange={handleChange}
                     sx={{ minWidth: 180 }}
                     error={errors.description}
                     helperText={errors.description && 'Description is required'}
                  />
                  <TextField
                     label='Frequency'
                     name='frequency'
                     value={form.frequency}
                     onChange={handleChange}
                     sx={{ minWidth: 120 }}
                     placeholder='e.g. 2x/week'
                     error={errors.frequency}
                     helperText={errors.frequency && 'Frequency is required'}
                  />
                  <TextField
                     label='Amount'
                     name='amount'
                     type='number'
                     value={form.amount}
                     onChange={handleChange}
                     sx={{ minWidth: 100 }}
                     error={errors.amount}
                     helperText={errors.amount && 'Enter a valid amount > 0'}
                  />
                  <Button variant='contained' onClick={handleAdd}>
                     Add
                  </Button>
               </Box>
            </CardContent>
         </Card>
         <Card>
            <CardContent>
               <Typography variant='h6' mb={2}>
                  Procedures
               </Typography>
               <TableContainer component={Paper}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>Description</TableCell>
                           <TableCell>Frequency</TableCell>
                           <TableCell align='right'>Amount</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {procedures.map((proc) => (
                           <TableRow key={proc.id}>
                              <TableCell>{proc.description}</TableCell>
                              <TableCell>{proc.frequency}</TableCell>
                              <TableCell align='right'>{proc.amount.toFixed(2)}</TableCell>
                           </TableRow>
                        ))}
                        <TableRow>
                           <TableCell colSpan={2} align='right'>
                              <b>Total</b>
                           </TableCell>
                           <TableCell align='right'>
                              <b>{total.toFixed(2)}</b>
                           </TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </TableContainer>
            </CardContent>
         </Card>
      </Box>
   );
}
