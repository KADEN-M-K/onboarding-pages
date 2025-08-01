import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';

export default function OnboardingPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Онбординг юридических лиц
        </Typography>
      </Box>
      <OnboardingFlow />
    </Container>
  );
}