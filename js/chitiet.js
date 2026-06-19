function getQueryParam(name) {
	const params = new URLSearchParams(window.location.search);
	return params.get(name);
}

function loadCart() {
	try {
		return JSON.parse(localStorage.getItem('cart') || '[]');
	} catch (e) {
		return [];
	}
}

function saveCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
	const cart = loadCart();
	const total = cart.reduce((s, it) => s + (it.quantity || 0), 0);
	const el = document.getElementById('cart-count');
	if (el) el.textContent = total;
}

function addToCart(id, qty = 1) {
	const cart = loadCart();
	const existing = cart.find(i => i.id === id);
	if (existing) {
		existing.quantity = (existing.quantity || 0) + qty;
	} else {
		const prod = allProduct[id];
		cart.push({ id: id, quantity: qty, name: prod.name, price: prod.price, image: prod.image });
	}
	saveCart(cart);
	updateCartCount();
}

function buyNow(id) {
	addToCart(id, 1);
	window.location.href = '../html/hoadonbanhang.html';
}

function renderProduct(id) {
	const product = allProduct[id];
	if (!product) {
		document.querySelector('.product-detail').textContent = 'Sản phẩm không tồn tại';
		return;
	}

	const img = document.getElementById('product-image');
	const name = document.getElementById('product-name');
	const price = document.getElementById('product-price');
	const tag = document.getElementById('product-tag');
	const desc = document.getElementById('product-description');

	if (img) {
		img.src = product.image;
		img.alt = product.name;
	}
	if (name) name.textContent = product.name;
	if (price) price.textContent = product.price;
	if (tag) tag.textContent = product.tag || '';
	if (desc) desc.textContent = product.description || '';

	const addBtn = document.getElementById('add-to-cart');
	const buyBtn = document.getElementById('buy-now');
	if (addBtn) addBtn.addEventListener('click', () => { addToCart(id, 1); alert('Đã thêm vào giỏ hàng'); });
	if (buyBtn) buyBtn.addEventListener('click', () => { buyNow(id); });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
	updateCartCount();
	const idParam = getQueryParam('id');
	if (!idParam) {
		document.querySelector('.product-detail').textContent = 'Vui lòng chọn sản phẩm';
		return;
	}
	const id = parseInt(idParam, 10);
	if (Number.isNaN(id) || id < 0 || id >= allProduct.length) {
		document.querySelector('.product-detail').textContent = 'Sản phẩm không tồn tại';
	} else {
		renderProduct(id);
	}
});
