class Todo {
  final String id;
  final String text;
  bool completed;

  Todo({
    required this.id,
    required this.text,
    this.completed = false,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'text': text,
    'completed': completed,
  };

  factory Todo.fromJson(Map<String, dynamic> json) => Todo(
    id: json['id'],
    text: json['text'],
    completed: json['completed'],
  );
}