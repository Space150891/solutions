import { useState } from 'react';
import {
   Avatar,
   AvatarGroup,
   Box,
   Button,
   Grid,
   List,
   ListItemAvatar,
   ListItemButton,
   ListItemSecondaryAction,
   ListItemText,
   MenuItem,
   Stack,
   TextField,
   Typography,
} from '@mui/material';
import { CardGiftcardOutlined, MessageOutlined, SettingsOutlined } from '@mui/icons-material';

import { IPages } from '../../types/common.types';
import { AnalyticEcommerce } from '../../components/cards/analytic-ecommerse.component';
import { MainCard } from '../../components/cards/main-card.component';
import { IncomeAreaChart } from '../../components/charts/income-area-chart.component';
import { MonthlyBarChart } from '../../components/charts/monthly-bar-chart.component';
import { OrdersTable } from '../../components/tables/orders-table.component';
import { ReportAreaChart } from '../../components/charts/report-area-chart.component';
import { SalesColumnChart } from '../../components/charts/sales-column-chart.component';
import { NumberColumnChart } from '../../components/charts/number-column-chart.component copy';

const avatarSX = {
   width: 36,
   height: 36,
   fontSize: '1rem',
};

const actionSX = {
   mt: 0.75,
   ml: 1,
   top: 'auto',
   right: 'auto',
   alignSelf: 'flex-start',
   transform: 'none',
};

export type IPeriod = 'today' | 'month' | 'year';

const status = [
   {
      value: 'today',
      label: 'Today',
   },
   {
      value: 'month',
      label: 'This Month',
   },
   {
      value: 'year',
      label: 'This Year',
   },
];

