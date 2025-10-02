const USD_TO_INR_RATE = 83;
const appState = {
	user: null, cart: [], currentCompany: null,
	companies: [
		{ id: 1, name: 'PharmaCorp Inc.', description: 'Leading supplier of generic and branded medicines', category: 'generic', icon: '💊', products: [{ id: 101, name: 'Paracetamol 500mg', description: 'Pain relief tablets - 100 count', price: 12.99, company: 'PharmaCorp Inc.', category: 'tablets' }, { id: 102, name: 'Ibuprofen 200mg', description: 'Anti-inflammatory - 50 tablets', price: 8.50, company: 'PharmaCorp Inc.', category: 'tablets' }, { id: 103, name: 'Amoxicillin 250mg', description: 'Antibiotic capsules - 30 count', price: 24.99, company: 'PharmaCorp Inc.', category: 'tablets' }, { id: 104, name: 'Cough Syrup', description: 'For dry coughs - 100ml', price: 18.75, company: 'PharmaCorp Inc.', category: 'syrups' }] },
		{ id: 2, name: 'MedSupply Co.', description: 'Comprehensive medical supplies and equipment', category: 'surgical', icon: '🏥', products: [{ id: 201, name: 'Surgical Gloves', description: 'Latex-free, powder-free - Box of 100', price: 15.99, company: 'MedSupply Co.', category: 'supplies' }, { id: 202, name: 'Face Masks N95', description: 'Respiratory protection - Pack of 20', price: 34.50, company: 'MedSupply Co.', category: 'supplies' }, { id: 203, name: 'Digital Thermometer', description: 'Fast-reading infrared thermometer', price: 29.99, company: 'MedSupply Co.', category: 'equipment' }, { id: 204, name: 'Blood Pressure Monitor', description: 'Automatic digital BP monitor', price: 45.00, company: 'MedSupply Co.', category: 'equipment' }] },
		{ id: 3, name: 'HealthFirst Ltd.', description: 'Premium branded pharmaceuticals and wellness products', category: 'branded', icon: '⚕️', products: [{ id: 301, name: 'Vitamin D3 5000IU', description: 'Bone health supplement - 120 softgels', price: 19.99, company: 'HealthFirst Ltd.', category: 'tablets' }, { id: 302, name: 'Omega-3 Fish Oil', description: 'Heart health support - 180 capsules', price: 27.50, company: 'HealthFirst Ltd.', category: 'tablets' }, { id: 303, name: 'Multivitamin Complex', description: 'Complete daily nutrition - 90 tablets', price: 22.99, company: 'HealthFirst Ltd.', category: 'tablets' }, { id: 304, name: 'Probiotic Blend', description: 'Digestive health - 60 capsules', price: 31.25, company: 'HealthFirst Ltd.', category: 'tablets' }] },
		{ id: 4, name: 'BioGeneric Labs', description: 'Affordable generic medications for everyday needs', category: 'generic', icon: '🧬', products: [{ id: 401, name: 'Metformin 500mg', description: 'Diabetes management - 90 tablets', price: 14.99, company: 'BioGeneric Labs', category: 'tablets' }, { id: 402, name: 'Lisinopril 10mg', description: 'Blood pressure control - 30 tablets', price: 11.50, company: 'BioGeneric Labs', category: 'tablets' }, { id: 403, name: 'Atorvastatin 20mg', description: 'Cholesterol management - 30 tablets', price: 16.75, company: 'BioGeneric Labs', category: 'tablets' }, { id: 404, name: 'Levothyroxine 50mcg', description: 'Thyroid hormone - 90 tablets', price: 13.25, company: 'BioGeneric Labs', category: 'tablets' }] },
		{ id: 5, name: 'SurgiTech Solutions', description: 'Advanced surgical and diagnostic equipment', category: 'equipment', icon: '🔬', products: [{ id: 501, name: 'Pulse Oximeter', description: 'Fingertip oxygen saturation monitor', price: 38.99, company: 'SurgiTech Solutions', category: 'equipment' }, { id: 502, name: 'Stethoscope Professional', description: 'Dual-head cardiology stethoscope', price: 89.00, company: 'SurgiTech Solutions', category: 'equipment' }, { id: 503, name: 'Nebulizer Machine', description: 'Compact portable nebulizer', price: 125.50, company: 'SurgiTech Solutions', category: 'equipment' }, { id: 504, name: 'Glucose Meter Kit', description: 'Blood sugar monitoring system', price: 42.99, company: 'SurgiTech Solutions', category: 'equipment' }] },
		{ id: 6, name: 'WellCare Pharma', description: 'Specialty medicines and chronic care solutions', category: 'branded', icon: '💉', products: [{ id: 601, name: 'Insulin Glargine', description: 'Long-acting insulin - 5 pens', price: 185.00, company: 'WellCare Pharma', category: 'supplies' }, { id: 602, name: 'Salbutamol Inhaler', description: 'Asthma relief - 200 doses', price: 32.50, company: 'WellCare Pharma', category: 'supplies' }, { id: 603, name: 'Gabapentin 300mg', description: 'Nerve pain relief - 90 capsules', price: 28.75, company: 'WellCare Pharma', category: 'tablets' }, { id: 604, name: 'Fluoxetine 20mg', description: 'Antidepressant - 30 capsules', price: 21.99, company: 'WellCare Pharma', category: 'tablets' }] }
	]
};
function formatCurrency(e){const t=e*USD_TO_INR_RATE;return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2}).format(t)}function showToast(e,t=!1){const n=document.getElementById("toast"),o=n.querySelector("span"),a=n.querySelector("i");o.textContent=e,n.classList.remove("error"),a.className=t?"fas fa-exclamation-circle":"fas fa-check-circle",t&&n.classList.add("error"),n.classList.add("show"),setTimeout(()=>{n.classList.remove("show")},3e3)}function updateCartUI(){const e=document.querySelectorAll(".cart-count"),t=document.getElementById("cart-items-container"),n=document.getElementById("cart-subtotal"),o=document.getElementById("cart-tax"),a=document.getElementById("cart-total"),c=appState.cart.reduce((e,t)=>e+t.quantity,0);if(e.forEach(e=>{e.textContent=c}),0===appState.cart.length)return t.innerHTML='<p style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">Your cart is empty</p>',n.textContent=formatCurrency(0),o.textContent=formatCurrency(0),void(a.textContent=formatCurrency(0));let i=0;t.innerHTML=appState.cart.map(e=>(i+=e.price*e.quantity,`
                                <div class="cart-item">
                                    <div class="cart-item-image">💊</div>
                                    <div class="cart-item-details">
                                        <div class="cart-item-name">${e.name}</div>
                                        <div class="cart-item-price">${formatCurrency(e.price)} each</div>
                                        <div class="cart-item-quantity">
                                            <button class="qty-btn" onclick="updateCartQuantity(${e.id}, -1)">−</button>
                                            <span style="min-width: 30px; text-align: center; font-weight: 600;">${e.quantity}</span>
                                            <button class="qty-btn" onclick="updateCartQuantity(${e.id}, 1)">+</button>
                                            <button class="qty-btn" onclick="removeFromCart(${e.id})" style="margin-left: auto; color: var(--danger);">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `)).join("");const r=i*.1,d=i+r;n.textContent=formatCurrency(i),o.textContent=formatCurrency(r),a.textContent=formatCurrency(d)}function addToCart(e,t=1){let n;for(const t of appState.companies){if(n=t.products.find(t=>t.id===e))break}if(!n)return;const o=appState.cart.find(t=>t.id===n.id);o?o.quantity+=t:appState.cart.push({...n,quantity:t}),updateCartUI(),showToast(`${n.name} added to cart!`)}function updateCartQuantity(e,t){const n=appState.cart.find(t=>t.id===e);n&&(n.quantity+=t,n.quantity<=0?removeFromCart(e):updateCartUI())}function removeFromCart(e){const t=appState.cart.findIndex(t=>t.id===e);if(t>-1){const e=appState.cart.splice(t,1)[0];updateCartUI(),showToast(`${e.name} removed from cart.`,!0)}}function renderCompanies(e="",t=""){const n=document.getElementById("companies-grid"),o=appState.companies.filter(n=>n.name.toLowerCase().includes(e.toLowerCase())&&(t===""||n.category===t));if(0===o.length)return void(n.innerHTML='<p id="no-products-message">No companies found matching your criteria.</p>');n.innerHTML=o.map(e=>`
                                <div class="product-card" style="cursor:pointer;" onclick="showCompanyProducts(${e.id})">
                                    <div class="product-image">${e.icon}</div>
                                    <p class="product-category">${e.category}</p>
                                    <h4>${e.name}</h4>
                                    <p class="product-description">${e.description}</p>
                                    <button class="btn btn-primary btn-small">View Products</button>
                                </div>
                            `).join("")}function renderCompanyProducts(e,t="",n=""){const o=document.getElementById("company-product-grid");let a=[...e.products].filter(e=>e.name.toLowerCase().includes(t.toLowerCase())&&(n===""||e.category===n));if(0===a.length)return void(o.innerHTML='<p id="no-products-message" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">No products found matching your criteria.</p>');o.innerHTML=a.map(e=>`
                                <div class="company-product-card">
                                    <div>
                                        <h4>${e.name}</h4>
                                        <p class="description">${e.description}</p>
                                        <div class="price">${formatCurrency(e.price)}</div>
                                    </div>
                                    <div class="action-row">
                                        <div class="qty-controls">
                                            <button class="qty-btn" onclick="changeQty(this, -1)" disabled>-</button>
                                            <input type="number" class="qty-input" value="1" min="1" oninput="handleQtyInput(this)">
                                            <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
                                        </div>
                                        <button class="add-btn" onclick="addToCartWithQty(${e.id}, this)">ADD</button>
                                    </div>
                                </div>
                            `).join("")}function handleQtyInput(e){let t=parseInt(e.value,10);(isNaN(t)||t<1)&&(t=1,e.value="1");const n=e.closest(".qty-controls").querySelector(".qty-btn:first-child");n.disabled=1===t}function showCompanyProducts(e){const t=appState.companies.find(t=>t.id===e);t&&(appState.currentCompany=t,document.getElementById("marketplace-header").classList.add("hidden"),document.getElementById("companies-view").classList.add("hidden"),document.getElementById("company-products-view").classList.remove("hidden"),document.getElementById("company-product-view-name").textContent=t.name,document.getElementById("company-product-view-desc").textContent=t.description,document.getElementById("company-product-search").value="",document.querySelectorAll("#filter-pills .pill-btn").forEach(e=>e.classList.remove("active")),document.querySelector('#filter-pills .pill-btn[data-category=""]').classList.add("active"),renderCompanyProducts(t))}function showCompanies(){appState.currentCompany=null,document.getElementById("marketplace-header").classList.remove("hidden"),document.getElementById("companies-view").classList.remove("hidden"),document.getElementById("company-products-view").classList.add("hidden")}function switchSection(e){document.querySelectorAll(".app-section").forEach(t=>{t.classList.add("hidden")}),document.getElementById(`${e}-section`).classList.remove("hidden"),document.querySelectorAll(".sidebar-nav li").forEach(t=>{t.classList.remove("active")}),document.querySelector(`.sidebar-nav a[data-section="${e}"]`).parentElement.classList.add("active")}function handleLogin(e,t,n="City Pharmacy"){return e&&t?(appState.user={email:e,name:n},document.getElementById("landing-page-container").classList.add("hidden"),document.getElementById("app-container").classList.remove("hidden"),document.getElementById("login-overlay").classList.add("hidden"),document.getElementById("signup-overlay").classList.add("hidden"),document.getElementById("user-display").textContent=`Logged in as ${appState.user.name}`,switchSection("dashboard"),{success:!0}):{success:!1,message:"Email and password are required."}}function handleSignup(e){for(const t in e)if(!e[t])return{success:!1,message:"All fields are required."};return handleLogin(e.email,e.password,e.pharmacy)}function handleLogout(){appState.user=null,appState.cart=[],updateCartUI(),switchSection("dashboard"),document.getElementById("landing-page-container").classList.remove("hidden"),document.getElementById("app-container").classList.add("hidden"),showToast("You have been logged out.")}window.changeQty=function(e,t){const n=e.closest(".qty-controls"),o=n.querySelector(".qty-input");let a=parseInt(o.value,10)+t;a<1&&(a=1),o.value=a,handleQtyInput(o)},window.addToCartWithQty=function(e,t){const n=t.closest(".company-product-card"),o=n.querySelector(".qty-input"),a=parseInt(o.value,10);addToCart(e,a),o.value="1",handleQtyInput(o)},document.addEventListener("DOMContentLoaded",()=>{document.getElementById("login-nav-btn").addEventListener("click",()=>document.getElementById("login-overlay").classList.remove("hidden")),document.getElementById("get-started-btn").addEventListener("click",()=>document.getElementById("signup-overlay").classList.remove("hidden")),document.getElementById("show-signup-nav").addEventListener("click",()=>document.getElementById("signup-overlay").classList.remove("hidden")),document.getElementById("show-signup-from-login").addEventListener("click",e=>{e.preventDefault(),document.getElementById("login-overlay").classList.add("hidden"),document.getElementById("signup-overlay").classList.remove("hidden")}),document.getElementById("show-login-from-signup").addEventListener("click",e=>{e.preventDefault(),document.getElementById("signup-overlay").classList.add("hidden"),document.getElementById("login-overlay").classList.remove("hidden")}),document.getElementById("login-form").addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;handleLogin(t,n).success||(document.getElementById("login-error").textContent=result.message)}),document.getElementById("signup-form").addEventListener("submit",e=>{e.preventDefault();const t={firstname:document.getElementById("signup-firstname").value,lastname:document.getElementById("signup-lastname").value,pharmacy:document.getElementById("signup-pharmacy").value,email:document.getElementById("signup-email").value,phone:document.getElementById("signup-phone").value,password:document.getElementById("signup-password").value};handleSignup(t).success||(document.getElementById("signup-error").textContent=result.message)}),document.getElementById("logout-btn").addEventListener("click",handleLogout),document.querySelectorAll(".sidebar-nav a").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),switchSection(t.currentTarget.dataset.section)})}),document.getElementById("company-search").addEventListener("input",e=>{renderCompanies(e.target.value,document.getElementById("category-filter").value)}),document.getElementById("category-filter").addEventListener("change",e=>{renderCompanies(document.getElementById("company-search").value,e.target.value)}),document.getElementById("back-to-companies-btn").addEventListener("click",showCompanies),document.getElementById("company-product-search").addEventListener("input",e=>{if(appState.currentCompany){const t=document.querySelector("#filter-pills .pill-btn.active").dataset.category;renderCompanyProducts(appState.currentCompany,e.target.value,t)}}),document.getElementById("filter-pills").addEventListener("click",e=>{if(e.target.classList.contains("pill-btn")){document.querySelectorAll("#filter-pills .pill-btn").forEach(e=>e.classList.remove("active")),e.target.classList.add("active");const t=e.target.dataset.category;renderCompanyProducts(appState.currentCompany,document.getElementById("company-product-search").value,t)}});const e=document.getElementById("cart-sidebar");document.getElementById("view-cart-btn").addEventListener("click",()=>e.classList.add("open")),document.getElementById("cart-btn").addEventListener("click",()=>e.classList.add("open")),document.getElementById("close-cart-btn").addEventListener("click",()=>e.classList.remove("open"));

// UPDATED: Checkout Logic
const checkoutOverlay = document.getElementById('checkout-overlay');
document.getElementById('checkout-btn').addEventListener('click', () => {
	if (appState.cart.length > 0) {
		const totalValue = document.getElementById('cart-total').textContent;
		document.getElementById('checkout-total').textContent = totalValue;
		checkoutOverlay.classList.remove('hidden');
	} else {
		showToast("Your cart is empty.", true);
	}
});
document.getElementById('cancel-order-btn').addEventListener('click', () => {
	checkoutOverlay.classList.add('hidden');
});
document.getElementById('confirm-order-btn').addEventListener('click', () => {
	const selectedPayment = document.querySelector('input[name="payment_method"]:checked').value;
	showToast(`Order placed via ${selectedPayment}!`);

	appState.cart = [];
	updateCartUI();
	checkoutOverlay.classList.add('hidden');
	document.getElementById('cart-sidebar').classList.remove('open');
});

renderCompanies(),updateCartUI();

// NEW: Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, {
	threshold: 0.1
});
const elementsToAnimate = document.querySelectorAll('.scroll-animate');
elementsToAnimate.forEach(el => observer.observe(el));
});