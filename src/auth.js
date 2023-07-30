export const authenticateUser = (email, password) => {
    const validUsers = [
      { email: 'user1@example.com', password: 'password1', groupId: 1, isAdmin: false },
      { email: 'user2@example.com', password: 'password2', groupId: 2, isAdmin: false },
      { email: 'admin@example.com', password: 'adminpassword', groupId: null, isAdmin: true },
    ];
  
    const authenticatedUser = validUsers.find(
      (user) => user.email === email && user.password === password
    );
  
    return authenticatedUser ? authenticatedUser : null;
  };
  