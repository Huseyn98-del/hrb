// ============================================
// DOCUMENT READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeAnimations();
    initializeInteractivity();
    setCurrentDate();
});

// ============================================
// PAGE INITIALIZATION
// ============================================
function initializePage() {
    console.log('🚀 Səhifə yükləndi - Elma və HRB Sistem Problemləri');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading animation completion
    document.body.classList.add('loaded');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation to children
                const children = entry.target.querySelectorAll('.solution-step, .info-box');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all problem cards
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => observer.observe(card));
}

// ============================================
// INTERACTIVE FEATURES
// ============================================
function initializeInteractivity() {
    // Add click handlers for problem cards
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach(card => {
        // Add expand/collapse functionality
        const header = card.querySelector('.problem-header');
        
        header.addEventListener('click', function() {
            // Toggle active state
            card.classList.toggle('expanded');
            
            // Smooth scroll to card
            if (card.classList.contains('expanded')) {
                setTimeout(() => {
                    card.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 300);
            }
        });

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add copy functionality for problem numbers
    addCopyFunctionality();
    
    // Add print functionality
    addPrintFunctionality();
    
    // Add highlight on hover for solution steps
    addSolutionStepInteractivity();
}

// ============================================
// COPY FUNCTIONALITY
// ============================================
function addCopyFunctionality() {
    const problemNumbers = document.querySelectorAll('.problem-number');
    
    problemNumbers.forEach(number => {
        number.style.cursor = 'pointer';
        number.title = 'Problem nömrəsini kopyala';
        
        number.addEventListener('click', function(e) {
            e.stopPropagation();
            const problemId = this.closest('.problem-card').dataset.problem;
            const problemTitle = this.closest('.problem-card').querySelector('.problem-title').textContent.trim();
            
            const textToCopy = `Problem ${problemId}: ${problemTitle}`;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification('✅ Kopyalandı!', 'success');
            }).catch(() => {
                showNotification('❌ Kopyalama uğursuz oldu', 'error');
            });
        });
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.75rem',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        fontWeight: '600',
        fontSize: '0.9375rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s',
        minWidth: '200px',
        textAlign: 'center'
    });

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PRINT FUNCTIONALITY
// ============================================
function addPrintFunctionality() {
    // Add print button to hero section
    const heroContent = document.querySelector('.hero-content');
    
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Çap et';
    printButton.className = 'print-button';
    
    Object.assign(printButton.style, {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '2px solid white',
        borderRadius: '0.5rem',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
    });

    printButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'white';
        this.style.color = '#667eea';
        this.style.transform = 'scale(1.05)';
    });

    printButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        this.style.color = 'white';
        this.style.transform = 'scale(1)';
    });

    printButton.addEventListener('click', function() {
        window.print();
    });

    heroContent.appendChild(printButton);
}

// ============================================
// SOLUTION STEP INTERACTIVITY
// ============================================
function addSolutionStepInteractivity() {
    const solutionSteps = document.querySelectorAll('.solution-step');
    
    solutionSteps.forEach((step, index) => {
        // Add initial opacity for animation
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'all 0.5s ease';
        
        // Add click to highlight
        step.addEventListener('click', function() {
            // Remove highlight from all steps
            solutionSteps.forEach(s => {
                s.style.border = 'none';
                s.style.backgroundColor = 'white';
            });
            
            // Highlight clicked step
            this.style.border = '2px solid #667eea';
            this.style.backgroundColor = '#f0f4ff';
            
            // Copy step content
            const stepTitle = this.querySelector('h4').textContent;
            const stepDescription = this.querySelector('p').textContent;
            const stepNumber = this.querySelector('.step-number').textContent;
            
            const textToCopy = `Addım ${stepNumber}: ${stepTitle}\n${stepDescription}`;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification('✅ Həll addımı kopyalandı!', 'success');
            });
        });

        // Add hover tooltip
        step.title = 'Kopyalamaq üçün klikləyin';
    });
}

// ============================================
// SET CURRENT DATE
// ============================================
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = today.toLocaleDateString('az-AZ', options);
        dateElement.textContent = formattedDate;
    }
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Ctrl/Cmd + K for copy all problems
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        copyAllProblems();
    }
});

// ============================================
// COPY ALL PROBLEMS
// ============================================
function copyAllProblems() {
    const problemCards = document.querySelectorAll('.problem-card');
    let allText = 'ELMA VƏ HRB SİSTEM PROBLEMLƏRİ - TEXNİKİ SƏNƏD\n\n';
    
    problemCards.forEach((card, index) => {
        const title = card.querySelector('.problem-title').textContent.trim();
        const problemLists = card.querySelectorAll('.problem-list li');
        const solutionSteps = card.querySelectorAll('.solution-step');
        
        allText += `\n${'='.repeat(50)}\n`;
        allText += `PROBLEM ${index + 1}: ${title}\n`;
        allText += `${'='.repeat(50)}\n\n`;
        
        allText += 'PROBLEM TƏSVİRİ:\n';
        problemLists.forEach(li => {
            allText += `• ${li.textContent.trim()}\n`;
        });
        
        allText += '\nHƏLL TƏKLİFLƏRİ:\n';
        solutionSteps.forEach((step, stepIndex) => {
            const stepTitle = step.querySelector('h4').textContent;
            const stepDesc = step.querySelector('p').textContent;
            allText += `\n${stepIndex + 1}. ${stepTitle}\n   ${stepDesc}\n`;
        });
        
        allText += '\n';
    });
    
    navigator.clipboard.writeText(allText).then(() => {
        showNotification('✅ Bütün problemlər kopyalandı!', 'success');
    }).catch(() => {
        showNotification('❌ Kopyalama uğursuz oldu', 'error');
    });
}

// ============================================
// ACCESSIBILITY FEATURES
// ============================================
function initializeAccessibility() {
    // Add focus styles for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, .problem-card, .solution-step');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
initializeAccessibility();

// ============================================
// EXPORT FUNCTIONS
// ============================================
console.log('📋 Keyboard Shortcuts:');
console.log('   Ctrl/Cmd + P  : Çap et');
console.log('   Ctrl/Cmd + K  : Bütün problemləri kopyala');
console.log('💡 Features:');
console.log('   • Problem nömrəsinə klik et → Kopyala');
console.log('   • Həll addımına klik et → Kopyala');
console.log('   • Card üzərinə hover et → Animasiya');
console.log('✨ Səhifə tam yükləndi və hazırdır!');
