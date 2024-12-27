new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    navigation: true,

    fitToSection: false, // Không ép buộc chiều cao của section thành 100vh
    scrollOverflow: true,

});

// Fancybox
Fancybox.bind('[data-fancybox="gallery"]', {});

// Swiper
new Swiper(".feature-swiper", {
    // slidesPerView: 5,
    spaceBetween: 0,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1366: {
            slidesPerView: 5,
        },
      },
});

// Form
jQuery(document).ready(function ($) {
    $('.get-a-quote input, .get-a-quote textarea').on('focus', function () {
        var $parent = $(this).closest('.get-a-quote .input-group');
        $parent.addClass('on-focus');
    });

    // Khi input mất focus (blur)
    $('.get-a-quote input, .get-a-quote textarea').on('blur', function () {
        var $parent = $(this).closest('.get-a-quote .input-group');
        if (!$(this).val().trim()) {
            $parent.removeClass('on-focus');
        }
    })

})

// 
$('#email-us form').submit(function (e) {
    e.preventDefault();
    var form_footer = $(this).find('.form-footer');
    var form = $(this);
    form_footer.addClass('loading');

    grecaptcha.ready(function () {
        // do request for recaptcha token
        // response is promise with passed token
        grecaptcha.execute('6LctySkqAAAAAOso6f6HxPzWa95Oz-8KC2OnXf6X', { action: 'validate_captcha' }).then(function (token) {
            console.log(1);
            $.post(
                'https://upstairs.co/send-mail.php',
                {
                    name: $('input[name="name"]', form).val().trim(),                    
                    phone: $('input[name="phone"]', form).val().trim(),
                    email: $('input[name="email"]', form).val().trim(),                    
                    message: $('textarea[name="message"]', form).val().trim(),
                    recaptcha: token,
                },
                function (response) {
                    console.log(response);
                    form.get(0).reset();
                    alert('Thanks for reaching out! We will get in touch with you shortly.');
                }
            )
                .done(function (response) {
                    console.log(response);
                    console.log('second success');
                })
                .fail(function (response) {
                    console.log(response);
                    console.log('error');
                    alert('There was a problem with your submission, please try again.');
                })
                .always(function (response) {
                    console.log(response);
                    console.log('finished');
                    form_footer.removeClass('loading');
                });
        });        
    });    
});

