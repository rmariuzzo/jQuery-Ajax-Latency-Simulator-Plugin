jQuery AJAX Latency Simulator Plugin
====================================

# Deprecated!

This is a jQuery plugin that simulates HTTP latency when requesting resources using `jQuery.ajax`. This plugin affect all jQuery functions related to AJAX since all of these functions internally use `jQuery.ajax`.

This plugin it is not designed for production use. Instead it was developed to simulate latency when developing a jQuery web application locally, where resources that are requested via AJAX are delivery too fast.

How to use it?
--------------

It should be simple, and it is. It takes one line after including jQuery and the plugin (of course!).

```html
<html>
  <head>
    <script type="text/javascript" src="/path/to/jquery.js"></script>
    <script type="text/javascript" src="/path/to/jquery.ajax.latency.simulator.js"></script>
    <script type="text/javascript">
      jQuery(function($) {
        // All AJAX request will be delayed by 5000 ms.
        $.fn.ajaxLatencySimulator({delay : 5000});
      });
    </script>
  </head>
</html>
```

I told you that is just _that simple_.

Any options (aka documentation)?
--------------------------------

You can configure the behaviour of the latency. It could be _linear_ (as in the previous example) or _variable_. The following snippet shows you how to get a _linear_ or a _variable_ latency.

```js
// I would like a linear latency of 3.5 seconds.
$.fn.ajaxLatencySimulator({delay : 3500});
```

```js
// I would like a variable latency from 2 seconds to 6 seconds.
$.fn.ajaxLatencySimulator({min : 2000, max : 6000});
```
    
And that's all.
