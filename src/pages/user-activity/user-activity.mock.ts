import { Task } from '../task/task-management/task-management.mock';

export type UserActivity = Task & {
   createdAt: string;
};

export const userActivityMock: UserActivity[] = [
   {
      id: 1,
      createdAt: '2024-07-29T02:11:46Z',
      creator: 'John Doe',
      assignedUser: 'Jane Smith',
      isCompleted: false,
      endDate: '2024-08-29T02:11:46Z',
   },
   {
      id: 2,
      createdAt: '2024-07-13T02:11:46Z',
      creator: 'John Doe',
      assignedUser: 'Jane Bloggs',
      isCompleted: true,
      endDate: '2024-08-13T02:11:46Z',
   },
];
