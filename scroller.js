
(function(window, undefined) {
"use strict";

var
	current,

	_scrollTo = window.scrollTo,

	links = window.document.getElementsByTagName('A'),
	i = links.length,
	href,
	el,

	requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		(function (fn) {
			setTimeout(fn, 30);
		})
;

	function on_click()
	{
		scroll({ el: this._el });
		return false;
	}

	while (i--)
	{
		el = links[i];
		href = el.getAttribute('href');

		if (href && href[0] === '#')
		{
			el._el = document.getElementsByName(el.hash.substr(1))[0];
			el.addEventListener('click', on_click);
		}
	}

	function do_scroll(t)
	{
		t = (Date.now() - current.start) / current.delay;

		if (t > 1)
			t = 1;

		_scrollTo(
			current.sx + current.dx * window.scrollTo.easing(t),
			current.sy + current.dy * window.scrollTo.easing(t)
		);

		if (t < 1)
			requestAnimationFrame(do_scroll);
		else
			current = undefined;
	}

	function scroll(config)
	{
		if (config.delay === undefined)
			config.delay = window.scrollTo.delay;

		config.sx = window.scrollLeft || window.scrollX;
		config.sy = window.scrollTop || window.scrollY;

		if (config.el)
		{
			config.rect = config.el.getBoundingClientRect();
			config.x = config.rect.left + config.sx;
			config.y = config.rect.top + config.sy;
		}

		config.dx = (config.x - config.sx);
		config.dy = (config.y - config.sy);
		config.start = Date.now();

		if (!current)
			requestAnimationFrame(do_scroll);

		current = config;
	}

	window.scrollTo = function(x, y, delay)
	{
		if (typeof(x)==='number')
			scroll({ x: x, y: y, delay: delay });
		else
			scroll({ el: x, delay: y });
	};

window.scrollTo.Easing= (function()
{
var
	E = {}, i, result = {},

	fnFactory = function(i, fn)
	{
		result['EaseIn' + i] = fn;
		result['EaseOut' + i] = function(p) { return 1 - fn(1-p); };
		result['EaseInOut' + i] = function(p) {
			return p < 0.5 ?
				fn( p * 2 ) / 2 :
				fn( p * -2 + 2 ) / -2 + 1;
		};
	}
;
	(['Quad', 'Cubic', 'Quart', 'Quint', 'Expo']).forEach(function(name, i) {
		E[name] = function(p) {
			return Math.pow(p, i+2);
		};
	});

	E.Sine = function (p) { return 1 - Math.cos( p * Math.PI / 2 ); };
	E.Circ = function (p) { return 1 - Math.sqrt( 1 - p * p ); };
	E.Elastic =  function(p) { return p === 0 || p === 1 ? p :
		-Math.pow(2, 8 * (p - 1)) * Math.sin(( (p - 1) * 80 - 7.5) * Math.PI / 15);
	};
	E.Back = function(p) { return p * p * ( 3 * p - 2 ); };
	E.Bounce = function (p) {
		var pow2, result,
		bounce = 4;

		while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}

		result = 1 / Math.pow( 4, 3 - bounce ) - 7.5625 *
			Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );

		return result;
	};

	for (i in E)
		fnFactory(i, E[i]);

	result.Linear = function(p) { return p; };
	result.Swing = function(p) { return ( -Math.cos(p*Math.PI) / 2 ) + 0.5; };

	return result;
})();

window.scrollTo.easing = window.scrollTo.Easing.Linear;
window.scrollTo.delay = 250;

})(this);