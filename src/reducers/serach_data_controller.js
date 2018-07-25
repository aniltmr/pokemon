import {GET_SEARCH_DATA, AUTH_TOKEN, GET_ALL_POKEMON} from '../actions/types';
import _ from 'lodash';


export default (state= {search_data:"", auth:"", pokemon_details:[]}, action={})=>{
    switch(action.type){
        
        case GET_SEARCH_DATA : 
                            return Object.assign({}, state, {
                            search_data: action.data,
                            });

        case AUTH_TOKEN : 
                            return Object.assign({}, state, {
                            isAuthenticated: true,
                            auth: action.payload,
                            });
        case GET_ALL_POKEMON : 
                            return { ...state, pokemon_details: _.uniq([...state.pokemon_details,action.payload ], 'name') };
        // case CATCH_POKEMONS:
        //                     return { ...state, backpackPoke: _.uniq([...state.backpackPoke,action.payload ], 'name') };
        //                 }
        default: return state;
    }
}