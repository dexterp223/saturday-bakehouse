// ▼ Edit this file each week. Every page reads its bakes from here.
const BUSINESS_EMAIL = "jadenicep@gmail.com";
const CC_EMAILS = ["dexterp0223@gmail.com", "jadexedric@yahoo.com"]; // copied on every order email
const PICKUP_HOURS = "Saturdays · 1pm to 4pm";
const PICKUP_PLACE = "Tokyo Mansions Clubhouse";
const PAYMENT = "Cash, GCash or bank transfer";
const ORDER_CUTOFF = "Wednesday 8pm"; // set to "" to hide
const KITCHEN_NOTE = "Our kitchen also handles tree nuts, peanuts, sesame and soy, so any bake may contain traces. We don’t offer gluten-free bakes yet.";

const BAKES = [
  {
    id: "sourdough", name: "Sourdough", price: 450, unit: "loaf", meta: "Loaf · 36 hr ferment",
    description: "Open crumb, blistered crust, a gentle tang from our six-year-old starter.",
    photo: "img/sourdough-jade.jpg", alt: "A crusty scored sourdough boule beside a sliced half showing its open crumb",
    credit: "",
    allergens: "Wheat (gluten)."
  },
  {
    id: "focaccia", name: "Focaccia", price: 350, unit: "slab", meta: "Slab · olive oil & rosemary",
    description: "Dimpled and golden with olive oil, flaky salt, and fresh rosemary.",
    photo: "img/focaccia-jade.jpg", alt: "A slab of golden focaccia with rosemary on a wooden board",
    credit: "",
    allergens: "Wheat (gluten)."
  },
  {
    id: "spanish", name: "Spanish bread", price: 100, unit: "dozen", meta: "Per dozen · min. 1 dozen",
    description: "Soft rolled bread with a sweet buttery filling and a crunchy sugar-crumb coating.",
    photo: "img/spanish-bread.webp", alt: "Trays of golden Spanish bread rolls dusted with sugar crumbs",
    credit: "",
    allergens: "Wheat (gluten), milk, egg."
  }
];

const money = n => "₱" + n.toLocaleString("en-PH", { maximumFractionDigits: 2 });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function nextSaturday() {
  const d = new Date(); d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7)); return d;
}

function bakeCard(b, withAllergens) {
  return `<article class="tag">
    <figure class="photo"><img src="${b.photo}" alt="${esc(b.alt)}" width="800" height="600">${b.credit ? `<figcaption>Photo: ${esc(b.credit)}</figcaption>` : ""}</figure>
    <h3>${esc(b.name)}</h3>
    <p>${esc(b.description)}</p>
    ${withAllergens ? `<p class="allergen"><strong>Contains:</strong> ${esc(b.allergens)}</p>` : ""}
    <div class="tag-foot"><span class="meta">${esc(b.meta)}</span><span class="price">${money(b.price)}</span></div>
  </article>`;
}

// Fill shared bits present on any page (script is loaded at the end of each page)
(() => {
  document.querySelectorAll("[data-bakes]").forEach(el => {
    el.innerHTML = BAKES.map(b => bakeCard(b, el.dataset.bakes === "full")).join("");
  });
  document.querySelectorAll("[data-email]").forEach(el => el.textContent = BUSINESS_EMAIL);
  document.querySelectorAll("[data-hours]").forEach(el => el.textContent = PICKUP_HOURS);
  document.querySelectorAll("[data-place]").forEach(el => el.textContent = PICKUP_PLACE);
  document.querySelectorAll("[data-pay]").forEach(el => el.textContent = PAYMENT);
  document.querySelectorAll("[data-kitchen]").forEach(el => el.textContent = KITCHEN_NOTE);
  document.querySelectorAll("[data-cutoff]").forEach(el => {
    if (ORDER_CUTOFF) el.textContent = "Orders close " + ORDER_CUTOFF; else el.hidden = true;
  });
  const sat = nextSaturday();
  document.querySelectorAll("[data-saturday]").forEach(el =>
    el.textContent = "Baking " + sat.toLocaleDateString(undefined, { month: "long", day: "numeric" }));
  const page = document.querySelector("[data-page]")?.dataset.page;
  document.querySelectorAll(".nav a").forEach(a => { if (a.dataset.page === page) a.setAttribute("aria-current", "page"); });
})();
