import React, {Component} from 'react';
import moment from 'moment';

import StatusBar from '../StatusBar'
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';

import Styles from './styles.module.css';
import { getUniqueID, delay } from '../../instruments/index';

export default class Feed extends Component{
    constructor () {
        super();

        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._removePost = this._removePost.bind(this)
    }
    state = {
        posts: [
            {id: '123', comment: 'Hi there', created: '1526825076849', likes:[]},
            {id: '344', comment: 'Hello', created: '1526825076867', likes:[]}
        ],
        isSpinning: false
    }

    _setPostsFetchingState ( state ) {
        this.setState({
            isSpinning : state
        })
    }

    async _createPost (comment){
        this._setPostsFetchingState(true);
        const post = {
            id: getUniqueID(),
            created: moment().utc(),
            comment,
            likes: []
        };

        await delay (1600);

        this.setState(({ posts })=>({
            posts: [post, ...posts],
            isSpinning: false
        }))
    }
    
    async _likePost (id) {
       const { currentUserFirstName, currentUserLastName} = this.props;
       this._setPostsFetchingState(true);

       await delay(1600);
       
       const newPosts = this.state.posts.map(post=> {
           if(post.id === id) {
               return {
                   ...post,
                   likes:[
                       {
                           id: getUniqueID(),
                           firstName: currentUserFirstName,
                           lastName: currentUserLastName
                       }
                   ]
               }
           }
           return post;
       })
       this.setState({
           posts: newPosts,
           isSpinning: false
       })
    }

    _removePost (id) {
      this.setState({
          posts: this.state.posts.filter(post => post.id !== id)
      })
    }

    render () {
        console.log('props',this.props)
        const { posts } = this.state;

        const postsJSX = posts.map((post)=>{
            return <Post key = { post.id } {...post} _likePost = { this._likePost } _removePost = { this._removePost }/>
        });

        return(
            <section className = { Styles.feed }>
                <Spinner isSpinning = { this.state.isSpinning }/>
                <StatusBar />
                <Composer _createPost = { this._createPost }/>
                {postsJSX}
            </section>
        )
    }
}