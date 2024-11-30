// Завантажуємо reviews.json
fetch("path/to/reviews.json").then((response)=>response.json()).then((data)=>{
    const reviewsList = document.getElementById("reviews-list");
    // Перебираємо масив відгуків
    data.reviews.forEach((review)=>{
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review-item");
        // Додаємо HTML вміст для кожного відгуку
        reviewElement.innerHTML = `
        <div class="review-header">
          <h3>${review.user}</h3>
          <p class="review-date">${review.date}</p>
        </div>
        <div class="review-rating">
          ${"\u2605".repeat(review.rating)} ${"\u2606".repeat(5 - review.rating)} <!-- \u{421}\u{442}\u{432}\u{43E}\u{440}\u{44E}\u{454}\u{43C}\u{43E} \u{437}\u{456}\u{440}\u{43A}\u{438} \u{437}\u{430} \u{434}\u{43E}\u{43F}\u{43E}\u{43C}\u{43E}\u{433}\u{43E}\u{44E} \u{43F}\u{43E}\u{432}\u{442}\u{43E}\u{440}\u{435}\u{43D}\u{43D}\u{44F} -->
        </div>
        <p class="review-text">${review.text}</p>
      `;
        // Додаємо кожен відгук до контейнера
        reviewsList.appendChild(reviewElement);
    });
}).catch((error)=>{
    console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u0456 \u0432\u0456\u0434\u0433\u0443\u043A\u0456\u0432:", error);
});

//# sourceMappingURL=index.c782c6f8.js.map
