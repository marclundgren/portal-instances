(function() {
    function normalizeOrigin(str) {
        var re = /\:\d+/,
            index = str.indexOf(str.match(re)),
            normalizedOrigin = str.substr(0, index);
        return (index > -1) ? normalizedOrigin : str;
    }

    var LOADING = 'loading',
        ONLINE = 'online',
        OFFLINE = 'offline',
        ORIGIN = normalizeOrigin(location.origin),
        TEMPLATE_URL = ORIGIN + ':{port}/html/js/aui/aui/aui.js';

    YUI().use('aui-base', 'jsonp', 'jsonp-url', function(A) {
        var nav = A.one('.nav');

        nav.delegate('click', function(event) {
            var currentTarget = event.currentTarget,
                port = currentTarget.getData('port'),
                href = currentTarget.attr('href'),
                formattedHREF = ORIGIN + ':' + port + '/?js_fast_load=0';

            currentTarget.attr('href', formattedHREF);
        }, 'a');

        console.log('js');

        nav.all('.portal-instance-link').each(function(item, index) {
            var url = A.Lang.sub(TEMPLATE_URL, { port: item.getData('port') });
            console.log('url: ', url);

            return;
            var service = new A.JSONPRequest(url, {
                on: {
                    success: function() {
                        // to-do print online status
                    },
                    failure: function() {
                        item.one('.status').text(OFFLINE).show();

                        item.one('.link-text').setStyle('color', 'gray');

                        item.addClass('disabled');
                    }
                }
            });

            service.send();
        });
    });
})();