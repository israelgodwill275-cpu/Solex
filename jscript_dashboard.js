

/* =====================================================
   SOLEX PARTICLE NETWORK
   ===================================================== */

const canvas = document.getElementById("solexCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};


/* =====================================================
   REDIMENSIONNEMENT
   ===================================================== */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();


window.addEventListener("resize", () => {

    resizeCanvas();

    createParticles();

});


/* =====================================================
   SOURIS
   ===================================================== */

window.addEventListener("mousemove", (event) => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});


window.addEventListener("mouseleave", () => {

    mouse.x = null;
    mouse.y = null;

});


/* =====================================================
   PARTICULE
   ===================================================== */

class Particle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 2.2 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.45;

        this.speedY =
            (Math.random() - 0.5) * 0.45;

        this.alpha =
            Math.random() * 0.7 + 0.15;

        this.pulse =
            Math.random() * Math.PI * 2;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        this.pulse += 0.015;


        /* Interaction avec la souris */

        if (mouse.x !== null) {

            const dx =
                mouse.x - this.x;

            const dy =
                mouse.y - this.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 180 && distance > 0) {

                this.x -=
                    dx / distance * 0.25;

                this.y -=
                    dy / distance * 0.25;

            }

        }


        /* Rebond sur les bords */

        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {

            this.speedX *= -1;

        }


        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.speedY *= -1;

        }

    }


    draw() {

        const glow =
            0.5 +
            Math.sin(this.pulse) * 0.3;


        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(34,197,94,${this.alpha * glow})`;

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "rgba(34,197,94,0.8)";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


/* =====================================================
   CRÉATION DES PARTICULES
   ===================================================== */

function createParticles() {

    particles = [];

    let amount;


    if (window.innerWidth < 600) {

        amount = 45;

    } else {

        amount = 110;

    }


    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );

    }

}


/* =====================================================
   CONNEXIONS
   ===================================================== */

function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 125) {

                const opacity =
                    1 - distance / 125;


                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );


                ctx.strokeStyle =
                    `rgba(
                        34,
                        197,
                        94,
                        ${opacity * 0.18}
                    )`;

                ctx.lineWidth = 0.7;

                ctx.stroke();

            }

        }

    }

}


/* =====================================================
   ANIMATION
   ===================================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    connectParticles();


    requestAnimationFrame(
        animate
    );

}


/* =====================================================
   DÉMARRAGE
   ===================================================== */

createParticles();

animate();

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