class MatrixEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.fontSize = Math.floor(24 * this.dpr);
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.colors = [
            { h: 30, s: 80, l: 60 }, // Ajuste saturation et luminosité pour un effet néon léger
            { h: 316, s: 80, l: 60 },
            { h: 223, s: 80, l: 60 },
            { h: 214, s: 80, l: 60 }
        ];
        this.particles = [];
        this.resize();
        this.initParticles();
        window.addEventListener('resize', () => this.resize());
        this.draw();
    }

    resize() {
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(this.dpr, this.dpr);
        this.cols = Math.floor(window.innerWidth / (this.fontSize / this.dpr));
        this.rows = Math.floor(window.innerHeight / (this.fontSize / this.dpr));
        this.ctx.font = `${Math.floor(this.fontSize / this.dpr)}px 'Courier New', monospace`;
        this.initParticles();
    }

    initParticles() {
        this.particles = Array.from({ length: this.cols }, (_, x) => ({
            y: -Math.floor(Math.random() * this.rows * this.fontSize),
            speed: Math.floor(1 + Math.random() * 3),
            color: this.colors[x % this.colors.length],
            chars: [],
            fadeTime: Math.random() * 5000 + 3000, // Disparaît entre 3 et 8 secondes
            lastUpdate: performance.now()
        }));
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'; // Diminue encore l'opacité pour un effet plus propre
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const now = performance.now();
        
        this.particles.forEach((particle, x) => {
            const color = particle.color;
            this.ctx.fillStyle = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
            this.ctx.shadowColor = `hsl(${color.h}, ${color.s}%, ${color.l + 20}%)`; // Ajoute une légère lueur
            this.ctx.shadowBlur = 8;

            if (now - particle.lastUpdate > particle.fadeTime) {
                particle.chars = [];
                particle.y = -Math.floor(Math.random() * this.rows * this.fontSize);
                particle.fadeTime = Math.random() * 5000 + 3000;
                particle.lastUpdate = now;
            } else {
                if (particle.chars.length < this.rows) {
                    particle.chars.push(this.chars[Math.floor(Math.random() * this.chars.length)]);
                }
                
                particle.chars.forEach((char, y) => {
                    const py = (particle.y + y * this.fontSize) % (this.rows * this.fontSize);
                    this.ctx.fillText(char, Math.round(x * this.fontSize), Math.round(py));
                });
                
                particle.y += particle.speed;
            }
        });

        this.ctx.shadowBlur = 0; // Réinitialise l'effet de lueur
        requestAnimationFrame(() => this.draw());
    }
}

document.addEventListener('DOMContentLoaded', () => new MatrixEffect('matrixCanvas'));



