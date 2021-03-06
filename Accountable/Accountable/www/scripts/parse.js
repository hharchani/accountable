var preprocess = function() {
    for (var i = 0; i < templates.length; i++) {
        templates[i].re = new RegExp(templates[i].pattern, 'i');
    }
    for (var bank in sms_templates) {
        if (sms_templates.hasOwnProperty(bank)) {
            for (i = 0; i < sms_templates[bank].length; i++) {
                sms_templates[bank][i].re = new RegExp(sms_templates[bank][i].pattern, 'i');
            }
        }
    }
};

var parse = function(sentence, templates) {
    for (var i = 0; i < templates.length; i++) {
        var matches = templates[i].re.exec(sentence);
        if (matches) {
            if ('person' in templates[i].variable) {
                var per = matches[templates[i].variable['person']].toLocaleLowerCase();
                if (per == 'i' || per == 'i ') continue;
            }
            var data = {};

            for (var key in templates[i].static) {
                if (templates[i].static.hasOwnProperty(key)) {
                    data[key] = templates[i].static[key];
                }
            }

            for (key in templates[i].variable) {
                if (templates[i].variable.hasOwnProperty(key)) {
                    data[key] = matches[templates[i].variable[key]];
                }
            }

            for (var j in templates[i].handle) {
                key = templates[i].handle[j];
                if ((data.collection in handlers) && (key in handlers[data.collection])) {
                    handlers[data.collection][key](data);
                }
            }

            return data;
        }
    }
};

preprocess();
// parse("I owe 10 rupees to Harshit");
// console.log(parse("I owe Harshit 10 rupees"));
var test = ["Harshit gave me 100 rupees",
"I have to return 1000 to Harshit",
"I don't know what to do",
"I gave Hello, world 50",
"I gave nothing to aadfas",
"Chanu took 1 from me",
"Chanu returned 100",
"I need to take 20 bucks from Baskar",
"Harshit transfered 20 to my bank"];

function testAll() {
    for (var i in test) {
        console.log(test[i], parse(test[i]));
    }
}

function process_command(sentence) {
    var parsed = parse(sentence, templates);
    console.log(parsed);
    if (parsed) {
        add_data(parsed, function () { });
        return true;
    } else {
        return false;
    }
}

function process_sms(sms) {
    var parsed = parse(sms, sms_templates["icici"]);
    console.log(parsed);
    if (parsed) {
        add_data(parsed, function () { });
        return true;
    } else {
        return false;
    }
}
