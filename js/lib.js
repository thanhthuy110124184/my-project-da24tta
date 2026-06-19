function createItemV2(obj, index)
{
    const list = document.getElementById("product-list");

    const card = document.createElement("div");
    card.className = "sp-card";
    card.innerHTML = `
      <div class="img-wrap">
        <img src="${obj.image}" alt="${obj.name}">
        ${obj.tag ? `<div class="sp-badge">${obj.tag}</div>` : ''}
        <div class="sp-quick"><button class="quick-btn">Xem</button></div>
      </div>

      <div class="card-body">
        <div class="title">${obj.name}</div>
        <div class="desc">${obj.description}</div>
        <div class="price-row"><div class="price">${obj.price}</div></div>
        <div class="actions">
          <button class="add">Thêm</button>
          <button class="detail-btn">Chi tiết</button>
        </div>
      </div>
    `;

    // Click handler cho nút "Xem"
    const viewBtn = card.querySelector(".quick-btn");
    viewBtn.addEventListener("click", () => {
        navigateToDetail(index);
    });

    // Click handler cho nút "Chi tiết"
    const detailBtn = card.querySelector(".detail-btn");
    detailBtn.addEventListener("click", () => {
        navigateToDetail(index);
    });

    list.appendChild(card);
}

function navigateToDetail(index) {
    // Lưu index vào localStorage và chuyển hướng
    localStorage.setItem('productIndex', index);
    window.location.href = `../html/chitiet.html?id=${index}`;
}

// Quản lý danh sách so sánh sản phẩm
function addToCompare(index) {
    let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (!compareList.includes(index)) {
        if (compareList.length < 5) {
            compareList.push(index);
            localStorage.setItem('compareList', JSON.stringify(compareList));
            alert('Đã thêm vào danh sách so sánh');
        } else {
            alert('Chỉ có thể so sánh tối đa 5 sản phẩm');
        }
    } else {
        alert('Sản phẩm đã có trong danh sách so sánh');
    }
}

function removeFromCompare(index) {
    let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    compareList = compareList.filter(i => i !== index);
    localStorage.setItem('compareList', JSON.stringify(compareList));
}

function isInCompare(index) {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    return compareList.includes(index);
}

// Mua ngay
function buyNow(index) {
    const product = allProduct[index];
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === index);
    if (existing) {
        existing.quantity = (existing.quantity || 0) + 1;
    } else {
        cart.push({ id: index, quantity: 1, name: product.name, price: product.price, image: product.image });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '../html/hoadonbanhang.html';
}