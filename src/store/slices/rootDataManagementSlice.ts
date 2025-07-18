import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Define types for the root data management
export interface Folder {
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

export type DataItem = Folder | Document;

export interface RootDataManagementState {
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

const initialState: RootDataManagementState = {
  items: {},
  isLoading: false,
  error: null,
  currentFolderId: null,
  searchQuery: '',
  filters: {},
  sortBy: 'name',
  sortDirection: 'asc',
};

// Mock API functions (to be replaced with actual API calls)
const mockFetchItems = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This would be replaced with an actual API call
  const mockData: DataItem[] = [
    {
      id: 'folder-national-policies',
      name: 'National Policies',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: null,
      type: 'folder',
      accessLevel: 'national',
      createdBy: 'system',
    },
    {
      id: 'folder-regional-guidelines',
      name: 'Regional Guidelines',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: null,
      type: 'folder',
      accessLevel: 'regional',
      region: 'Northeast',
      createdBy: 'system',
    },
    {
      id: 'doc-national-healthcare-policy',
      name: 'National Healthcare Policy 2023.pdf',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      folderId: 'folder-national-policies',
      type: 'document',
      source: 'internal',
      fileType: 'application/pdf',
      size: 2500000,
      url: '#',
      accessLevel: 'national',
      createdBy: 'system',
      version: 1,
    },
  ];

