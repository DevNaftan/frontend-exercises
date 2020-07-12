import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import Heart from './Heart'

function mapStateToProps(state) {
  return {
    isAnimated: state.isAnimated,
    logo: state.logoPortada.logo,
    alt: state.logoPortada.alt,
    menu: state.menu
  }
}

class Portada extends Component {
  renderHear() {
    const hearts = new Array(100).fill({})
    let count = 0
    return (
      hearts.map(element => {
        const style ={
          left: Math.floor(Math.random() * (window.innerWidth - 75)) + "px",
          animationDelay: Math.floor(Math.random() * (10000 - 0)) + 0 + "ms"
        }
        return (
          <Heart key={`${element}${count++}`} style={style}/>
        )
      })
    )
  }
  render() {
    return (
      <section id="portada" className={`portada background ${this.props.isAnimated}`}>
        <header id="header" className="header contenedor">
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeave={false}
          >
            <figure key={this.props.logo} className="logotipo">
              <img src={this.props.logo} width="186" height="60" alt={this.props.alt}/>
            </figure>
          </CSSTransitionGroup>
          <CSSTransitionGroup
            transitionName="fadeInOut"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={800}
          >
            {
              !this.props.isAnimated &&
              <nav className="menu" id="menu">
                <span className="burguer-button icon-menu" id="burguer-button"></span>
                <ul>
                  {this.props.menu.map((item => {
                    return (
                      <li key={item.href}>
                        <a href={item.href}>{item.title}</a>
                      </li>
                    )
                  }))}
                </ul>
              </nav>
            }
          </CSSTransitionGroup>
        </header>
        <CSSTransitionGroup
          transitionName="animationInOut"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
          {
            !this.props.isAnimated &&
            <div className="contenedor">
              <h1 className="titulo">Guitarras <span>invie</span>sibles</h1>
              <h3 className="title-a">Sé la estrella de rock que siempre quisiste ser</h3>
              <a className="button" href="#guitarras">Conoce mas</a>
            </div>
          }
        </CSSTransitionGroup>
        {
            this.props.isAnimated &&
            this.renderHear()
        }
      </section>
    )
  }
}

export default connect(mapStateToProps)(Portada)
