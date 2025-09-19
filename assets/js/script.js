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

let state = "All";

document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", function(event) {
        state = event.target.textContent.trim();
        const options = document.querySelectorAll(".option");
        options.forEach(opt => {
            opt.classList.remove("selected");
        });
        this.classList.add("selected");
        document.querySelector(".extensions-list").innerHTML = ""; // Clear 
        loadExtensions(state);
    });
});


async function loadExtensions(status = "All") {
    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Grab the container once
        const container = document.querySelector(".extensions-list");
        const fragment = document.createDocumentFragment();

        data.forEach(item => {

            const itemStatus = item.isActive ? 'Active' : 'Inactive';

            if (status != 'All' && status !== itemStatus) return;

            // Card wrapper
            const card = document.createElement("div");
            card.className = "card";

            // Body
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const logo = document.createElement("img");
            logo.src = item.logo;
            logo.alt = `${item.name} logo`;
            logo.loading = "lazy";

            const cardContent = document.createElement("div");
            cardContent.className = "card-content";

            const name = document.createElement("h4");
            name.textContent = item.name;

            const description = document.createElement("p");
            description.textContent = item.description;

            cardContent.appendChild(name);
            cardContent.appendChild(description);

            cardBody.appendChild(logo);
            cardBody.appendChild(cardContent);

            // Footer
            const cardFooter = document.createElement("div");
            cardFooter.className = "card-footer";

            const footerButton = document.createElement("button");
            footerButton.className = "footer-button";
            footerButton.textContent = "Remove";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.isActive === true;

            const footerSlider = document.createElement("span");
            footerSlider.className = "slider";

            const footerToggle = document.createElement("label");
            footerToggle.className = "toggle-switch";

            footerToggle.appendChild(checkbox);
            footerToggle.appendChild(footerSlider);

            cardFooter.appendChild(footerButton);
            cardFooter.appendChild(footerToggle);

            // Build card
            card.appendChild(cardBody);
            card.appendChild(cardFooter);

            // Add to fragment
            fragment.appendChild(card);
        });

        // Append all cards in one go
        container.appendChild(fragment);

    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

loadExtensions();