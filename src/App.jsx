import React, {Component} from 'react';

import Feed from './components/Feed';
import Catcher from './components/Catcher';
import {Provider} from './components/HOC/withProfile';

import './theme/init.css'
import avatar from './theme/assets/lisa.png';

const options = {
    avatar,
    currentUserFirstName: 'Юлия',
    currentUserLastName: 'Макарчук'
}

export default class App extends Component {

    render () {
        return (
            <Catcher>
               <Provider value = { options } >
                  <Feed />
                </Provider>
            </Catcher>
        )
    }
}
