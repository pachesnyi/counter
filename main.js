(function () {


    var counters= [];

    function MyCounter (element) {
        var defaultValue = 0;
        var defaultDuration = 10000;
        this._renderedValue = 0;
        this._element = element;
        this._value = defaultValue;
        this._duration = defaultDuration;



        if(element.hasAttribute("data-duration")) {
            this.setDuration(element.getAttribute('data-duration'));
        } else {
            this.setDuration(defaultDuration);
        }


        if(element.hasAttribute("data-to")) {
            this.setValue(element.getAttribute('data-to'));
        } else {
            this.setValue(0);
        }


    }

    MyCounter.prototype.setValue = function(value) {
        var tick = 17;
        var tickCount = this._duration / tick;
        var step = (value - this._value) / tickCount;
        var  self = this;
        this._value = parseInt(value, 10);


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
        this._duration = parseInt(duration, 10);
    };

    MyCounter.prototype._render = function() {
        this._element.innerHTML = this._renderedValue.toFixed(0);
    };

    if(!window.MyCounter) {
        window.MyCounter = MyCounter;
    }


    if(!window.CounterInstances) {
        window.CounterInstances = counters;
    }

    document.addEventListener( 'DOMContentLoaded', function () {
        document.querySelectorAll('.counter').forEach((counter)=> {
            counters.push(new MyCounter(counter));
        });
    });
})();



