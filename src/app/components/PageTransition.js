import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';

/**
 * Transition to be used for top application routes (pages).
 *
 * Usage is simple:
 *
 *   <PageTransition pathname={this.props.pathname}>
 *       {this.props.children}
 *   </PageTransition>
 */
export default class PageTransition extends Component {
    constructor() {
        super();

        // Binds
        this.willEnter = this.willEnter.bind(this);
        this.willLeave = this.willLeave.bind(this);
    }

    getStyles() {
        return {
            [this.props.pathname]: {
                handler: this.props.children,
                opacity: spring(1),
            },
        };
    }

    willEnter() {
        return {
            handler: this.props.children,
            opacity: spring(0),
        };
    }

    willLeave(key, value) {
        return {
            handler: value.handler,
            opacity: spring(0),
        };
    }

    render() {
        /* eslint react/jsx-key:0 */
        return (
            <TransitionMotion
                styles={this.getStyles()}
                willEnter={this.willEnter}
                willLeave={this.willLeave}
            >
            {(interpolated) =>
                <div className="pages-wrapper">
                {Object.keys(interpolated).map((key) =>
                    <div
                        className="page-transition"
                        key={`${key}-transition`}
                        style={{
                            position: 'absolute',
                            opacity: interpolated[key].opacity,
                        }}
                    >
                        {interpolated[key].handler}
                    </div>
                )}
                </div>
            }
            </TransitionMotion>
        );
    }
}

PageTransition.propTypes = {
    pathname: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};
