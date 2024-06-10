/*=============== CHANGE BACKGROUND HEADER ===============*/
/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById("header");
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ?
        header.classList.add("scroll-header") :
        header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

/*=============== SWIPER POPULAR ===============*/
const swiperPopular = new Swiper(".popular__container", {
    spaceBetween: 32,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== VALUE ACCORDION ===============*/
const accordionItems = document.querySelectorAll(".value__accordion-item");

accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector(".value__accordion-header");

    accordionHeader.addEventListener("click", () => {
        const openItem = document.querySelector(".accordion-open");
        toggleItem(item);
        if (openItem && openItem !== item) {
            toggleItem(openItem);
        }
    });
});

const toggleItem = (item) => {
    const accordionContent = item.querySelector(".value__accordion-content");

    if (item.classList.contains("accordion-open")) {
        accordionContent.removeAttribute("style");
        item.classList.remove("accordion-open");
    } else {
        accordionContent.style.height = accordionContent.scrollHeight + "px";
        item.classList.add("accordion-open");
    }
};

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up");
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ?
        scrollUp.classList.add("show-scroll") :
        scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Fungsi untuk mengaktifkan tema gelap secara otomatis saat halaman dimuat
const activateDarkTheme = () => {
    // Menambahkan kelas dark-theme ke body
    document.body.classList.add(darkTheme);
    // Mengganti ikon tombol tema
    themeButton.classList.replace(iconTheme, "bx-moon");
    // Menyimpan tema yang dipilih ke penyimpanan lokal
    localStorage.setItem("selected-theme", "dark");
    localStorage.setItem("selected-icon", "bx-moon");
};

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
    themeButton.classList.contains("bx-moon") ? "bx-moon" : "bx-sun";

// Memeriksa jika pengguna sebelumnya memilih tema gelap
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    themeButton.classList[selectedIcon === "bx-moon" ? "replace" : "add"](
        iconTheme,
        getCurrentIcon()
    );
}

// Mengaktifkan / menonaktifkan tema secara manual dengan tombol
themeButton.addEventListener("click", () => {
    // Toggle dark / light theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle("bx-moon");
    themeButton.classList.toggle("bx-sun");
    // Save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

// Memeriksa jika tema default harus diatur ke tema gelap saat halaman dimuat
if (getCurrentTheme() === "light") {
    activateDarkTheme();
}


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
    // reset: true,
});

// lazy
const initLazyLoad = () => {
    const lazyImages = document.querySelectorAll('.lazy_img');

    const options = {
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyElement = entry.target;
                if (!lazyElement.classList.contains('loaded')) {
                    lazyElement.classList.add('loaded');
                    const dataSrc = lazyElement.dataset.src;

                    if (lazyElement.tagName === 'IMG') {
                        lazyElement.src = dataSrc;
                        lazyElement.onload = () => {
                            lazyElement.style.filter = 'blur(0)';
                        };
                    } else {
                        lazyElement.style.backgroundImage = `url(${dataSrc})`;
                        lazyElement.style.filter = 'blur(0)';
                    }
                }
                observer.unobserve(lazyElement);
            }
        });
    }, options);

    lazyImages.forEach(lazyImage => {
        observer.observe(lazyImage);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Call the initLazyLoad function
    initLazyLoad();
});

sr.reveal(".popular__container,.blog__container, .footer__container, .contact-area");
sr.reveal(".footer__info", { delay: 100 });
sr.reveal(".home__value", { delay: 100 });
sr.reveal(".logos__img", { interval: 100 });
sr.reveal(".values__images, .contact__content", { origin: "left" });
sr.reveal(".value__content, .contact__images", { origin: "right" });