import './Todos.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import bindAll from 'lodash/bindAll';
import NewTodoForm from '../components/NewTodoForm';
import TodoItem from '../components/TodoItem';
import * as actions from '../state/actions';

class Todos extends Component {
    constructor(...args) {
        super(...args);
        bindAll(this, '_handleToggle', '_handleSubmit', '_handleRemove');
    }

    render() {
        return (
            <div className="page-todos">
                <NewTodoForm onSubmit={ this._handleSubmit }/>
                <ul>
                { this.props.todos.map((todo) =>
                    <TodoItem key={ todo.id } todo={ todo }
                        onToggle={ this._handleToggle }
                        onRemove={ this._handleRemove }/>
                ) }
                </ul>
            </div>
        );
    }

    _handleSubmit(label) {
        this.props.dispatch(actions.addTodo(label));
    }

    _handleToggle(id) {
        this.props.dispatch(actions.toggleTodo(id));
    }

    _handleRemove(id) {
        this.props.dispatch(actions.removeTodo(id));
    }
}

Todos.propTypes = {
    dispatch: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
};

export default connect((state) => {
    return { todos: state.todos };
})(Todos);
