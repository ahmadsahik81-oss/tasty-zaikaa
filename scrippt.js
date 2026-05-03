// script.js
(function() {
    // Existing Elements
    const menuBtn = document.getElementById('menuToggleBtn');
    const drawer = document.getElementById('sideDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const headerBookBtn = document.getElementById('headerBookBtn');
    const heroCta = document.getElementById('heroCtaBtn');
    const drawerBooking = document.getElementById('drawerBooking');
    const drawerServicesLink = document.getElementById('drawerServices');
    const modalCallBtn = document.getElementById('modalCallBtn');
    const modalWABtn = document.getElementById('modalWABtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Spotlight Slider Elements
    const sliderTrack = document.getElementById('sliderTrack');
    const indicators = document.querySelectorAll('.indicator');
    
    const supportToggle = document.getElementById('supportToggle');
    const supportMenu = document.getElementById('supportMenu');
    
    const phoneNumber = '+919368646875';
    const whatsappUrl = 'https://wa.me/919368646875';
    
    // --- Slider Logic Start ---
    window.currentSlide = function(index) {
        if (!sliderTrack) return;
        
        // Slide move karne ka logic (95% to show a peek of next card)
        const movePercentage = index * 95;
        sliderTrack.style.transform = `translateX(-${movePercentage}%)`;

        // Indicators (dots) update karein
        indicators.forEach((dot, i) => {
            if(i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // Swipe support for Spotlight Slider
    if (sliderTrack) {
        let touchStartX = 0;
        sliderTrack.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, {passive: true});
        sliderTrack.addEventListener('touchend', e => {
            let touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) currentSlide(1); // Swipe Left -> Next
            if (touchEndX - touchStartX > 50) currentSlide(0); // Swipe Right -> Prev
        }, {passive: true});
    }
    // --- Slider Logic End ---

    let isMenuOpen = false;
    function toggleSupportMenu() {
        isMenuOpen = !isMenuOpen;
        if(isMenuOpen) {
            supportMenu.classList.add('open');
        } else {
            supportMenu.classList.remove('open');
        }
    }
    
    if(supportToggle) {
        supportToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSupportMenu();
        });
    }
    
    document.addEventListener('click', function(e) {
        if(isMenuOpen && !supportToggle.contains(e.target) && !supportMenu.contains(e.target)) {
            isMenuOpen = false;
            supportMenu.classList.remove('open');
        }
    });
    
    function openDrawer() { drawer.classList.add('open'); }
    function closeDrawer() { drawer.classList.remove('open'); }
    function openModal() {
        modalOverlay.classList.add('active');
        if(drawer.classList.contains('open')) closeDrawer();
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    function triggerBooking() { openModal(); }
    
    if(headerBookBtn) headerBookBtn.addEventListener('click', (e) => { e.preventDefault(); triggerBooking(); });
    if(heroCta) heroCta.addEventListener('click', (e) => { e.preventDefault(); triggerBooking(); });
    if(drawerBooking) drawerBooking.addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); triggerBooking(); });
    if(menuBtn) menuBtn.addEventListener('click', openDrawer);
    if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    
    document.addEventListener('click', function(e) {
        if(drawer && drawer.classList.contains('open') && !drawer.contains(e.target) && !menuBtn.contains(e.target)) closeDrawer();
    });
    
    serviceCards.forEach(card => { card.addEventListener('click', () => openModal()); });
    
    if(modalCallBtn) modalCallBtn.addEventListener('click', () => { window.location.href = `tel:${phoneNumber}`; closeModal(); });
    if(modalWABtn) modalWABtn.addEventListener('click', () => { window.open(whatsappUrl, '_blank'); closeModal(); });
    if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if(modalOverlay) modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) closeModal(); });
    
    if(drawerServicesLink) {
        drawerServicesLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeDrawer();
            document.querySelector('.services-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
})();
