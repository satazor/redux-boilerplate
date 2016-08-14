import './NotFound.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class NotFound extends Component {
    render() {
        return (
            <div className="page page-not-found">
                This will be the 404 page.
            </div>
        );
    }
}

NotFound.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(NotFound);
