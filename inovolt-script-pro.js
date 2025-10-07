// ===================================================================
// VERSÃO FINAL E CORRIGIDA - SUBSTITUA TODO O SEU ARQUIVO POR ISTO
// ===================================================================

// Configurações gerais atualizadas
const CONFIG = {
    whatsappNumber: '5517991056878',
    animationDelay: 100,
    scrollOffset: 80,
    countAnimationDuration: 2000,
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeFormValidation();
    initializeScrollEffects();
    initializePhoneMask();
    initializeCounterAnimations();
    initializeCTAEffects();
    initializeIntersectionObserver();
    initializeAdvancedInteractions();
    initializeLazyLoading();
});

// Função para scroll suave para a seção de simulação
function scrollToSimulation() {
    const simulationSection = document.getElementById('simulation');
    if (simulationSection) {
        const offsetTop = simulationSection.offsetTop - CONFIG.scrollOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        const formContainer = document.querySelector('.simulation-form-container');
        if (formContainer) {
            formContainer.style.transform = 'scale(1.02)';
            formContainer.style.boxShadow = '0 25px 50px -12px rgba(37, 99, 235, 0.3)';
            setTimeout(() => {
                formContainer.style.transform = 'scale(1)';
                formContainer.style.boxShadow = '';
            }, 1000);
        }
        
        trackEvent('cta_click', { 
            section: 'scroll_to_simulation',
            button: 'simulacao_gratuita'
        });
    }
}

// Função para abrir WhatsApp com número atualizado
function openWhatsApp() {
    const message = encodeURIComponent(
        '🌞 Olá! Vi a landing page da Inovolt Energia Solar e gostaria de saber mais sobre energia solar e fazer uma simulação gratuita. Podem me ajudar?'
    );
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(whatsappURL, '_blank' );
    
    trackEvent('whatsapp_click', { 
        source: 'cta_button',
        phone: CONFIG.whatsappNumber
    });
}

// Inicializar animações de entrada com Intersection Observer aprimorado
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    if (entry.target.classList.contains('stat-item')) {
                        entry.target.style.animationDelay = `${index * 0.2}s`;
                    }
                }, index * CONFIG.animationDelay);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.comparison-item, .testimonial-item, .step-item, .stat-item'
    );
    
    animatedElements.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Inicializar animações de contador para os números da prova social (CRESCENTE)
function initializeCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });
}

// Função para animar contadores com efeito crescente aprimorado
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = CONFIG.countAnimationDuration;
    const startTime = performance.now();
    
    element.parentElement.style.transform = 'scale(1.05)';
    element.parentElement.style.transition = 'transform 0.3s ease';
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOutCubic);
        
        element.textContent = current;
        
        if (progress < 1) {
            element.style.textShadow = `0 0 ${20 * progress}px rgba(250, 204, 21, 0.8)`;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            element.style.textShadow = '';
            
            element.parentElement.style.transform = 'scale(1)';
            element.parentElement.classList.add('cta-pulse');
            
            createCounterParticles(element.parentElement);
            
            setTimeout(() => {
                element.parentElement.classList.remove('cta-pulse');
            }, 1000);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Criar efeito de partículas para os contadores
function createCounterParticles(container) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FACC15;
            border-radius: 50%;
            pointer-events: none;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: particleFloat 1.5s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        if (container) {
            container.style.position = 'relative';
            container.appendChild(particle);
        }
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// Adicionar CSS para animação de partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) translateY(-20px);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) translateY(-40px);
        }
    }
