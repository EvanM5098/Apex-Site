// Binary animation
const canvas = document.getElementById('binaryCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const chars = '01';
const fontSize = 20;
const columns = width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);
const colors = ['#00f7ff', '#ffffff', '#c0c0c0'];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function drawBinary() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    drops.forEach((drop, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drop * fontSize;
        
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, x, y);
        
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
    });
}

// Navigation and sections
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Section observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Animation loop and resize handler
window.addEventListener('resize', resizeCanvas);
(function animate() {
    drawBinary();
    requestAnimationFrame(animate);
})();