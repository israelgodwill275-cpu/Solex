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


    function closeModals() {

        document
            .getElementById("signupModal")
            .classList.remove("active");

        document
            .getElementById("loginModal")
            .classList.remove("active");
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
                message.textContent = error.message;
                return;
            }


            if (!data.user) {

                message.textContent =
                    "Impossible de créer le compte.";

                return;
            }


            /*
             * Création du profil Solex
             */

            const { error: profileError } =
                await supabaseClient
                    .from("profiles")
                    .insert({
                        id: data.user.id,
                        name: name,
                        balance: 0
                    });


            if (profileError) {

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

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        message.textContent =
            "Connexion...";


        try {

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                message.textContent =
                    error.message;

                return;
            }


            message.textContent =
                "Connexion réussie !";


            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 700);


        } catch (error) {

            console.error(error);

            message.textContent =
                "Une erreur est survenue.";

        }

    }