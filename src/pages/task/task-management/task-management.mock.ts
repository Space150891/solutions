export type Task = {
   id: number;
   creator: string;
   assignedUser: string;
   isCompleted: boolean;
   endDate: string;
};

export const taskManagementMock: Task[] = [
   {
      id: 1,
      creator: 'John Doe',
      assignedUser: 'Jane Smith',
      isCompleted: false,
      endDate: '2024-08-29T02:11:46Z',
   },
   {
      id: 2,
      creator: 'John Doe',
      assignedUser: 'Jane Bloggs',
      isCompleted: true,
      endDate: '2024-08-13T02:11:46Z',
   },
];
