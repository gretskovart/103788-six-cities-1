import React from 'react';
import Favorites from './favorites.jsx';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducer';
import {BrowserRouter} from 'react-router-dom';

const store = createStore(reducer);

Enzyme.configure({adapter: new Adapter()});

it(`<Favorites /> renders correctly`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);

  const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites favoriteOffers={[]} citiesListFavoriteHas={[]} />
        </BrowserRouter>
      </Provider>
      , {attachTo: div});

  expect(wrapper).toMatchSnapshot();
});
