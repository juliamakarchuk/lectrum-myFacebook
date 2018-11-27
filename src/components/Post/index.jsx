import React, {Component} from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

import { Consumer } from '../HOC/withProfile';
import Like from '../Like'

import Styles from './styles.module.css';

export default class Post extends Component{
    static propTypes = {
        id:        string.isRequired,
        comment:   string.isRequired,
        created:   string.isRequired,
        _likePost: func.isRequired,
        _removePost: func.isRequired,
        likes:     array.isRequired
    }
    render() {
        const { comment, created, _likePost, _removePost, id, likes } = this.props;
        return (
            <Consumer>
                {( context ) => (
                    <section className = { Styles.post } >
                       <span className = { Styles.cross } onClick = {()=>_removePost(id)}></span>
                        <img src = { context.avatar } />
                        <a> {`${ context.currentUserFirstName } ${ context.currentUserLastName }`} </a>
                        <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{ comment }</p>
                        <Like 
                          _likePost = { _likePost } 
                          id ={ id } 
                          likes={ likes }
                          {...context}
                        />
                   </section>
                )}
            </Consumer>
        )
    }
}