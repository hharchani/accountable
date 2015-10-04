var pouch = new PouchDB('accountable', { adapter: 'localstorage' });

// pouch.post({
//     hey: "Hello"
// }).then(function (response) {
//     console.log(response);
// }).then(function () {
//     pouch.allDocs({
//         include_docs: true,
//         attachments: true
//     }).then(function (result) {
//         console.log(result);
//     });
// });

// pouch.allDocs({
//     include_docs: true,
//     attachments: true
// }).then(function (result) {
//     console.log(result);
// });

var setup = function() {
    pouch.get('cash', function(err, doc) {
        if (err) {
            pouch.put({
                _id: 'cash',
                collection: "accounts",
                name: "Cash",
                type: "cash"
            }, function(){});
        }
    });

    var income_categories = {
        "salary": "Salary",
        "pensions": "Pensions",
        "interest": "Interest",
        "pocket_money": "Pocket Money",
        "sale": "Sale",
        "other_income": "Others"
    };

    var categories = {
        "food": "Food",
        "health": "Health Care",
        "household": "Household",
        "travel": "Travel",
        "other_cat": "Others"
    };

    var items = {
        "juice": ["Juice", "food"],
        "fruit": ["Fruit", "food"],
        "groceries": ["Groceries", "food"],
        "restaurant": ["Restaurant", "food"],
        "home_delivery": ["Home delivery", "food"],
        "airplane": ["Airplane", "travel"],
        "railway": ["Railway", "travel"],
        "taxi": ["Taxi", "travel"],
        "hotel": ["Hotel", "travel"],
        "bus": ["Bus", "travel"],
        "other_item": ["Others", "other_cat"]
    };

    var people = {
        "nisargjhaveri": ["Nisarg", "Jhaveri"],
        "chanakyamalireddy": ["Chanakya", "Malireddy"],
        "adityabaskar": ["Aditya", "Baskar"],
        "harshitharchani": ["Harshit", "Harchani"],
        "johnsnow": ["John", "Snow"],
        "timrobins": ["Tim", "Robins"]
    };

    function put_if_not_exists(data) {
        pouch.get(data._id, function(err, doc) {
            if (err) {
                pouch.put(data, function(){});
            }
        });
    }

    for (var id in income_categories) {
        if (income_categories.hasOwnProperty(id)) {
            put_if_not_exists({
                _id: id,
                collection: "income_categories",
                name: income_categories[id]
            });
        }
    }

    for (id in categories) {
        if (categories.hasOwnProperty(id)) {
            put_if_not_exists({
                _id: id,
                collection: "categories",
                name: categories[id]
            });
        }
    }

    for (id in items) {
        if (items.hasOwnProperty(id)) {
            put_if_not_exists({
                _id: id,
                collection: "items",
                name: items[id][0],
                category: items[id][1]
            });
        }
    }
};

var add_data = function(data, callback) {
    data._id = new Date().toISOString();
    pouch.put(data, function(err, doc) {
        if (err) {
            callback(err);
        } else {
            callback(false);
        }
    });
};

var update_data = function(doc_id, data, callback) {
    pouch.get(doc_id, function(err, doc) {
        if (err) {
            callback(err);
        }
        data._id = doc_id;
        data._rev = doc._rev;
        pouch.put(
            data,
            function(err, doc) {
                if (err) {
                    callback(err);
                } else {
                    callback(false);
                }
            }
        );
    });
};

var fetch_doc = function(doc_id, callback) {
    pouch.get(doc_id, callback || function() {});
};

var getExpenseDateWise = function(fromDate, toDate, callback) {
    pouch.query({
        map: function(doc) {
            if (doc.collection != "expenses") {
                return;
            }
            var id_date = new Date(Date.parse(doc.date)).setHours(0, 0, 0, 0);
            emit(id_date, doc.amount || 0);
        },
        reduce: "_sum"
    }, {
        startkey: fromDate.getTime(),
        endkey: toDate.getTime(),
        reduce: true,
        group: true,
        group_level: 1
    }, function (err, response) {
        if (err) {
            callback(err);
        }
        callback(false, response.rows);
    });
};

var getCollection = function(collection, callback) {
    pouch.query({
        map: function(doc) {
            emit(doc.collection);
        }
    }, {
        key: collection,
        include_docs: true,
    }, function (err, response) {
        if (err) {
            callback(err);
        }
        else {
            callback(false, response.rows.map(function (a) { return a.doc; }));
        }
    });
};

var getAll = function() {
    pouch.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        console.log(result);
    });
};

var accounts = null;
getCollection("accounts", function(err, data) {
    if (err) return;
    accounts = data;
});

var categories = null;
getCollection("categories", function(err, data) {
    if (err) return;
    categories = data;
});

var items = null;
getCollection("items", function(err, data) {
    if (err) return;
    items = data;
});

var income_categories = null;
getCollection("income_categories", function(err, data) {
    if (err) return;
    income_categories = data;
});

var people = null;
getCollection("people", function(err, data) {
    if (err) return;
    people = data;
});

setup();
