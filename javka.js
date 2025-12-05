
document.addEventListener('DOMContentLoaded', function() {
    
    const savedFilter = localStorage.getItem('selectedFilter');
    if (savedFilter) {
        applyFilter(savedFilter);
        localStorage.removeItem('selectedFilter');
    }
    
    function applyFilter(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const correspondingButton = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (correspondingButton) {
            correspondingButton.classList.add('active');
        }
        
        const cards = document.querySelectorAll('.gallery-card');
        
        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
            document.querySelector('.gallery-section').scrollIntoView({
            behavior: 'smooth'
        });
    }
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
    document.querySelectorAll('.footer-filter').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');
            applyFilter(filter);
        });
    });

    // Корзина
    let cart = [];
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.gallery-card');
            const title = card.querySelector('h3').textContent;
            const price = card.querySelector('.card-price').textContent;
            const priceNum = parseInt(price.replace('₽', ''));
            const existingItem = cart.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.total = existingItem.quantity * existingItem.priceNum;
            } else {
                cart.push({ 
                    title, 
                    price, 
                    priceNum,
                    quantity: 1,
                    total: priceNum
                });
            }
            
            updateCart();
            button.textContent = 'Добавлено!';
            setTimeout(() => {
                button.textContent = 'Добавить в корзину';
            }, 1000);
        });
    });

    function updateCart() {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalCount;
        
        cartItems.innerHTML = '';
        
        let totalPrice = 0;
        
        cart.forEach((item, index) => {
            totalPrice += item.total;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.title}</strong> x ${item.quantity}
                </div>
                <div class="cart-item-price">${item.total}₽</div>
                <button class="remove-from-cart" data-index="${index}">✕</button>
            `;
            cartItems.appendChild(itemElement);
        });
        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.innerHTML = `Итого: ${totalPrice}₽`;
        cartItems.appendChild(totalElement);
        
        const payButton = document.createElement('button');
        payButton.className = 'pay-btn';
        payButton.textContent = 'Оплатить';
        payButton.addEventListener('click', () => {
            alert('+77777777777 на QIWI');
        });
        cartItems.appendChild(payButton);
        
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (cartModal.style.display === 'block') {
                cartModal.style.display = 'none';
            } else {
                cartModal.style.display = 'block';
            }
        });
    }

    if (document.querySelector('.close-cart')) {
        document.querySelector('.close-cart').addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }
});
