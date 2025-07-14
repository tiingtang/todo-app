import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  LinearProgress,
  Fab,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  CheckCircle,
  Schedule,
  Add,
  ArrowForward,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockTasks, getTodayTasks } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { Task } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const todayTasks = getTodayTasks();
  const completedTasks = mockTasks.filter(task => task.status === 'completed');
  const totalTasks = mockTasks.length;
  const completionRate = (completedTasks.length / totalTasks) * 100;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: <Assignment />,
      color: 'primary',
    },
    {
      title: 'Completed',
      value: completedTasks.length,
      icon: <CheckCircle />,
      color: 'success',
    },
    {
      title: 'Today\'s Tasks',
      value: todayTasks.length,
      icon: <Schedule />,
      color: 'warning',
    },
    {
      title: 'Completion Rate',
      value: `${Math.round(completionRate)}%`,
      icon: <TrendingUp />,
      color: 'info',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Section */}
        <Box mb={4}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center">
              <Avatar src={user?.avatar} sx={{ mr: 2, width: 56, height: 56 }}>
                {user?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Welcome back, {user?.name?.split(' ')[0]}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/tasks')}
            >
              Add Task
            </Button>
          </Box>
        </Box>

        {/* Stats Grid - Using Box with flexbox instead of Grid */}
        <Box 
          display="flex" 
          flexWrap="wrap" 
          gap={3} 
          mb={4}
          sx={{
            '& > *': {
              flex: '1 1 250px',
              minWidth: '250px'
            }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box color={`${stat.color}.main`}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Typography variant="h3" component="div" color={`${stat.color}.main`} fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Progress Section */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Weekly Progress
              </Typography>
              <Button onClick={() => navigate('/tasks')} endIcon={<ArrowForward />}>
                View All Tasks
              </Button>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                {completedTasks.length} of {totalTasks} tasks completed
              </Typography>
              <Chip
                label={`${Math.round(completionRate)}%`}
                color="primary"
                size="small"
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={completionRate}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Today's Tasks
            </Typography>
            {todayTasks.length === 0 ? (
              <Box textAlign="center" py={3}>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  No tasks scheduled for today
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => navigate('/tasks')}
                >
                  Add Task
                </Button>
              </Box>
            ) : (
              todayTasks.map((task: Task) => (
                <Box
                  key={task.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={2}
                  borderBottom="1px solid"
                  borderColor="divider"
                  sx={{ '&:last-child': { borderBottom: 'none' } }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {task.title}
                    </Typography>
                    <Box display="flex" gap={1} mt={1}>
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
                    </Box>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    View
                  </Button>
                </Box>
              ))
            )}
          </CardContent>
        </Card>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={() => navigate('/tasks')}
        >
          <Add />
        </Fab>
      </motion.div>
    </Container>
  );
};

export default Dashboard;