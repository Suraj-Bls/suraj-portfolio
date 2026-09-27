(function () {
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('nav-toggle');
    var links = document.querySelectorAll('.nav__links a[href^="#"]');

    // Border under the nav once the page scrolls
    function onScroll() {
        nav.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    function setMenu(open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        toggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    }
    toggle.addEventListener('click', function () {
        setMenu(!nav.classList.contains('is-open'));
    });
    document.querySelectorAll('.nav__links a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
    });

    // Highlight the nav link for the section in view
    if ('IntersectionObserver' in window) {
        var byId = {};
        links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (a) { a.classList.remove('is-active'); });
                var link = byId[entry.target.id];
                if (link) link.classList.add('is-active');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

        // Fade sections in as they enter the viewport
        var reveal = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                reveal.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        document.querySelectorAll('.reveal').forEach(function (el) { reveal.observe(el); });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    }

    document.getElementById('year').textContent = new Date().getFullYear();
})();
