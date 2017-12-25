# serialize-json
 Serialize form data to Json (deep structure).

serialises a form to an object. The use is the same with $.fn.serialize
and $.fn.serializeArray, or serializeJson(array)
The keys are the form element names(split) and the value is the the form element
value. If multiple form elements have the same name with different values,
the value will replace the origin value.

# usage

```
var jQuery = require('jquery');
// or 
//   <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>

var arr = [
    {"name":"desc", "value":"demo serializeArray of form to json object."},
    {"name":"users[0].name", "value":"user A"},
    {"name":"users[0].skills[0].name", "value":"PHP"},
    {"name":"users[0].skills[0].years", "value":"12"},
    {"name":"users[0].skills[1].name", "value":"Ruby"},
    {"name":"users[0].skills[1].years", "value":"5"},
    {"name":"users[0].skills[2].name", "value":"C#"},
    {"name":"users[0].skills[2].years", "value":"2"},
    {"name":"users[1].name", "value":"user B"},
    {"name":"users[1].skills[0].name", "value":"Docker"},
    {"name":"users[1].skills[0].years", "value":"5"},
    {"name":"users[1].skills[1].name", "value":"AWS"},
    {"name":"users[1].skills[1].years", "value":"7"},
    {"name":"data.replacement", "value": "origin value"},
    {"name":"data.replacement", "value": "replace value"}
];

var output = serializeJson(arr); // or  $('#form').serializeJson());

/** 
output: {
    desc: "demo serializeArray of form to json object.",
    users: [
        {
            name: "user A",
            skills: [
                { name: "PHP", years: 12 },
                { name: "Ruby", years: 5 },
                { name: "C#", years: 2 }
            ]
        },
        {
            name: "user B",
            skills: [
                { name: "Docker", years: 5 },
                { name: "AWS", years: 7 }
            ]
        }
    ],
    data: {
        replacement: 'replace value'
    }
}
*/
```