// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        var s = function (result) {
            alert(result);
            console.log(result);
        };
        var f = function (errorMessage) {
            console.log("Error message: " + errorMessage);
        };

        var recognizeSpeech = function () {
            var maxMatches = 5;
            var promptString = "Speak now"; // optional
            var language = "en-US";                     // optional
            window.plugins.speechrecognizer.startRecognize(s, f, maxMatches, promptString, language);
        };
        document.querySelector('button').addEventListener('click', recognizeSpeech);

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();