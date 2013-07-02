scroller.js
===========

Automatically adds support for smooth scrolling. It will replace the scrollTo
function and bind itself to all local A elements.

To specify the easing function use:

	scrollTo.easing = scrollTo.Easing.Linear;

To specify the default delay use:

	scrollTo.delay = 500;

You can also use it manually like this:

	scrollTo(x, y, [delay]);
	scrollTo(dom_element, [delay]);
	
scroller.js is pure HTML5 code, it does not require any other libraries to use
it in your site, add a script tag like this:

	<script src="scroller.js"></script>
