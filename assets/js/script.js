document.body.onload = function() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

document.querySelector(".theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});


document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", function() {
        const options = document.querySelectorAll(".option");
        options.forEach(opt => {
            opt.classList.remove("selected");
        });
        this.classList.add("selected");
    });
});