const productsContainer = document.getElementById("productsContainer");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    allProducts = data;
    displayProducts(allProducts);

    loading.style.display = "none";
  } catch (error) {
    console.log("Error fetching products:", error);
    loading.textContent = "Failed to load products.";
  }
}

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText),
  );

  displayProducts(filteredProducts);
});

function displayProducts(products) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${product.image}" />
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
        `;

    productsContainer.appendChild(card);
  });
}

const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", function () {
    const selected = categoryFilter.value;

    if(selected === "all"){
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(product => product.category === selected);
        displayProducts(filtered);
    }
});

getProducts();