`;
document.head.appendChild(particleStyle);

// Inicializar efeitos especiais para CTAs
function initializeCTAEffects() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Inicializar interações avançadas
function initializeAdvancedInteractions() {
    const cards = document.querySelectorAll('.comparison-item, .testimonial-item, .step-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    const headline = document.querySelector('.hero-headline');
    if (headline) {
        const text = headline.textContent;
        headline.textContent = '';
        headline.style.borderRight = '2px solid rgba(255,255,255,0.8)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                headline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                headline.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Inicializar validação do formulário aprimorada
function initializeFormValidation() {
    const form = document.getElementById('simulationForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm(); 
        }
    });

    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
            if (this.value.length > 0) {
                validateField(this);
            }
        });
    });
}

// Validar formulário
function validateForm() {
    const form = document.getElementById('simulationForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    clearFieldError(field);

    switch (field.type) {
        case 'text':
            if (field.name === 'name') {
                if (value.length < 2) {
                    errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                    isValid = false;
                } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                    errorMessage = 'Nome deve conter apenas letras';
                    isValid = false;
                }
            } else if (field.name === 'city') {
                if (value.length < 2) {
                    errorMessage = 'Cidade deve ter pelo menos 2 caracteres';
                    isValid = false;
                }
            }
            break;
            
        case 'tel':
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!phoneRegex.test(value) && value.length > 0) {
                errorMessage = 'Formato: (17) 99999-9999';
                isValid = false;
            }
            break;
    }

    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo é obrigatório';
        isValid = false;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
        field.classList.add('error');
    } else {
        field.classList.remove('error');
    }

    return isValid;
}

// Mostrar erro no campo
function showFieldError(field, message) {
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    
    errorElement.style.opacity = '0';
    errorElement.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        errorElement.style.transition = 'all 0.3s ease';
        errorElement.style.opacity = '1';
        errorElement.style.transform = 'translateY(0)';
    }, 10);
}

// Limpar erro do campo
function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.style.opacity = '0';
        errorElement.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            errorElement.remove();
        }, 300);
    }
}

// Submeter formulário com cálculo mais preciso
function submitForm() {
    const form = document.getElementById('simulationForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando...';
    submitButton.style.background = 'linear-gradient(135deg, #94A3B8, #64748B)';

    const formData = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        city: form.city.value.trim(),
        bill: parseFloat(form.bill.value)
    };

    setTimeout(() => {
        let results;
        const billValue = formData.bill;

        if (billValue > 1000) {
            results = {
                isHighValue: true,
                monthlyEconomy: 0,
                systemCost: 0
            };

            const highValueModal = createHighValueModal(formData);
            document.body.appendChild(highValueModal);
            setTimeout(() => {
                highValueModal.style.opacity = '1';
                highValueModal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
            }, 100);

        } else {
            let systemCost;
            const minimumFee = 90;

            const pricingTable = {
                400: 9890,
                500: 11490,
                700: 13990,
                1000: 16500
            };

            if (billValue <= 300) { // Faixa "Até R$ 300"
                systemCost = pricingTable[400] * 0.8; // Estimativa
            } else if (billValue <= 400) {
                systemCost = pricingTable[400];
            } else if (billValue <= 500) {
                systemCost = pricingTable[500];
            } else if (billValue <= 700) {
                systemCost = pricingTable[700];
            } else {
                systemCost = pricingTable[1000];
            }

            const monthlyEconomy = Math.round(billValue - minimumFee);

            results = {
                isHighValue: false,
                monthlyEconomy: monthlyEconomy > 0 ? monthlyEconomy : 0,
                yearlyEconomy: (monthlyEconomy > 0 ? monthlyEconomy : 0) * 12,
                systemCost: Math.round(systemCost),
                paybackTime: monthlyEconomy > 0 ? Math.round(systemCost / monthlyEconomy) : 0,
                monthlyPayment: Math.round(systemCost / 120),
                netSavings: monthlyEconomy - Math.round(systemCost / 120)
            };

            showSimulationResult(formData, results);
        }

        submitButton.disabled = false; 
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';

        trackEvent('form_submit', {
            bill_value: formData.bill,
            city: formData.city,
            estimated_economy: results.monthlyEconomy
        });

        saveLeadToGoogleSheet(formData);

    }, 2500);
}

// Mostrar resultado da simulação aprimorado
function showSimulationResult(formData, results) {
    const modal = createResultModal(formData, results);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
    }, 100);
}

// Criar modal de resultado aprimorado
function createResultModal(formData, results) {
    const modal = document.createElement('div');
    modal.className = 'simulation-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center;
        z-index: 1000; opacity: 0; transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%);
            backdrop-filter: blur(20px); padding: 50px; border-radius: 24px; max-width: 700px; width: 90%;
            text-align: center; transform: translateY(30px) scale(0.9);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-height: 90vh; overflow-y: auto;
        ">
            <div style="color: #10B981; font-size: 4rem; margin-bottom: 20px; animation: pulse 2s infinite;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #1F2937; margin-bottom: 15px; font-size: 2rem;">
                🎉 Simulação Concluída!
            </h3>
            <p style="color: #64748B; margin-bottom: 30px; font-size: 1.1rem;">
                Olá <strong>${formData.name}</strong>, aqui está sua simulação personalizada:
            </p>
            
            <div style="background: linear-gradient(135deg, #1E40AF 0%, #2563EB 100%); padding: 30px; border-radius: 16px; margin-bottom: 30px; color: white;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: 800; color: #FACC15;">R$ ${results.monthlyEconomy.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                        <div style="opacity: 0.9; font-size: 0.9rem;">Economia mensal</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: 800; color: #FACC15;">R$ ${results.systemCost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                        <div style="opacity: 0.9; font-size: 0.9rem;">Investimento total</div>
                    </div>
                </div>
            </div>
            <p style="color: #64748B; margin-bottom: 30px; font-size: 0.95rem;">
                Nossa equipe especializada entrará em contato em até <strong>2 horas</strong> com uma proposta detalhada!
            </p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="sendToWhatsApp(${JSON.stringify(formData).replace(/"/g, '&quot;')}, ${JSON.stringify(results).replace(/"/g, '&quot;')})" 
                        class="btn btn-whatsapp" style="
                    background: #25D366; color: white; padding: 16px 32px; border: none; border-radius: 50px;
                    font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 10px;
                    text-decoration: none; transition: all 0.3s ease;
                ">
                    <i class="fab fa-whatsapp"></i>
                    Falar no WhatsApp
                </button>
                <button onclick="closeModal()" style="
                    background: #6B7280; color: white; padding: 16px 32px; border: none; border-radius: 50px;
                    font-weight: 600; cursor: pointer; transition: all 0.3s ease;
                ">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    return modal;
}

// Fechar modal
function closeModal(selector = '.simulation-modal') {
    const modal = document.querySelector(selector);
    if (modal) {
        modal.style.opacity = '0';
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'translateY(30px) scale(0.9)';
        }
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Enviar para WhatsApp com dados da simulação aprimorados
function sendToWhatsApp(formData, results) {
    const message = `
