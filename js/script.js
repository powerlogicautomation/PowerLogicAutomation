document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 2. Sticky Navbar & Active Link Highlight
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // 4. Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Trigger counters only when Stats section is in view
    let statsSection = document.querySelector('.stats-section');
    let options = { rootMargin: '0px 0px -100px 0px' };
    
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(statsSection);

    // 5. Form Handling (Switch between PHP and EmailJS here)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic Validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if(!name || !email || !message) {
            formMessage.style.color = 'red';
            formMessage.innerText = 'Please fill in all required fields.';
            return;
        }

        // Loading State
        const submitBtn = document.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        /* ---  PHP BACKEND --- */
        const formData = new FormData(this);

        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            formMessage.style.color = 'green';
            formMessage.innerText = data;
            contactForm.reset();
        })
        .catch(error => {
            formMessage.style.color = 'red';
            formMessage.innerText = "Error sending message.";
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
        
    });
});