import merge from 'lodash/object/merge';
import baseConfig from './config';

// Configuration for the dev environment goes here,
// including possible overrides to the base configuration

const config = merge({}, baseConfig, {
    env: 'dev',
});

export default config;
