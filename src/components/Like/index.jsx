import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import classNames from 'classnames';

import { withProfile } from '../HOC/withProfile';

import Styles from './styles.module.css';

 class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(shape({
                   firstName: string.isRequired,
                   lastName: string.isRequired
                   })).isRequired  
    }
    state = {
        showLikers: false
    }

    _showLikers = () => {
        this.setState({
            showLikers: true
        })
    }

    _hideLikers = () => {
        this.setState({
            showLikers: !this.state
        })
    }

    _likePost = () => {
        
        const { _likePost, id } = this.props;

        _likePost (id);
    }

    _getLikeByMe =() => {
        const {currentUserFirstName, currentUserLastName, likes} = this.props;

        return likes.some(({firstName, lastName})=>{
            return(
                `${firstName} ${lastName}` 
                === `${currentUserFirstName} ${currentUserLastName}`
            )
        })
    }
    _getLikeStyles = () => {
        const likeByMe = this._getLikeByMe();

        return classNames(Styles.icon, {
            [Styles.liked]: likeByMe,
        })
    }
    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({firstName, lastName, id})=>
        (<li key = {id}>
           {`${firstName} ${lastName}`}
        </li>));

        return likes.length && showLikers ?  <ul>{likesJSX}</ul> : null;
    }

    _getLikesDescription = () => {
        const {currentUserFirstName, currentUserLastName, likes} = this.props;

        const likeByMe = this._getLikeByMe();

        if(likes.length ===1 && likeByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`
        } else if (likes.length === 2 && likeByMe){
            return `You and ${likes.length-1} other`;
        } else if (likeByMe){
            return `You and ${likes.length-1} others`;
        }
        return likes.length;
    }
    render(){

        const likeStyles = this._getLikeStyles();
        const likerList = this._getLikersList();
        const likesDescription = this._getLikesDescription();

        return (
            <section className = { Styles.like }>
                <span className = { likeStyles } 
                onClick = { this._likePost }>Like</span>
                <div className = {Styles.showLiker}>
                {likerList}
                    <span
                    onMouseEnter = { this._showLikers }
                    onMouseLeave = { this.hideLikers }>
                     {likesDescription}
                    </span>
                </div>
            </section>
        )
    }
}
export default withProfile( Like );