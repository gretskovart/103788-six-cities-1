import {utils} from '../../helpers';
import {prepareData} from './prepare-data';
import {prepareReviews} from './prepare-reviews';

const {getRandom, getUniqArr, getPlaces} = utils;

const getData = (dispatch, _getState, api) => {
  return api.get(`/hotels`)
    .then((response) => {
      dispatch(actionCreators.getOffers(response.data));
    });
};

const getReviews = (id) => (dispatch, _getState, api) => {
  return api.get(`/comments/${id}`)
    .then((response) => {
      dispatch(actionCreators.getReviews(response.data));
    });
};

const getFavoritePlaces = (data) => {
  return data.filter((it) => it.isFavorite);
};

const getSortedOffers = (type, data) => {
  let sortedOffers;

  switch (type) {
    case `Price: low to high`:
      sortedOffers = data.slice().sort((a, b) => a.price - b.price);
      break;
    case `Price: high to low`:
      sortedOffers = data.slice().sort((a, b) => b.price - a.price);
      break;
    case `Top rated first`:
      sortedOffers = data.slice().sort((a, b) => b.rating - a.rating);
      break;
    case `Popular`:
    default:
      sortedOffers = data.slice().sort((a, b) => a.id - b.id);

  }

  return sortedOffers;
};

const addToFavoriteById = (arr, id) => {
  const changedOffer = Object.assign({}, arr[id - 1], {isFavorite: !arr[id - 1].isFavorite});

  return [...arr.slice(0, id - 1), changedOffer, ...arr.slice(id)];
};

const initialState = {
  data: [],
  citiesList: [],
  citiesListFavoriteHas: [],
  activeCity: ``,
  offers: [],
  favoriteOffers: [],
  activeAppartment: null,
  reviews: [],
  sortType: null,
  selectedOffer: null
};

const actionCreators = {
  changeCity: (selectedCity) => {
    return ({
      type: `changeCity`,
      payload: selectedCity
    });
  },
  getOffers: (data) => {
    return ({
      type: `getOffers`,
      payload: data
    });
  },
  getReviews: (reviews) => {
    return ({
      type: `getReviews`,
      payload: reviews
    });
  },
  selectAppartmentDetail: (offer) => {
    return ({
      type: `selectAppartmentDetail`,
      payload: offer
    });
  },
  sortOffers: (sortType) => {
    return ({
      type: `sortOffers`,
      payload: sortType
    });
  },
  selectActiveOffer: (item) => {
    return ({
      type: `selectActiveOffer`,
      payload: item
    });
  },
  addToFavorite: (id) => {
    return ({
      type: `addToFavorite`,
      payload: id
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `changeCity`:
      return Object.assign({}, state, {
        activeCity: action.payload,
        offers: getSortedOffers(state.sortType, getPlaces(action.payload, state.data))
      });
    case `getOffers`:
      const offers = prepareData(action.payload);
      let favoriteOffers = getFavoritePlaces(offers);
      const citiesList = getUniqArr((offers).map((it) => it.city));
      const citiesListFavoriteHas = getUniqArr((favoriteOffers).map((it) => it.city));
      const rndCity = citiesList[getRandom(0, citiesList.length - 1)];

      return Object.assign({}, state, ({
        citiesList,
        citiesListFavoriteHas,
        activeCity: rndCity,
        data: offers,
        offers: getSortedOffers(state.sortType, getPlaces(rndCity, offers)),
        favoriteOffers
      }));
    case `selectAppartmentDetail`:
      return Object.assign({}, state, ({
        activeAppartment: action.payload
      }));
    case `getReviews`:
      const reviews = prepareReviews(action.payload);

      return Object.assign({}, state, ({
        reviews
      }));
    case `sortOffers`:
      const sortedOffers = getSortedOffers(action.payload, state.offers);

      return Object.assign({}, state, ({
        offers: sortedOffers,
        sortType: action.payload
      }));
    case `selectActiveOffer`:
      return Object.assign({}, state, ({
        selectedOffer: action.payload
      }));
    case `addToFavorite`:
      const changedData = addToFavoriteById(state.data, action.payload);
      const activeAppartment = state.activeAppartment ? addToFavoriteById([state.activeAppartment], 1)[0] : null;
      favoriteOffers = getFavoritePlaces(changedData);

      return Object.assign({}, state, ({
        data: changedData,
        offers: getSortedOffers(state.sortType, getPlaces(state.activeCity, changedData)),
        favoriteOffers,
        citiesListFavoriteHas: getUniqArr((favoriteOffers).map((it) => it.city)),
        activeAppartment
      }));
    default:
      return state;
  }
};

export {actionCreators, reducer, getData, getReviews};
