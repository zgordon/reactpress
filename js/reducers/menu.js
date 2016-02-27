import { Map } from 'immutable';
import { MENU_LOADED } from '../actions/menu';
import _ from 'underscore';


export default function locations(state = new Map(), action) {
  switch (action.type) {
    case MENU_LOADED:
    const menuItems = action.data;
    return state.withMutations((d) => {
            _.forEach(menuItems, (p) => {
              d.set(p.id, p);
            })
            return d;
      });
    default: return state;
  }
}
