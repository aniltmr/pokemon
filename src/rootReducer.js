import { combineReducers } from 'redux';
import search from './reducers/serach_data_controller';
import catchPokemon from './reducers/catchPokemonController';

export default combineReducers({
   search,
   catchPokemon
  });
  