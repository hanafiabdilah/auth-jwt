import React from 'react'

const Layout = (props) => {
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              {props.error && (
                <article className="message is-danger">
                  <div className="message-body">{props.error}</div>
                </article>
              )}
              {props.form}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Layout
