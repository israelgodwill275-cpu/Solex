

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
   document.getElementById("username").textContent(id_name);
//////////////////////*/

/* LOADIND SCREEN*/
document
    .getElementById("solexLoginForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("solexEmail").value.trim();

        const password =
            document.getElementById("solexPassword").value;

        const button =
            document.getElementById("solexLoginButton");

        const message =
            document.getElementById("solexLoginMessage");

        button.disabled = true;
        button.textContent = "Connexion...";

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {

            message.textContent =
                "Email ou mot de passe incorrect.";

            button.disabled = false;
            button.textContent = "Continuer";

            return;
        }

        message.textContent = "";

        document
            .getElementById("solexLoadingScreen")
            .classList.add("solex-loading-hidden");

    });

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