export const getTasksCompletedCountText = (tasksCount: number): string => {
  if (tasksCount === 1) {
    return `${tasksCount} задача выполнена`;
  } else if (tasksCount >= 2 && tasksCount <= 4) {
    return `${tasksCount} задачи выполнены`;
  } else {
    return `${tasksCount} задач выполнено`;
  }
};
