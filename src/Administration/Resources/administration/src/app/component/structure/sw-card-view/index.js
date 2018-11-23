import { Component } from 'src/core/shopware';
import template from './sw-card-view.html.twig';
import './sw-card-view.less';

Component.register('sw-card-view', {
    template,

    props: {
        sidebar: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    computed: {
        cardViewClasses() {
            return {
                'has--sidebar': this.sidebar
            };
        }
    }
});
