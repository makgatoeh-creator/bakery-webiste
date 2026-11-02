"use strict";

const products = [
    {
        name: "Sourdough",
        category: "Bread",
        description: "Sourdough bread baked fresh daily.",
        image: "assets/sourdough-bread.jpeg",
        alt: "Freshly baked sourdough bread"
    },
    {
        name: "Wholewheat Loaves",
        category: "Bread",
        description: "Wholewheat loaves baked fresh daily.",
        image: "assets/wholewheat-loaves.jpeg",
        alt: "Fresh wholewheat loaves"
    },
    {
        name: "White Loaves",
        category: "Bread",
        description: "White loaves baked fresh daily.",
        image: "assets/white-loaves.jpeg",
        alt: "Fresh white loaves"
    },
    {
        name: "Custom Cakes",
        category: "Cakes",
        description: "Custom birthday and event cakes made to order.",
        image: "assets/custom-cakes.jpeg",
        alt: "A custom decorated cake",
        enquiryLabel: "Enquire about a cake",
        enquiryValue: "custom-cake"
    },
    {
        name: "Catering Services",
        category: "Catering",
        description: "Sandwiches, pastries, and drinks for corporate events and private parties.",
        image: "assets/WhatsApp Image 2026-10-29 at 14.17.10.jpeg",
        alt: "Catering platter with sandwiches, mini burgers, and appetizers",
        enquiryLabel: "Enquire about catering",
        enquiryValue: "catering"
    }
];

function createLightbox() {
    const dialog = document.createElement("dialog");
    const closeButton = document.createElement("button");
    const image = document.createElement("img");
    const caption = document.createElement("p");

    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Image viewer");
    closeButton.className = "lightbox-close";
    closeButton.type = "button";
    closeButton.textContent = "Close image";
    image.className = "lightbox-image";
    caption.className = "lightbox-caption";

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    dialog.append(closeButton, image, caption);
    document.body.append(dialog);

    return { dialog, image, caption };
}

function createProductCard(product, lightbox) {
    const card = document.createElement("article");
    const category = document.createElement("p");
    const heading = document.createElement("h2");
    const description = document.createElement("p");

    card.className = "product-card";
    category.className = "product-category";
    category.textContent = product.category;
    heading.textContent = product.name;
    description.textContent = product.description;
    card.append(category);

    if (product.image) {
        const imageButton = document.createElement("button");
        const image = document.createElement("img");

        imageButton.className = "gallery-trigger";
        imageButton.type = "button";
        imageButton.setAttribute("aria-label", `View larger image: ${product.alt}`);
        image.src = product.image;
        image.alt = product.alt;
        image.loading = "lazy";
        image.decoding = "async";
        imageButton.append(image);
        imageButton.addEventListener("click", () => {
            lightbox.image.src = image.currentSrc || image.src;
            lightbox.image.alt = product.alt;
            lightbox.caption.textContent = product.alt;
            lightbox.dialog.showModal();
        });
        card.append(imageButton);
    }

    card.append(heading, description);

    if (product.enquiryLabel) {
        const enquiryLink = document.createElement("a");
        enquiryLink.className = "button-link";
        enquiryLink.href = `enquiry.html?service=${encodeURIComponent(product.enquiryValue)}`;
        enquiryLink.textContent = product.enquiryLabel;
        card.append(enquiryLink);
    }

    return card;
}

