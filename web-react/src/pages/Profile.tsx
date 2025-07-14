import React from 'react';
import { Container, Typography, Card, CardContent, Avatar, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" mb={3}>
        Profile
      </Typography>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar src={user?.avatar} sx={{ width: 80, height: 80, mr: 3 }}>
              {user?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5">{user?.name}</Typography>
              <Typography variant="body1" color="text.secondary">{user?.email}</Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Profile management features coming soon
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