export default function DashboardPage() {
   const [value, setValue] = useState<IPeriod>('today');
   const [slot, setSlot] = useState<'month' | 'week'>('week');
   return (
      <Box component='section' padding={1.25}>
         <Box sx={{ mb: 2.25 }}>
            <Typography variant='h5'>{`${IPages.DASHBOARD.toUpperCase()}`}</Typography>
         </Box>
         <Grid container rowSpacing={1} columnSpacing={1} gap={1} sx={{ justifyContent: 'space-between' }}>
            <Grid item lg={2.9} sm={5.9}>
               <AnalyticEcommerce
                  title='Total Page Views'
                  count='4,42,236'
                  percentage={59.3}
                  extra='35,000'
               />
            </Grid>
            <Grid item lg={2.9} sm={5.9}>
               <AnalyticEcommerce title='Total Users' count='78,250' percentage={70.5} extra='8,900' />
            </Grid>
            <Grid item lg={2.9} sm={5.9}>
               <AnalyticEcommerce
                  title='Total Order'
                  count='18,800'
                  percentage={27.4}
                  isLoss
                  color='warning'
                  extra='1,943'
               />
            </Grid>
            <Grid item lg={2.9} sm={5.9}>
               <AnalyticEcommerce
                  title='Total Sales'
                  count='$35,078'
                  percentage={27.4}
                  isLoss
                  color='warning'
                  extra='$20,395'
               />
            </Grid>
         </Grid>

         {/* row -2 */}
         <Grid container gap={1} sx={{ alignItems: 'flex-end' }} pt={1.25} pb={1.25}>
            <Grid item lg={6.9}>
               <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='h5'>Unique Visitor</Typography>
                  <Box>
                     <Button
                        size='small'
                        onClick={() => setSlot('month')}
                        color={slot === 'month' ? 'primary' : 'secondary'}
                        variant={slot === 'month' ? 'outlined' : 'text'}
                     >
                        Month
                     </Button>
                     <Button
                        size='small'
                        onClick={() => setSlot('week')}
                        color={slot === 'week' ? 'primary' : 'secondary'}
                        variant={slot === 'week' ? 'outlined' : 'text'}
                     >
                        Week
                     </Button>
                  </Box>
               </Stack>
               <MainCard content={false} sx={{ mt: 1.5 }}>
                  <Box sx={{ pt: 1 }}>
                     <IncomeAreaChart slot={slot} />
                  </Box>
               </MainCard>
            </Grid>

            <Grid item lg={5}>
               <MainCard sx={{ mt: 1.5 }} content={false}>
                  <Box sx={{ p: '0 16px' }}>
                     <Stack spacing={2}>
                        <Typography variant='h6' color='textSecondary'>
                           This Week Statistics
                        </Typography>
                        <Typography variant='h3' sx={{ marginTop: '5px !important' }}>
                           $7,650
                        </Typography>
                     </Stack>
                  </Box>
                  <MonthlyBarChart />
               </MainCard>
            </Grid>
         </Grid>

         {/* row 3 */}
         <Grid container gap={1} sx={{ alignItems: 'flex-end' }} pt={1.25} pb={1.25}>
            <Grid item lg={7.9}>
               <Typography variant='h5'>Recent Orders</Typography>
               <MainCard sx={{ mt: 2 }} content={false}>
                  <OrdersTable />
               </MainCard>
            </Grid>

            <Grid item lg={4}>
               <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='h5'>Analytics Report</Typography>
               </Stack>
               <MainCard sx={{ mt: 2 }} content={false}>
                  <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                     <ListItemButton divider>
                        <ListItemText primary='Company Finance Growth' />
                        <Typography variant='h5'>+45.14%</Typography>
                     </ListItemButton>
                     <ListItemButton divider>
                        <ListItemText primary='Company Expenses Ratio' />
                        <Typography variant='h5'>0.58%</Typography>
                     </ListItemButton>
                     <ListItemButton>
                        <ListItemText primary='Business Risk Cases' />
                        <Typography variant='h5'>Low</Typography>
                     </ListItemButton>
                  </List>
                  <ReportAreaChart />
               </MainCard>
            </Grid>
         </Grid>

         {/* row 4 */}
         <Grid container gap={1} pt={1.25} pb={1.25}>
            <Grid item lg={7}>
               <Stack alignItems='center' justifyContent='space-between' direction='row'>
                  <Typography variant='h5'>Sales Report</Typography>
                  <TextField
                     id='standard-select-currency'
                     size='small'
                     select
                     value={value}
                     onChange={(e) => setValue(e.target.value as IPeriod)}
                     sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
                  >
                     {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </TextField>
               </Stack>
               <MainCard sx={{ mt: 1.75 }}>
                  <Stack spacing={1.5} sx={{ mb: -12 }}>
                     <Typography variant='h6' color='secondary'>
                        Net Profit
                     </Typography>
                     <Typography variant='h4'>$1560</Typography>
                  </Stack>
                  <SalesColumnChart period={value} />
               </MainCard>
            </Grid>

            <Grid item lg={4.9}>
               <Stack>
                  <Typography variant='h5'>Transaction History</Typography>
               </Stack>
               <MainCard sx={{ mt: 3.5 }} content={false}>
                  <List
                     component='nav'
                     sx={{
                        px: 0,
                        py: 0,
                        '& .MuiListItemButton-root': {
                           py: 1.5,
                           '& .MuiAvatar-root': avatarSX,
                           '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' },
                        },
                     }}
                  >
                     <ListItemButton divider>
                        <ListItemAvatar>
                           <Avatar
                              sx={{
                                 color: 'success.main',
                                 bgcolor: 'success.lighter',
                              }}
                           >
                              <CardGiftcardOutlined />
                           </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                           primary={<Typography variant='subtitle1'>Order #002434</Typography>}
                           secondary='Today, 2:00 AM'
                        />
                        <ListItemSecondaryAction>
                           <Stack alignItems='flex-end'>
                              <Typography variant='subtitle1' noWrap>
                                 + $1,430
                              </Typography>
                              <Typography variant='h6' color='secondary' noWrap>
                                 78%
                              </Typography>
                           </Stack>
                        </ListItemSecondaryAction>
                     </ListItemButton>
                     <ListItemButton divider>
                        <ListItemAvatar>
                           <Avatar
                              sx={{
                                 color: 'primary.main',
                                 bgcolor: 'primary.lighter',
                              }}
                           >
                              <MessageOutlined />
                           </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                           primary={<Typography variant='subtitle1'>Order #984947</Typography>}
                           secondary='5 August, 1:45 PM'
                        />
                        <ListItemSecondaryAction>
                           <Stack alignItems='flex-end'>
                              <Typography variant='subtitle1' noWrap>
                                 + $302
                              </Typography>
                              <Typography variant='h6' color='secondary' noWrap>
                                 8%
                              </Typography>
                           </Stack>
                        </ListItemSecondaryAction>
                     </ListItemButton>
                     <ListItemButton>
                        <ListItemAvatar>
                           <Avatar
                              sx={{
                                 color: 'error.main',
                                 bgcolor: 'error.lighter',
                              }}
                           >
                              <SettingsOutlined />
                           </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                           primary={<Typography variant='subtitle1'>Order #988784</Typography>}
                           secondary='7 hours ago'
                        />
                        <ListItemSecondaryAction>
                           <Stack alignItems='flex-end'>
                              <Typography variant='subtitle1' noWrap>
                                 + $682
                              </Typography>
                              <Typography variant='h6' color='secondary' noWrap>
                                 16%
                              </Typography>
                           </Stack>
                        </ListItemSecondaryAction>
                     </ListItemButton>
                  </List>
               </MainCard>
               <MainCard sx={{ mt: 2 }}>
                  <Stack spacing={3}>
                     <Grid container justifyContent='space-between' alignItems='center'>
                        <Grid item>
                           <Stack>
                              <Typography variant='h5' noWrap>
                                 Help & Support Chat
                              </Typography>
                              <Typography variant='caption' color='secondary' noWrap>
                                 Typical replay within 5 min
                              </Typography>
                           </Stack>
                        </Grid>
                        <Grid item>
                           <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                              <Avatar alt='Remy Sharp' src={''} />
                              <Avatar alt='Travis Howard' src={''} />
                              <Avatar alt='Cindy Baker' src={''} />
                              <Avatar alt='Agnes Walker' src={''} />
                           </AvatarGroup>
                        </Grid>
                     </Grid>
                     <Button size='small' variant='contained' sx={{ textTransform: 'capitalize' }}>
                        Need Help?
                     </Button>
                  </Stack>
               </MainCard>
            </Grid>
            <Grid item lg={7}>
               <Stack alignItems='center' justifyContent='space-between' direction='row'>
                  <Typography variant='h5'>Number of patients and where they are treated</Typography>
               </Stack>
               <MainCard sx={{ mt: 1.75 }}>
                  <Stack spacing={1.5} sx={{ mb: -12 }}>
                     <Typography variant='h6' color='secondary'>
                        Number of patients
                     </Typography>
                     <Typography variant='h4'>2738</Typography>
                  </Stack>
                  <NumberColumnChart period={value} />
               </MainCard>
            </Grid>
         </Grid>
      </Box>
   );
}
