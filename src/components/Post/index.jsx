import React, {Component} from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

import { withProfile } from '../HOC/withProfile';
import Like from '../Like'

import Styles from './styles.module.css';
class Post extends Component{

    static propTypes = {
        id:        string.isRequired,
        comment:   string.isRequired,
        _likePost: func.isRequired,
        _removePost: func.isRequired,
        likes:     array.isRequired
    }
    _getCross = ()=>{
        const { firstName, lastName, currentUserLastName, currentUserFirstName} = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` 
        ? <span className = { Styles.cross } onClick = {()=>this.props._removePost(this.props.id)}></span>
        : null
    }
    render() {
        const { 
            comment,
            created, 
            _likePost, 
            id, 
            likes, 
            avatar, 
            firstName,
            lastName } 
            = this.props;
        
        const cross = this._getCross();
        return (
                    <section className = { Styles.post } >
                    {cross}
                        <img src = { avatar } />
                        <a> {`${ firstName } ${ lastName }`} </a>
                        <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{ comment }</p>
                        <Like 
                          _likePost = { _likePost } 
                          id ={ id } 
                          likes={ likes }
                        />
                   </section>
        )
    }
}

export default withProfile(Post);