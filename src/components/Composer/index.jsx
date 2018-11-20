import React, {Component} from 'react';


import Styles from './styles.module.css';


export default class Composer extends Component{
    render() {
        const { avatar, currentUserFirstName } = this.props;
        return (
            <section className = { Styles.composer }>
                <section>
                    <img src = { avatar }/>
                    <form>
                        <textarea placeholder = {`What are you thinking about, ${ currentUserFirstName }`}/>
                        <input type = "submit" value = 'Post'/>
                    </form>
                </section>
            </section>
        )
    }
}