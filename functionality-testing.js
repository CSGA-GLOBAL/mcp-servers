// 🧪 Comprehensive Functionality Testing
// Test all interactive elements and user flows

class CSGAFunctionalityTester {
    constructor() {
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            errors: []
        };
    }
    
    // Test FAQ functionality
    testFAQFunctionality() {
        const faqItems = document.querySelectorAll('.faq-item-professional');
        
        if (faqItems.length === 0) {
            this.results.errors.push('No FAQ items found');
            return false;
        }
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question-professional');
            const answer = item.querySelector('.faq-answer-professional');
            
            if (!question || !answer) {
                this.results.errors.push(`FAQ item ${index + 1} missing question or answer`);
                return false;
            }
            
            // Test click functionality
            try {
                question.click();
                if (!item.classList.contains('active')) {
                    this.results.errors.push(`FAQ item ${index + 1} click not working`);
                    return false;
                }
            } catch (e) {
                this.results.errors.push(`FAQ item ${index + 1} click error: ${e.message}`);
                return false;
            }
        });
        
        return true;
    }
    
    // Test navigation functionality
    testNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .navbar-link, a[href]');
        
        navLinks.forEach((link, index) => {
            const href = link.getAttribute('href');
            
            if (!href || href === '#') {
                this.results.errors.push(`Navigation link ${index + 1} has no valid href`);
                return false;
            }
            
            // Check for broken internal links
            if (href.startsWith('/') || href.startsWith('./')) {
                // Would need server-side check for actual link validation
                console.log(`Internal link found: ${href}`);
            }
        });
        
        return true;
    }
    
    // Test form functionality
    testForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach((form, index) => {
            const inputs = form.querySelectorAll('input, textarea, select');
            const submitButton = form.querySelector('[type="submit"], button');
            
            if (inputs.length === 0) {
                this.results.errors.push(`Form ${index + 1} has no input fields`);
                return false;
            }
            
            if (!submitButton) {
                this.results.errors.push(`Form ${index + 1} has no submit button`);
                return false;
            }
            
            // Test input validation
            inputs.forEach((input, inputIndex) => {
                if (input.hasAttribute('required') && !input.value) {
                    console.log(`Form ${index + 1}, Input ${inputIndex + 1}: Required field validation ready`);
                }
            });
        });
        
        return true;
    }
    
    // Test button functionality
    testButtons() {
        const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-professional, button');
        
        buttons.forEach((button, index) => {
            // Check button accessibility
            if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
                this.results.errors.push(`Button ${index + 1} has no accessible text`);
                return false;
            }
            
            // Check button hover states (CSS dependent)
            const computedStyle = window.getComputedStyle(button);
            if (!computedStyle.transition || computedStyle.transition === 'none') {
                this.results.errors.push(`Button ${index + 1} missing hover transitions`);
            }
        });
        
        return true;
    }
    
    // Test responsive design
    testResponsive() {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Check for mobile-friendly elements
        const mobileBreakpoint = 768;
        if (viewport.width <= mobileBreakpoint) {
            const smallElements = document.querySelectorAll('[style*="font-size: 10px"], [style*="font-size: 8px"]');
            if (smallElements.length > 0) {
                this.results.errors.push('Text too small for mobile devices');
            }
        }
        
        return true;
    }
    
    // Run all tests
    runAllTests() {
        console.log('🧪 Starting comprehensive functionality testing...');
        
        const testMethods = [
            'testFAQFunctionality',
            'testNavigation', 
            'testForms',
            'testButtons',
            'testResponsive'
        ];
        
        testMethods.forEach(testMethod => {
            try {
                const result = this[testMethod]();
                if (result) {
                    this.results.passed++;
                    console.log(`✅ ${testMethod}: PASSED`);
                } else {
                    this.results.failed++;
                    console.log(`❌ ${testMethod}: FAILED`);
                }
            } catch (error) {
                this.results.failed++;
                this.results.errors.push(`${testMethod}: ${error.message}`);
                console.log(`❌ ${testMethod}: ERROR - ${error.message}`);
            }
        });
        
        console.log('\n📊 Test Results:');
        console.log(`Passed: ${this.results.passed}`);
        console.log(`Failed: ${this.results.failed}`);
        console.log(`Errors: ${this.results.errors.length}`);
        
        if (this.results.errors.length > 0) {
            console.log('\n🚨 Errors Found:');
            this.results.errors.forEach(error => console.log(`- ${error}`));
        }
        
        return this.results;
    }
}

// Auto-run tests when page loads
document.addEventListener('DOMContentLoaded', function() {
    const tester = new CSGAFunctionalityTester();
    window.csgaTester = tester; // Make available globally
    
    // Run tests after a brief delay to ensure all content is loaded
    setTimeout(() => {
        tester.runAllTests();
    }, 1000);
});
