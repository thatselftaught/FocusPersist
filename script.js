// Mobile device detection and redirection
(function() {
    'use strict';
    
    function isMobileDevice() {
        // Check user agent
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Keywords for phones only (excluding tablets)
        const phoneKeywords = [
            'android', 'iphone', 'ipod', 'blackberry', 'iemobile', 
            'opera mini', 'mobile', 'windows phone'
        ];
        
        // Check if it's specifically a phone
        const isPhone = phoneKeywords.some(keyword => userAgent.includes(keyword));
        
        // Check screen size (only for phones)
        const isSmallScreen = window.innerWidth <= 768; // Reduced threshold for phones only
        
        // Check touch capability
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Check orientation
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        
        // Only block if it's a phone (not tablet) and meets other criteria
        return (isPhone && isSmallScreen) || 
               (isPhone && hasTouch) ||
               (isPhone && isPortrait);
    }

    // Run check immediately
    if (isMobileDevice()) {
        window.location.href = 'mobile-restricted.html';
    }
})();
// ... existing code ...
