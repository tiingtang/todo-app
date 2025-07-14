import React from 'react';
import { Container, Typography, Card, CardContent, Chip, Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskById } from '../data/mockData';

const TaskDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const task = id ? getTaskById(id) : null;

  if (!task) {
    return (
      <Container>
        <Typography>Task not found</Typography>
        <Button onClick={() => navigate('/tasks')}>Back to Tasks</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/tasks')}
        sx={{ mb: 2 }}
      >
        Back to Tasks
      </Button>
      
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>{task.title}</Typography>
          <Typography variant="body1" paragraph>{task.description}</Typography>
          
          <Box display="flex" gap={1} mb={2}>
            <Chip label={task.status} color={task.status === 'completed' ? 'success' : 'default'} />
            <Chip label={task.priority} color={task.priority === 'high' ? 'error' : 'warning'} />
            <Chip label={task.category} variant="outlined" />
          </Box>

          {task.aiAssisted && task.aiSuggestions && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>AI Suggestions:</Typography>
              {task.aiSuggestions.map((suggestion, index) => (
                <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                  • {suggestion}
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TaskDetail;
