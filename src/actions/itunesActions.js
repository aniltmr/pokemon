import axios from 'axios';
import {GET_SEARCH_DATA, AUTH_TOKEN, GET_ALL_POKEMON, CATCH_POKEMONS} from './types'

export function get_all_search_data(data){
    return{
        type: GET_SEARCH_DATA,
        data
    }
}

export function get_facebook_auth(payload){
    return{
        type: AUTH_TOKEN,
        payload
    }
}

export function getTrackName(search_term){
    return dispatch=>{
        return axios.post("https://itunes.apple.com/search?term="+search_term+"&limit=25").then(res=>{
            // console.log(res.data.results)
             dispatch(get_all_search_data(res.data.results))
        })
    }
}


export function getAllPokemon() {
    return function(dispatch) {
       axios.get('https://pokeapi.co/api/v2/pokemon/?limit=52')
         .then(response => {
            //  console.log('check data...', response.data);
          
         var count =0;
         get_pokemon_details(response.data.results[count].url);
         
         function get_pokemon_details(url){
               axios.get(url)
             .then(res => {
                //  console.log('res data..', res.data);
                 dispatch({type: GET_ALL_POKEMON , payload: res.data});
                 count++;
                 if(count<response.data.results.length){
                     get_pokemon_details(response.data.results[count].url);
                 }
               // console.log('map data name...', camp.name);
           })
         }
         })
         // .catch(error => console.log(error));
    }
  }


  export function catchPokemon(catchpoke) {
    console.log('action backpack', catchpoke);
    return {type: CATCH_POKEMONS , payload: catchpoke}
  }