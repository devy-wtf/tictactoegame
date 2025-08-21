        const magneticButtons = document.querySelectorAll('.botones button');
        const magneticText = document.getElementById('tituloMain');



        window.addEventListener('click', () => {
        const audio = document.getElementById('bg-audio');
          if (audio.paused) {
        audio.play();
  }
});

        magneticButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1) translate(0px, 0px)';
            });

            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const buttonCenterX = rect.left + rect.width / 2;
                const buttonCenterY = rect.top + rect.height / 2;
                
                
                const deltaX = (e.clientX - buttonCenterX) * 0.3; 
                const deltaY = (e.clientY - buttonCenterY) * 0.3;
                
            
                button.style.transform = `scale(1.05) translate(${deltaX}px, ${deltaY}px)`;
            });
        });




           

        function initMagneticText() {
            const text = magneticText.textContent;
            
            magneticText.innerHTML = '';
            
            for (let char of text) {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; // Mantener espacios
                span.className = 'magnetic-letter';
                magneticText.appendChild(span);
            }
            
            const letters = magneticText.querySelectorAll('.magnetic-letter');
            
            document.body.addEventListener('mousemove', (e) => {
                letters.forEach((letter, index) => {
                    const rect = letter.getBoundingClientRect();
                    const letterCenterX = rect.left + rect.width / 2;
                    const letterCenterY = rect.top + rect.height / 2;
                    
                    const distance = Math.sqrt(
                        Math.pow(e.clientX - letterCenterX, 2) + 
                        Math.pow(e.clientY - letterCenterY, 2)
                    );
                    
                    if (distance < 50) {
                        const force = (50 - distance) / 50; 
                        
                        const angle = Math.atan2(e.clientY - letterCenterY, e.clientX - letterCenterX);
                        
                        const moveX = Math.cos(angle) * force * 15;
                        const moveY = Math.sin(angle) * force * 15;
                        
                        letter.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.3})`;
                        
                        letter.style.color = `hsl(${180 + force * 60}, 70%, ${70 + force * 30}%)`;
                    } else {
                        letter.style.transform = 'translate(0px, 0px) scale(1)';
                        letter.style.color = 'white';
                    }
                });
            });
            
            magneticText.addEventListener('mouseleave', () => {
                letters.forEach(letter => {
                    letter.style.transform = 'translate(0px, 0px) scale(1)';
                    letter.style.color = 'white';
                });
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            initMagneticText();
        });