import React, {Component} from 'react';
import moment from 'moment';

import { Consumer } from '../HOC/withProfile';

import Styles from './styles.module.css';

export default class Post extends Component{
    render() {

        return (
            <Consumer>
                {( context ) => (
                    <section className = { Styles.post } >
                        <img src = { context.avatar } />
                        <a> {`${ context.currentUserFirstName } ${ context.currentUserLastName }`} </a>
                        <time>{moment().format('MMMM D h:mm:ss a')}</time>
                        <p>Howdy</p>
                   </section>
                )}
            </Consumer>
        )
    }
}