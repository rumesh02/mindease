/**
 * Tips Slice
 * Manages wellness tips and favourites state
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  fetchTips as apiFetchTips, 
  fetchTipById as apiFetchTipById,
  addFavourite as apiAddFavourite,
  removeFavourite as apiRemoveFavourite,
  fetchUserFavourites as apiFetchUserFavourites
} from '../services/api';

const FAVOURITES_KEY = 'mindease_favourites';
const COMPLETIONS_KEY = 'mindease_completions';

// Load favourites from AsyncStorage
export const loadFavouritesFromStorage = createAsyncThunk(
  'tips/loadFavouritesFromStorage',
  async () => {
    try {
      const favouritesData = await AsyncStorage.getItem(FAVOURITES_KEY);
      return favouritesData ? JSON.parse(favouritesData) : [];
    } catch (error) {
      console.error('Error loading favourites:', error);
      return [];
    }
  }
);

// Load completions from AsyncStorage
export const loadCompletionsFromStorage = createAsyncThunk(
  'tips/loadCompletionsFromStorage',
  async () => {
    try {
      const completionsData = await AsyncStorage.getItem(COMPLETIONS_KEY);
      return completionsData ? JSON.parse(completionsData) : {};
    } catch (error) {
      console.error('Error loading completions:', error);
      return {};
    }
  }
);

// Fetch all tips
export const fetchTips = createAsyncThunk(
  'tips/fetchTips',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetchTips();
      return response.tips;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch tips');
    }
  }
);

// Fetch single tip
export const fetchTipById = createAsyncThunk(
  'tips/fetchTipById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiFetchTipById(id);
      return response.tip;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch tip');
    }
  }
);

// Add to favourites
export const addToFavourites = createAsyncThunk(
  'tips/addToFavourites',
  async ({ userId, tipId, tipData }, { getState, rejectWithValue }) => {
    try {
      // Add to backend
      await apiAddFavourite(userId, tipId, tipData);
      
      // Update AsyncStorage
      const { tips } = getState();
      const updatedFavourites = [...tips.favourites, tipData];
      await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(updatedFavourites));
      
      return tipData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add favourite');
    }
  }
);

// Remove from favourites
export const removeFromFavourites = createAsyncThunk(
  'tips/removeFromFavourites',
  async ({ favouriteId, tipId, userId }, { getState, rejectWithValue }) => {
    try {
      // Remove from backend if favouriteId exists
      if (favouriteId) {
        await apiRemoveFavourite(favouriteId, userId);
      }
      
      // Update AsyncStorage
      const { tips } = getState();
      const updatedFavourites = tips.favourites.filter(fav => fav.id !== tipId);
      await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(updatedFavourites));
      
      return tipId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove favourite');
    }
  }
);

// Toggle tip completion
export const toggleTipCompletion = createAsyncThunk(
  'tips/toggleTipCompletion',
  async ({ tipId }, { getState, rejectWithValue }) => {
    try {
      const { tips } = getState();
      const today = new Date().toDateString();
      const updatedCompletions = { ...tips.completions };
      
      if (updatedCompletions[tipId] === today) {
        // Already completed today, so mark as not completed
        delete updatedCompletions[tipId];
      } else {
        // Mark as completed today
        updatedCompletions[tipId] = today;
      }
      
      await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(updatedCompletions));
      return updatedCompletions;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to toggle completion');
    }
  }
);

const tipsSlice = createSlice({
  name: 'tips',
  initialState: {
    allTips: [],
    currentTip: null,
    favourites: [],
    completions: {}, // { tipId: dateString }
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTip: (state) => {
      state.currentTip = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load favourites from storage
      .addCase(loadFavouritesFromStorage.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      // Load completions from storage
      .addCase(loadCompletionsFromStorage.fulfilled, (state, action) => {
        state.completions = action.payload;
      })
      // Toggle tip completion
      .addCase(toggleTipCompletion.fulfilled, (state, action) => {
        state.completions = action.payload;
      })
      // Fetch tips
      .addCase(fetchTips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTips.fulfilled, (state, action) => {
        state.loading = false;
        state.allTips = action.payload;
      })
      .addCase(fetchTips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single tip
      .addCase(fetchTipById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTipById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTip = action.payload;
      })
      .addCase(fetchTipById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to favourites
      .addCase(addToFavourites.fulfilled, (state, action) => {
        state.favourites.push(action.payload);
      })
      // Remove from favourites
      .addCase(removeFromFavourites.fulfilled, (state, action) => {
        state.favourites = state.favourites.filter(fav => fav.id !== action.payload);
      });
  },
});

export const { clearError, clearCurrentTip } = tipsSlice.actions;
export default tipsSlice.reducer;
