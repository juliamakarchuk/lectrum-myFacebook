import React, {Component} from 'react';

import StatusBar from '../StatusBar'
import Composer from '../Composer';
import Post from '../Post';

import Styles from './styles.module.css';

export default class Feed extends Component{

    render () {
        
        return(
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                <Post />
            </section>
        )
    }
}