import React, { Component } from 'react';

import { withProfile } from '../HOC/withProfile'

import Styles from './styles.module.css';


class StatusBar extends Component {
    render () {
        let { avatar, currentUserFirstName, currentUserLastName} = this.props;
       return(
              <section className = {Styles.statusBar}>
                 <button>
                    <img src = { avatar }/>
                    <span> { currentUserFirstName } </span>
                     &nbsp;
                    <span> { currentUserLastName } </span>
                 </button>
                </section>
       )
    }
}
export default withProfile(StatusBar);