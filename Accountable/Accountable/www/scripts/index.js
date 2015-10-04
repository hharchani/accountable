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
        // Handle the Cordova pause and resume events
        $(document)
            .on( 'pause', onPause.bind( this ))
            .on( 'resume', onResume.bind( this ));
        
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
            var x = parse(value);
            console.log(x);
            alert(x)
        });

    };

} )();