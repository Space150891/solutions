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
  Stack,
  Typography
} from '@mui/material';
import { CardGiftcardOutlined, MessageOutlined, SettingsOutlined } from '@mui/icons-material';
import { MainCard } from '../../../components/cards/main-card.component';

const avatarSX = { width: 36, height: 36, fontSize: '1rem' };
const actionSX = { mt: 0.75, ml: 1, top: 'auto', right: 'auto', alignSelf: 'flex-start', transform: 'none' };

export default function TransactionHistorySection() {
  return (
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
              <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
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
              <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
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
              <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
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
  );
}
