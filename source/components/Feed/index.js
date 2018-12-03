import React, {Component} from 'react';
import moment from 'moment';

import { withProfile } from '../HOC/withProfile';
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';

import Styles from './styles.m.css';
import { getUniqueID, delay } from '../../instruments/index';

class Feed extends Component {
    state = {
        posts: [
            {id: '123', comment: 'Hi there', created: '1526825076849', likes: []},
            {id: '344', comment: 'Hello', created: '1526825076867', likes: []},
        ],
        isSpinning: false,
    }

    _setPostsFetchingState = (state) =>{
        this.setState({
            isSpinning: state,
        });
    }

    _createPost = async (comment) =>{
        this._setPostsFetchingState(true);
        const post = {
            id:      getUniqueID(),
            created: moment().utc(),
            comment,
            likes:   [],
        };

        await delay(1600);

        this.setState(({ posts })=>({
            posts:      [ post, ...posts ],
            isSpinning: false,
        }));
    }

    _likePost = async (id) =>{
        let { posts } = this.state;
        const { currentUserFirstName, currentUserLastName} = this.props;
        this._setPostsFetchingState(true);

        await delay(1600);

        const newPosts = posts.map((post)=> {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });
        this.setState({
            posts:      newPosts,
            isSpinning: false,
        });
    }

    _removePost = (id) =>{
        let { posts } = this.state;
        this.setState({
            posts: posts.filter((post) => post.id !== id),
        });
    }

    render () {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post)=>{
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _likePost = { this._likePost }
                    _removePost = { this._removePost }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning }/>
                <StatusBar />
                <Composer _createPost = { this._createPost }/>
                {postsJSX}
            </section>
        );
    }
}
export default withProfile(Feed);
