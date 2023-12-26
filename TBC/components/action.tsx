import { Action } from 'redux';

interface ToggleExpandedCardAction extends Action {
  type: 'TOGGLE_EXPANDED_CARD';
  payload: string; // Assuming item ID is a string
}

interface FontsLoadedAction extends Action {
  type: 'FONT_LOADED';
  payload: 'poppins' | 'noto';
}

export const toggleExpandedCard: (id: string) => ToggleExpandedCardAction = (id) => ({
  type: 'TOGGLE_EXPANDED_CARD',
  payload: id,
});

export const fontsLoaded: (font: 'poppins' | 'noto') => FontsLoadedAction = (font) => ({
  type: 'FONT_LOADED',
  payload: font,
});
