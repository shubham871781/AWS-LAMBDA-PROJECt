import React, { useState, useEffect } from "react";

import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
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
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1352831;

export default function TotalDonationAmount() {
  const [Donationsum, setDonationsum] = useState(0)
  useEffect(() => {
    const userurl = `${API_URL}/${ALLDONATION}`;
    axios.get(userurl, {
      headers: {
        'x-token': localStorage.getItem('id_token'),
      }
    }).then(response => response.data)
      .then((data) => {
        var DonationSum = 0
        for (let i = 0; i < data.data.donation.length; i++) {
          DonationSum += data.data.donation[i].donationprice
        }
        setDonationsum(DonationSum);
      })
  }, []);
  
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={appleFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(Donationsum)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Donation Amount
      </Typography>
    </RootStyle>
  );
}
