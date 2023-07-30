// data.js
const userGroups = [
    {
      id: 1,
      name: 'Group A',
      users: ['user1', 'user2', 'user3'],
    },
    {
      id: 2,
      name: 'Group B',
      users: ['user4', 'user5'],
    },
  ];
  
  const tasks = [
    {
      id: 1,
      groupId: 1,
      title: 'Task 1',
      description: 'Complete task 1 by tomorrow.',
      completed: false,
    },
    {
      id: 2,
      groupId: 1,
      title: 'Task 2',
      description: 'Submit report for Task 2.',
      completed: true,
    },
    {
      id: 3,
      groupId: 2,
      title: 'Task 3',
      description: 'Review Task 3 changes.',
      completed: false,
    },
  ];
  
  export { userGroups, tasks };
  