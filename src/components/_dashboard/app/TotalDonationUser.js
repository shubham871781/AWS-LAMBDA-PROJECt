import React, { useState, useEffect } from "react";

import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { API_URL, ALLDONATION } from "../../../Apiconstant/Apiconstant"
import axios from 'axios'
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function TotalDonationUser() {
  const [loading, setLoading] = useState(false);
  const [Lotterycount, setLotterycount] = useState('')
  useEffect(() => {
    const lotteryurl = `${API_URL}/${ALLDONATION}`;
    axios.get(lotteryurl, {
      headers: {
        'x-token': localStorage.getItem('id_token'),
      }
    }).then(response => response.data)
      .then((data) => {
        setLotterycount(data.data.donation.length);
      })
  }, []);
  return (
    <>

      <RootStyle>
        <IconWrapperStyle>
          <Icon icon={androidFilled} width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">{fShortenNumber(Lotterycount)}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          No. Of Total Donation
        </Typography>
      </RootStyle>
    </>

  );
}
