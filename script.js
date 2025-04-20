// Strict mobile device detection and prevention
(function() {
    'use strict';
    
    function isMobileDevice() {
        // Check user agent
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileKeywords = [
            'android', 'webos', 'iphone', , 'ipod', 'blackberry', 'iemobile', 
            'opera mini', 'mobile', , 'windows phone', 'kindle', 'silk'
        ];
        
        // Check screen size
        const isSmallScreen = window.innerWidth <= 768; // Increased threshold
        
        // Check touch capability
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Check orientation
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        
        // Check if any mobile indicators are present
        return mobileKeywords.some(keyword => userAgent.includes(keyword)) || 
               (isSmallScreen && hasTouch) ||
               (isSmallScreen && isPortrait);
    }

    // Run check immediately
    if (isMobileDevice()) {
        window.location.href = 'mobile-restricted.html';
    }
})(); 
