import React, {Component} from 'react';

import Feed from './components/Feed';
import './theme/init.css'
import avatar from './theme/assets/lisa.png';

const options = {
    avatar,
    currentUserFirstName: 'Lisa',
    currentUserLastName: 'Simpson'
}

export default class App extends Component {

    render () {
        return <Feed { ...options } />
    }
}
