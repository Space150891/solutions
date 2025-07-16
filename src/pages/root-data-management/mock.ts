export interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  type: 'folder';
}

export interface Document {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  folderId: string | null;
  type: 'document';
  source: 'internal' | 'external';
  fileType: string;
  size: number;
  url: string;
}

export type DataItem = Folder | Document;

// Use mutable arrays so we can modify them for delete operations
let mockFolders: Folder[] = [
  {
    id: 'folder-1',
    name: 'Patient Records',
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-01-15T08:30:00Z',
    parentId: null,
    type: 'folder',
  },
  {
    id: 'folder-2',
    name: 'Administrative Documents',
    createdAt: '2023-01-20T10:15:00Z',
    updatedAt: '2023-01-20T10:15:00Z',
    parentId: null,
    type: 'folder',
  },
  {
    id: 'folder-3',
    name: 'Insurance Claims',
    createdAt: '2023-02-05T14:45:00Z',
    updatedAt: '2023-02-05T14:45:00Z',
    parentId: null,
    type: 'folder',
  },
  {
    id: 'folder-4',
    name: 'Medical Reports',
    createdAt: '2023-02-10T09:20:00Z',
    updatedAt: '2023-02-10T09:20:00Z',
    parentId: 'folder-1',
    type: 'folder',
  },
  {
    id: 'folder-5',
    name: 'Prescriptions',
    createdAt: '2023-02-15T11:30:00Z',
    updatedAt: '2023-02-15T11:30:00Z',
    parentId: 'folder-1',
    type: 'folder',
  },
  {
    id: 'folder-6',
    name: 'HR Documents',
    createdAt: '2023-03-01T08:00:00Z',
    updatedAt: '2023-03-01T08:00:00Z',
    parentId: 'folder-2',
    type: 'folder',
  },
  {
    id: 'folder-7',
    name: 'Financial Reports',
    createdAt: '2023-03-10T13:45:00Z',
    updatedAt: '2023-03-10T13:45:00Z',
    parentId: 'folder-2',
    type: 'folder',
  },
];

let mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Patient Intake Form.pdf',
    createdAt: '2023-01-16T09:45:00Z',
    updatedAt: '2023-01-16T09:45:00Z',
    folderId: 'folder-1',
    type: 'document',
    source: 'internal',
    fileType: 'application/pdf',
    size: 1245678,
    url: '#',
  },
  {
    id: 'doc-2',
    name: 'Medical History.docx',
    createdAt: '2023-01-18T14:30:00Z',
    updatedAt: '2023-01-18T14:30:00Z',
    folderId: 'folder-1',
    type: 'document',
    source: 'internal',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 567890,
    url: '#',
  },
  {
    id: 'doc-3',
    name: 'Insurance Policy.pdf',
    createdAt: '2023-02-06T10:15:00Z',
    updatedAt: '2023-02-06T10:15:00Z',
    folderId: 'folder-3',
    type: 'document',
    source: 'external',
    fileType: 'application/pdf',
    size: 2345678,
    url: '#',
  },
  {
    id: 'doc-4',
    name: 'Blood Test Results.pdf',
    createdAt: '2023-02-12T11:30:00Z',
    updatedAt: '2023-02-12T11:30:00Z',
    folderId: 'folder-4',
    type: 'document',
    source: 'external',
    fileType: 'application/pdf',
    size: 890123,
    url: '#',
  },
  {
    id: 'doc-5',
    name: 'Medication Prescription.pdf',
    createdAt: '2023-02-16T13:45:00Z',
    updatedAt: '2023-02-16T13:45:00Z',
    folderId: 'folder-5',
    type: 'document',
    source: 'internal',
    fileType: 'application/pdf',
    size: 456789,
    url: '#',
  },
  {
    id: 'doc-6',
    name: 'Employee Handbook.docx',
    createdAt: '2023-03-02T09:30:00Z',
    updatedAt: '2023-03-02T09:30:00Z',
    folderId: 'folder-6',
    type: 'document',
    source: 'internal',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 3456789,
    url: '#',
  },
  {
    id: 'doc-7',
    name: 'Q1 Financial Report.xlsx',
    createdAt: '2023-03-12T15:00:00Z',
    updatedAt: '2023-03-12T15:00:00Z',
    folderId: 'folder-7',
    type: 'document',
    source: 'internal',
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1234567,
    url: '#',
  },
  {
    id: 'doc-8',
    name: 'Patient Consent Form.pdf',
    createdAt: '2023-01-20T10:30:00Z',
    updatedAt: '2023-01-20T10:30:00Z',
    folderId: 'folder-1',
    type: 'document',
    source: 'internal',
    fileType: 'application/pdf',
    size: 678901,
    url: '#',
  },
  {
    id: 'doc-9',
    name: 'Insurance Claim Form.pdf',
    createdAt: '2023-02-08T11:45:00Z',
    updatedAt: '2023-02-08T11:45:00Z',
    folderId: 'folder-3',
    type: 'document',
    source: 'external',
    fileType: 'application/pdf',
    size: 789012,
    url: '#',
  },
  {
    id: 'doc-10',
    name: 'X-Ray Report.jpg',
    createdAt: '2023-02-14T14:15:00Z',
    updatedAt: '2023-02-14T14:15:00Z',
    folderId: 'folder-4',
    type: 'document',
    source: 'external',
    fileType: 'image/jpeg',
    size: 5678901,
    url: '#',
  },
];

// Re-export the arrays for components that need direct access
export { mockFolders, mockDocuments };

export const getAllRootItems = (): DataItem[] => {
  return [
    ...mockFolders.filter(folder => folder.parentId === null),
    ...mockDocuments.filter(doc => doc.folderId === null)
  ];
};

export const getItemsByParentId = (parentId: string): DataItem[] => {
  return [
    ...mockFolders.filter(folder => folder.parentId === parentId),
    ...mockDocuments.filter(doc => doc.folderId === parentId)
  ];
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Delete a folder and all its contents (recursive)
export const deleteFolder = (folderId: string): void => {
  // Get all subfolders
  const subFolders = mockFolders.filter(folder => folder.parentId === folderId);
  
  // Recursively delete each subfolder
  subFolders.forEach(folder => deleteFolder(folder.id));
  
  // Delete all documents in this folder
  mockDocuments = mockDocuments.filter(doc => doc.folderId !== folderId);
  
  // Delete the folder itself
  mockFolders = mockFolders.filter(folder => folder.id !== folderId);
};

// Delete a document
export const deleteDocument = (documentId: string): void => {
  mockDocuments = mockDocuments.filter(doc => doc.id !== documentId);
}; 