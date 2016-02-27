export const MENU_LOADED = 'MENU_LOADED';
export const MENU_LOADED_ERROR = 'MENU_LOADED_ERROR';

const menu = require('../../api/menus.js');

export function loadMenu(){
  return dispatch => {
    // Simulate api call
    setTimeout(() => {
      dispatch({type:MENU_LOADED, data:menu.items});
    },1000)
  }

  // This is how the function should look like with an endpoint
  /*
  const url = 'http://www.example.dev/wp-json/wp-api-menus/v2/menus/2';
  return dispatch => {
    return fetch(url).then(
        (res) => res.json(),
      ).then(
        (data) => {
          dispatch({type:MENU_LOADED, data})
        }
      ).catch((error) => {
        dispatch({type:MENU_LOADED_ERROR, error})
      })
  }
  */
}