  return mockData;
};

// Async thunks
export const fetchItems = createAsyncThunk(
  'rootDataManagement/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const data = await mockFetchItems();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createFolder = createAsyncThunk(
  'rootDataManagement/createFolder',
  async (folderData: Partial<Folder>, { rejectWithValue }) => {
    try {
      // This would be an API call in a real application
      const newFolder: Folder = {
        id: uuidv4(),
        name: folderData.name || 'New Folder',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        parentId: folderData.parentId || null,
        type: 'folder',
        accessLevel: folderData.accessLevel || 'local',
        region: folderData.region,
        facility: folderData.facility,
        category: folderData.category,
        tags: folderData.tags,
        metadata: folderData.metadata,
        createdBy: folderData.createdBy || 'current-user',
      };
      
      return newFolder;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const uploadDocument = createAsyncThunk(
  'rootDataManagement/uploadDocument',
  async (documentData: Partial<Document>, { rejectWithValue }) => {
    try {
      // This would be an API call in a real application
      const newDocument: Document = {
        id: uuidv4(),
        name: documentData.name || 'New Document',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        folderId: documentData.folderId || null,
        type: 'document',
        source: documentData.source || 'internal',
        fileType: documentData.fileType || 'application/pdf',
        size: documentData.size || 0,
        url: documentData.url || '#',
        accessLevel: documentData.accessLevel || 'local',
        region: documentData.region,
        facility: documentData.facility,
        category: documentData.category,
        tags: documentData.tags,
        metadata: documentData.metadata,
        createdBy: documentData.createdBy || 'current-user',
        version: 1,
      };
      
      return newDocument;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'rootDataManagement/deleteItem',
  async (itemId: string, { rejectWithValue, getState }) => {
    try {
      // This would be an API call in a real application
      return itemId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the slice
const rootDataManagementSlice = createSlice({
  name: 'rootDataManagement',
  initialState,
  reducers: {
    setCurrentFolder: (state, action: PayloadAction<string | null>) => {
      state.currentFolderId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<RootDataManagementState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setSortBy: (state, action: PayloadAction<RootDataManagementState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<RootDataManagementState['sortDirection']>) => {
      state.sortDirection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Convert array to object with IDs as keys
        const itemsObject: Record<string, DataItem> = {};
        action.payload.forEach(item => {
          itemsObject[item.id] = item;
        });
        
        state.items = itemsObject;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Create folder
      .addCase(createFolder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items[action.payload.id] = action.payload;
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Upload document
      .addCase(uploadDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items[action.payload.id] = action.payload;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Delete item
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const itemId = action.payload;
        const item = state.items[itemId];
        
        if (item) {
          // Delete the item
          delete state.items[itemId];
          
          // If it's a folder, recursively delete all items inside
          if (item.type === 'folder') {
            Object.values(state.items).forEach(currentItem => {
              if (currentItem.type === 'folder' && currentItem.parentId === itemId) {
                // Recursively delete subfolders
                // Note: In a real implementation, we would need a more efficient way to handle this
                // This is simplified for demonstration
                delete state.items[currentItem.id];
              } else if (currentItem.type === 'document' && currentItem.folderId === itemId) {
                // Delete documents in the folder
                delete state.items[currentItem.id];
              }
            });
          }
        }
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const {
  setCurrentFolder,
  setSearchQuery,
  setFilters,
  clearFilters,
  setSortBy,
  setSortDirection,
} = rootDataManagementSlice.actions;

export default rootDataManagementSlice.reducer;

// Base selectors
const selectRootDataManagement = (state: { rootDataManagement: RootDataManagementState }) => 
  state.rootDataManagement;

const selectItems = (state: { rootDataManagement: RootDataManagementState }) => 
  state.rootDataManagement.items;

const selectCurrentFolderId = (state: { rootDataManagement: RootDataManagementState }) => 
  state.rootDataManagement.currentFolderId;

const selectSearchQuery = (state: { rootDataManagement: RootDataManagementState }) => 
  state.rootDataManagement.searchQuery;

const selectFilters = (state: { rootDataManagement: RootDataManagementState }) => 
  state.rootDataManagement.filters;

const selectSortBy = (state: { rootDataManagement: RootDataManagementState }) => 
  state.rootDataManagement.sortBy;

const selectSortDirection = (state: { rootDataManagement: RootDataManagementState }) => 
  state.rootDataManagement.sortDirection;

// Memoized selectors
export const selectAllItems = createSelector(
  [selectItems],
  (items) => Object.values(items)
);

export const selectCurrentFolderItems = createSelector(
  [selectItems, selectCurrentFolderId],
  (items, currentFolderId) => 
    Object.values(items).filter(item => 
      item.type === 'folder' ? item.parentId === currentFolderId : 
      item.type === 'document' ? item.folderId === currentFolderId : false
    )
);

export const selectItemById = (id: string) => 
  createSelector(
    [selectItems],
    (items) => items[id]
  );

export const selectFilteredItems = createSelector(
  [selectItems, selectSearchQuery, selectFilters, selectCurrentFolderId, selectSortBy, selectSortDirection],
  (items, searchQuery, filters, currentFolderId, sortBy, sortDirection) => {
    // Filter by current folder
    let filteredItems = Object.values(items).filter(item => 
      item.type === 'folder' ? item.parentId === currentFolderId : 
      item.type === 'document' ? item.folderId === currentFolderId : false
    );
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    if (filters.accessLevel) {
      filteredItems = filteredItems.filter(item => item.accessLevel === filters.accessLevel);
    }
    
    if (filters.region) {
      filteredItems = filteredItems.filter(item => item.region === filters.region);
    }
    
    if (filters.facility) {
      filteredItems = filteredItems.filter(item => item.facility === filters.facility);
    }
    
    if (filters.category) {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filteredItems = filteredItems.filter(item => 
        item.tags && filters.tags?.some(tag => item.tags?.includes(tag))
      );
    }
    
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filteredItems = filteredItems.filter(item => {
        const itemDate = new Date(item.updatedAt);
        return itemDate >= new Date(start) && itemDate <= new Date(end);
      });
    }
    
    // Sort items
    filteredItems.sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'updatedAt') {
        return sortDirection === 'asc'
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortBy === 'size' && 'size' in a && 'size' in b) {
        return sortDirection === 'asc'
          ? a.size - b.size
          : b.size - a.size;
      }
      return 0;
    });
    
    return filteredItems;
  }
);

export const selectBreadcrumbPath = createSelector(
  [selectItems, selectCurrentFolderId],
  (items, currentFolderId) => {
    const path: Folder[] = [];
    
    let currentId = currentFolderId;
    while (currentId) {
      const folder = items[currentId];
      if (folder && folder.type === 'folder') {
        path.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    
    return path;
  }
); 