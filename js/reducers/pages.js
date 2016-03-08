import { Map } from 'immutable';
import { PAGES_LOADED } from '../actions/pages';
import _ from 'underscore';


export default function locations(state = new Map(), action) {
  switch (action.type) {
    case PAGES_LOADED:
    const pages = action.data;
    return state.withMutations((d) => {
            _.forEach(pages, (p) => {
              d.set(p.id, p);
            })
            return d;
      });
    default: return state;
  }
}
