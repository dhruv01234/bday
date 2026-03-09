// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Initialize and Play Audio
function playAudio() {
    const audio = document.getElementById('birthdayAudio');
    console.log('Audio element:', audio);
    if (audio) {
        audio.volume = 0.5;
        audio.play().catch(err => console.log('Audio play failed:', err));
    }
}

// Landing Page
document.getElementById('openBtn').addEventListener('click', function() {
    playAudio();
    showScreen('envelope-screen');
});

// Envelope interaction
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', function() {
    if (!this.classList.contains('open')) {
        this.classList.add('open');
        setTimeout(() => {
            createConfetti();
            showScreen('message-screen');
        }, 1000);
    }
});

// Create Confetti
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ffd700', '#4169e1'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (2 + Math.random() * 1.5) + 's';
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3500);
    }
}

// Move to Memories Screen
document.getElementById('nextBtn').addEventListener('click', function() {
    showScreen('memories-screen');
});

// Memory Cards Interaction
const memoryCards = document.querySelectorAll('.memory-card');
memoryCards.forEach((card, index) => {
    card.style.setProperty('--index', index);
    card.addEventListener('click', function() {
        const text = this.getAttribute('data-text');
        showAlert(text);
    });
});

// Custom Alert with animation
function showAlert(message) {
    // Remove existing alert if present
    const existing = document.querySelector('.custom-alert');
    if (existing) existing.remove();
    
    const alert = document.createElement('div');
    alert.classList.add('custom-alert');
    alert.innerHTML = `
        <div class="alert-content">
            <p>${message}</p>
            <span class="close-alert">&times;</span>
        </div>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: popUp 0.4s ease-out;
        max-width: 400px;
        text-align: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popUp {
            from {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        .alert-content {
            position: relative;
        }
        
        .alert-content p {
            color: #764ba2;
            font-size: 1.1rem;
            font-weight: bold;
            margin: 0;
        }
        
        .close-alert {
            position: absolute;
            top: -15px;
            right: -15px;
            font-size: 2rem;
            cursor: pointer;
            color: #ff69b4;
            font-weight: bold;
        }
        
        .close-alert:hover {
            color: #ff1493;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(alert);
    
    alert.querySelector('.close-alert').addEventListener('click', function() {
        alert.style.animation = 'popUp 0.4s ease-in reverse';
        setTimeout(() => alert.remove(), 400);
    });
    
    // Auto close after 3 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.animation = 'popUp 0.4s ease-in reverse';
            setTimeout(() => alert.remove(), 400);
        }
    }, 3000);
}

// Move to Final Screen
document.getElementById('finalBtn').addEventListener('click', function() {
    showScreen('final-screen');
    createOrbitingHearts();
    createFireworks();
});

// Fireworks Animation
function createFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 8;
            this.vy = (Math.random() - 0.5) * 8;
            this.color = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffd700', '#4169e1'][Math.floor(Math.random() * 5)];
            this.size = Math.random() * 3 + 2;
            this.life = 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.1;
            this.life -= 0.01;
        }
        
        draw() {
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    function createFirework(x, y) {
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y));
        }
    }
    
    // Create multiple fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * (canvas.height * 0.6) + 100
            );
        }, i * 300);
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            if (p.life <= 0) {
                particles.splice(index, 1);
            } else {
                p.update();
                p.draw();
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Restart Button
document.addEventListener('DOMContentLoaded', function() {
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            location.reload();
        });
    }
});

// Alternative: Also add it without DOMContentLoaded as backup
setTimeout(function() {
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn && !restartBtn.hasClickListener) {
        restartBtn.addEventListener('click', function() {
            location.reload();
        });
        restartBtn.hasClickListener = true;
    }
}, 100);

// Keyboard Navigation (Q to quick restart)
document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'q') {
        location.reload();
    }
});

// Add keyboard support for navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen && activeScreen.id === 'landing') {
            document.getElementById('openBtn').click();
        }
    }
});

// Window resize handler for canvas
window.addEventListener('resize', function() {
    const canvas = document.getElementById('fireworks');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Memory cards dynamic animation delay
document.querySelectorAll('.memory-card').forEach((card, index) => {
    card.style.setProperty('--index', index);
});

// Create Orbiting Hearts
function createOrbitingHearts() {
    const container = document.getElementById('orbitingHearts');
    container.innerHTML = ''; // Clear previous hearts
    
    const hearts = ['💕', '💕', '🌹', '✨', '💌'];
    
    hearts.forEach((heart, index) => {
        const orbitHeart = document.createElement('div');
        orbitHeart.classList.add('orbit-heart');
        orbitHeart.textContent = heart;
        orbitHeart.style.animationDelay = (index * 1.6) + 's';
        container.appendChild(orbitHeart);
    });
}
