const products = [
            // MEN
            { id: 1, name: "Oversized Hoodie", price: 85, category: "men", img: "images/hoodie.jpg", desc: "Heavyweight 460gsm organic cotton.", features: ["Organic Cotton", "Puff Print", "Drop Shoulder"] },
            { id: 2, name: "Tactical Vest", price: 120, category: "men", img: "images/vest.avif", desc: "Functional ripstop nylon utility vest.", features: ["Water Resistant", "Adjustable Fit", "Multi-Pocket"] },
            { id: 3, name: "Vintage Tee", price: 45, category: "men", img: "images/tee.avif", desc: "Enzyme washed for a faded look.", features: ["Vintage Wash", "Boxy Fit", "Thick Collar"] },
            { id: 9, name: "Puffer Jacket", price: 250, category: "men", img: "images/puffer.avif", desc: "High gloss down puffer for extreme cold.", features: ["700 Fill Down", "High Gloss", "Thermal Lining"] },
            { id: 10, name: "Cargo Shorts", price: 65, category: "men", img: "images/shorts.avif", desc: "Relaxed fit cargos with drawstring waist.", features: ["Relaxed Fit", "Drawstring", "Heavy Cotton"] },

            // WOMEN (Removed Dress)
            { id: 5, name: "Crop Blazer", price: 110, category: "women", img: "images/blazer.jpg", desc: "Sharp tailored cropped jacket.", features: ["Padded Shoulders", "Wool Blend", "Cropped"] },
            { id: 8, name: "Denim Jacket", price: 95, category: "women", img: "images/denim.jpg", desc: "Classic rigid denim trucker jacket.", features: ["14oz Denim", "Branded Buttons", "Oversized"] },
            { id: 11, name: "Trench Coat", price: 180, category: "women", img: "images/coat.jpg", desc: "Modern beige trench with belt.", features: ["Water Repellent", "Belted Waist", "Storm Flap"] },
            { id: 12, name: "Pleated Skirt", price: 70, category: "women", img: "images/skirt.jpg", desc: "High waist midi skirt with pleats.", features: ["High Waist", "Midi Length", "Flowy Fabric"] },

            // ACCESSORIES
            { id: 6, name: "Leather Tote", price: 200, category: "accessories", img: "images/bag.avif", desc: "Handcrafted Italian leather bag.", features: ["Full Grain Leather", "Laptop Sleeve", "Handmade"] },
            { id: 7, name: "Gold Watch", price: 250, category: "accessories", img: "images/watch.avif", desc: "Minimalist stainless steel timepiece.", features: ["Sapphire Glass", "5ATM Water", "Japanese Movement"] },
            { id: 13, name: "Canvas Cap", price: 35, category: "accessories", img: "images/cap.jpg", desc: "Low profile 6-panel dad hat.", features: ["Cotton Twill", "Adjustable Strap", "Embroidered Logo"] },
            { id: 14, name: "Aviator Shades", price: 120, category: "accessories", img: "images/glasses.avif", desc: "Classic pilot frames.", features: ["Polarized Lenses", "UV400", "Metal Frame"] },
            { id: 15, name: "Silver Rings", price: 55, category: "accessories", img: "images/rings.avif", desc: "Set of 3 sterling silver bands.", features: ["925 Sterling Silver", "Oxidized Finish", "Set of 3"] },
        ];
        
        let cart = [];

        window.onload = function() {
            setTimeout(() => {
                document.getElementById('preloader').style.display = 'none';
                document.body.classList.add('loaded');
                document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('active'));
            }, 1000);
        };

        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
        });
        function hoverCursor() { document.body.classList.add('hovering'); }
        function leaveCursor() { document.body.classList.remove('hovering'); }
        
        function toggleTheme() { document.body.classList.toggle('dark-mode'); }
        function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('active'); }
        function router(pageId) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            window.scrollTo(0,0);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        });

        /* --- UPDATED FILTER FUNCTION WITH DYNAMIC HEROES --- */
        function filterCategory(cat) {
            const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
            const gridContainer = document.getElementById('product-grid-container');
            const heroContainer = document.getElementById('category-hero-container');
            
            // Build Dynamic Hero
            let heroHTML = "";
            if (cat === 'men') {
                heroHTML = `
                    <div class="category-hero">
                        <video class="cat-hero-media" autoplay muted loop playsinline><source src="images/men-hero.mp4" type="video/mp4"></video>
                        <div class="cat-hero-content">
                            <h1>MEN'S COLLECTION</h1>
                            <p>Streetwear Reimagined</p>
                        </div>
                    </div>`;
            } else if (cat === 'women') {
                heroHTML = `
                    <div class="category-hero">
                        <video class="cat-hero-media" autoplay muted loop playsinline><source src="images/women-hero.mp4" type="video/mp4"></video>
                        <div class="cat-hero-content">
                            <h1>WOMEN'S EDIT</h1>
                            <p>Contemporary Essentials</p>
                        </div>
                    </div>`;
            } else if (cat === 'accessories') {
                // FIXED: Changed from image to video source
                heroHTML = `
                    <div class="category-hero">
                        <video class="cat-hero-media" autoplay muted loop playsinline>
                            <source src="images/acc-hero.mp4" type="video/mp4">
                        </video>
                        <div class="cat-hero-content">
                            <h1>OBJECTS</h1>
                            <p>Details That Matter</p>
                        </div>
                    </div>`;
            } else {
                // All Products
                heroHTML = `
                    <div class="category-hero" style="height:30vh; background:var(--primary);">
                        <div class="cat-hero-content">
                            <h1>FULL CATALOG</h1>
                        </div>
                    </div>`;
            }
            
            heroContainer.innerHTML = heroHTML;

            gridContainer.innerHTML = filtered.map(p => `
                <div class="product-card reveal" onmouseenter="hoverCursor()" onmouseleave="leaveCursor()">
                    <div style="position:relative; overflow:hidden;">
                        <img src="${p.img}" onclick="openProduct(${p.id})">
                        <div class="quick-view-btn" onclick="openQuickView(${p.id})">👁</div>
                    </div>
                    <h3 onclick="openProduct(${p.id})">${p.name}</h3>
                    <p>$${p.price}</p>
                </div>
            `).join('');
            
            document.querySelectorAll('.product-card').forEach((el) => observer.observe(el));
            router('shop');
        }

        function openQuickView(id) {
            const p = products.find(x => x.id === id);
            document.getElementById('qv-content').innerHTML = `
                <div class="qv-image"><img src="${p.img}"></div>
                <div class="qv-details">
                    <h2>${p.name}</h2><br>
                    <p style="font-size:1.2rem; color:var(--accent);">$${p.price}</p><br>
                    <p>${p.desc}</p><br>
                    <button class="btn-black" onclick="addToCart(${p.id}); closeQuickView()">ADD TO CART</button>
                    <br><small style="cursor:pointer; text-decoration:underline;" onclick="closeQuickView(); openProduct(${p.id})">View Full Details</small>
                </div>
            `;
            document.getElementById('qv-modal').classList.add('open');
        }
        function closeQuickView(e) {
            if (!e || e.target.id === 'qv-modal' || !e.target.closest('.qv-content')) {
                document.getElementById('qv-modal').classList.remove('open');
            }
        }

        function openProduct(id) {
            const p = products.find(x => x.id === id);
            const featuresHTML = p.features ? `<ul class="pd-features">${p.features.map(f => `<li>• ${f}</li>`).join('')}</ul>` : '';

            document.getElementById('detail-content').innerHTML = `
                <div class="pd-image"><img src="${p.img}"></div>
                <div class="pd-info">
                    <h1 style="font-size:3rem; margin-bottom:1rem; font-family:var(--font-display); text-transform:uppercase;">${p.name}</h1>
                    <div style="font-size:1.5rem; color:var(--accent); margin-bottom:1.5rem;">$${p.price}.00</div>
                    <p style="line-height:1.8; margin-bottom:1rem; font-size:1.1rem;">${p.desc}</p>
                    ${featuresHTML}
                    
                    <div class="size-guide-box">
                        <strong>AI SIZE RECOMMENDER</strong>
                        <div class="size-inputs">
                            <input type="number" id="height-in" placeholder="Height (cm)">
                            <input type="number" id="weight-in" placeholder="Weight (kg)">
                        </div>
                        <button style="background:var(--text-main); color:var(--bg-panel); padding:5px 10px; margin-top:5px; border:none;" onclick="calcSize()">FIND MY SIZE</button>
                        <div id="size-result"></div>
                    </div>

                    <button class="btn-black" onclick="addToCart(${p.id})" onmouseenter="hoverCursor()" onmouseleave="leaveCursor()">ADD TO CART</button>
                </div>
            `;
            router('product-detail');
        }

        function calcSize() {
            const h = document.getElementById('height-in').value;
            const w = document.getElementById('weight-in').value;
            let size = "M";
            if (h && w) {
                if(w < 60) size = "S"; else if(w > 85) size = "L"; else if(w > 100) size = "XL";
                document.getElementById('size-result').innerText = "RECOMMENDED SIZE: " + size;
            } else { alert("Please enter height and weight"); }
        }

        function toggleCart() { 
            const sb = document.getElementById('cart-sidebar');
            sb.classList.toggle('open');
            renderCart();
        }

        function addToCart(id) {
            cart.push(products.find(p => p.id === id));
            document.getElementById('cart-count').innerText = cart.length;
            const sb = document.getElementById('cart-sidebar');
            if(!sb.classList.contains('open')) sb.classList.add('open');
            renderCart();
        }

        function renderCart() {
            const container = document.getElementById('cart-items');
            if(cart.length === 0) {
                container.innerHTML = "<div style='text-align:center; color:var(--text-sub); margin-top:2rem;'>Cart is empty</div>";
                document.getElementById('cart-total').innerText = "$0.00";
                return;
            }
            let total = 0;
            container.innerHTML = cart.map((item, idx) => {
                total += item.price;
                return `
                <div style="display:flex; margin-bottom:1rem; gap:1rem;">
                    <img src="${item.img}" style="width:50px; height:60px; object-fit:cover;">
                    <div><div style="font-weight:bold;">${item.name}</div><div>$${item.price}</div></div>
                    <div onclick="cart.splice(${idx},1); document.getElementById('cart-count').innerText = cart.length; renderCart();" style="color:red; cursor:pointer; margin-left:auto;">&times;</div>
                </div>`;
            }).join('');
            document.getElementById('cart-total').innerText = "$" + total.toFixed(2);
        }

        function handleAuth(e) { e.preventDefault(); alert("Demo only: account authentication is not connected."); }
        function goToCheckout() {
            if(cart.length === 0) return alert("Cart empty");
            document.getElementById('cart-sidebar').classList.remove('open');
            router('checkout');
        }
        function processPayment() {
            alert("Demo only: no order was placed and no payment was processed.");
        }

        function updateTimer() {
            const now = new Date();
            const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
            const diff = target - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            const timerEl = document.getElementById('drop-timer');
            const h = hours < 10 ? "0"+hours : hours;
            const m = minutes < 10 ? "0"+minutes : minutes;
            const s = seconds < 10 ? "0"+seconds : seconds;

            if(timerEl) timerEl.innerHTML = `<div>${days}<span>DAYS</span></div>:<div>${h}<span>HRS</span></div>:<div>${m}<span>MIN</span></div>:<div>${s}<span>SEC</span></div>`;
        }
        setInterval(updateTimer, 1000); updateTimer();
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
