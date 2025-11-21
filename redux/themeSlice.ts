import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  darkMode: boolean;
  customColor: string; // for custom accent
};

const initialState: ThemeState = {
  darkMode: false,
  customColor: '#1DB954', // Spotify green default
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setCustomColor: (state, action: PayloadAction<string>) => {
      state.customColor = action.payload;
    },
    setTheme: (state, action: PayloadAction<{ darkMode: boolean; customColor?: string }>) => {
      state.darkMode = action.payload.darkMode;
      if (action.payload.customColor) state.customColor = action.payload.customColor;
    },
  },
});

export const { toggleTheme, setCustomColor, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
