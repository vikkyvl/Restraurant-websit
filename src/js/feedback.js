document.addEventListener('DOMContentLoaded', function () {
    function displayReviews() {
        fetch('http://localhost:3001/reviews')
            .then(response => response.json())
            .then(reviews => {
                if (!reviews || reviews.length === 0) {
                    document.getElementById('reviews-list').innerHTML = '<p>No reviews available</p>';
                    return;
                }

                let currentIndex = 0; 
                const reviewsList = document.getElementById('reviews-list');

                function showReview() {
                    reviewsList.classList.add('fade-out');

                    setTimeout(() => {
                        const review = reviews[currentIndex];

                        const averageRating = (review.dishes_rating + review.service_rating) / 2;

                        reviewsList.innerHTML = `
                            <div class="review-item">
                                <p class="review-text">${review.text}</p>
                                <div class="stars">${generateStars(averageRating)}</div>
                            </div>
                        `;

                        currentIndex = (currentIndex + 1) % reviews.length;

                        reviewsList.classList.remove('fade-out');
                    }, 500); 
                }

                showReview(); 
                setInterval(showReview, 5000); 
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                document.getElementById('reviews-list').innerHTML = '<p>Failed to load reviews</p>';
            });
    }

    function generateStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                starsHTML += '<span class="star full">★</span>'; 
            } else if (rating > i - 1 && rating < i) {
                starsHTML += '<span class="star half">★</span>';
            } else {
                starsHTML += '<span class="star empty">★</span>'; 
            }
        }
        return starsHTML;
    }

    displayReviews();

    document.getElementById('submit-feedback').addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;
        const dishesRating = document.querySelector('input[name="dishes"]:checked')?.value;
        const serviceRating = document.querySelector('input[name="service"]:checked')?.value;

        if (!name || !comment || !dishesRating || !serviceRating) {
            alert('Please fill in all fields and give ratings.');
            return;
        }

        const review = {
            id: Date.now(),
            name: name,
            dishes_rating: parseInt(dishesRating, 10),
            service_rating: parseInt(serviceRating, 10),
            text: comment,
            date: new Date().toISOString().split('T')[0]
        };

        fetch('http://localhost:3001/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(response => response.text())
            .then(data => {
                const overlay = document.getElementById('overlay');
                const feedbackMessage = document.getElementById('feedback-message');

                overlay.style.display = 'block';
                feedbackMessage.style.display = 'block';
                feedbackMessage.innerHTML = `
                    <span class="close-btn">&times;</span>
                    <div class="message-content">
                        <p>Thank you for your feedback!</p>
                        <div class="emoji">😊</div>
                        <p>You make us better!</p>
                    </div>
                `;

                feedbackMessage.querySelector('.close-btn').addEventListener('click', function () {
                    overlay.style.display = 'none';
                    feedbackMessage.style.display = 'none';
                });

                document.getElementById('name').value = '';
                document.getElementById('comment').value = '';
                document.querySelectorAll('input[name="dishes"]').forEach(input => {
                    input.checked = false;
                });
                document.querySelectorAll('input[name="service"]').forEach(input => {
                    input.checked = false;
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to submit the review');
            });
    });
});




























