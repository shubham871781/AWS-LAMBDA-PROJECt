// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  TotalDonationAmount,
  TotalDonationToday,
  TotalDonationUser,
  TotalDonation,
  TotalDonationUserToday

} from '../components/_dashboard/app';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate();
  // if(localStorage.getItem("id_token" === undefined)){
  //   navigate('/', { replace: true });
  // }
  return (
    <Page title="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Dashboard</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TotalDonationUser />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalDonationAmount />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalDonationUserToday />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalDonationToday />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <TotalDonation />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
