/**
 * ==========================================================================
 * SHE CAN FOUNDATION CONTACT PORTAL FRONTEND INTERACTIVITY
 * Developed by Nithya for Internship Submission
 * Description: Client-side validation, live character limits, dynamic 
 *              validation status cues, and micro-loading action simulation.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Element Cache
    const contactForm = document.getElementById('contactForm');
    const formCard = document.getElementById('formCard');
    
    // Inputs & Error Indicators
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Char Counter Elements
    const charCount = document.getElementById('charCount');
    
    // Button Elements
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Success View Elements
    const successScreen = document.getElementById('successScreen');
    const previewName = document.getElementById('previewName');
    const previewEmail = document.getElementById('previewEmail');

    // 2. Real-Time Message Character Meter
    messageInput.addEventListener('input', () => {
        const currentLength = messageInput.value.length;
        charCount.textContent = currentLength;
        
        // Color feedback depending on length threshold
        if (currentLength >= 480) {
            charCount.style.color = 'var(--error)';
        } else if (currentLength >= 400) {
            charCount.style.color = 'var(--secondary)';
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
        
        // Instant check validation
        validateMessage();
    });

    // 3. Real-Time Focus & Keypress Input Validations
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);

    // Helper: Validate Full Name Field
    function validateName() {
        const value = nameInput.value.trim();
        const group = nameInput.closest('.input-group');
        const statusIcon = document.getElementById('nameStatus');
        
        if (value.length < 2) {
            group.classList.add('error-state');
            group.classList.remove('success-state');
            statusIcon.textContent = '❌';
            return false;
        } else {
            group.classList.remove('error-state');
            group.classList.add('success-state');
            statusIcon.textContent = '✨';
            return true;
        }
    }

    // Helper: Validate Email field using a regex pattern
    function validateEmail() {
        const value = emailInput.value.trim();
        const group = emailInput.closest('.input-group');
        const statusIcon = document.getElementById('emailStatus');
        
        // Standard regular expression matching emails
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(value)) {
            group.classList.add('error-state');
            group.classList.remove('success-state');
            statusIcon.textContent = '❌';
            return false;
        } else {
            group.classList.remove('error-state');
            group.classList.add('success-state');
            statusIcon.textContent = '✨';
            return true;
        }
    }

    // Helper: Validate Message text
    function validateMessage() {
        const value = messageInput.value.trim();
        const group = messageInput.closest('.input-group');
        const statusIcon = document.getElementById('messageStatus');
        
        // Minimum length of 10 characters to verify genuine queries
        if (value.length < 10) {
            group.classList.add('error-state');
            group.classList.remove('success-state');
            statusIcon.textContent = '❌';
            return false;
        } else {
            group.classList.remove('error-state');
            group.classList.add('success-state');
            statusIcon.textContent = '✨';
            return true;
        }
    }

    // 4. Form Submit Action
    contactForm.addEventListener('submit', (event) => {
        // Prevent default reload behavior
        event.preventDefault();
        
        // Perform final check before submittal
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // If any fail validation, focus the first error
        if (!isNameValid) {
            nameInput.focus();
            return;
        }
        if (!isEmailValid) {
            emailInput.focus();
            return;
        }
        if (!isMessageValid) {
            messageInput.focus();
            return;
        }

        // Trigger loading animation on the submit button
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Disable all inputs while sending to mirror real networks
        const formFields = [nameInput, emailInput, messageInput];
        formFields.forEach(field => field.disabled = true);

        // Simulate 1.5-second server api call delay for dramatic polish
        setTimeout(() => {
            // Remove loading animation from button
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            formFields.forEach(field => field.disabled = false);

            // Populate entered details into the customized success panel
            previewName.textContent = nameInput.value;
            previewEmail.textContent = emailInput.value;

            // Transition: Hide form, render success view inside the card
            contactForm.style.display = 'none';
            successScreen.style.display = 'flex';
            
            // Log for debugging
            console.log("She Can Contact Portal: Form submitted successfully! Data:", {
                fullName: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        }, 1500);
    });

    // 5. Send Another Message Reset Handler
    resetBtn.addEventListener('click', () => {
        // Reset raw HTML form
        contactForm.reset();
        
        // Remove success/error styling wrappers
        const groups = document.querySelectorAll('.input-group');
        groups.forEach(group => {
            group.classList.remove('success-state');
            group.classList.remove('error-state');
        });
        
        // Clear specific validation icons
        const statusIcons = document.querySelectorAll('.validation-status');
        statusIcons.forEach(icon => icon.textContent = '');
        
        // Clear message counter text back to zero
        charCount.textContent = '0';
        charCount.style.color = 'var(--text-muted)';
        
        // Swap Views back to the blank form
        successScreen.style.display = 'none';
        contactForm.style.display = 'flex';
        
        // Place cursor directly back to name field for comfort
        nameInput.focus();
    });
});
