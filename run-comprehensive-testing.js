// 🧪 Comprehensive Testing Automation
// Run all tests and generate detailed report

class CSGAComprehensiveTesting {
    constructor() {
        this.testResults = {
            content: { passed: 0, failed: 0, issues: [] },
            visual: { passed: 0, failed: 0, issues: [] },
            functionality: { passed: 0, failed: 0, issues: [] },
            performance: { passed: 0, failed: 0, issues: [] },
            accessibility: { passed: 0, failed: 0, issues: [] }
        };
    }
    
    // Test content quality
    testContent() {
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, label');
        let contentIssues = 0;
        
        textElements.forEach((el, index) => {
            const text = el.textContent.trim();
            
            // Check for common issues
            if (text.includes('lorem ipsum')) {
                this.testResults.content.issues.push(`Placeholder text found in element ${index}`);
                contentIssues++;
            }
            
            if (text.length === 0 && el.tagName !== 'BR') {
                this.testResults.content.issues.push(`Empty text element: ${el.tagName}`);
                contentIssues++;
            }
            
            // Check for spelling errors (basic)
            const commonErrors = ['teh', 'recieve', 'seperate', 'occured'];
            commonErrors.forEach(error => {
                if (text.toLowerCase().includes(error)) {
                    this.testResults.content.issues.push(`Possible spelling error: "${error}" in "${text.substring(0, 50)}..."`);
                    contentIssues++;
                }
            });
        });
        
        this.testResults.content.passed = textElements.length - contentIssues;
        this.testResults.content.failed = contentIssues;
        
        return contentIssues === 0;
    }
    
    // Test visual consistency
    testVisual() {
        let visualIssues = 0;
        
        // Check for consistent button styling
        const buttons = document.querySelectorAll('.btn, button');
        if (buttons.length > 0) {
            const firstButtonStyle = window.getComputedStyle(buttons[0]);
            
            buttons.forEach((button, index) => {
                const buttonStyle = window.getComputedStyle(button);
                
                if (buttonStyle.fontFamily !== firstButtonStyle.fontFamily) {
                    this.testResults.visual.issues.push(`Button ${index} has inconsistent font`);
                    visualIssues++;
                }
                
                if (Math.abs(parseInt(buttonStyle.borderRadius) - parseInt(firstButtonStyle.borderRadius)) > 2) {
                    this.testResults.visual.issues.push(`Button ${index} has inconsistent border radius`);
                    visualIssues++;
                }
            });
        }
        
        // Check for missing images
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (!img.complete || img.naturalHeight === 0) {
                this.testResults.visual.issues.push(`Image ${index} failed to load: ${img.src}`);
                visualIssues++;
            }
            
            if (!img.alt) {
                this.testResults.visual.issues.push(`Image ${index} missing alt text`);
                visualIssues++;
            }
        });
        
        this.testResults.visual.passed = (buttons.length + images.length) - visualIssues;
        this.testResults.visual.failed = visualIssues;
        
        return visualIssues === 0;
    }
    
    // Test performance
    testPerformance() {
        let performanceIssues = 0;
        
        // Check page load time
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        if (loadTime > 3000) {
            this.testResults.performance.issues.push(`Page load time too slow: ${loadTime}ms`);
            performanceIssues++;
        }
        
        // Check for large images
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                this.testResults.performance.issues.push(`Large image detected: ${img.src} (${img.naturalWidth}x${img.naturalHeight})`);
                performanceIssues++;
            }
        });
        
        // Check CSS file count
        const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
        if (cssFiles.length > 10) {
            this.testResults.performance.issues.push(`Too many CSS files: ${cssFiles.length}`);
            performanceIssues++;
        }
        
        this.testResults.performance.passed = 3 - performanceIssues;
        this.testResults.performance.failed = performanceIssues;
        
        return performanceIssues === 0;
    }
    
    // Test accessibility
    testAccessibility() {
        let accessibilityIssues = 0;
        
        // Check for heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        
        headings.forEach((heading, index) => {
            const currentLevel = parseInt(heading.tagName.charAt(1));
            
            if (index === 0 && currentLevel !== 1) {
                this.testResults.accessibility.issues.push('Page should start with h1');
                accessibilityIssues++;
            }
            
            if (currentLevel > previousLevel + 1) {
                this.testResults.accessibility.issues.push(`Heading level skipped: ${heading.tagName} after h${previousLevel}`);
                accessibilityIssues++;
            }
            
            previousLevel = currentLevel;
        });
        
        // Check for form labels
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach((input, index) => {
            const id = input.id;
            const label = document.querySelector(`label[for="${id}"]`);
            
            if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
                this.testResults.accessibility.issues.push(`Input ${index} missing label`);
                accessibilityIssues++;
            }
        });
        
        // Check color contrast (basic check)
        const textElements = document.querySelectorAll('p, span, a, button');
        textElements.forEach((el, index) => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            
            // Basic contrast check (simplified)
            if (color === backgroundColor) {
                this.testResults.accessibility.issues.push(`Element ${index} has no color contrast`);
                accessibilityIssues++;
            }
        });
        
        this.testResults.accessibility.passed = (headings.length + inputs.length) - accessibilityIssues;
        this.testResults.accessibility.failed = accessibilityIssues;
        
        return accessibilityIssues === 0;
    }
    
    // Generate comprehensive report
    generateReport() {
        const totalTests = Object.values(this.testResults).reduce((acc, category) => acc + category.passed + category.failed, 0);
        const totalPassed = Object.values(this.testResults).reduce((acc, category) => acc + category.passed, 0);
        const totalFailed = Object.values(this.testResults).reduce((acc, category) => acc + category.failed, 0);
        
        console.log('\n🚀 CSGA COMPREHENSIVE TESTING REPORT');
        console.log('=====================================');
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${totalPassed} (${((totalPassed/totalTests)*100).toFixed(1)}%)`);
        console.log(`Failed: ${totalFailed} (${((totalFailed/totalTests)*100).toFixed(1)}%)`);
        
        Object.keys(this.testResults).forEach(category => {
            const result = this.testResults[category];
            console.log(`\n📊 ${category.toUpperCase()}:`);
            console.log(`  Passed: ${result.passed}`);
            console.log(`  Failed: ${result.failed}`);
            
            if (result.issues.length > 0) {
                console.log(`  Issues:`);
                result.issues.forEach(issue => console.log(`    - ${issue}`));
            }
        });
        
        return {
            totalTests,
            totalPassed,
            totalFailed,
            categories: this.testResults,
            score: ((totalPassed/totalTests)*100).toFixed(1)
        };
    }
    
    // Run all tests
    async runFullSuite() {
        console.log('🧪 Starting comprehensive testing suite...');
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for page to settle
        
        this.testContent();
        this.testVisual();
        this.testPerformance();
        this.testAccessibility();
        
        return this.generateReport();
    }
}

// Auto-run comprehensive testing
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(async () => {
        const tester = new CSGAComprehensiveTesting();
        window.csgaComprehensiveTester = tester;
        
        const report = await tester.runFullSuite();
        
        if (report.score >= 95) {
            console.log('🏆 EXCELLENT: Quality score above 95%!');
        } else if (report.score >= 85) {
            console.log('✅ GOOD: Quality score above 85%');
        } else {
            console.log('⚠️ NEEDS IMPROVEMENT: Quality score below 85%');
        }
    }, 2000);
});
