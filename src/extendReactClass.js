/* eslint-disable react/prop-types */

import linkClass from './linkClass';
import React from 'react';
import _ from 'lodash';
import hoistNonReactStatics from 'hoist-non-react-statics';

/**
 * @param {ReactClass} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {ReactClass}
 */
export default (Component: Object, defaultStyles: Object, options: Object) => {
    const WrappedComponent = class extends Component {
        render () {
            let propsChanged,
                styles;

            propsChanged = false;

            console.log('----------------------\neRC.js == extendReactClass.js | lC.js = linkClass.js');
            console.log('----------------------\nRender Wrapped React CSS Component');
            console.log('eRC.js - this.props: ', this.props, 'defaultStyles: ', defaultStyles);

            if (this.props.styles) {
                styles = this.props.styles;
            } else if (_.isObject(defaultStyles)) {
                this.props = _.assign({}, this.props, {
                    styles: defaultStyles
                });

                propsChanged = true;
                styles = defaultStyles;
            } else {
                styles = {};
            }

            const renderResult = super.render();
            if (renderResult) {
                console.log('eRC.js - renderResult.props', renderResult.props, styles);
            }

            if (propsChanged) {
                delete this.props.styles;
            }

            if (renderResult) {
                console.log('eRC.js - renderResult.props', renderResult.props, styles);
                return linkClass(renderResult, styles, options);
            }

            return React.createElement('noscript');
        }
    };

    return hoistNonReactStatics(WrappedComponent, Component);
};
