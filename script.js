// ===== DEAL AVENUE =====
// Modifie uniquement la liste PRODUCTS pour ajouter tes vrais produits.
const PRODUCTS = [
  {id:1,name:"Ensemble Essentials",price:29.99,category:"ensembles",image:"images/essentials.jpg"},
  {id:2,name:"Ensemble Running",price:34.99,category:"ensembles",image:"images/running.jpg"},
  {id:3,name:"Casquette noire",price:14.99,category:"accessoires",image:"images/cap.jpg"}
];

// Mets ici ton numéro WhatsApp au format international SANS le +.
// Exemple France : 33612345678
const SELLER_WHATSAPP = "33600000000";

let cart = JSON.parse(localStorage.getItem("dealAvenueCart") || "[]");

const money = n => n.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
const save = () => localStorage.setItem("dealAvenueCart",JSON.stringify(cart));

function renderProducts(filter="all"){
  const list = PRODUCTS.filter(p=>filter==="all"||p.category===filter);
  document.getElementById("products").innerHTML = list.map(p=>`
    <article class="card">
      <div class="product-img">${p.image ? `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.parentElement.textContent='Photo produit'">` : "Photo produit"}</div>
      <div class="card-body">
        <h3>${p.name}</h3><div class="price">${money(p.price)}</div>
        <button class="add" onclick="addToCart(${p.id})">Ajouter au panier</button>
      </div>
    </article>`).join("");
}

function addToCart(id){
  const p=PRODUCTS.find(x=>x.id===id);
  const item=cart.find(x=>x.id===id);
  if(item)item.qty++; else cart.push({id:p.id,qty:1});
  save();renderCart();openCart();
}
function changeQty(id,d){
  const item=cart.find(x=>x.id===id); if(!item)return;
  item.qty+=d;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
  save();renderCart();
}
function renderCart(){
  const box=document.getElementById("cartItems");
  if(!cart.length)box.innerHTML='<p class="muted">Ton panier est vide.</p>';
  else box.innerHTML=cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);return `
    <div class="cart-row"><div><b>${p.name}</b><br>${money(p.price)} × ${i.qty}</div>
    <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> <button onclick="changeQty(${p.id},1)">+</button></div></div>`}).join("");
  const total=cart.reduce((s,i)=>s+PRODUCTS.find(p=>p.id===i.id).price*i.qty,0);
  document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);
}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function openModal(){if(!cart.length)return alert("Ajoute au moins un produit.");document.getElementById("checkoutModal").classList.add("show");closeCart()}
function closeModal(){document.getElementById("checkoutModal").classList.remove("show")}

document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkoutBtn").onclick=openModal;
document.getElementById("closeModal").onclick=closeModal;
document.getElementById("filter").onchange=e=>renderProducts(e.target.value);

document.getElementById("orderForm").onsubmit=e=>{
  e.preventDefault();
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  const email=document.getElementById("customerEmail").value.trim();
  const address=document.getElementById("customerAddress").value.trim();
  const note=document.getElementById("customerNote").value.trim();
  const lines=cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);return `- ${p.name} x${i.qty} = ${money(p.price*i.qty)}`}).join("\n");
  const total=cart.reduce((s,i)=>s+PRODUCTS.find(p=>p.id===i.id).price*i.qty,0);
  const msg=`NOUVELLE COMMANDE — DEAL AVENUE\n\nClient : ${name}\nTéléphone : ${phone}\nE-mail : ${email||"Non renseigné"}\nAdresse : ${address}\n\nProduits :\n${lines}\n\nTOTAL : ${money(total)}\nNote : ${note||"Aucune"}`;
  if(SELLER_WHATSAPP==="33600000000"){
    alert("Configure ton numéro WhatsApp dans script.js avant d'utiliser les commandes.");
    return;
  }
  window.open(`https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
  cart=[];save();renderCart();closeModal();e.target.reset();
};

renderProducts();renderCart();