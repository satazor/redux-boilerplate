import './css/application.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import PageTransition from './PageTransition';

class Application extends Component {
    render() {
        return (
            <div id="application">
                <Navigation/>
                <div id="pages">
                    <PageTransition pathname={this.props.location.pathname}>
                        {this.props.children}
                    </PageTransition>
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
