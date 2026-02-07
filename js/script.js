        // --- Form Validation & Submission ---
        document.getElementById('pwrForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const feedback = document.getElementById('formFeedback');

            if(name && email && message) {
                // Mimicking an API call
                feedback.style.color = "green";
                feedback.innerText = "Thank you! Our engineers will contact you shortly.";
                this.reset();
            } else {
                feedback.style.color = "red";
                feedback.innerText = "Please fill in all fields.";
            }
        });

        // --- Smooth Scrolling ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        function goToProducts(category) {
    window.location.href = `products.html?category=${category}`;
}

