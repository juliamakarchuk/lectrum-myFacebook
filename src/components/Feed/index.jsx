import React, {Component} from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'greensock';

import { withProfile } from '../HOC/withProfile';
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';
import Catcher from '../Catcher';
import Postman from '../Postman';

import Styles from './styles.module.css';
import { delay } from '../../instruments/index';
import { api, TOKEN, GROUP_ID } from '../../config/api';
import { socket } from '../../socket/init';

 
class Feed extends Component{
    state = {
        posts: [],
        isSpinning: false
    }

    componentDidMount (){
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPosts();
        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON)=>{
            const { data: createdPost, meta } = JSON.parse(postJSON);
           
            if(`${currentUserFirstName} ${currentUserLastName}` 
            !==`${meta.authorFirstName} ${meta.authorLastName}`){
              this.setState(({ posts })=>({
                  posts: [createdPost, ...posts],
              }))
            }
        });
        socket.on('remove', (postJSON)=>{
            const { data: removePost, meta } = JSON.parse(postJSON);
           
            if(`${currentUserFirstName} ${currentUserLastName}` 
            !==`${meta.authorFirstName} ${meta.authorLastName}`){
              this.setState(({ posts })=>({
                  posts: posts.filter((post)=>post.id!== removePost.id)
              }))
            }
        });

        socket.on('like', (postJSON)=>{
            const { data: likedPost, meta } = JSON.parse(postJSON);
            if(`${currentUserFirstName} ${currentUserLastName}` 
            !==`${meta.authorFirstName} ${meta.authorLastName}`){
                this.setState(( {posts }) =>({
                    posts: posts.map(post=> post.id === likedPost.id ? likedPost : post)
                }))
            }
        });
    }
    componentWillUnMount (){
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostsFetchingState = ( state ) =>{
        this.setState({
            isSpinning : state
        })
    }
    
    _fetchPosts = async () =>{
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET'
        });
        
        const { data: posts } = await response.json();

        this.setState({
            posts, 
            isSpinning: false
        })
    }

    _createPost = async (comment) =>{
        this._setPostsFetchingState(true);

        const response = await fetch (api, {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify({ comment })
        });

        const { data: post } = await response.json(); 
        await delay (1600);

        this.setState(({ posts })=>({
            posts: [post, ...posts],
            isSpinning: false
        }))
    }
    
    _likePost = async (id) =>{
    this._setPostsFetchingState(true);
    const response = await fetch (`${api}/${id}`, {
        method: 'PUT',
        headers:{
            Authorization: TOKEN
        },
    });
    const { data: likedPost } = await response.json();

    this.setState(( {posts }) =>({
        posts: posts.map(post=> post.id === likedPost.id ? likedPost : post),
        isSpinning: false
    }))
    }

    _removePost = async (id) =>{
      this._setPostsFetchingState(true);

      const response = await fetch(`${api}/${id}`,{
        method: 'PUT',
        headers:{
            Authorization: TOKEN
        },
      });

      this.setState(( {posts }) =>({
        posts: posts.filter((post)=> post.id!==id),
        isSpinning: false
    }))
    }

    _animateComposerEnter = (composer) =>{
        fromTo(composer,
                1,
                { opacity: 0, rotationX: 50 },
                { opacity: 1, rotationX: 0 });
    };

    render () {
        const { posts , isSpinning } = this.state;

        const postsJSX = posts.map((post)=>{
            return (
            <Catcher key = {post.id}>
            <Post 
                {...post} 
                _likePost = { this._likePost } 
                _removePost = { this._removePost }/>
            </Catcher>
            )
        });

        return(
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning }/>
                <StatusBar />
                <Transition
                  in
                  appear
                  timeout = { 2000 }
                  onEnter = { this._animateComposerEnter }>
                   <Composer _createPost = { this._createPost }/>
                </Transition>
                <Postman />
                {postsJSX}
            </section>
        )
    }
}
export default withProfile(Feed);