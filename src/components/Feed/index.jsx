import React, {Component} from 'react';

import StatusBar from '../StatusBar'
import Composer from '../Composer';
import Post from '../Post';

import Styles from './styles.module.css';

export default class Feed extends Component{

    render () {
        const { avatar, currentUserFirstName } = this.props;
        return(
            <section className = { Styles.feed }>
                <StatusBar { ...this.props }/>
                <Composer 
                  avatar = { avatar }
                  currentUserFirstName = { currentUserFirstName }/>
                <Post { ...this.props } />
            </section>
        )
    }
}