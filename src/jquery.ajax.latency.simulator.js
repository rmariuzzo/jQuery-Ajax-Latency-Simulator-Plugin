/*!
 * jQuery AJAX latency simulator v1.0.0
 * http://mariuzzo.com/
 *
 * Copyright 2011, Rubens Mariuzzo
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function($) {

    var interceptor = {
        // Original arguments.
        args: {},
        // References to `this`.
        thiz: {},
        // Reference to original `jQuery.ajax` function.
        ajax: {},
        // AJAX interceptor.
        intercept: function(uuid) {

            // Retrieve original arguments and `this` reference.
            var args = this.args[uuid],
                thiz = this.thiz[uuid];

            // Delete references to original arguments and `this` reference.
            delete this.args[uuid];
            delete this.thiz[uuid];

            // Invoke original `jQuery.ajax` function.
            this.ajax.apply(thiz, args);
        }
    };

    // Save the original `jQuery.ajax` function.
    interceptor.ajax = $.ajax;

    // Rewrite the `jQuery.ajax` function.
    $.ajax = function() {

        // Generate a unique id.
        var uuid = (new Date()).getTime();

        // Save original arguments and `this` reference.
        interceptor.args[uuid] = arguments;
        interceptor.thiz[uuid] = this;

        // Ejecutar la función AJAX después del delay
        setTimeout('jQuery.fn.ajaxLatencySimulator(' + uuid + ')', $.fn.ajaxLatencySimulator('delay'));
    };

    jQuery.fn.ajaxLatencySimulator = function(params) {

        var defaults = {
            // Delay in ms.
            delay: 1000,
            min: 0,
            max: 0
        };

        // Check for method invocation.
        if (typeof params === 'number') {
            interceptor.intercept(params);
        }
        else if (typeof params === 'string') {
            if (params === 'delay') {
                var delay = 0;
                if (this.ajaxLatencySimulator.min === 0 && this.ajaxLatencySimulator.max === 0) {
                    delay = this.ajaxLatencySimulator.delay;
                } else {
                    delay = (Math.random() * this.ajaxLatencySimulator.max) + this.ajaxLatencySimulator.min;
                }
                return delay;
            }
        }
        else {

            // Use supplied params over defaults.
            params = $.extend(defaults, params);

            this.ajaxLatencySimulator.delay = params.delay;
            this.ajaxLatencySimulator.min = params.min;
            this.ajaxLatencySimulator.max = params.max;
        }
    };

})(jQuery);