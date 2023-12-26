import { createReducer } from '@reduxjs/toolkit'; 
import { fontsLoaded, toggleExpandedCard } from './action';


interface State {
  expandedCards: Record<string, boolean>;
  fontsLoaded: {
    poppins: boolean;
    noto: boolean;
  };
}

const initialState: State = {
  expandedCards: {},
  fontsLoaded: {
    poppins: false,
    noto: false,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleExpandedCard, (state, action) => {
      state.expandedCards = {
        ...state.expandedCards,
        [action.payload]: !state.expandedCards[action.payload],
      };
    })
    .addCase(fontsLoaded, (state, action) => {
      state.fontsLoaded = {
        ...state.fontsLoaded,
        [action.payload]: true,
      };
    });
});

export default reducer;
