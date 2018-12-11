import React, {Component} from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'greensock';

import Styles from './styles.module.css';
import { withProfile } from '../HOC/withProfile';

class Postman extends Component {

    _animatePostmanEnter = (postman) => {
        fromTo(postman,
               1,
               { opacity: 0, rotationY: -100 },
               { opacity: 1, rotationY: 0 })
    }
    _animatePostmanExit = (postman) => {
       fromTo(postman,
              1,
              { opacity: 1, rotationY: -100 },
              { opacity: 0, rotation: -360 }
            )
    }
   render(){

    const {avatar, currentUserFirstName} = this.props;

    return (
        <Transition
        in
        appear
        timeout = { 5000 }
        onEntering = { this._animatePostmanEnter }
        onEntered = { this._animatePostmanExit }
        >
        <section className = { Styles.postman }>
          <img src = { avatar } className = { Styles.image }/>
          <span> Wellcome online, { currentUserFirstName }</span>
        </section>
        </Transition>
    )
   }

}


export default withProfile(Postman);