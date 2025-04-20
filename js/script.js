// Sample data structure for the learning tree
const learningTree = {
    name: "My Learning Path",
    children: [
        {
            name: "Mathematics",
            children: [
                { 
                    name: "Algebra",
                    children: [
                        { name: "Linear Equations", completed: true, xp: 100 },
                        { name: "Quadratic Equations", completed: false, xp: 150 },
                        { name: "Polynomials", completed: false, xp: 200 }
                    ]
                },
                { 
                    name: "Calculus",
                    children: [
                        { name: "Derivatives", completed: false, xp: 200 },
                        { name: "Integrals", completed: false, xp: 250 }
                    ]
                }
            ]
        },
        {
            name: "Science",
            children: [
                { 
                    name: "Physics",
                    children: [
                        { name: "Mechanics", completed: true, xp: 150 },
                        { name: "Thermodynamics", completed: false, xp: 200 }
                    ]
                },
                { 
                    name: "Chemistry",
                    children: [
                        { name: "Atomic Structure", completed: false, xp: 150 },
                        { name: "Chemical Reactions", completed: false, xp: 200 }
                    ]
                }
            ]
        }
    ]
};

// User data
let userData = {
    streak: 5,
    points: 1250,
    studyTime: 2.5,
    completedSubjects: 3,
    xpEarned: 250,
    badges: [
        { name: "Early Bird", icon: "medal" },
        { name: "5 Day Streak", icon: "fire" },
        { name: "Quick Learner", icon: "brain" }
    ]
};

// DOM Elements
const authModal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close');
const treeContainer = document.querySelector('.tree');
const streakElement = document.querySelector('.streak');
const pointsElement = document.querySelector('.points');
const studyTimeElement = document.querySelector('.progress-card:nth-child(1) p');
const subjectsElement = document.querySelector('.progress-card:nth-child(2) p');
const xpElement = document.querySelector('.progress-card:nth-child(3) p');

// Timer functionality
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let currentMode = 'focus';

const timerDisplay = document.querySelector('.time');
const startButton = document.querySelector('.start-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

// Update user stats display
function updateUserStats() {
    streakElement.textContent = `🔥 ${userData.streak} day streak`;
    pointsElement.textContent = `⭐ ${userData.points} points`;
    studyTimeElement.textContent = `${userData.studyTime} hours`;
    subjectsElement.textContent = `${userData.completedSubjects} completed`;
    xpElement.textContent = `${userData.xpEarned} XP`;
}

// Create tree node element
function createTreeNode(node) {
    const treeNode = document.createElement('div');
    treeNode.className = 'tree-node';
    
    const content = document.createElement('div');
    content.className = 'tree-node-content';
    
    // Add completion status icon if the node has completion status
    if (node.completed !== undefined) {
        const statusIcon = document.createElement('i');
        statusIcon.className = `fas fa-${node.completed ? 'check-circle' : 'circle'}`;
        statusIcon.style.color = node.completed ? 'var(--primary-color)' : 'var(--border-color)';
        content.appendChild(statusIcon);
    }
    
    const text = document.createTextNode(node.name);
    content.appendChild(text);
    
    // Add XP if available
    if (node.xp) {
        const xpBadge = document.createElement('span');
        xpBadge.className = 'xp-badge';
        xpBadge.textContent = `+${node.xp} XP`;
        content.appendChild(xpBadge);
    }
    
    const children = document.createElement('div');
    children.className = 'tree-node-children';
    
    if (node.children && node.children.length > 0) {
        content.addEventListener('click', () => {
            treeNode.classList.toggle('expanded');
        });
        
        node.children.forEach(child => {
            children.appendChild(createTreeNode(child));
        });
    }
    
    treeNode.appendChild(content);
    treeNode.appendChild(children);
    
    return treeNode;
}

// Initialize the tree
function initializeTree() {
    const rootNode = createTreeNode(learningTree);
    treeContainer.appendChild(rootNode);
}

// Handle authentication buttons
document.querySelectorAll('.auth-btn').forEach(button => {
    button.addEventListener('click', () => {
        // In a real app, this would handle authentication
        console.log(`Authenticating with ${button.textContent}`);
        authModal.style.display = 'none';
    });
});

// Handle leaderboard button
document.getElementById('leaderboard-btn').addEventListener('click', () => {
    // In a real app, this would show the leaderboard
    console.log('Leaderboard clicked');
});

// Handle profile button
document.getElementById('profile-btn').addEventListener('click', () => {
    // In a real app, this would show the profile
    console.log('Profile clicked');
});

// Show auth modal on page load
window.onload = () => {
    authModal.style.display = 'block';
    updateUserStats();
};

// Close modal when clicking the X
closeModal.onclick = () => {
    authModal.style.display = 'none';
};

// Close modal when clicking outside
window.onclick = (event) => {
    if (event.target === authModal) {
        authModal.style.display = 'none';
    }
};

// Initialize the application
initializeTree();

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start/Stop timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startButton.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                startButton.textContent = 'Start';
                // Play notification sound
                new Audio('notification.mp3').play();
            }
        }, 1000);
        startButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

// Switch between focus and break modes
function switchMode(mode) {
    currentMode = mode;
    timeLeft = mode === 'focus' ? 25 * 60 : 5 * 60;
    updateTimerDisplay();
    
    modeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
}

// Event listeners
startButton.addEventListener('click', toggleTimer);

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        switchMode(button.dataset.mode);
    });
});

// Task functionality
const addTaskButton = document.querySelector('.add-task-btn');
const tasksList = document.querySelector('.tasks-list');

function addTask() {
    const taskText = prompt('Enter task name:');
    if (taskText) {
        const taskId = `task${Date.now()}`;
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label for="${taskId}">${taskText}</label>
        `;
        tasksList.appendChild(taskItem);
    }
}

addTaskButton.addEventListener('click', addTask);

// Initialize timer display
updateTimerDisplay(); 