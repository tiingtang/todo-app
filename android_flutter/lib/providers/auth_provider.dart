import 'package:flutter/foundation.dart';
import '../models/user.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  bool _isAuthenticated = false;

  User? get user => _user;
  bool get isAuthenticated => _isAuthenticated;

  Future<void> login(String email, String password) async {
    // Mock login logic
    await Future.delayed(const Duration(seconds: 1));
    
    _user = User(
      id: '1',
      name: 'John Doe',
      email: email,
    );
    _isAuthenticated = true;
    notifyListeners();
  }

  Future<void> logout() async {
    _user = null;
    _isAuthenticated = false;
    notifyListeners();
  }
}
