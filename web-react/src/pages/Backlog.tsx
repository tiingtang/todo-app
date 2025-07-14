import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Backlog: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" mb={3}>
        Backlog
      </Typography>
      <Box textAlign="center" py={8}>
        <Typography variant="h6" color="text.secondary">
          Backlog functionality coming soon
        </Typography>
      </Box>
    </Container>
  );
};

export default Backlog;
