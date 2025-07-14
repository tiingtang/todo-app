import 'priority.dart';

class Task {
  final String id;
  final String title;
  final String description;
  final Priority priority;
  final String category;
  final bool completed;
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime? dueDate;

  Task({
    required this.id,
    required this.title,
    required this.description,
    required this.priority,
    required this.category,
    required this.completed,
    required this.createdAt,
    required this.updatedAt,
    this.dueDate,
  });

  Task copyWith({
    String? id,
    String? title,
    String? description,
    Priority? priority,
    String? category,
    bool? completed,
    DateTime? createdAt,
    DateTime? updatedAt,
    DateTime? dueDate,
  }) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      priority: priority ?? this.priority,
      category: category ?? this.category,
      completed: completed ?? this.completed,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      dueDate: dueDate ?? this.dueDate,
    );
  }

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      priority: Priority.values.firstWhere(
        (e) => e.toString() == 'Priority.${json['priority']}',
        orElse: () => Priority.medium,
      ),
      category: json['category'],
      completed: json['completed'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      dueDate: json['dueDate'] != null ? DateTime.parse(json['dueDate']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'priority': priority.toString().split('.').last,
      'category': category,
      'completed': completed,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'dueDate': dueDate?.toIso8601String(),
    };
  }
}
