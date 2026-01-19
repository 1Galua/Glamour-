async function loadProducts() {
    const productList = document.getElementById("product-list");

    // 1. Skeleton placeholders to prevent layout jumping
    productList.innerHTML = Array(8).fill(`
        <div class="product-card">
            <div class="img-container" style="background: #f0f0f0;"></div>
            <div style="height:20px; background:#f0f0f0; width:70%; margin:10px auto;"></div>
            <div style="height:15px; background:#f0f0f0; width:40%; margin:5px auto;"></div>
        </div>
    `).join('');

    try {
        const response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick");
        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        const products = data.slice(0, 12);

        // Clear skeletons
        productList.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const imgContainer = document.createElement('div');
            imgContainer.className = 'img-container';

            // Secure image URL
            const imgPath = product.image_link ? product.image_link.replace('http://', 'https://') : '';

            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = product.name;
            img.width = 250;
            img.height = 250;
            img.loading = 'lazy';

            // Fade-in on load
            img.onload = () => img.classList.add('loaded');
            img.onerror = () => img.src = 'https://via.placeholder.com/250x250?text=Glamour+Product';

            imgContainer.appendChild(img);

            const title = document.createElement('h3');
            title.style.fontSize = '0.9rem';
            title.style.height = '40px';
            title.style.overflow = 'hidden';
            title.style.margin = '10px 0';
            title.textContent = product.name;

            const price = document.createElement('p');
            price.style.color = '#ff4081';
            price.style.fontWeight = 'bold';
            price.textContent = `$${product.price || '15.00'}`;

            card.appendChild(imgContainer);
            card.appendChild(title);
            card.appendChild(price);

            productList.appendChild(card);
        });

    } catch (error) {
        console.error("API Fetch Error:", error);
        productList.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Unable to load products. The beauty server is slow, please try again.</p>";
    }
}

// Initialize products
loadProducts();
