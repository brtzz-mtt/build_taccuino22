$(function() {
    console.log("JQuery v" + $.fn.jquery + " loaded!");

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./worker.js').then(function(registration) { // registration was successful
            console.log('Service worker registration successful with scope: ', registration.scope);
        }).catch(function(error) { // registration failed :(
            console.log('Service worker registration failed: ', error);
        });
    }

    $('#tags_selector').on('change', function() {
        let val = $(this).val()
        if (val) {
            return window.location.replace('/tag/' + val);
        }
        window.location.replace('/');
    })

    if (sessionStorage.getItem('night') == '1') {
        $('body').addClass('night')
    }

    $('nav #controls #theme').on('click', function() {
        $('body').toggleClass('night');
        sessionStorage.setItem('night', parseInt(sessionStorage.getItem('night')) ? 0 : 1);
    });

    let body = $('body'),
        header = $('header'),
        header_height = header.outerHeight()

    $(window).scroll(function () {
        header.addClass('fixed')
        if ($(window).scrollTop() >= header_height) {
            body.css('padding-top', header_height);
            header.addClass('fixed');
        } else {
            body.css('padding-top', 0);
            header.removeClass('fixed');
        }
    });
});
