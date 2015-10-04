var sms_templates = {};
sms_templates["icici"] = [
    {
        "pattern": "debit card purchase of inr((?:\\d+,)?\\d+.?\\d*) on (.*)\.",
        "static": {
            "collection": "expenses",
            "notes": "Debit card purchase",
            "account": "bank"
        },
        "variable": {
            "amount": 1,
            //"date": 2
        },
        "handle": ["category", "item", "date", "amount"]
    },
    {
        "pattern": "your ac .* is debited with inr((?:\\d+,)?\\d+.?\\d*) ",
        "static": {
            "collection": "transfers",
            "notes": "ATM withdrawal",
            "from": "bank",
            "to": "cash"
        },
        "variable": {
            "amount": 1,
            //"date": 2
        },
        "handle": ["date", "amount"]
    },
];
