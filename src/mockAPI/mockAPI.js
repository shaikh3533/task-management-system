const mockTasks = [
    { id: 1, groupId: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
    { id: 2, groupId: 1, title: 'Task 2', description: 'Description for Task 2', completed: true },
    { id: 3, groupId: 2, title: 'Task 3', description: 'Description for Task 3', completed: false },
];

export const fetchTasks = (groupId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const tasksForGroup = mockTasks.filter((task) => task.groupId === groupId);
            resolve(tasksForGroup);
        }, 500);
    });
};

export const addTask = (newTask) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            newTask.id = Date.now();
            mockTasks.push(newTask);
            resolve(newTask);
        }, 500);
    });
};

export const updateTask = (taskId, completed) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const taskToUpdate = mockTasks.find((task) => task.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.completed = completed;
                resolve(taskToUpdate);
            } else {
                reject(new Error('Task not found'));
            }
        }, 500);
    });
};

export const deleteTask = (taskId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = mockTasks.findIndex((task) => task.id === taskId);
            if (index !== -1) {
                mockTasks.splice(index, 1);
                resolve();
            } else {
                reject(new Error('Task not found'));
            }
        }, 500);
    });
};
