import 'package:flutter/foundation.dart';
import '../models/task.dart';
import '../models/priority.dart';

class TaskProvider with ChangeNotifier {
  final List<Task> _tasks = [
    Task(
      id: '1',
      title: 'Buy groceries',
      description: 'Need to get milk, bread, and eggs',
      priority: Priority.high,
      category: 'shopping',
      completed: false,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    ),
    Task(
      id: '2',
      title: 'Complete project',
      description: 'Finish the Flutter todo app',
      priority: Priority.medium,
      category: 'work',
      completed: false,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    ),
    Task(
      id: '3',
      title: 'Exercise routine',
      description: '30 minutes cardio and strength training',
      priority: Priority.low,
      category: 'health',
      completed: true,
      createdAt: DateTime.now().subtract(const Duration(days: 1)),
      updatedAt: DateTime.now(),
    ),
  ];

  List<Task> get tasks => List.unmodifiable(_tasks);
  List<Task> get completedTasks => _tasks.where((task) => task.completed).toList();
  List<Task> get pendingTasks => _tasks.where((task) => !task.completed).toList();

  void addTask(Task task) {
    _tasks.add(task);
    notifyListeners();
  }

  void updateTask(String id, Task updatedTask) {
    final index = _tasks.indexWhere((task) => task.id == id);
    if (index != -1) {
      _tasks[index] = updatedTask;
      notifyListeners();
    }
  }

  void deleteTask(String id) {
    _tasks.removeWhere((task) => task.id == id);
    notifyListeners();
  }

  void toggleTaskCompletion(String id) {
    final index = _tasks.indexWhere((task) => task.id == id);
    if (index != -1) {
      _tasks[index] = _tasks[index].copyWith(
        completed: !_tasks[index].completed,
        updatedAt: DateTime.now(),
      );
      notifyListeners();
    }
  }
}
