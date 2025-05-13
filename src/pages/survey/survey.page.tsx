/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Box, Typography, TextField, Stack, Button, Paper } from '@mui/material';
import { question } from './question';
import { useNavigate } from 'react-router-dom';

interface SurveyData {
   waitTime: string;
   likedMost: string;
   improvementSuggestions: string;
   communicationIssues: string;
   futureWishes: string;
   overallExperience: string;
   overallRating: number | null;
}

export default function SurveyPage() {
   const navigate = useNavigate();

   const [data, setData] = useState<SurveyData>({
      waitTime: '',
      likedMost: '',
      improvementSuggestions: '',
      communicationIssues: '',
      futureWishes: '',
      overallExperience: '',
      overallRating: null,
   });

   const [submittedData, setSubmittedData] = useState<SurveyData | null>(null);

   const updateFields = (fields: Partial<SurveyData>) => {
      setData((prev) => ({ ...prev, ...fields }));
   };
   const handleSubmit = () => {
      navigate('/cubex');

      setSubmittedData(data);
      setData({
         waitTime: '',
         likedMost: '',
         improvementSuggestions: '',
         communicationIssues: '',
         futureWishes: '',
         overallExperience: '',
         overallRating: null,
      });

      const notification = document.createElement('div');
      notification.style.position = 'fixed';
      notification.style.top = '24px';
      notification.style.right = '24px';
      notification.style.backgroundColor = '#1976d2';
      notification.style.color = 'white';
      notification.style.padding = '16px 24px';
      notification.style.borderRadius = '8px';
      notification.style.zIndex = '9999';
      notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      notification.style.fontFamily = 'Roboto, sans-serif';
      notification.style.fontSize = '14px';
      notification.style.fontWeight = '500';
      notification.style.transition = 'opacity 0.3s ease-in-out';
      notification.style.opacity = '0';
      notification.innerText = 'The survey was successful!';

      document.body.appendChild(notification);
      requestAnimationFrame(() => {
         notification.style.opacity = '1';
      });
      setTimeout(() => {
         notification.style.opacity = '0';
         setTimeout(() => {
            document.body.removeChild(notification);
         }, 300);
      }, 3000);
   };

   return (
      <Box width='100vw' minHeight='100vh' bgcolor='#f7f7f7' p={4}>
         <Typography variant='h4' fontWeight={500} mb={4}>
            Patient Satisfaction Survey
         </Typography>

         <Paper sx={{ maxWidth: 700, p: 4, margin: '0 auto' }}>
            <label style={labelStyle}>How long did you wait for your appointment? (in minutes)</label>
            <TextField
               fullWidth
               type='number'
               value={data.waitTime}
               onChange={(e) => {
                  const value = e.target.value;
                  if (Number(value) >= 0 || value === '') {
                     updateFields({ waitTime: value });
                  }
               }}
               variant='outlined'
               inputProps={{ min: 0 }}
            />

            {Object.entries(question).map(([key, label]) => (
               <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <TextField
                     multiline
                     rows={2}
                     fullWidth
                     value={(data as any)[key]}
                     onChange={(e) => updateFields({ [key]: e.target.value } as Partial<SurveyData>)}
                     variant='outlined'
                     sx={{
                        '& .MuiInputBase-root': {
                           height: '60px',
                        },
                     }}
                  />
               </div>
            ))}

            <Stack direction='row' justifyContent='flex-end' mt={4}>
               <Button variant='contained' onClick={handleSubmit}>
                  Submit
               </Button>
            </Stack>
         </Paper>
      </Box>
   );
}

const labelStyle: React.CSSProperties = {
   marginTop: '20px',
   marginBottom: '8px',
   fontWeight: 500,
   display: 'block',
};
