import React, {Component} from 'react';

import { Consumer } from '../HOC/withProfile'

import Styles from './styles.module.css';


export default class Composer extends Component{
    render() {
        return (
            <Consumer>
            { (context) => (
              <section className = { Styles.composer }>
                 <section>
                     <img src = { context.avatar }/>
                     <form>
                       <textarea placeholder = {`What are you thinking about, ${ context.currentUserFirstName }`}/>
                       <input type = "submit" value = 'Post'/>
                    </form>
                  </section>
               </section>
            )}
        </Consumer>
        )
    }
}