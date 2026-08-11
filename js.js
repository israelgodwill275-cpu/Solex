document.addEventListener("DOMContentLoaded", () => {

    const background = document.createElement("div");

    background.id = "solex-background";

    background.innerHTML = `
        <canvas id="solexCanvas"></canvas>

        <div class="solex-glow glow-1"></div>
        <div class="solex-glow glow-2"></div>
        <div class="solex-glow glow-3"></div>

        <div class="solex-grid"></div>

        <div class="solex-ring ring-1"></div>
        <div class="solex-ring ring-2"></div>
        <div class="solex-ring ring-3"></div>
    `;

    document.body.prepend(background);

});
  document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("solexCanvas");
    const ctx = canvas.getContext("2d");

    let particles = [];

    let mouse = {
        x: null,
        y: null
    };

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener("resize", () => {

        resizeCanvas();
        createParticles();

    });

    window.addEventListener("mousemove", (event) => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    });

    window.addEventListener("mouseleave", () => {

        mouse.x = null;
        mouse.y = null;

    });


    class Particle {

        constructor() {

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

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

            if (mouse.x !== null) {

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < 180 && distance > 0) {

                    this.x -= dx / distance * 0.25;
                    this.y -= dy / distance * 0.25;

                }

            }

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


    function createParticles() {

        particles = [];

        const amount =
            window.innerWidth < 600
                ? 45
                : 110;

        for (let i = 0; i < amount; i++) {

            particles.push(
                new Particle()
            );

        }

    }


    function connectParticles() {

        for (let a = 0; a < particles.length; a++) {

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
                    Math.sqrt(dx * dx + dy * dy);

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


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });

        connectParticles();

        requestAnimationFrame(animate);

    }


    createParticles();
    animate();

});