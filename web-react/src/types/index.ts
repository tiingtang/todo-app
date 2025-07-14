export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status: string; // Added this
  priority: 'low' | 'medium' | 'high';
  category: string; // Added this
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  aiAssisted?: boolean; // Added this (optional since not all tasks have it)
  aiSuggestions?: string[]; // Added this (optional since not all tasks have it)
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}