const addItemBtn = document.getElementById("addItemBtn");
    const resetBtn = document.getElementById("resetBtn");
    const invoiceBody = document.getElementById("invoiceBody");
    const subtotalEl = document.getElementById("subtotal");
    const totalDiscountEl = document.getElementById("totalDiscount");
    const taxEl = document.getElementById("tax");
    const grandTotalEl = document.getElementById("grandTotal");

    let items = [];
    const TAX_RATE = 18; // %

    // Add item
    addItemBtn.addEventListener("click", () => {
      const name = document.getElementById("itemName").value.trim();
      const qty = parseFloat(document.getElementById("itemQty").value);
      const price = parseFloat(document.getElementById("itemPrice").value);
      const discount = parseFloat(document.getElementById("itemDiscount").value) || 0;

      // Validation
      if (!name || qty <= 0 || price <= 0) {
        alert("Please enter valid item details.");
        return;
      }
      if (discount < 0 || discount > 100) {
        alert("Discount must be between 0 and 100%");
        return;
      }

      const totalBeforeDiscount = qty * price;
      const discountAmount = (totalBeforeDiscount * discount) / 100;
      const total = totalBeforeDiscount - discountAmount;

      items.push({ name, qty, price, discount, totalBeforeDiscount, discountAmount, total });
      renderTable();
      clearInputs();
    });

    // Render invoice
    function renderTable() {
      if (items.length === 0) {
        invoiceBody.innerHTML = '<tr><td colspan="5" class="text-muted">No items added</td></tr>';
        updateTotals();
        return;
      }

      invoiceBody.innerHTML = "";
      items.forEach((item, index) => {
        const row = `<tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.price.toFixed(2)}</td>
          <td>${item.discount}%</td>
          <td>${item.total.toFixed(2)}</td>
        </tr>`;
        invoiceBody.innerHTML += row;
      });

      updateTotals();
    }

    // Update totals
    function updateTotals() {
      let subtotal = items.reduce((sum, i) => sum + i.totalBeforeDiscount, 0);
      let totalDiscount = items.reduce((sum, i) => sum + i.discountAmount, 0);
      let tax = ((subtotal - totalDiscount) * TAX_RATE) / 100;
      let grandTotal = subtotal - totalDiscount + tax;

      subtotalEl.textContent = subtotal.toFixed(2);
      totalDiscountEl.textContent = totalDiscount.toFixed(2);
      taxEl.textContent = tax.toFixed(2);
      grandTotalEl.textContent = grandTotal.toFixed(2);
    }

    // Clear input fields
    function clearInputs() {
      document.getElementById("itemName").value = "";
      document.getElementById("itemQty").value = "";
      document.getElementById("itemPrice").value = "";
      document.getElementById("itemDiscount").value = "";
    }

    // Reset invoice
    resetBtn.addEventListener("click", () => {
      items = [];
      renderTable();
      clearInputs();
    });