// Generate the heatmap grid
document.addEventListener('DOMContentLoaded', function() {
    generateHeatmap();

    // Handle user dropdown menu
    const userDropdown = document.querySelector('.user-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (userDropdown && dropdownMenu) {
        userDropdown.addEventListener('click', function() {
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!userDropdown.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // Handle edit profile button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            // Here you would typically show an edit profile modal
            alert('Edit profile functionality coming soon!');
        });
    }

    // Handle book card interactions
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('click', function() {
            // Here you would typically navigate to the book details page
            console.log('Book clicked:', this.querySelector('.book-title').textContent);
        });
    });

    // Handle timeline item interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Here you would typically show more details about the reading session
            console.log('Timeline item clicked');
        });
    });

    // Handle progress card interactions
    const progressCards = document.querySelectorAll('.progress-card');
    progressCards.forEach(card => {
        card.addEventListener('click', function() {
            // Here you would typically show detailed progress information
            console.log('Progress card clicked');
        });
    });
});

function generateHeatmap() {
    const heatmapGrid = document.getElementById('activityHeatmap');
    if (!heatmapGrid) return;
    
    // Clear existing grid
    heatmapGrid.innerHTML = '';
    
    // Generate 52 weeks x 7 days grid (representing a year)
    const totalWeeks = 52;
    const daysPerWeek = 7;
    
    // Sample activity data - you would replace this with real data
    // 0 = no activity, 1-4 = levels of activity
    const activityLevels = generateSampleActivityData(totalWeeks, daysPerWeek);
    
    // Create grid cells
    for (let day = 0; day < daysPerWeek; day++) {
        for (let week = 0; week < totalWeeks; week++) {
            const index = day * totalWeeks + week;
            const level = activityLevels[index];
            
            const cell = document.createElement('div');
            cell.classList.add('heatmap-cell');
            
            if (level > 0) {
                cell.classList.add(`level-${level}`);
            }
            
            // Add tooltip data if needed
            cell.setAttribute('data-level', level);
            
            // Append to grid
            heatmapGrid.appendChild(cell);
        }
    }
}

function generateSampleActivityData(weeks, days) {
    // Generate random activity data
    const totalCells = weeks * days;
    const activityData = [];
    
    for (let i = 0; i < totalCells; i++) {
        // Random level between 0-4
        const randomFactor = Math.random();
        
        if (randomFactor < 0.4) {
            // 40% chance of no activity
            activityData.push(0);
        } else if (randomFactor < 0.6) {
            // 20% chance of level 1
            activityData.push(1);
        } else if (randomFactor < 0.75) {
            // 15% chance of level 2
            activityData.push(2);
        } else if (randomFactor < 0.9) {
            // 15% chance of level 3
            activityData.push(3);
        } else {
            // 10% chance of level 4
            activityData.push(4);
        }
    }
    
    return activityData;
}

// Handle edit buttons
document.addEventListener('click', function(event) {
    if (event.target.closest('.edit-btn')) {
        const motivationQuote = document.querySelector('.motivation-quote');
        if (motivationQuote) {
            const currentText = motivationQuote.textContent.trim().replace(/"/g, '');
            const newText = prompt('Edit your daily motivation:', currentText);
            
            if (newText && newText.trim()) {
                motivationQuote.textContent = `"${newText.trim()}"`;
            }
        }
    }
    
    if (event.target.closest('.edit-target-btn')) {
        const targetValue = document.querySelector('.target-value');
        if (targetValue) {
            const currentHours = parseInt(targetValue.textContent);
            const newHours = prompt('Set your target reading hours:', currentHours || 150);
            
            if (newHours && !isNaN(newHours) && newHours > 0) {
                targetValue.textContent = `${newHours}hr`;
                
                // Update progress bar width based on new target
                const progress = document.querySelector('.target-progress-bar .progress');
                const totalHours = 253; // From the profile data
                const progressPercent = Math.min((totalHours / newHours) * 100, 100);
                
                if (progress) {
                    progress.style.width = `${progressPercent}%`;
                }
            }
        }
    }
});

// Handle camera button (screenshot functionality)
document.querySelector('.camera-btn')?.addEventListener('click', function() {
    alert('Screenshot functionality would be implemented here in a production app.');
});

// Add hover effect for heatmap cells
document.addEventListener('mouseover', function(event) {
    const cell = event.target.closest('.heatmap-cell');
    if (cell) {
        const level = cell.getAttribute('data-level');
        // In a real app, you could show a tooltip with the actual reading time for that day
        cell.setAttribute('title', `Reading activity level: ${level}`);
    }
}); 