function createItemV2(obj)
{
    const list = document.getElementById("product-list");

    list.innerHTML += `
      <div class="sp-card">
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
            <button>Chi tiết</button>
          </div>
        </div>
      </div>
    `;
}