🌞 *SIMULAÇÃO ENERGIA SOLAR - INOVOLT* 🌞

👤 *Nome:* ${formData.name}
📱 *Telefone:* ${formData.phone}
🏙️ *Cidade:* ${formData.city}
💡 *Conta atual:* R$ ${formData.bill.toLocaleString('pt-BR', {minimumFractionDigits: 2})}

📊 *RESULTADOS DA SIMULAÇÃO:*
💰 Economia mensal: R$ ${results.monthlyEconomy.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
🏠 Investimento total: R$ ${results.systemCost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}

🎯 *VANTAGENS:*
• Economia IMEDIATA mesmo pagando financiamento

Gostaria de receber uma proposta detalhada e agendar uma visita técnica gratuita! 🚀
    `.trim();
    
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message )}`;
    window.open(whatsappURL, '_blank');
    
    trackEvent('whatsapp_simulation', {
        bill_value: formData.bill,
        estimated_economy: results.monthlyEconomy,
        city: formData.city,
        system_cost: results.systemCost
    });
    
    closeModal();
}

// Inicializar máscara de telefone
function initializePhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 6) {
                value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
    
    phoneInput.setAttribute('placeholder', '(17) 99999-9999');
}

// Inicializar efeitos de scroll aprimorados
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        const scrollProgress = (scrolled / (document.body.scrollHeight - window.innerHeight)) * 100;
        updateScrollProgress(scrollProgress);
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Atualizar indicador de progresso de scroll
function updateScrollProgress(progress) {
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed; top: 0; left: 0; width: ${progress}%; height: 3px;
            background: linear-gradient(90deg, #FACC15, #2563EB); z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = `${progress}%`;
    }
}

// Inicializar animações gerais
function initializeAnimations() {
    const elementsToAnimate = document.querySelectorAll(
        '.hero-text, .hero-image, .section-title, .comparison-item, .testimonial-item, .step-item'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Sistema de Analytics/Tracking aprimorado
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    console.log('Event tracked:', eventName, eventData);
}

// Prevenção de spam no formulário
let lastSubmission = 0;
const SUBMISSION_COOLDOWN = 10000;

function canSubmitForm() {
    const now = Date.now();
    if (now - lastSubmission < SUBMISSION_COOLDOWN) {
        showNotification('Aguarde alguns segundos antes de enviar novamente.', 'warning');
        return false;
    }
    lastSubmission = now;
    return true;
}

// Sistema de notificações aprimorado
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#3B82F6'};
        color: white; padding: 16px 24px; border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); z-index: 1001;
        transform: translateX(100%); transition: transform 0.3s ease;
        max-width: 300px; font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// VERSÃO CORRIGIDA E MAIS SIMPLES
