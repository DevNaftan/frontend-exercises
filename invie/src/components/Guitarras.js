import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'

function mapStateToProps(state) {
  return {
    guitarras: state.guitarras
  }
}

class Guitarras extends Component {
  render() {
    return (
      <section id="guitarras" className="guitarras contenedor">
        <h2>Nuestra guitarras</h2>
        <div className="video-demo-contenedor">
          <div className="video-demo">
            <div className="video-responsive-contenedor">
              <iframe className="video-responsive-src" title="Vídeo de YouTube" width="560" height="315" src="https://www.youtube.com/embed/R1dW8M4EqYY" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
        {this.props.guitarras.map((guitarra, index) => {
          return (
            <article className="guitarra" key={index}>
              <CSSTransitionGroup
                transitionName="flicker"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                  <img
                    className="guitarra-image"
                    src={guitarra.image}
                    key={guitarra.image}
                    alt={guitarra.alt}
                    width="350"
                  />
              </CSSTransitionGroup>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeave={false}
              >
                  <div className="contenedor-guitarra" key={guitarra.name}>
                    <h3 className="guitarra-name">{guitarra.name}</h3>
                    <ol>
                      {guitarra.features.map((features, index) => {
                        return (
                          <li key={index}>{features}</li>
                        )
                      })}
                    </ol>
                  </div>
              </CSSTransitionGroup>
            </article>
          )
        })}
      </section>
    )
  }
}

export default connect(mapStateToProps)(Guitarras)
