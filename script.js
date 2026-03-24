// Typewriter Effect
function typewriterEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    function type() {
        if (index < text.length) {
            const char = text[index];
            element.appendChild(document.createTextNode(char));
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

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
    showScreen('cake-screen');
});

// Cake Cutting Interaction
let cakeCut = false;
const cutBtn = document.getElementById('cutBtn');
const cake = document.getElementById('cake');
const cakeMessage = document.getElementById('cakeMessage');
const cakeNextBtn = document.getElementById('cakeNextBtn');
const knife = document.getElementById('knife');

// Create particles effect
function createCakeParticles() {
    const particlesContainer = document.getElementById('cakeParticles');
    const colors = ['#FFD700', '#FFA500', '#FF69B4', '#FF1493', '#FFB6C1'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cake-particle');
        
        const size = Math.random() * 15 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 8 + 5;
        
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size}px ${color}`;
        
        particlesContainer.appendChild(particle);
        
        // Animate particle
        let startX = 0;
        let startY = 0;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let life = 1;
        
        function animateParticle() {
            startX += vx;
            startY += vy;
            vy += 0.15; // gravity
            life -= 0.02;
            
            particle.style.transform = `translate(${startX}px, ${startY}px)`;
            particle.style.opacity = life;
            
            if (life > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
}

if (cutBtn) {
    cutBtn.addEventListener('click', function() {
        if (!cakeCut) {
            cakeCut = true;
            cutBtn.disabled = true;
            cutBtn.style.pointerEvents = 'none';
            
            // Add cutting animations
            cake.classList.add('cutting');
            knife.classList.add('cutting');
            
            // Create particles
            createCakeParticles();
            
            // Remove cake layers with staggered timing
            const layers = cake.querySelectorAll('.cake-layer-3d');
            layers.forEach((layer, index) => {
                setTimeout(() => {
                    layer.classList.add('cutting');
                }, index * 150);
            });
            
            // Show message
            setTimeout(() => {
                cakeMessage.style.display = 'block';
            }, 300);
            
            // Show next button
            setTimeout(() => {
                cakeNextBtn.style.display = 'block';
            }, 1200);
        }
    });
}

// Cake Next Button
if (cakeNextBtn) {
    cakeNextBtn.addEventListener('click', function() {
        showScreen('envelope-screen');
        cakeCut = false;
        cutBtn.disabled = false;
        cutBtn.style.pointerEvents = 'auto';
        cakeMessage.style.display = 'none';
        cakeNextBtn.style.display = 'none';
        cake.classList.remove('cutting');
        knife.classList.remove('cutting');
        
        // Reset cake layers
        const layers = cake.querySelectorAll('.cake-layer-3d');
        layers.forEach((layer) => {
            layer.classList.remove('cutting');
        });
    });
}

// Envelope interaction
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', function() {
    if (!this.classList.contains('open')) {
        this.classList.add('open');
        setTimeout(() => {
            createConfetti();
            showScreen('message-screen');
            
            // Apply typewriter effect to birthday message
            setTimeout(() => {
                const happyBirthdayEl = document.querySelector('.happy-birthday');
                const nameEl = document.querySelector('.name-text');
                const letterBody = document.querySelector('.letter-body');
                const letterGreeting = document.querySelector('.letter-greeting');
                
                // Clear all content first
                if (happyBirthdayEl) {
                    happyBirthdayEl.innerHTML = '';
                }
                if (nameEl) {
                    nameEl.innerHTML = '';
                }
                if (letterGreeting) {
                    letterGreeting.innerHTML = '';
                }
                if (letterBody) {
                    const paragraphs = letterBody.querySelectorAll('p');
                    paragraphs.forEach(p => {
                        p.innerHTML = '';
                    });
                }
                
                // Now start typewriter effects
                if (happyBirthdayEl) {
                    typewriterEffect(happyBirthdayEl, '🎉 HAPPY BIRTHDAY! 🎉', 60);
                }
                
                setTimeout(() => {
                    if (nameEl) {
                        typewriterEffect(nameEl, 'Sanchita', 80);
                    }
                }, 1500);
                
                setTimeout(() => {
                    if (letterGreeting) {
                        typewriterEffect(letterGreeting, 'My Dearest Sanchita,', 50);
                    }
                }, 2000);
                
                // Type out all paragraphs in letter body sequentially
                if (letterBody) {
                    const paragraphs = letterBody.querySelectorAll('p');
                    const texts = [
                        'Today is the day the world became a more beautiful place, because you were born. I wanted to take this moment to tell you something that I feel every single day...',
                        'You are not just my lifeline, you are my greatest surprise, my sweetest dream, and my most beautiful reality. Your smile brightens my darkest days, your laugh is the best music I could ever hear, and your love has transformed my life completely.',
                        'Every moment with you feels like a celebration. The way you care, the way you love, the way you make everyone around you feel special - it all makes me fall in love with you more and more each day.',
                        'On this special day, I want you to know that you deserve all the happiness in the world. You deserve to be cherished, celebrated, and loved the way you love others. And I promise to spend the rest of my life making you smile and showing you how incredible you truly are.',
                        'Thank you for being you. Thank you for loving me. Thank you for making life an adventure full of love and laughter.'
                    ];
                    
                    let cumulativeDelay = 2700;
                    
                    paragraphs.forEach((p, index) => {
                        if (texts[index]) {
                            setTimeout(() => {
                                typewriterEffect(p, texts[index], 20);
                            }, cumulativeDelay);
                            
                            // Calculate time for this paragraph to finish typing, plus 500ms gap
                            cumulativeDelay += (texts[index].length * 20) + 500;
                        }
                    });
                }
            }, 200);
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
