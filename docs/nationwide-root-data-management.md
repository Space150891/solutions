# Nationwide Root Data Management System

## Overview

The Nationwide Root Data Management System is a centralized data repository designed to efficiently organize and retrieve universal data across the entire healthcare system. It provides a hierarchical structure for storing, managing, and accessing documents and folders with various access levels (national, regional, local).

## Key Features

- **Hierarchical Data Organization**: Organize data in a folder structure with unlimited nesting capabilities
- **Access Level Control**: Control data visibility through national, regional, and local access levels
- **Advanced Filtering**: Filter data by access level, region, facility, category, tags, and date range
- **Version Control**: Track document versions with complete version history
- **Metadata Management**: Add custom metadata to documents and folders
- **Search Capabilities**: Full-text search across all documents and folders
- **Sorting Options**: Sort by name, creation date, modification date, and file size
- **Grid/List Views**: Toggle between grid and list views for better visualization

## Architecture

The system is built using a Redux-based state management approach with the following components:

### Data Models

#### Folder
```typescript
interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  type: 'folder';
  category?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  accessLevel: 'national' | 'regional' | 'local';
  region?: string;
  facility?: string;
  createdBy: string;
}
```

#### Document
```typescript
interface Document {
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
  category?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  accessLevel: 'national' | 'regional' | 'local';
  region?: string;
  facility?: string;
  createdBy: string;
  version: number;
  versionHistory?: {
    version: number;
    updatedAt: string;
    updatedBy: string;
    url: string;
  }[];
}
```

### Redux State Management

The system uses Redux for state management with the following structure:

```typescript
interface RootDataManagementState {
  items: {
    [id: string]: DataItem;
  };
  isLoading: boolean;
  error: string | null;
  currentFolderId: string | null;
  searchQuery: string;
  filters: {
    accessLevel?: 'national' | 'regional' | 'local';
    region?: string;
    facility?: string;
    category?: string;
    tags?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
  };
  sortBy: 'name' | 'createdAt' | 'updatedAt' | 'size';
  sortDirection: 'asc' | 'desc';
}
```

### API Integration

The system is designed for easy backend integration with the following API endpoints:

- `GET /api/data-items`: Fetch all data items
- `GET /api/data-items/:id`: Fetch a specific data item
- `POST /api/folders`: Create a new folder
- `POST /api/documents`: Upload a new document
- `PUT /api/data-items/:id`: Update a data item
- `DELETE /api/data-items/:id`: Delete a data item

## Usage Guidelines

### Access Level Management

- **National**: Data accessible across all regions and facilities
- **Regional**: Data accessible only within a specific region
- **Local**: Data accessible only within a specific facility

### Document Versioning

When uploading a new version of an existing document:

1. The version number is incremented
2. The previous version is stored in the version history
3. The document's `updatedAt` and `updatedBy` fields are updated

### Metadata Management

Custom metadata can be added to both folders and documents to provide additional context and improve searchability. Metadata is stored as key-value pairs.

### Tags Management

Tags can be added to both folders and documents to categorize and filter content. Multiple tags can be assigned to a single item.

## Security Considerations

- Access control should be enforced at the API level
- Document URLs should be secured and time-limited
- All actions should be logged for audit purposes
- Sensitive operations (delete, update) should require confirmation

## Future Enhancements

- **Collaborative Editing**: Allow multiple users to edit documents simultaneously
- **Workflow Integration**: Add approval workflows for document publishing
- **Advanced Search**: Implement full-text search within document contents
- **Mobile Support**: Optimize for mobile device access
- **Offline Mode**: Enable offline access and synchronization
- **Analytics Dashboard**: Add usage statistics and analytics 