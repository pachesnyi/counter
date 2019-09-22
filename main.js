(function () {


    var counters= [];

    function MyCounter (element) {
        var defaultValue = 0;
        var defaultDuration = 10000;
        this._element = element;
        this._value = defaultValue;
        this._duration = defaultDuration;
        this._renderedValue = this._value;
        this._render();
    }

    MyCounter.prototype.setValue = function(value) {
        var tick = 17;
        var tickCount = this._duration / tick;
        var step = (value - this._value) / tickCount;
        var  self = this;
        this._value = value;

        function tickFunction() {
            self._renderedValue += step;
            if (self._renderedValue > self._value) {
                self._renderedValue = self._value;
            } else {
                setTimeout(tickFunction, tick);
            }
            self._render();
        }
        setTimeout(tickFunction, tick);
    };

    MyCounter.prototype.setDuration = function (duration) {
        this._duration = duration;
    };

    MyCounter.prototype._render = function() {
        this._element.innerHTML = this._renderedValue.toFixed(0);
    };

    document.addEventListener( 'DOMContentLoaded', function () {
        document.querySelectorAll('.counter').forEach((counter)=> {
            counters.push(new MyCounter(counter));
        });
    });
})();



