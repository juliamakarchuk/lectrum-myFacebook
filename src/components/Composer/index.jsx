import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../HOC/withProfile'

import Styles from './styles.module.css';


export default class Composer extends Component{
    static propTypes = {
        _createPost: PropTypes.func.isRequired
     }
    constructor (){
        super();
        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this)
    }
    state = {
        comment: ''
    };

    _updateComment (event) {
        // console.log(event.target.value)
        this.setState({
            comment: event.target.value
        })
    }
    _handleFormSubmit (event) {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment () {
        const { comment } = this.state;

        if(!comment) return null;
        this.props._createPost(comment);

        this.setState({
            comment: ''
        })
    }
    _submitOnEnter (event) {
        const enterKey = event.key ==='Enter';
        if(enterKey) {
            event.preventDefault();
            this._submitComment();
        }
    }
    render() {
        const { comment } = this.state;
        return (
            <Consumer>
            { (context) => (
              <section className = { Styles.composer }>
                 <section>
                     <img src = { context.avatar }/>
                     <form onSubmit= { this._handleFormSubmit }>
                       <textarea placeholder = 
                       {`What are you thinking about, ${ context.currentUserFirstName }`} 
                       value = { comment } 
                       onChange = { this._updateComment } 
                       onKeyPress = { this._submitOnEnter }/>
                       <input type = "submit" value = 'Post'/>
                    </form>
                  </section>
               </section>
            )}
        </Consumer>
        )
    }
}