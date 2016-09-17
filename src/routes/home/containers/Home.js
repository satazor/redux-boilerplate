import './Home.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div className="page page-home">
                Home!
            </div>
        );
    }
}

export default connect((state) => state)(Home);
