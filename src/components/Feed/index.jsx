import React, {Component} from 'react';

import StatusBar from '../StatusBar'
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';

import Styles from './styles.module.css';

export default class Feed extends Component{
    state = {
        posts: [
            {id: '123', comment: 'Hi there', created: '1526825076849'},
            {id: '344', comment: 'Hello', created: '1526825076867'}
        ],
        isSpinning: true
    }
    render () {
        const { posts } = this.state;

        const postsJSX = posts.map((post)=>{
            return <Post key = { post.id } {...post}/>
        });

        return(
            <section className = { Styles.feed }>
                <Spinner isSpinning = { this.state.isSpinning }/>
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        )
    }
}