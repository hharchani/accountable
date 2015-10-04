var handleAccount = function (data, field_name) {
    field_name = field_name || 'account';
    if (field_name in data) {
        if (!accounts) return;
        data[field_name] = getSimilar(data[field_name], accounts)._id;
        if (data[field_name]) return;
    }
    data[field_name] = 'cash';
};

var handleDate = function (data, field_name) {
    field_name = field_name || 'date';
    data[field_name] = new Date();
};

var handlePerson = function (data, field_name) {
    field_name = field_name || 'person';
    if (field_name in data) {
        if (!people) return;
        data[field_name] = getSimilar(data[field_name], people)._id;
        if (data[field_name]) return;
    }
    data[field_name] = '';
};

var handleItem = function (data, field_name, category_field_name) {
    field_name = field_name || 'item';
    category_field_name = category_field_name || 'category';
    if (field_name in data) {
        if (!items) return;
        var item = getSimilar(data[field_name], items);
        data[field_name] = item._id;
        data[category_field_name] = item.category;
        if (item._id) return;
    }
    data[field_name] = 'other_item';
    data[category_field_name] = 'other_cat';
};

var handleIncomeCategory = function (data, field_name) {
    field_name = field_name || 'income_category';
    if (field_name in data) {
        if (!income_categories) return;
        data[field_name] = getSimilar(data[field_name], income_categories)._id;
        if (data[field_name]) return;
    }
    data[field_name] = 'other_income';
};

var handlers = {
    "settlements": {
        "account": handleAccount,
        "date": handleDate,
        "person": handlePerson
    },
    "transfers": {
        "from": function(data) {
            handleAccount(data, "from");
        },
        "to": function(data) {
            handleAccount(data, "to");
        },
        "date": handleDate
    },
    "expenses": {
        "category": function(){},
        "item": handleItem,
        "date": handleDate,
        "account": handleAccount
    },
    "income": {
        "category": function(data) {
            handleIncomeCategory(data, 'category');
        },
        "date": handleDate,
        "account": handleAccount
    }
};
