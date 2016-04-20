import './Application.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';

class Application extends Component {
    render() {
        return (
            <div id="application">
                <Navigation/>
                <div id="pages">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
};

export default connect((state) => state)(Application);
