document.addEventListener("DOMContentLoaded", function() {
    const openButtonDesktop = document.querySelector(".pop-up");
    const openButtonMobile = document.querySelector(".feedback-btn");
    const feedbackForm = document.getElementById("feedbackForm");
    const closeButton = document.querySelector(".close-btn");
    const openForm = function(event) {
        event.stopPropagation();
        feedbackForm.classList.remove("hidden");
    };
    if (openButtonDesktop) openButtonDesktop.addEventListener("click", openForm);
    if (openButtonMobile) openButtonMobile.addEventListener("click", openForm);
    closeButton.addEventListener("click", function() {
        feedbackForm.classList.add("hidden");
    });
    feedbackForm.addEventListener("click", function(e) {
        if (e.target === feedbackForm) feedbackForm.classList.add("hidden");
    });
    const mobileToolBar = document.getElementById("mobileToolBar");
    const mobileNav = document.getElementById("mobileNav");
    const closeBtn = document.getElementById("closeMobileNav");
    mobileToolBar.addEventListener("click", function(event) {
        event.stopPropagation();
        mobileNav.classList.add("open");
    });
    closeBtn.addEventListener("click", function() {
        mobileNav.classList.remove("open");
    });
    document.addEventListener("click", function(event) {
        if (!mobileNav.contains(event.target) && !mobileToolBar.contains(event.target)) mobileNav.classList.remove("open");
    });
});

//# sourceMappingURL=index.aa69868b.js.map
