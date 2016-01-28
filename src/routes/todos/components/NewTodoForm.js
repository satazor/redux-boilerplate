import './NewTodoForm.css';
import React, { Component, PropTypes } from 'react';
import bindAll from 'lodash/bindAll';

export default class NewTodoForm extends Component {
    constructor(...args) {
        super(...args);
        bindAll(this, '_handleSubmit');
    }

    render() {
        return (
            <form onSubmit={ this._handleSubmit }>
                <input type="text" label="label" ref="input"/>
                <button>Add Todo</button>
            </form>
        );
    }

    _handleSubmit(e) {
        const label = this.refs.input.value.trim();

        e.preventDefault();

        if (label) {
            this.refs.input.value = '';
            this.refs.input.focus();
            this.props.onSubmit(label);
        }
    }
}

NewTodoForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
