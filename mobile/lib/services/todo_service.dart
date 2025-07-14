import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/todo.dart';

class TodoService {
  static const _key = 'todos';

  Future<List<Todo>> getTodos() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(_key) ?? '[]';
    final jsonList = json.decode(jsonString) as List;
    return jsonList.map((e) => Todo.fromJson(e)).toList();
  }

  Future<void> saveTodos(List<Todo> todos) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, json.encode(todos.map((e) => e.toJson()).toList()));
  }
}