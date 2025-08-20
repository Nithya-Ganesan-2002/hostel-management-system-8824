const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const USERS_KEY = 'hms_mock_users';

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const DEFAULT_USERS = [
  { id: '1', email: 'admin@hostel.test', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: '2', email: 'student@hostel.test', password: 'student123', role: 'student', name: 'Student User' },
];

// seed users if none exist
(function seed() {
  const existing = getUsers();
  if (!existing || existing.length === 0) {
    saveUsers(DEFAULT_USERS);
  }
})();

export const authService = {
  // PUBLIC_INTERFACE
  async login(email, password, role) {
    /** Simulates login against localStorage users. */
    await delay(300);
    const users = getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password && (!role || u.role === role)
    );
    if (!found) throw new Error('Invalid credentials or role');
    return { id: found.id, email: found.email, role: found.role, name: found.name };
  },

  // PUBLIC_INTERFACE
  async signup({ email, password, name, role }) {
    /** Simulates account creation and returns public user data. */
    await delay(400);
    const users = getUsers();
    if (users.some((u) => u.email === email)) throw new Error('User already exists');
    const newUser = {
      id: String(Date.now()),
      email,
      password,
      role: role || 'student',
      name: name || 'New User',
    };
    users.push(newUser);
    saveUsers(users);
    return { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name };
  },

  // PUBLIC_INTERFACE
  logout() {
    /** Mock logout is a no-op (state is managed in AuthContext). */
  },
};