function initializeProductListing() {
    const grid = document.querySelector("#product-grid");
    const search = document.querySelector("#product-search");
    const category = document.querySelector("#product-category");
    const sort = document.querySelector("#product-sort");
    const status = document.querySelector("#product-status");

    if (!grid || !search || !category || !sort || !status) {
        return;
    }

    const lightbox = createLightbox();

    function updateProducts() {
        const searchTerm = search.value.trim().toLocaleLowerCase();
        const selectedCategory = category.value;
        const sortOrder = sort.value;
        const visibleProducts = products
            .filter((product) => {
                const matchesSearch = `${product.name} ${product.category} ${product.description}`
                    .toLocaleLowerCase()
                    .includes(searchTerm);
                const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((first, second) => {
                const comparison = first.name.localeCompare(second.name);
                return sortOrder === "name-desc" ? -comparison : comparison;
            });

        if (visibleProducts.length === 0) {
            const emptyState = document.createElement("p");
            emptyState.className = "product-empty";
            emptyState.textContent = "No products found. Try a different search or category.";
            grid.replaceChildren(emptyState);
        } else {
            grid.replaceChildren(...visibleProducts.map((product) => createProductCard(product, lightbox)));
        }
        status.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "result" : "results"} found.`;
    }

    search.addEventListener("input", updateProducts);
    category.addEventListener("change", updateProducts);
    sort.addEventListener("change", updateProducts);
    updateProducts();
}

function initializeAccordions() {
    const accordions = document.querySelectorAll(".accordion-item");

    accordions.forEach((accordion) => {
        accordion.addEventListener("toggle", () => {
            if (!accordion.open) {
                return;
            }

            accordions.forEach((otherAccordion) => {
                if (otherAccordion !== accordion) {
                    otherAccordion.open = false;
                }
            });
        });
    });
}

function initializeMapSelector() {
    const map = document.querySelector("#bakery-map");
    const locationButtons = document.querySelectorAll(".map-location-button");

    if (!map || locationButtons.length === 0) {
        return;
    }

    locationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const address = button.dataset.mapQuery;

            if (!address) {
                return;
            }

            map.src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
            map.title = `Map showing ${address}`;
            locationButtons.forEach((locationButton) => {
                locationButton.setAttribute("aria-pressed", String(locationButton === button));
            });
        });
    });
}

function initializeHomeGallery() {
    const trigger = document.querySelector(".hero-gallery-trigger");

    if (!trigger) {
        return;
    }

    const lightbox = createLightbox();
    trigger.addEventListener("click", () => {
        const image = trigger.querySelector("img");
        const caption = trigger.dataset.caption || image?.alt || "Bakery image";

        if (!image) {
            return;
        }

        lightbox.image.src = trigger.dataset.image || image.src;
        lightbox.image.alt = caption;
        lightbox.caption.textContent = caption;
        lightbox.dialog.showModal();
    });
}

function initializeCurrentTime() {
    const timeDisplay = document.querySelector("#current-time");

    if (!timeDisplay) {
        return;
    }

    const updateTime = () => {
        const now = new Date();
        timeDisplay.textContent = `Current time: ${now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })}`;
    };

    updateTime();
    window.setInterval(updateTime, 1000);
}

function initializeBackToTop() {
    const existingButton = document.querySelector(".back-to-top");
    if (existingButton) {
        return;
    }

    const backToTopButton = document.createElement("button");
    backToTopButton.type = "button";
    backToTopButton.className = "back-to-top";
    backToTopButton.setAttribute("aria-label", "Back to top");
    backToTopButton.textContent = "↑ Top";
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.append(backToTopButton);

    const updateVisibility = () => {
        backToTopButton.classList.toggle("is-visible", window.scrollY > 220);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
}

function initializeForms() {
    document.querySelectorAll("form").forEach((form) => {
        const status = form.parentElement?.querySelector(".form-status");

        if (!status) {
            return;
        }

        const preferredDate = form.elements.namedItem("requested-date");
        if (preferredDate instanceof HTMLInputElement && preferredDate.type === "date") {
            const today = new Date();
            preferredDate.min = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, "0"),
                String(today.getDate()).padStart(2, "0")
            ].join("-");
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.reportValidity()) {
                return;
            }

            status.hidden = false;
            status.textContent = "your request has been successfuly sent";
        });
    });

    const serviceSelect = document.querySelector("#service");
    if (serviceSelect) {
        const requestedService = new URLSearchParams(window.location.search).get("service");
        const matchingOption = Array.from(serviceSelect.options)
            .find((option) => option.value === requestedService);

        if (matchingOption) {
            serviceSelect.value = matchingOption.value;
        }
    }
}

initializeProductListing();
initializeAccordions();
initializeMapSelector();
initializeHomeGallery();
initializeCurrentTime();
initializeBackToTop();
initializeForms();
