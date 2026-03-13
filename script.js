document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SYSTEM NAWIGACJI (Single Page Application Logic) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const homeBtn = document.getElementById('home-btn');

    function navigateTo(targetId) {
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetPage = document.getElementById(targetId);
        if(targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if(activeLink) { activeLink.classList.add('active'); }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            navigateTo(target);
        });
    });

    homeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('start');
    });

    // --- 2. GENEROWANIE SLIDERÓW BEFORE/AFTER W GALERII ---
    const galleryBaContainer = document.getElementById('gallery-ba-container');
    
    // Dane 3 wybranych przez Ciebie par Before & After
    const baItems = [
        { before: "img/dzewko_przed.jpg", after: "img/dzewko_po.jpg", title: "Artystyczne modelowanie koron drzew" },
        { before: "img/krzak_przed.jpg", after: "img/krzak_po.jpg", title: "Formowanie i rzeźbienie zieleni" },
        { before: "img/przed_zywoplot.jpg", after: "img/po_zywoplot.jpg", title: "Ciężkie roboty ziemne i karczowanie terenu" }
    ];

    baItems.forEach((item, index) => {
        // Główny kontener - dodajemy img-wrapper, aby miał zielone tło pod spodem
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'gallery-item-wrapper';
        
        itemWrapper.innerHTML = `
            <div class="img-wrapper">
                <div class="ba-wrapper-mask">
                    <div class="ba-slider-container">
                        <div class="ba-image after" style="background-image: url('${item.after}');"></div>
                        <div class="ba-image before" id="before-img-${index}" style="background-image: url('${item.before}');"></div>
                        <div class="ba-line" id="ba-line-${index}"></div>
                        <input type="range" min="0" max="100" value="50" class="ba-slider" id="ba-slider-${index}">
                    </div>
                </div>
            </div>
            <h4 class="gallery-title">${item.title}</h4>
        `;

        galleryBaContainer.appendChild(itemWrapper);

        const sliderInput = document.getElementById(`ba-slider-${index}`);
        const beforeImg = document.getElementById(`before-img-${index}`);
        const baLine = document.getElementById(`ba-line-${index}`);

        sliderInput.addEventListener('input', (e) => {
            const sliderValue = e.target.value;
            beforeImg.style.clipPath = `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`;
            baLine.style.left = `${sliderValue}%`;
        });
    });

});