// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    $(document).on('deviceready', onDeviceReady.bind(this));


    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function onDeviceReady() {
        var filter = {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

            // following 4 filters should NOT be used together, they are OR relationship
            read: 0, // 0 for unread SMS, 1 for SMS already read
            address: '+918374803282', // sender's phone number
            
            // following 2 filters can be used to list page up/down
            indexFrom: 0, // start from index 0
            maxCount: 100, // count of SMS to return each time
        };
        
        if (SMS) SMS.listSMS(filter, function (data) {
            if (Array.isArray(data)) {
                for (var i in data) {
                    if (data[i].address == '+918374803282')
                        process_sms(data[i].body);
                }
            }
        });
        // Handle the Cordova pause and resume events
        $(document)
            .on('pause', onPause.bind(this))
            .on('resume', onResume.bind(this));
        document.addEventListener('onSMSArrive', function (e) {
            var sms = e.data;
            alert(JSON.stringify(sms));

        });
        var speechSuccess = function (result) {
            var $textarea = $('.input-box textarea');
            $textarea.val(result);
        };

        var speechFailure = function (errorMessage) {
            console.log("Error message: " + errorMessage);
        };

        var recognizeSpeech = function () {
            var maxMatches = 1;
            var promptString = "Speak now"; // optional
            var language = "en-US";      // optional
            window.plugins.speechrecognizer.startRecognize(speechSuccess, speechFailure, maxMatches, promptString, language);
        };

        $('.mic').on('tap', recognizeSpeech);

        $('.submit-btn').on('tap', function () {
            var value = $('.input-box textarea').val();
            var x = process_command(value);
            if (!x) alert("Some error occured.");
            else {
                $('.input-box textarea').val('');
                alert("Sucess");
            }
        });

        $('footer ul li a').on('tap', function () {
            var active = $('footer ul li a.active');
            if (active.is(this)) {
                return;
            }
            active.removeClass('active');
            $(this).addClass('active');
            
        });

        $(window).on('hashchange', function () {
            $('section:visible').fadeOut(function () {
                $('section' + location.hash).trigger('shown').fadeIn();
            });
        });

        // Income form
        $('#add-bill-income').on('shown', function () {
            var form = $('#add-bill-income form')[0];
            form.date.value = new Date().toLocaleDateString();
        });
        getCollection('income_categories', function (err, cat) {
            if (err) {
                alert("Some error occoured");
                throw err;
            }
            $.each(cat, function (i, c) {
                $('<option>').val(c._id).text(c.name).appendTo('#add-bill-income select.cat');
            });
        });

        getCollection('accounts', function (err, acc) {
            if (err) {
                alert("Some error occoured");
                throw err;
            }
            $.each(acc, function (i, c) {
                $('<option>').val(c._id).text(c.name).appendTo('#add-bill-income select.account');
            });
        });

        $('#add-bill-income form').on('submit', function (e) {
            e.preventDefault();
            add_data({
                collection: "income",
                category: this.cat.value,
                date: (new Date(this.date.value)).toISOString(),
                amount: this.amount.value,
                account: this.amount.value,
                notes: ""
            }, function (e, d) { if (e) throw e; console.log(d) });
            return false;
        });
    };
    $(onDeviceReady);
    $(function () { window.location.hash = 'home';});

} )();