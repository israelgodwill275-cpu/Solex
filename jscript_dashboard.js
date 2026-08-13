

      /* ================================
       CONFIGURATION SUPABASE
    ================================= */

    const SUPABASE_URL =
        "https://leppncecjxccbkwoktyu.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_FDtcO7MF7VVtQ7s94bpGeQ_5D4Reg4j";

    const supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );
/* ==================================
     RECHERCHE DU NOM DE L'UTILISATEUR
  ============================*/
        /* async function loadUserName() {

    const { data, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !user) {
        console.log("Utilisateur non connecté");
        return;
    }

    const nom= data.user.name;
      alert(nom);
    

    document.getElementById("username").textContent = nom;
}

loadUserName();
/* ========================== */ 
/*NOM DE L'UTILISATEUR*
 const id_name= localStorage.getItem("use_name");
   document.getElementById("username").
*/
/////////
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
/* =====================================================
   NAVIGATION SUR UNE SEULE PAGE
   ===================================================== */

const mobileItems = document.querySelectorAll(".mobile-item");

const pages = {
    0: "page-accueil",
    1: "page-depot",
    2: "page-retrait",
    3: "page-direct",
    4: "page-menu"
};

function showPage(pageId) {

    // Cacher le dashboard
    document
        .getElementById("page-accueil")
        .style.display = "none";

    // Cacher toutes les autres sections
    document
        .querySelectorAll(".page-content")
        .forEach(page => {
            page.classList.remove("active");
        });

    // Afficher la page demandée
    if (pageId === "page-accueil") {

        document
            .getElementById("page-accueil")
            .style.display = "block";

    } else {

        document
            .getElementById(pageId)
            .classList.add("active");
    }
}


mobileItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        // Changer le bouton actif
        mobileItems.forEach(btn => {
            btn.classList.remove("active");
        });

        item.classList.add("active");

        // Afficher le contenu correspondant
        showPage(pages[index]);

        // Remonter en haut
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

