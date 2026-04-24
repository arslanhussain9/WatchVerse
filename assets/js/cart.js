document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(
    ".products__button, .new__button, .featured__button"
  );
  const singleAddToCartButton = document.getElementById("add-to-cart");

  const cartContainer = document.querySelector(".cart__container");
  const cartTotal = document.querySelector(".cart__prices-total");
  const cartCount = document.querySelector(".cart__prices-item");

  // Add to Cart (for multiple product cards)
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(
        ".products__card, .new__card, .featured__card"
      );
      const title =
        card.querySelector(".products__title, .new__title, .featured__title")?.innerText || "No Title";
      const price = parseFloat(
        card.querySelector(".products__price, .new__price, .featured__price")?.innerText.replace("₹", "") || "0"
      );
      const image = card.querySelector("img")?.src || "assets/img/default.png";

      addItemToCart(title, price, image);
    });
  });

  // Add to Cart (for single product page)
  if (singleAddToCartButton) {
    singleAddToCartButton.addEventListener("click", () => {
      const productContainer = singleAddToCartButton.closest(".product-container");
      const title = productContainer.querySelector("h1")?.innerText || "No Title";
      const price = parseFloat(productContainer.querySelector(".price")?.innerText.replace("₹", "") || "0");
      const image = productContainer.querySelector("img")?.src || "assets/img/default.png";

      addItemToCart(title, price, image);
    });
  }

  // Common function to add item to cart
  function addItemToCart(title, price, image) {
    const item = {
      name: title,
      price: price,
      image: image,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((p) => p.name === item.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Product added to cart!");
    renderCart();
  }

  // Render Cart Items
  function renderCart() {
    if (!cartContainer || !cartTotal || !cartCount) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const discount = parseFloat(localStorage.getItem("cartDiscount")) || 0;
    
    cartContainer.innerHTML = "";
    let subtotal = 0;
    let count = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p style='text-align:center;'>Your cart is empty</p>";
      cartTotal.textContent = "₹0";
      cartCount.textContent = "0 items";
      return;
    }

    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
      count += item.quantity;

      cartContainer.innerHTML += `
        <article class="cart__card">
          <div class="cart__box">
            <img src="${item.image}" alt="${item.name}" class="cart__img">
          </div>
          <div class="cart__details">
            <h3 class="cart__title">${item.name}</h3>
            <span class="cart__price">₹${item.price}</span>
            <div class="cart__amount">
              <div class="cart__amount-content">
                <span class="cart__amount-box" data-name="${item.name}" data-action="decrease"><i class='bx bx-minus'></i></span>
                <span class="cart__amount-number">${item.quantity}</span>
                <span class="cart__amount-box" data-name="${item.name}" data-action="increase"><i class='bx bx-plus'></i></span>
              </div>
              <i class='bx bx-trash-alt cart__amount-trash' data-name="${item.name}" data-action="remove"></i>
            </div>
          </div>
        </article>
      `;
    });

    // Add Coupon Section
    cartContainer.innerHTML += `
      <div class="cart__coupon" style="margin-top: 1.5rem; padding: 1rem; border-top: 1px solid var(--border-color);">
        <input type="text" id="coupon-input" placeholder="Coupon Code" style="width: 70%; padding: 0.5rem; border: 1px solid var(--border-color); outline: none;">
        <button id="apply-coupon" style="width: 25%; padding: 0.5rem; background: var(--first-color); color: #000; cursor: pointer; border: none;">Apply</button>
        <p id="coupon-msg" style="font-size: 0.75rem; margin-top: 0.5rem;"></p>
      </div>
    `;

    const finalTotal = subtotal * (1 - discount);
    
    cartTotal.innerHTML = `
      ${discount > 0 ? `<span style="text-decoration: line-through; color: var(--text-color-light); font-size: 0.8rem;">₹${subtotal}</span> ` : ''}
      ₹${finalTotal.toFixed(0)}
    `;
    cartCount.textContent = `${count} items`;

    attachCartActions();
    attachCouponLogic();
  }

  function attachCouponLogic() {
    const applyBtn = document.getElementById('apply-coupon');
    const couponInput = document.getElementById('coupon-input');
    const msg = document.getElementById('coupon-msg');

    if (!applyBtn) return;

    applyBtn.addEventListener('click', () => {
      const code = couponInput.value.toUpperCase();
      if (code === 'WATCH20') {
        localStorage.setItem('cartDiscount', '0.20');
        msg.style.color = 'green';
        msg.textContent = 'Coupon applied: 20% OFF!';
        renderCart();
      } else {
        msg.style.color = 'red';
        msg.textContent = 'Invalid coupon code';
      }
    });
  }

  // Handle increase, decrease, remove
  function attachCartActions() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll("[data-action='increase']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const item = cart.find((p) => p.name === name);
        if (item) {
          item.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });
    });

    document.querySelectorAll("[data-action='decrease']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const item = cart.find((p) => p.name === name);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });
    });

    document.querySelectorAll("[data-action='remove']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        cart = cart.filter((p) => p.name !== name);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  // On page load
  renderCart();
});
