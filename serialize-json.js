/**
MIT License

Copyright (c) 2017 yiming.hsu <mufasa.hsu@gmail.com}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

serialises a form to an object. The use is the same with $.fn.serialize
and $.fn.serializeArray, or serializeJson(array)
The keys are the form element names(split) and the value is the the form element
value. If multiple form elements have the same name with different values,
the value will replace the origin value.
*/

// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0; 

      // Steps 3, 4, 5, 6, 7      
      var k = 0; 
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++; 
        }

        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i.  Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(
        //          callbackfn, undefined,
        //          « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}

// main function
function serializeJson (form) {
    var data = {}, form_arr = [];
    // export to array
    if(typeof HTMLFormElement === "function" && form instanceof HTMLFormElement) {
        for(var i in form.elements) {
            if(form.elements[i] instanceof HTMLInputElement)
                form_arr.push({name:form.elements[i].name, value:form.elements[i].value});
        }
    }
    else if(Array.isArray(form)) {
        form_arr = form;
    }

    // serialize to json
    data = form_arr.reduce(function (r, o) {
        var s = r, arr = o.name.split('.');
        arr.forEach((n, k) => {
            var ck = n.replace(/\[[0-9]*\]$/, "");
            if (!s.hasOwnProperty(ck))
                s[ck] = (new RegExp("\[[0-9]*\]$").test(n)) ? [] : {};
            if (s[ck] instanceof Array) {
                var i = parseInt((n.match(new RegExp("([0-9]+)\]$")) || []).pop(), 10);
                i = isNaN(i) ? s[ck].length : i;
                s[ck][i] = s[ck][i] || {};
                (k === arr.length - 1) ? s[ck][i] = o.value : s = s[ck][i];
            }
            else {
                (k === arr.length - 1) ? s[ck] = o.value : s = s[ck];
            }
        });
        return r;
    }, {});
    return data;
}

// for jquery
if(typeof jQuery !== "undefined") {
    jQuery.fn.extend({
        serializeJson: function() {
            return serializeJson( this.serializeArray() );
        }
    });
}

// for nodejs
if(typeof module !== "undefined") {
    module.exports = serializeJson;
}