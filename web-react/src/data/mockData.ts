import { Task, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/150'
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Buy groceries for the week',
    description: 'Need to get milk, bread, eggs, and vegetables',
    completed: false, // Added this
    status: 'pending',
    priority: 'high',
    category: 'shopping',
    dueDate: new Date(Date.now() + 86400000),
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
    userId: '1', // Added this
    aiAssisted: true,
    aiSuggestions: ['Whole Foods Market nearby', 'Organic milk on sale'],
  },
  {
    id: '2',
    title: 'Complete project presentation',
    description: 'Prepare slides for quarterly review meeting',
    completed: false, // Added this
    status: 'in-progress',
    priority: 'high',
    category: 'work',
    dueDate: new Date(Date.now() + 172800000),
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(),
    userId: '1', // Added this
  },
  {
    id: '3',
    title: 'Exercise routine',
    description: '30 minutes cardio and strength training',
    completed: true, // Added this (marking as completed for variety)
    status: 'completed', // Changed status to match completed state
    priority: 'medium',
    category: 'health',
    dueDate: new Date(),
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
    userId: '1', // Added this
  },
];

export const getTodayTasks = (): Task[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return mockTasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate >= today && dueDate < tomorrow;
  });
};

export const getTaskById = (id: string): Task | undefined => {
  return mockTasks.find(task => task.id === id);
};