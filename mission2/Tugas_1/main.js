document.addEventListener("DOMContentLoaded", function () {
  const plusButtons = document.querySelectorAll(".plus");
  const minusButtons = document.querySelectorAll(".minus");
  const numberFields = document.querySelectorAll(".number");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const btnStruk = document.getElementById("btn-struk");

  const cartItems = [];
  
  btnStruk.addEventListener("click", () => {
    printReceipt();
  })
  
  addToCartButtons.forEach((addToCartButton, index) => {
    addToCartButton.addEventListener("click", () => {
      const itemName = document.querySelectorAll(".item-name")[index].textContent;
      const itemPrice = document.querySelectorAll(".item-price")[index].textContent;
      const itemQuantity = parseInt(numberFields[index].textContent);
      const itemImage = document.querySelectorAll(".card-img-top")[index].src; // Ambil gambar item
      
      const item = {
        name: itemName,
        price: parseFloat(itemPrice.replace("Rp ", "").replace(",", "")),
        quantity: itemQuantity,
        image: itemImage // Tambahkan properti image ke objek item
      };
  
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === itemName);
  
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += itemQuantity;
      } else {
        cartItems.push(item);
      }
  
      updateCartItemsDisplay();
    });
  });
  
  

  plusButtons.forEach((plusButton, index) => {
    plusButton.addEventListener("click", () => {
      const currentQuantity = parseInt(numberFields[index].innerText);
      numberFields[index].innerText = currentQuantity + 1;
      updateCartItemQuantity(index, currentQuantity + 1);
    });
  });
  
  minusButtons.forEach((minusButton, index) => {
    minusButton.addEventListener("click", () => {
      const currentQuantity = parseInt(numberFields[index].innerText);
      if (currentQuantity > 0) {
        numberFields[index].innerText = currentQuantity - 1;
        updateCartItemQuantity(index, currentQuantity - 1);
      }
    });
  });
  
  function updateCartItemsDisplay() {
    cartItemsContainer.innerHTML = ""; // Clear the previous content

    cartItems.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("cart-item");

      const image = document.createElement("img");
      image.src = document.querySelectorAll(".card-img-top")[index].src; // Replace with actual image path
      image.alt = item.name;
      image.classList.add("item-image");

      const totalPrice = item.price * item.quantity;
      const formattedPrice = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(totalPrice);

      listItem.innerHTML = `
      <div class="item-details">
          <div>
              ${item.name} - ${item.quantity} x ${formattedPrice}
          </div>
          <div class="item-buttons">
              <button class="item-button minus" data-index="${index}">-</button>
              <button class="item-button plus" data-index="${index}">+</button>
          </div>
      </div>
  `;
      
      listItem.prepend(image);
      cartItemsContainer.appendChild(listItem);
    });
  
    const totalCartPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
    const formattedTotalPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(totalCartPrice);
  
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.classList.add("total-price");
    totalPriceElement.textContent = `Total: ${formattedTotalPrice}`;

    const cartContent = document.getElementById("cart-content");
    if (cartItems.length > 0) {
      cartContent.style.display = "block";
    } else {
      cartContent.style.display = "none";
    }
  
    for (let i = cartItems.length - 1; i >= 0; i--) {
      if (cartItems[i].quantity === 0) {
          // Hapus produk jika jumlahnya 0
          cartItems.splice(i, 1);
          updateCartItemsDisplay();
      }
  }

    const plusButtons = document.querySelectorAll(".item-button.plus");
    const minusButtons = document.querySelectorAll(".item-button.minus");
  
    plusButtons.forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        cartItems[index].quantity += 1;
        updateCartItemsDisplay();
      });
    });
  
    minusButtons.forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        if (cartItems[index].quantity > 0) {
          cartItems[index].quantity -= 1;
          updateCartItemsDisplay();
        }
      });
    });

    scrollPageToBottom();
  }
  

  function printReceipt() {
    const containerReceipt = document.getElementById("struk");
    const totalPembelian = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const pajak = totalPembelian * 0.11; // 11% tax
    const totalBayar = totalPembelian + pajak;
  
    containerReceipt.innerHTML = ''; // Hapus konten sebelumnya
  
    const table = document.createElement("table");
    table.classList.add("table");
  
    // Membuat header tabel
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Nama Produk</th>
        <th>Harga per Unit</th>
        <th>Jumlah</th>
        <th>Total Harga</th>
      </tr>
    `;
    table.appendChild(thead);
  
    // Membuat body tabel
    const tbody = document.createElement("tbody");
    cartItems.forEach(item => {
      const row = document.createElement("tr");
  
      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
  
      const priceCell = document.createElement("td");
      priceCell.textContent = `Rp ${item.price.toFixed(2)}`;
  
      const quantityCell = document.createElement("td");
      quantityCell.textContent = item.quantity;
  
      const totalCell = document.createElement("td");
      const total = item.price * item.quantity;
      totalCell.textContent = `Rp ${total.toFixed(2)}`;
  
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(totalCell);
  
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
    containerReceipt.appendChild(table);
  
    // Update total purchase, tax, and total payment
    const totalPembelianElement = document.querySelector(".total-pembelian");
    const pajakElement = document.querySelector(".pajak");
    const totalBayarElement = document.querySelector(".total-bayar");
  
    totalPembelianElement.textContent = totalPembelian.toFixed(2);
    pajakElement.textContent = pajak.toFixed(2);
    totalBayarElement.textContent = totalBayar.toFixed(2);
  }
  
  
  function scrollPageToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }

});

