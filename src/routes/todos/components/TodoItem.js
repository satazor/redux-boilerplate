import './TodoItem.css';
import React, { Component, PropTypes } from 'react';
import bindAll from 'lodash/bindAll';

export default class TodoItem extends Component {
    constructor(...args) {
        super(...args);
        bindAll(this, '_handleCheckboxChange', '_handleRemoveClick');
    }

    shouldComponentUpdate(nextProps) {
        return this.props.todo !== nextProps.todo;
    }

    render() {
        return (
            <li className={ `todo-item${this.props.todo.completed ? ' is-completed' : ''}` }>
                <label>
                    <input type="checkbox" checked={ this.props.todo.completed }
                        onChange={ this._handleCheckboxChange }/>
                    <span className="label allow-selection">{ this.props.todo.label }</span>
                </label>

                <span className="action-remove" onClick={ this._handleRemoveClick }>X</span>
            </li>
        );
    }

    _handleCheckboxChange() {
        this.props.onToggle(this.props.todo.id);
    }

    _handleRemoveClick() {
        this.props.onRemove(this.props.todo.id);
    }
}

TodoItem.propTypes = {
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }),
};