const originalSubmitForm = submitForm; // Guarda uma cópia da sua função original
submitForm = function() { // Redefine a função submitForm
    // Agora, ela primeiro verifica o cooldown ANTES de chamar a versão original
    if (canSubmitForm()) {
        originalSubmitForm(); // Se puder submeter, chama a função original com toda a lógica
    }
};

// Otimizações de performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listeners otimizados
window.addEventListener('resize', debounce(() => {
    initializeScrollEffects();
}, 250));

// ... continuação do código anterior

// Lazy loading para imagens aprimorado
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Rastrear tempo na página
let pageStartTime = Date.now();
window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
    trackEvent('page_time', { seconds: timeOnPage });
});

// Rastrear scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', debounce(() => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (scrollDepth >= 25 && scrollDepth < 50) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollDepth >= 50 && scrollDepth < 75) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollDepth >= 75 && scrollDepth < 90) {
            trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollDepth >= 90) {
            trackEvent('scroll_depth', { depth: '90%' });
        }
    }
}, 500));

// Detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para mobile
if (isMobile()) {
    CONFIG.countAnimationDuration = 1500;
    document.addEventListener('touchstart', function() {}, { passive: true });
}

// ===================================================================
// FUNÇÕES ADICIONAIS PARA MODAL DE ALTO VALOR E GOOGLE SHEETS
// ===================================================================

function createHighValueModal(formData) {
    const modal = document.createElement('div');
    modal.className = 'simulation-modal high-value-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center;
        z-index: 1000; opacity: 0; transition: opacity 0.3s ease;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="
            background: linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%);
            backdrop-filter: blur(20px); padding: 50px; border-radius: 24px; max-width: 700px; width: 90%;
            text-align: center; transform: translateY(30px) scale(0.9);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        ">
            <div style="color: #2563EB; font-size: 4rem; margin-bottom: 20px;">
                <i class="fas fa-user-tie"></i>
            </div>
            <h3 style="color: #1F2937; margin-bottom: 15px; font-size: 2rem;">
                Obrigado, ${formData.name}!
            </h3>
            <p style="color: #64748B; margin-bottom: 30px; font-size: 1.1rem; max-width: 500px; margin-left: auto; margin-right: auto;">
                Para contas com este valor, um de nossos <strong>vendedores especializados</strong> entrará em contato em breve para oferecer uma solução comercial personalizada.
            </p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
                <button onclick="closeModal('.high-value-modal')" style="background: #6B7280; color: white; padding: 16px 32px; border: none; border-radius: 50px; font-weight: 600; cursor: pointer;">
                    Fechar
                </button>
            </div>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal('.high-value-modal');
        }
    });
    return modal;
}

function saveLeadToGoogleSheet(formData) {
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbz5_Yj9FWq7z3ku_537aotX1Q-DQADF5fAsXeRoz13zmEF7CI5Mg6mDbhPeE_BgRA/exec'; // ⚠️ SUBSTITUA PELA SUA URL REAL!

    const dataToPost = new FormData();
    dataToPost.append('nome', formData.name);
    dataToPost.append('telefone', formData.phone);
    dataToPost.append('cidade', formData.city);
    dataToPost.append('valor_conta', formData.bill);

    fetch(googleScriptURL, { method: 'POST', body: dataToPost })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            console.log('Lead salvo com sucesso na Planilha Google.');
        } else {
            console.error('Houve um problema ao salvar o lead:', data.error);
        }
    })
    .catch(error => {
        console.error('Erro crítico de rede ao tentar salvar o lead:', error);
    });
}

// Inicialização final
console.log('🌞 Inovolt Energia Solar - Landing Page PRO carregada com sucesso!');
console.log('📱 WhatsApp:', CONFIG.whatsappNumber);
console.log('🚀 Todas as funcionalidades ativas e otimizadas para conversão!');

