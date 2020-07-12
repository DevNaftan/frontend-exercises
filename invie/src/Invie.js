import React, { Component } from 'react';
import Portada from './components/Portada';
import Guitarras from './components/Guitarras';
import Footer from './components/Footer';


class Invie extends Component {
  render() {
    return (
      <main className='Invie'>
        {/* Portada */}
        <Portada />
        {/* Guitarras */}
        <Guitarras />
        {/* Footer */}
        <Footer />
      </main>
    );
  }
}

export default Invie;
