import './Navigation.css';
import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Navigation extends Component {
    render() {
        return (
            <div id="navigation">
                <ul>
                    <li><IndexLink to={ '/' } activeClassName="is-active">Home</IndexLink></li>
                    <li><Link to={ '/todos' } activeClassName="is-active">Todos</Link></li>
                </ul>
            </div>
        );
    }
}
