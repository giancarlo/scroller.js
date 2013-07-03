scroller.js
===========

Automatically adds support for smooth scrolling. It will replace the scrollTo
function and bind itself to all local A elements. scroller.js is pure HTML5 
code, it does not require any other libraries.

To use it in your site, add a script tag:

	<script src="scroller.js"></script>
	
Add your A elements to the page and make sure they point to the right
place:

	<a href="#tagname">Link</a> 

To specify the easing function use:

	<script>
	// Linear by default
	scrollTo.easing = scrollTo.Easing.Linear;
	</script>

See the scrollTo.Easing object for more easing functions.

To specify the default delay use:

	<script>
	// 500 by default
	scrollTo.delay = 500;
	</script>

You can also use it manually like this:

	scrollTo(x, y, [delay]);
	scrollTo(dom_element, [delay]);
	

Tested with 

- Chrome 
- Firefox 21
- IE 9