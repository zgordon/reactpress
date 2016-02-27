export const PAGES_LOADED = 'PAGES_LOADED';
export const PAGES_LOADED_ERROR = 'PAGES_LOADED_ERROR';

export function loadPages(){
  const url = 'http://www.example.dev/wp-json/wp/v2/pages';
  return dispatch => {
    return fetch(url)
       .then(
        (res) => res.json()
      ).then(
        (data) => {
          dispatch({type:PAGES_LOADED, data})
        }
      ).catch((error) => {
        dispatch({type:PAGES_LOADED_ERROR, error})
      })
  }
}
