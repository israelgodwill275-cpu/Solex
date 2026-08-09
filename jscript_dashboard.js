let left = 60000;
let right = 40000;
/* FORMAT FCFA */
function money(value) {
 return value.toLocaleString("fr-FR")
 + " FCFA";
}
/* UPDATE */
function updateDashboard() {
 const total = left + right;
 const leftPercent =
 (left / total) * 100;
 const rightPercent =
 (right / total) * 100;
 document
 .getElementById("leftPercent")
 .textContent =
 leftPercent.toFixed(1) + "%";
 document
 .getElementById("rightPercent")
 .textContent =
 rightPercent.toFixed(1) + "%";
 document
 .getElementById("leftAmount")
 .textContent =
 money(left);
 document
 .getElementById("rightAmount")
 .textContent =
 money(right);
 document
 .getElementById("leftBar")
 .style.width =
 leftPercent + "%";
 document
 .getElementById("rightBar")
 .style.width =
 rightPercent + "%";
 document
 .getElementById("total")
 .textContent =
 money(total);
}
/* =====================================================
 SIMULATION TEMPS RÉEL
===================================================== */
setInterval(() => {
 const amount =
 Math.floor(
 Math.random() * 4000
 ) + 500;
 if (
 Math.random() > .5
 ) {
 left += amount;
 } else {
 right += amount;
 }
 updateDashboard();
}, 2500);
updateDashboard();
/* =====================================================
 MOBILE NAV
===================================================== */
document
 .querySelectorAll(".mobile-item")
 .forEach(item => {
 item.addEventListener(
 "click",
 () => {
 document
 .querySelectorAll(
 ".mobile-item"
 )
 .forEach(
 x =>
 x.classList
 .remove("active")
 );
 item.classList
 .add("active");
 }
 );
 });