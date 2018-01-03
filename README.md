# form-serialize-json
 Serialize form data to Json (deep structure).

 This script solved the problem of hierarchy name of Input in C#.
 serialises a form to an object. The use is the same with $.fn.serialize and $.fn.serializeArray, or serializeJson(array).

 The keys are the form element names(split with dot) and the value is the the form element
 value. If multiple form elements have the same name with different values,
 the value will replace the origin value.

## Support

|Feature|Node.js|Chrome|Edge|Firefox|Internet Explorer|Opera|Safari|
| -- | -- | -- | -- | -- | -- | -- | -- |
|Basic support|Yes|5|Yes|4|9|10.5|5|

|Feature|Android webview|Chrome for Android|Edge mobile|Firefox for Android|IE mobile|Opera Android|iOS Safari|
| -- | -- | -- | -- | -- | -- | -- | -- |
|Basic support|Yes|Yes|Yes|4|Yes|Yes|Yes|

## Install
### Node.js
```shell
$ npm install form-serialize-json
```
### Html
```html
// serializeJson(array)
<script type="text/javascript" src="serialize-json.js">

// or jquery.fn.serializeJson
<script type="text/javascript" src="jquery.min.js">
<script type="text/javascript" src="serialize-json.js">
```

## Use
form-serialize-json is surprisingly easy to use.
```html
<form id="example">
    <input type="text" name="title" value="serialize-json">
    <input type="text" name="desc" value="demo serializeArray of form to json object.">
</form>
```
```js
var serialize = require('form-serialize-json'),
    form = document.querySelector('#example');

var obj = serialize(form);
// obj -> { title: "serialize-json", desc: "demo serializeArray of form to json object." }
```

### array fields (auto indexed)
Fields who's name ends with [] are always serialized as an array field.
```html
<form id="example">
    <input type="text" name="user[]" value="Someone A">
    <input type="text" name="user[]" value="Someone B">
    <input type="text" name="user[100]" value="Someone C">
</form>
```
```js
var serialize = require('form-serialize-json'),
    form = document.querySelector('#example');

var obj = serialize(form);
// obj -> { user: ["Someone A", "Someone B", empty × 98, "Someone C"] }
// empty × 98 is real empty
```

### array fields (auto append) <protected>
Fields who's name ends with [] are always serialized as an array field.
```html
<form id="example">
    <input type="text" name="data.index[0]" value="item 1">
    <input type="text" name="data.index[]" value="item 2">
    <input type="text" name="data.index[1]" value="item 3">
</form>
```
```js
var serialize = require('form-serialize-json'),
    form = document.querySelector('#example');

var obj = serialize(form, true);  //protected
// obj -> { data: { index: ["item 1", "item3", "item 2"] } }
```

### hierarchy objects
it will be come deep json structure if fields who has name with dot(.)
```html
<form id="example">
    <input type="text" name="desc" value="demo serializeArray of form to json object.">
    <input type="text" name="users[0].name" value="user A">
    <input type="text" name="users[0].skills[0].name" value="nodejs">
    <input type="text" name="users[0].skills[0].years" value="5">
</form>
```
```js
var serialize = require('form-serialize-json'),
    form = document.querySelector('#example');

var obj = serialize(form);
/**
obj -> {
    desc: "demo serializeArray of form to json object.",
    users: [
        {
            name: "user A",
            skills: [
                { name: "PHP", years: 12 },
                { name: "Ruby", years: 5 },
                { name: "C#", years: 2 }
            ]
        }
    ]
}
*
```

## References

This module is based on ideas from jQuery serialize.

## MIT License

Copyright (c) 2017 yiming.hsu <mufasa.hsu@gmail.com>