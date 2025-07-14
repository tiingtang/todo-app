import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockTasks } from '../data/mockData';

const TaskList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Tasks
          </Typography>
          <Button variant="contained" startIcon={<Add />}>
            Add Task
          </Button>
        </Box>

        {/* Replace Grid with Box and map directly */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mockTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 3 },
                }}
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Typography variant="h6" fontWeight="medium" mb={1}>
                        {task.title}
                      </Typography>
                      
                      {task.description && (
                        <Typography variant="body2" color="text.secondary" mb={2}>
                          {task.description}
                        </Typography>
                      )}

                      <Box display="flex" gap={1} flexWrap="wrap">
                        <Chip
                          label={task.status}
                          size="small"
                          color={task.status === 'completed' ? 'success' : 'default'}
                        />
                        <Chip
                          label={task.priority}
                          size="small"
                          color={
                            task.priority === 'high' ? 'error' : 
                            task.priority === 'medium' ? 'warning' : 'default'
                          }
                        />
                        <Chip
                          label={task.category}
                          size="small"
                          variant="outlined"
                        />
                        {task.aiAssisted && (
                          <Chip
                            label="AI Assisted"
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
};

export default TaskList;