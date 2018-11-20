import React, { Component } from 'react';

import {Consumer} from '../HOC/withProfile'

import Styles from './styles.module.css';


export default class StatusBar extends Component {
    render () {
       return(
        <Consumer>
           {(context) => (
              <section className = {Styles.statusBar}>
                 <button>
                    <img src = { context.avatar }/>
                    <span> { context.currentUserFirstName } </span>
                     &nbsp;
                    <span> { context.currentUserLastName } </span>
                 </button>
                </section>
            )}
          </Consumer>
       )
    }
}