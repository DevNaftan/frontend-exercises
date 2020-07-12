import React from 'react';
import ReactDOM from 'react-dom';
import './css/invie.css';
import './css/animations.css';
import Invie from './Invie';
import * as serviceWorker from './serviceWorker';
import cheet from 'cheet.js'
import logoPortada from './images/invie.png'
import logoPlatzi from './images/platzi.png'
import acustica from './images/invie-acustica.png'
import classic from './images/invie-classic.png'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import easterA from './images/easter-a.png'
import easterB from './images/easter-b.png'

const initialState = {
  isAnimated: false,
  menu: [
    {
      href: 'index.html',
      title: 'Home'
    },
    {
      href: '#guitarras',
      title: 'Guitarras'
    },
    {
      href: 'precios.html',
      title: 'Precios'
    }
  ],
  logoPortada: {
    logo: logoPortada,
    alt: "Invie logotipo"

  },
  guitarras: [
    {
      image: acustica,
      alt: 'Guitarra Invie Acustica',
      name: 'Invie Acustica',
      features: [
        'Estilo vintage',
        'Madera pura',
        'Incluye estuche invisible de aluminio'
      ]
    },
    {
      image: classic,
      alt: 'Guitarra Invie Classic',
      name: 'Invie Classic',
      features: [
        'Estilo vintage',
        'Liviana',
        'Inicia tu camino como Rockstar'
      ]
    }
  ]
}

function reducer(state, action) {
  switch(action.type) {
    case 'UPDATE_PROPS': {
      const newProps = action.props
      return { ...state, ...newProps }
    }
    default:
      return state
  }
}

const store = createStore(reducer, initialState)

const easter = {
  isAnimated: 'is-animated',
  logoPortada: {
    logo: logoPlatzi,
    alt: "Platzi logotipo"

  },
  guitarras: [
    {
      image: easterA,
      alt: 'Guitarra Padre de Familia',
      name: 'Invie Familia',
      features: [
        'Lista para copiar a los Simpson',
        'Aire puro',
        'Chistes malos'
      ]
    },
    {
      image: easterB,
      alt: 'Guitarra Anime',
      name: 'Invie Anime',
      features: [
        'Estilo vintage',
        'Liviana',
        'Inicia tu camino como Rockstar'
      ]
    }
  ]
}

cheet('i n v i e', () =>{
  store.dispatch({
    type: 'UPDATE_PROPS',
    props: easter
  })
})
cheet('g o b a c k', () =>{
  store.dispatch({
    type: 'UPDATE_PROPS',
    props: initialState
  })
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Invie />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
