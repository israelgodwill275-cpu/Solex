   
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


    /* ================================
       MODALS
    ================================= */

      function closeModals() {

        document
            .getElementById("signupModal")
            .classList.remove("active");

        document
            .getElementById("loginModal")
            .classList.remove("active");
    }

   
   function openSignup() {

        closeModals();

        document
            .getElementById("signupModal")
            .classList.add("active");
    }


    function openLogin() {

        closeModals();

        document
            .getElementById("loginModal")
            .classList.add("active");
    }


  

    /* ================================
       INSCRIPTION
    ================================= */

    async function register(event) {
    event.preventDefault();

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const message =
        document.getElementById("signupMessage");

    message.textContent = "Création du compte...";

    try {

        const { data, error } =
            await supabaseClient.auth.signUp({
                email: email,
                password: password
            });

        if (error) {
            console.error(error);
            message.textContent = error.message;
            return;
        }

        if (!data.user) {
            message.textContent =
                "Impossible de créer le compte.";
            return;
        }

        // Création du profil
        const { error: profileError } =
            await supabaseClient
                .from("profiles")
                .insert({
                    id: data.user.id,
                    name: name,
                    email: email,
                    balance: 0
                });

        if (profileError) {
            console.error(profileError);

            message.textContent =
                "Compte créé mais profil non créé : "
                + profileError.message;

            return;
        }
      
        message.textContent =
            "Compte créé avec succès !";

        setTimeout(() => {
            window.location.href =
                "dashboard.html";
        }, 1200);

    } catch (error) {

        console.error(error);

        message.textContent =
            "Une erreur est survenue.";
    }
}

    /* ================================
       CONNEXION
    ================================= */
     async function login(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "Connexion...";

    try {

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {
            console.error(error);
            message.textContent = error.message;
            return;
        }

        if (!data.user) {
            message.textContent = "Utilisateur introuvable.";
            return;
        }

        // Récupérer le profil avec l'ID de l'utilisateur
        const { data: profile, error: profileError } =
            await supabaseClient
                .from("profiles")
                .select("name")
                .eq("id", data.user.id)
                .single();

        if (profileError) {
            console.error(profileError);
            message.textContent =
                "Connexion réussie, mais profil introuvable.";
            return;
        }

        localStorage.setItem("user_name", profile.name);
        localStorage.setItem("user_id", data.user.id);

        message.textContent = "Connexion réussie !";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 700);

    } catch (error) {

        console.error(error);

        message.textContent =
            "Une erreur est survenue.";
    }
}
   
   /* =====================================================
   SOLEX — INTERACTIONS
   ===================================================== */
/* Effet 3D des boutons */
document
    .querySelectorAll(".hero-actions button")
    .forEach(button => {
        button.addEventListener("mousemove", event => {
            const rect =
                button.getBoundingClientRect();
            const x =
                event.clientX - rect.left;
            const y =
                event.clientY - rect.top;
            const rotateY =
                (x - rect.width / 2) / 15;
            const rotateX =
                (rect.height / 2 - y) / 15;
            button.style.transform =
                `translateY(-5px)
                 scale(1.025)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });
/* =====================================================
   EFFET 3D DES CARTES
   ===================================================== */
document
    .querySelectorAll(".feature")
    .forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect =
                card.getBoundingClientRect();
            const x =
                event.clientX - rect.left;
            const y =
                event.clientY - rect.top;
            const rotateY =
                (x - rect.width / 2) / 20;
            const rotateX =
                (rect.height / 2 - y) / 20;
            card.style.transform =
                `translateY(-8px)
                 scale(1.025)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
/* =====================================================
   PETIT PARALLAXE DU HERO
   ===================================================== */
const heroContent =
    document.querySelector(".hero-content");
document.addEventListener("mousemove", event => {
    if (!heroContent) return;
    const x =
        (event.clientX / window.innerWidth - 0.5);
    const y =
        (event.clientY / window.innerHeight - 0.5);
    heroContent.style.setProperty(
        "--mouse-x",
        `${x * 4}px`
    );
    heroContent.style.setProperty(
        "--mouse-y",
        `${y * 3}px`
    );
});
/* =====================================================
   COMPTEUR D'ARGENT SOLEX
   ===================================================== */

const moneyCounter =
    document.getElementById("moneyCounter");

let moneyValue = 0;

function animateMoney() {

    const target =
        Math.floor(
            Math.random() * 90000
        ) + 10000;

    const start =
        moneyValue;

    const duration = 2200;

    const startTime =
        performance.now();


    function updateMoney(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );


        /* accélération puis ralentissement */

        const eased =
            1 - Math.pow(1 - progress, 3);


        const current =
            Math.floor(
                start +
                (target - start) * eased
            );


        moneyCounter.textContent =
            current.toLocaleString("fr-FR");


        if (progress < 1) {

            requestAnimationFrame(
                updateMoney
            );

        } else {

            moneyValue = target;

            setTimeout(
                animateMoney,
                900
            );
        }
    }


    requestAnimationFrame(
        updateMoney
    );
}


if (moneyCounter) {
    animateMoney();
}