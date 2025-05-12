import { useState, useEffect, ChangeEvent } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';

interface Procedure {
   id: string;
   description: string;
   frequency: string;
   amount: number;
}

interface ProcedureForm {
   description: string;
   frequency: string;
   amount: string;
}

interface FormErrors {
   description: boolean;
   frequency: boolean;
   amount: boolean;
}

type FormType = 'manual' | 'lab' | 'meds';

export default function BillingPage() {
   const location = useLocation();
   const { treatmentType, treatmentStatus, referralSource } = location.state || {};

   const [manualProcedures, setManualProcedures] = useState<Procedure[]>([]);
   const [labProcedures, setLabProcedures] = useState<Procedure[]>([]);
   const [medications, setMedications] = useState<Procedure[]>([]);

   const [formManual, setFormManual] = useState<ProcedureForm>({
      description: '',
      frequency: '',
      amount: '',
   });
   const [formLab, setFormLab] = useState<ProcedureForm>({ description: '', frequency: '', amount: '' });
   const [formMeds, setFormMeds] = useState<ProcedureForm>({ description: '', frequency: '', amount: '' });

   const [errors, setErrors] = useState<FormErrors>({ description: false, frequency: false, amount: false });

   const handleChange = (e: ChangeEvent<HTMLInputElement>, formType: FormType) => {
      const { name, value } = e.target;

      const update = (prev: ProcedureForm): ProcedureForm => ({ ...prev, [name]: value });

      if (formType === 'manual') setFormManual(update(formManual));
      else if (formType === 'lab') setFormLab(update(formLab));
      else setFormMeds(update(formMeds));

      setErrors((prev) => ({ ...prev, [name]: false }));
   };

   const navigate = useNavigate();

   const handlePayment = () => {
      navigate('/cubex/treatment-documentation', {});
   };

   const validateForm = (form: ProcedureForm): FormErrors => {
      return {
         description: form.description.trim() === '',
         frequency: form.frequency.trim() === '',
         amount: form.amount.trim() === '' || isNaN(Number(form.amount)) || Number(form.amount) <= 0,
      };
   };

   const handleAdd = (type: FormType) => {
      const form = type === 'manual' ? formManual : type === 'lab' ? formLab : formMeds;
      const newErrors = validateForm(form);
      setErrors(newErrors);

      const hasError = Object.values(newErrors).some(Boolean);
      if (hasError) return;

      const newItem: Procedure = {
         id: `${type}-${Math.random().toString(36).substring(2, 9)}`,
         description: form.description,
         frequency: form.frequency,
         amount: Number(form.amount),
      };

      if (type === 'manual') {
         setManualProcedures([...manualProcedures, newItem]);
         setFormManual({ description: '', frequency: '', amount: '' });
      } else if (type === 'lab') {
         setLabProcedures([...labProcedures, newItem]);
         setFormLab({ description: '', frequency: '', amount: '' });
      } else {
         setMedications([...medications, newItem]);
         setFormMeds({ description: '', frequency: '', amount: '' });
      }
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
         setManualProcedures([
            {
               id: 'auto',
               description: `Auto-generated: ${treatmentType}, ${treatmentStatus}, ${referralSource}`,
               frequency: '1x',
               amount: autoAmount,
            },
         ]);
      }
   }, [treatmentType, treatmentStatus, referralSource]);

   const total = [...manualProcedures, ...labProcedures, ...medications].reduce(
      (sum, p) => sum + p.amount,
      0,
   );

   const renderForm = (title: string, form: ProcedureForm, formType: FormType) => (
      <CardContent>
         <Typography variant='h6' mb={2}>
            {title}
         </Typography>
         <Box display='flex' gap={2} alignItems='center' flexWrap='wrap'>
            <TextField
               label='Description'
               name='description'
               value={form.description}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, formType)}
               sx={{ minWidth: 180 }}
               error={errors.description}
               helperText={errors.description && 'Required'}
            />
            <TextField
               label='Frequency'
               name='frequency'
               value={form.frequency}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, formType)}
               sx={{ minWidth: 120 }}
               error={errors.frequency}
               helperText={errors.frequency && 'Required'}
            />
            <TextField
               label='Amount'
               name='amount'
               type='number'
               value={form.amount}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, formType)}
               sx={{ minWidth: 100 }}
               error={errors.amount}
               helperText={errors.amount && 'Enter valid amount > 0'}
            />
            <Button variant='contained' onClick={() => handleAdd(formType)}>
               Add
            </Button>
         </Box>
      </CardContent>
   );

   const renderTable = (title: string, items: Procedure[]) => (
      <Card sx={{ mb: 3 }}>
         <CardContent>
            <Typography variant='h6' mb={2}>
               {title}
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
                     {items.map((item) => (
                        <TableRow key={item.id}>
                           <TableCell>{item.description}</TableCell>
                           <TableCell>{item.frequency}</TableCell>
                           <TableCell align='right'>{item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </CardContent>
      </Card>
   );

   return (
      <Box p={3} maxWidth={900} mx='auto'>
         <Typography variant='h4' mb={3}>
            Billing
         </Typography>

         <Card sx={{ mb: 3 }}>
            {renderForm('Add Manual Procedure', formManual, 'manual')}
            {renderForm('Add Laboratory Procedure', formLab, 'lab')}
            {renderForm('Add Medication', formMeds, 'meds')}
         </Card>

         {renderTable('Manual Procedures', manualProcedures)}
         {renderTable('Laboratory Procedures', labProcedures)}
         {renderTable('Medications', medications)}

         <Card>
            <CardContent>
               <Typography variant='h6' align='right'>
                  <b>Total: {total.toFixed(2)}</b>
               </Typography>
            </CardContent>
         </Card>
         <Box display='flex' justifyContent='flex-end' mt={3}>
            <Button variant='contained' color='primary' onClick={handlePayment}>
               Pay
            </Button>
         </Box>
      </Box>
   );
}
