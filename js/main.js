(function() {
    'use strict';

    function normalizeOrigin(str) {
        var re = /\:\d+/,
            index = str.indexOf(str.match(re)),
            normalizedOrigin = str.substr(0, index);
        return (index > -1) ? normalizedOrigin : str;
    }

    var ORIGIN = normalizeOrigin(location.origin);

    YUI().use('aui-base', 'jsonp', 'jsonp-url', function(A) {
        var nav = A.one('.nav');

        nav.delegate('click', function(event) {
            var currentTarget = event.currentTarget,
                port = currentTarget.getData('port'),
                formattedHREF = ORIGIN + ':' + port + '/?js_fast_load=0';

            currentTarget.attr('href', formattedHREF);
        }, 'a');

        // var TEMPLATE_URL = ORIGIN + ':{port}/html/js/aui/aui/aui.js';

        // var strings = {
        //     loading: 'loading',
        //     online: 'online',
        //     offline: 'offline'
        // };


        // nav.all('.portal-instance-link').each(function(item, index) {
            // var url = A.Lang.sub(TEMPLATE_URL, { port: item.getData('port') });

            // var service = new A.JSONPRequest(url, {
            //     on: {
            //         success: function() {
            //             // to-do print online status
            //         },
            //         failure: function() {
            //             item.one('.status').text(OFFLINE).show();

            //             item.one('.link-text').setStyle('color', 'gray');

            //             item.addClass('disabled');
            //         }
            //     }
            // });

            // service.send();
        // });
    });
})();