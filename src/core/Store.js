import {createStore} from 'redux'

const SEARCH = "SEARCH"; 
const SET_MOVIES = "SET_MOVIES";

const searchTo = query => ({
    type: SEARCH,
    query
  });

const setMovies = movies => ({
    type: SET_MOVIES,
    movies
});

const initialState = {
    movies: [],
    searchResults: []
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        searchResults: action.movies
      };
      case SEARCH:
      return {
        ...state,
        searchResults: state.movies.filter(movie =>
          movie.Title.toLowerCase().includes(action.query.toLowerCase())
        )
      };
      default:
        return state;
    }
  };

const store = createStore(reducer)
export const actionCreators = {
    setMovies,
    searchTo
}
export default store