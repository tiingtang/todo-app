import 'package:flutter/material.dart';
import '../models/todo.dart';
import '../services/todo_service.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TodoService _service = TodoService();
  late List<Todo> _todos = [];
  final _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadTodos();
  }

  Future<void> _loadTodos() async {
    _todos = await _service.getTodos();
    setState(() {});
  }

  Future<void> _addTodo() async {
    if (_controller.text.trim().isEmpty) return;
    setState(() {
      _todos.add(Todo(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        text: _controller.text,
      ));
      _controller.clear();
    });
    await _service.saveTodos(_todos);
  }

  Future<void> _toggleTodo(String id) async {
    setState(() {
      _todos = _todos.map((todo) => 
        todo.id == id ? Todo(id: todo.id, text: todo.text, completed: !todo.completed) : todo
      ).toList();
    });
    await _service.saveTodos(_todos);
  }

  Future<void> _deleteTodo(String id) async {
    setState(() {
      _todos.removeWhere((todo) => todo.id == id);
    });
    await _service.saveTodos(_todos);
  }

  Future<void> _editTodo(String id, String newText) async {
    setState(() {
      _todos = _todos.map((todo) => 
        todo.id == id ? Todo(id: todo.id, text: newText, completed: todo.completed) : todo
      ).toList();
    });
    await _service.saveTodos(_todos);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Todo App')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                labelText: 'New Todo',
                suffixIcon: IconButton(
                  icon: Icon(Icons.add),
                  onPressed: _addTodo,
                ),
              ),
              onSubmitted: (_) => _addTodo(),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: _todos.length,
                itemBuilder: (ctx, index) {
                  final todo = _todos[index];
                  return ListTile(
                    leading: Checkbox(
                      value: todo.completed,
                      onChanged: (_) => _toggleTodo(todo.id),
                    ),
                    title: Text(todo.text),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () => _deleteTodo(todo.id),
                    ),
                    onTap: () => _editTodo(
                      todo.id,
                      todo.text, // In a real app, show a dialog for editing
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}