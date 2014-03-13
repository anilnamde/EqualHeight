/**
    JQuery Plugin: to ensure that elements has equal height
    @options: {
        mode: all | 
        row, scope : parent | parent-child,
        responsive: true | false,
        recalculateDelay: Number,
        animationDelay: Number,
        animate: true | false
    }
*/

(function($, window, document) {
    $.fn.equalHeight = function(options) {
        var _options = $.extend({
            mode: "all",
            scope: "parent",
            responsive: true,
            recalculateDelay: 400,
            animationDelay: 200,
            animate: true
        }, options);

        var _that = $(this),
            _finalHeight = 0,
            _resizeTimeout = null,
            _isFirstCall = true;

        var _privates = {
            resizeCallback: function(callback) {
                _that.css("height", "auto");
                callback();
            },
            getMaxHeight: function(elements) {
                if (arguments.length != 1) {
                    throw "Incorrect arguments";
                }

                var _maxHeight = 0;

                $.map(elements, function(element, index) {
                    var _elementHeight = $(element).height();

                    if (_maxHeight < _elementHeight) {
                        _maxHeight = _elementHeight;
                    }
                });
                return _maxHeight;
            },
            setMaxHeight: function(elements, maxHeight) {
                if (arguments.length != 2) {
                    throw "Incorrect arguments";
                }

                $.map(elements, function(element, index) {
                    if (_options.animate && !_isFirstCall) {
                        $(element).animate({
                            "height": maxHeight + "px"
                        }, _options.animationDelay);
                    } else {
                        $(element).css({
                            "height": maxHeight + "px"
                        });
                    }

                });
            }
        };

        var _action = (function(mode, scope) {
            if (mode == "all" && scope == "parent") {
                return function() {
                    var _finalHeight = _privates.getMaxHeight(_that);
                    _privates.setMaxHeight(_that, _finalHeight);
                }
            } else if (mode == "row" && scope == "parent") {
                return function() {
                    throw "not implemented"
                }
            } else {
                throw "invalid options for plugin";
            }

        })(_options.mode, _options.scope);

        _action();

        if (_options.responsive) {
            $(window).resize(function() {

                _isFirstCall = false;

                if (_resizeTimeout != null)
                    clearTimeout(_resizeTimeout);
                _resizeTimeout = setTimeout(function() {
                    _privates.resizeCallback(_action);
                }, _options.recalculateDelay);
            });
        }
    };
})(jQuery, window, document);