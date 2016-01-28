import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import bindAll from 'lodash/bindAll';

/**
 * Transition to be used for top application routes (pages).
 * Usage is simple:
 *
 *   <PageTransition pathname={this.props.pathname}>
 *       {this.props.children}
 *   </PageTransition>
 */
export default class PageTransition extends Component {
    constructor(...args) {
        super(...args);
        bindAll(this, '_willEnter', '_willLeave');
    }

    render() {
        /* eslint react/jsx-key:0 */
        return (
            <TransitionMotion
                styles={ this._getStyles() }
                willEnter={ this._willEnter }
                willLeave={ this._willLeave }>
            { (interpolated) =>
                <div className="pages-wrapper">
                { Object.keys(interpolated).map((key) =>
                    <div
                        className="page-transition"
                        key={ `${key}-transition` }
                        style={ {
                            position: 'absolute',
                            opacity: interpolated[key].opacity,
                        } }>
                        { interpolated[key].handler }
                    </div>
                ) }
                </div>
            }
            </TransitionMotion>
        );
    }

    _getStyles() {
        return {
            [this.props.pathname]: {
                handler: this.props.children,
                opacity: spring(1),
            },
        };
    }

    _willEnter() {
        return {
            handler: this.props.children,
            opacity: spring(0),
        };
    }

    _willLeave(key, value) {
        return {
            handler: value.handler,
            opacity: spring(0),
        };
    }
}

PageTransition.propTypes = {
    pathname: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};
