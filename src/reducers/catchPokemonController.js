import {  CATCH_POKEMONS } from '../actions/types';
import _ from 'lodash';

export default function(state = {backpackPoke:[]}, action) {
	switch(action.type) {
		case CATCH_POKEMONS:
		  return { ...state, backpackPoke: _.uniq([...state.backpackPoke,action.payload ], 'name') };
	  }

	return state;
}