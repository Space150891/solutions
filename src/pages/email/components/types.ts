export interface Email {
   id: number;
   from: string;
   nickname: string;
   time: string;
   subject: string;
   text: string;
}

export const initialEmails: Email[] = [
   {
      id: 1,
      from: 'alice@example.com',
      nickname: 'Alice',
      time: '2024-06-01 10:00',
      subject: 'Greetings',
      text: 'Hello! How are you?',
   },
   {
      id: 2,
      from: 'bob@example.com',
      nickname: 'Bob',
      time: '2024-06-02 12:30',
      subject: 'File',
      text: 'Please check the attached file.',
   },
];
