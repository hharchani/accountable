var templates = [
    {
        "pattern": "(?:i )?transfered (\\d+)(?: rupees| bucks)? from (.*) to (.*)",
        "static": {
            "collection": "transfers"
        },
        "variable": {
            "from": 2,
            "to": 3,
            "amount": 1
        },
        "handle": ["from", "to", "date"]
    },
    {
        "pattern": "(?:i )?withdrew (\\d+)(?: rupees| bucks)? from(?: a| an| the)? (.*)",
        "static": {
            "collection": "transfers"
        },
        "variable": {
            "from": 2,
            "amount": 1
        },
        "handle": ["from", "to", "date"]
    },
    {
        "pattern": "(?:i )?took(?: out)? (\\d+)(?: rupees| bucks)? from (?:a|an|the) (.*)",
        "static": {
            "collection": "transfers"
        },
        "variable": {
            "from": 2,
            "amount": 1
        },
        "handle": ["from", "to", "date"]
    },
    {
        "pattern": "(?:i )?took out (\\d+)(?: rupees| bucks)? from(?: a| an| the)? (.*)",
        "static": {
            "collection": "transfers"
        },
        "variable": {
            "from": 2,
            "amount": 1
        },
        "handle": ["from", "to", "date"]
    },
    {
        "pattern": "(?:i )?deposited (\\d+)(?: rupees| bucks)? (?:in|to)(?: a| an| the)? (.*)",
        "static": {
            "collection": "transfers"
        },
        "variable": {
            "to": 2,
            "amount": 1
        },
        "handle": ["from", "to", "date"]
    },


    {
        "pattern": "(?:i )?owe (.*) (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "settlements",
            "type": "took"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(?:i )?owe (\\d+)(?: rupees| bucks)? to (.*)",
        "static": {
            "collection": "settlements",
            "type": "took"
        },
        "variable": {
            "person": 2,
            "amount": 1
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(?:i )?(?:borrowed|took|received) (\\d+)(?: rupees| bucks)? from (.*)",
        "static": {
            "collection": "settlements",
            "type": "took"
        },
        "variable": {
            "person": 2,
            "amount": 1
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(?:i )?(?:have|need) to (?:pay|give|return|repay)(?:back)? (.*) (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "settlements",
            "type": "took"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(?:i )?(?:have|need) to (?:pay|give|return|repay)(?:back)? (\\d+)(?: rupees| bucks)? to (.*)",
        "static": {
            "collection": "settlements",
            "type": "took"
        },
        "variable": {
            "person": 2,
            "amount": 1
        },
        "handle": ["account", "person", "date"]
    },

    {
        "pattern": "(.*) (?:gave|paid|returned|repaid)(?: me)?(?: back)?(?: my)? (\\d+)(?: rupees| bucks)?(?: back)?",
        "static": {
            "collection": "settlements",
            "type": "took"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(.*) (?:gave|paid|returned|repaid)(?: back)?(?: my)? (\\d+)(?: rupees| bucks)?(?: back)? to me",
        "static": {
            "collection": "settlements",
            "type": "took"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(.*) transfered (\\d+)(?: rupees| bucks)? (?:in)?to(?: my)? (.*)",
        "static": {
            "collection": "settlements",
            "type": "took"
        },
        "variable": {
            "person": 1,
            "amount": 2,
            "account": 3
        },
        "handle": ["account", "person", "date"]
    },

    {
        "pattern": "(.*) owes(?: me)? (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(.*) owes (\\d+)(?: rupees| bucks)? to me",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(.*) (?:borrowed|took) (\\d+)(?: rupees| bucks)?(?: from me)?",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(.*) (?:has|needs) to (?:pay|give|return|repay)(?: me)?(?: back)?(?: my)? (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(.*) (?:has|needs) to (?:pay|give|return|repay)(?: back)?(?: my)? (\\d+)(?: rupees| bucks)? to me",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },

    {
        "pattern": "(?:i )?(?:gave|paid|returned|repaid)(?: back)? (.*)(?: back)? (\\d+)(?: rupees| bucks)?(?: back)?",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 1,
            "amount": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(?:i )?(?:gave|paid|returned|repaid)(?: back)? (\\d+)(?: rupees| bucks)?(?: back)? to (.*)",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 2,
            "amount": 1
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(?:i )?(?:have|need) to take(?: back)?(?: my)? (\\d+)(?: rupees| bucks)?(?: back)? from (.*)",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 2,
            "amount": 1
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(?:i )?transfered (\\d+)(?: rupees| bucks)? from(?: my)? (.*) to (.*)",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 3,
            "amount": 1,
            "account": 2
        },
        "handle": ["account", "person", "date"]
    },
    {
        "pattern": "(?:i )?transfered (\\d+)(?: rupees| bucks)? to (.*) from(?: my)? (.*)",
        "static": {
            "collection": "settlements",
            "type": "gave"
        },
        "variable": {
            "person": 2,
            "amount": 1,
            "account": 3
        },
        "handle": ["account", "person", "date"]
    },


    {
        "pattern": "expense (?:a |an |the )?(.*)(?: for)? (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "expenses"
        },
        "variable": {
            "item": 1,
            "amount": 2
        },
        "handle": ["category", "item", "date", "account"]
    },
    {
        "pattern": "(?:i gave )?(\\d+)(?: rupees| bucks)? (for|on)(?: a| an| the)? (.*)",
        "static": {
            "collection": "expenses"
        },
        "variable": {
            "item": 2,
            "amount": 1
        },
        "handle": ["category", "item", "date", "account"]
    },
    {
        "pattern": "(?:i )?(?:purchased|bought)(?: a| an| the)? (.*) for (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "expenses"
        },
        "variable": {
            "item": 1,
            "amount": 2
        },
        "handle": ["category", "item", "date", "account"]
    },
    {
        "pattern": "(?:i )?spent (\\d+)(?: rupees| bucks)? on(?: a| an| the)? (.*)",
        "static": {
            "collection": "expenses"
        },
        "variable": {
            "item": 2,
            "amount": 1
        },
        "handle": ["category", "item", "date", "account"]
    },
    {
        "pattern": "(?:a |an |the )?(.*) cost(?: me)? (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "expenses"
        },
        "variable": {
            "item": 1,
            "amount": 2
        },
        "handle": ["category", "item", "date", "account"]
    },


    {
        "pattern": "income (\\d+)(?: rupees| bucks)?(?:(?: for| as)? (.*))?",
        "static": {
            "collection": "income"
        },
        "variable": {
            "category": 2,
            "amount": 1
        },
        "handle": ["category", "date", "account"]
    },
    {
        "pattern": "(?:i )?(?:got|made|earned|received) (\\d+)(?: rupees| bucks)?(?:(?: for| as) (.*))?",
        "static": {
            "collection": "income"
        },
        "variable": {
            "category": 2,
            "amount": 1
        },
        "handle": ["category", "date", "account"]
    },
    {
        "pattern": "(?:i )?(?:got|made|earned|received)(?: my)? (.*) of (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "income"
        },
        "variable": {
            "category": 1,
            "amount": 2
        },
        "handle": ["category", "date", "account"]
    },
    {
        "pattern": "(?:i )?sold (.*) for (\\d+)(?: rupees| bucks)?",
        "static": {
            "collection": "income",
            "category": "sale"
        },
        "variable": {
            "amount": 2,
            "notes": 1
        },
        "handle": ["category", "date", "account"]
    }
]
