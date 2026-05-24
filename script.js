// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const screens = document.querySelectorAll('.screen');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Update navigation
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
        
        // Update screens
        screens.forEach(screen => screen.classList.remove('active'));
        const screenId = item.getAttribute('data-screen') + '-screen';
        document.getElementById(screenId).classList.add('active');
    });
});

// Floating superhero button
const floatingSuperhero = document.getElementById('floating-superhero');
floatingSuperhero.addEventListener('click', () => {
    navItems.forEach(navItem => navItem.classList.remove('active'));
    screens.forEach(screen => screen.classList.remove('active'));
    
    document.querySelector('.nav-item[data-screen="superhero"]').classList.add('active');
    document.getElementById('superhero-screen').classList.add('active');
});

// Make "Explore Now" buttons functional
document.getElementById('explore-emotions').addEventListener('click', () => {
    navItems.forEach(navItem => navItem.classList.remove('active'));
    screens.forEach(screen => screen.classList.remove('active'));
    
    document.querySelector('.nav-item[data-screen="emotions"]').classList.add('active');
    document.getElementById('emotions-screen').classList.add('active');
});

document.getElementById('explore-tools').addEventListener('click', () => {
    navItems.forEach(navItem => navItem.classList.remove('active'));
    screens.forEach(screen => screen.classList.remove('active'));
    
    document.querySelector('.nav-item[data-screen="calm-tools"]').classList.add('active');
    document.getElementById('calm-tools-screen').classList.add('active');
});

document.getElementById('explore-connection').addEventListener('click', () => {
    navItems.forEach(navItem => navItem.classList.remove('active'));
    screens.forEach(screen => screen.classList.remove('active'));
    
    document.querySelector('.nav-item[data-screen="connection"]').classList.add('active');
    document.getElementById('connection-screen').classList.add('active');
});

document.getElementById('explore-progress').addEventListener('click', () => {
    navItems.forEach(navItem => navItem.classList.remove('active'));
    screens.forEach(screen => screen.classList.remove('active'));
    
    document.querySelector('.nav-item[data-screen="progress"]').classList.add('active');
    document.getElementById('progress-screen').classList.add('active');
});

// Points system
let userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
const pointsCount = document.getElementById('points-count');
const totalPoints = document.getElementById('total-points');

function updatePointsDisplay() {
    pointsCount.textContent = userPoints;
    totalPoints.textContent = userPoints;
    localStorage.setItem('userPoints', userPoints);
}

// Add points for actions
function addPoints(amount, reason) {
    userPoints += amount;
    updatePointsDisplay();
    
    // Show notification
    const notification = document.createElement('div');
    notification.innerHTML = `<div style="position: fixed; top: 20px; right: 20px; background: #7ED321; color: white; padding: 15px 25px; border-radius: 10px; z-index: 1000; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
        <i class="fas fa-star"></i> +${amount} Super Points! (${reason})
    </div>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    // Create confetti effect
    createConfetti();
}

// Create confetti effect
function createConfetti() {
    const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: `translateY(-100px) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0,0,0.2,1)'
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Level system
let userLevel = parseInt(localStorage.getItem('userLevel')) || 1;
let userXP = parseInt(localStorage.getItem('userXP')) || 0;
const levelBadge = document.getElementById('level-badge');
const levelProgressBar = document.getElementById('level-progress-bar');
const levelInfo = document.getElementById('level-info');

function calculateXPForLevel(level) {
    return level * 100;
}

function updateLevelDisplay() {
    const xpNeeded = calculateXPForLevel(userLevel);
    const progress = (userXP / xpNeeded) * 100;
    
    levelBadge.textContent = userLevel;
    levelProgressBar.style.width = `${progress}%`;
    levelInfo.textContent = `Level ${userLevel} (${Math.round(progress)}%)`;
    
    localStorage.setItem('userLevel', userLevel);
    localStorage.setItem('userXP', userXP);
}

function addXP(amount) {
    const xpNeeded = calculateXPForLevel(userLevel);
    
    userXP += amount;
    
    // Check for level up
    if (userXP >= xpNeeded) {
        userXP -= xpNeeded;
        userLevel++;
        
        // Show level up celebration
        levelUpCelebration();
    }
    
    updateLevelDisplay();
}

function levelUpCelebration() {
    // Show notification
    const notification = document.createElement('div');
    notification.innerHTML = `<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--accent); color: white; padding: 30px 50px; border-radius: 20px; z-index: 1000; text-align: center; font-size: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <i class="fas fa-trophy"></i> Level Up!<br>
        <span style="font-size: 1.5rem;">You've reached level ${userLevel}!</span>
    </div>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    // Create confetti effect
    createConfetti();
}

// Superhero functionality
const superhero = document.getElementById('superhero');
const mainSuperhero = document.getElementById('main-superhero');
const superheroMessage = document.getElementById('superhero-message');
const mainSuperheroMessage = document.getElementById('main-superhero-message');
const superheroTipBtn = document.getElementById('superhero-tip-btn');

const superheroMessages = [
    "Every superhero needs to recognize their feelings. That's your first superpower!",
    "Deep breaths are like recharging your superhero energy! Try it now!",
    "Even superheroes need friends. Connect with someone today!",
    "Your feelings are like your superhero signals - they tell you what you need!",
    "When things feel tough, imagine your superhero shield protecting you!",
    "Celebrate your achievements, no matter how small! Every hero started somewhere!",
    "Remember: It's okay to ask for help. Even superheroes have teams!"
];

const toolMessages = {
    breath: "Take 3 deep breaths. In through your nose, out through your mouth. Feel calmer? That's your superpower!",
    strength: "Think of something that makes you strong. It could be a person, a memory, or a skill. That's your emotional strength!",
    vision: "Close your eyes and picture your happy place. What do you see? That's your positive vision!",
    shield: "Imagine a glowing shield around you that protects you from worries. What color is your shield?"
};

// Superhero tips
superheroTipBtn.addEventListener('click', () => {
    const randomMessage = superheroMessages[Math.floor(Math.random() * superheroMessages.length)];
    superheroMessage.textContent = randomMessage;
    addPoints(5, "Superhero tip");
});

// Superhero tools
const powerCards = document.querySelectorAll('.power-card');
const toolAnimation = document.getElementById('tool-animation');
const toolAnimationIcon = document.getElementById('tool-animation-icon');
const toolAnimationText = document.getElementById('tool-animation-text');
const toolAnimationClose = document.getElementById('tool-animation-close');

powerCards.forEach(card => {
    card.addEventListener('click', () => {
        const tool = card.getAttribute('data-tool');
        let icon = "🌀";
        let text = "Take deep breaths to calm your mind";
        
        switch(tool) {
            case 'breath':
                icon = "🌀";
                text = "Breathe in for 4 seconds, hold for 4, breathe out for 6. Repeat 5 times.";
                break;
            case 'strength':
                icon = "💪";
                text = "Think of three things you're good at. These are your superpowers!";
                break;
            case 'vision':
                icon = "👁️";
                text = "Find 5 blue things in the room. Focus helps calm your mind.";
                break;
            case 'shield':
                icon = "🛡️";
                text = "Imagine a shield blocking negative thoughts. You're safe and strong!";
                break;
        }
        
        toolAnimationIcon.textContent = icon;
        toolAnimationText.textContent = text;
        toolAnimation.classList.add('active');
        
        addPoints(10, `Used ${tool} tool`);
    });
});

// Close tool animation
toolAnimationClose.addEventListener('click', () => {
    toolAnimation.classList.remove('active');
});

// Daily challenge
document.getElementById('start-challenge-btn').addEventListener('click', () => {
    addPoints(30, "Starting daily challenge");
    addXP(20);
});

// Emotion Translator
const emotionCards = document.querySelectorAll('.emotion-card');
const emotionResponse = document.getElementById('emotion-response');
const emotionDisplay = document.getElementById('emotion-display');
const responseTitle = document.getElementById('response-title');
const responseText = document.getElementById('response-text');
const activitySuggestions = document.getElementById('activity-suggestions');
const activityIcon = document.getElementById('activity-icon');
const activityTitle = document.getElementById('activity-title');
const activityDescription = document.getElementById('activity-description');

const emotionResponses = {
    happy: {
        title: "You're feeling Happy!",
        text: "It's wonderful that you're feeling happy! Would you like to celebrate this feeling with a fun activity?",
        activities: [
            { icon: "🎨", title: "Create a Joyful Drawing", desc: "Draw something that makes you happy - it could be a sunny day, your favorite animal, or a fun memory!" },
            { icon: "🎵", title: "Make a Happy Playlist", desc: "Create a playlist of songs that make you feel joyful and energized!" },
            { icon: "💃", title: "Have a Dance Party", desc: "Put on your favorite upbeat music and dance around your room!" }
        ]
    },
    calm: {
        title: "You're feeling Calm",
        text: "Feeling calm is wonderful. Would you like to do a peaceful activity to maintain this feeling?",
        activities: [
            { icon: "📖", title: "Read a Peaceful Story", desc: "Find a comfortable spot and read a book that makes you feel relaxed." },
            { icon: "🧘", title: "Gentle Stretching", desc: "Do some gentle stretches to keep your body feeling relaxed and comfortable." },
            { icon: "🌿", title: "Nature Observation", desc: "Find a plant or look out the window and observe nature for a few minutes." }
        ]
    },
    sad: {
        title: "You're feeling Sad",
        text: "It's okay to feel sad sometimes. Would you like to try a comforting activity?",
        activities: [
            { icon: "🤗", title: "Virtual Hug", desc: "Imagine receiving a warm hug from someone who cares about you." },
            { icon: "📝", title: "Write in a Journal", desc: "Write down your feelings - sometimes putting them on paper can help." },
            { icon: "☕", title: "Warm Comfort Drink", desc: "Make yourself a warm drink like tea or hot chocolate and enjoy it slowly." }
        ]
    },
    excited: {
        title: "You're feeling Excited!",
        text: "Excitement is great! Would you like to channel this energy into a creative activity?",
        activities: [
            { icon: "🏃", title: "Energy Release", desc: "Do some jumping jacks or run in place to release some of your excited energy!" },
            { icon: "🎭", title: "Create a Short Play", desc: "Write and perform a short play about something you're excited about." },
            { icon: "📣", title: "Share Your Excitement", desc: "Tell someone about what's making you excited - sharing joy multiplies it!" }
        ]
    },
    angry: {
        title: "You're feeling Angry",
        text: "Anger is a normal emotion. Would you like to try a calming activity to help?",
        activities: [
            { icon: "💥", title: "Safe Destruction", desc: "Tear up some scrap paper or punch a pillow to release your anger physically." },
            { icon: "🌊", title: "Wave Breathing", desc: "Imagine ocean waves - breathe in as the wave comes in, breathe out as it goes out." },
            { icon: "🖍️", title: "Angry Drawing", desc: "Use red and black colors to draw how your anger feels - get it out on paper!" }
        ]
    },
    scared: {
        title: "You're feeling Scared",
        text: "Feeling scared can be difficult. Would you like to try a grounding activity?",
        activities: [
            { icon: "🧸", title: "Comfort Object", desc: "Hold a stuffed animal or soft blanket to help you feel safe." },
            { icon: "🕯️", title: "Candle Visualization", desc: "Close your eyes and imagine a candle flame - focus on making it steady with your breath." },
            { icon: "🛡️", title: "Create a Safe Space", desc: "Imagine a place where you feel completely safe - what does it look like?" }
        ]
    }
};

let currentEmotion = null;

emotionCards.forEach(card => {
    card.addEventListener('click', () => {
        // Update selection
        emotionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        // Set current emotion
        currentEmotion = card.getAttribute('data-emotion');
        
        // Show response
        emotionDisplay.textContent = currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1);
        responseTitle.textContent = emotionResponses[currentEmotion].title;
        responseText.textContent = emotionResponses[currentEmotion].text;
        emotionResponse.style.display = 'block';
        activitySuggestions.style.display = 'none';
        
        // Award points
        addPoints(10, "Emotion recognition");
        addXP(15);
        
        // Smooth scroll to response
        emotionResponse.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Suggest Activity button
document.getElementById('suggest-activity-btn').addEventListener('click', () => {
    if (!currentEmotion) return;
    
    const activities = emotionResponses[currentEmotion].activities;
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    activityIcon.textContent = randomActivity.icon;
    activityTitle.textContent = randomActivity.title;
    activityDescription.textContent = randomActivity.desc;
    activitySuggestions.style.display = 'block';
});

// Complete Activity button
document.getElementById('complete-activity-btn').addEventListener('click', () => {
    addPoints(15, "Completed activity");
    addXP(20);
    activitySuggestions.style.display = 'none';
    emotionCards.forEach(c => c.classList.remove('selected'));
    emotionResponse.style.display = 'none';
    currentEmotion = null;
});

// Change Emotion button
document.getElementById('change-emotion-btn').addEventListener('click', () => {
    emotionCards.forEach(c => c.classList.remove('selected'));
    emotionResponse.style.display = 'none';
    activitySuggestions.style.display = 'none';
    currentEmotion = null;
});

// Calming Tools - Bubble Breathing
const breathingBubble = document.getElementById('breathing-bubble');
const startBreathingBtn = document.getElementById('start-breathing-btn');
const pauseBreathingBtn = document.getElementById('pause-breathing-btn');
const resetBreathingBtn = document.getElementById('reset-breathing-btn');
const breathingStreak = document.getElementById('breathing-streak');

// Breathing streak
let breathingStreakCount = parseInt(localStorage.getItem('breathingStreak')) || 0;
breathingStreak.textContent = breathingStreakCount;

startBreathingBtn.addEventListener('click', () => {
    breathingBubble.style.animationPlayState = 'running';
    
    // Award points
    addPoints(20, "Breathing exercise");
    addXP(15);
    
    // Update streak
    breathingStreakCount++;
    breathingStreak.textContent = breathingStreakCount;
    localStorage.setItem('breathingStreak', breathingStreakCount);
});

pauseBreathingBtn.addEventListener('click', () => {
    breathingBubble.style.animationPlayState = 'paused';
});

resetBreathingBtn.addEventListener('click', () => {
    breathingBubble.style.animation = 'none';
    setTimeout(() => {
        breathingBubble.style.animation = 'breathe 8s infinite ease-in-out';
        breathingBubble.style.animationPlayState = 'paused';
    }, 10);
});

// Calming Tools - Sound Therapy
const soundBtns = document.querySelectorAll('.sound-btn');
const startSoundBtn = document.getElementById('start-sound-btn');
const stopSoundBtn = document.getElementById('stop-sound-btn');
const soundPlaying = document.getElementById('sound-playing');
const currentSoundDisplay = document.getElementById('current-sound');

let currentSound = null;

soundBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        soundBtns.forEach(b => b.classList.remove('sound-active'));
        btn.classList.add('sound-active');
        currentSound = btn.getAttribute('data-sound');
        
        const soundNames = {
            ocean: "Ocean Waves",
            forest: "Forest Sounds",
            rain: "Rainfall"
        };
        
        currentSoundDisplay.textContent = soundNames[currentSound] + " selected";
    });
});

startSoundBtn.addEventListener('click', () => {
    if (!currentSound) return;
    
    soundPlaying.style.display = 'block';
    addPoints(15, "Sound therapy");
    addXP(10);
});

stopSoundBtn.addEventListener('click', () => {
    soundPlaying.style.display = 'none';
});

// Connection Space
const friendsList = document.getElementById('friends-list');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message-btn');
const currentAvatar = document.getElementById('current-avatar');
const currentFriend = document.getElementById('current-friend');
const stickers = document.querySelectorAll('.sticker');

// Friends database
const friends = [
    {
        id: "maya",
        name: "Maya",
        avatar: "👧",
        status: "online",
        personality: "friendly",
        conversation: [
            { sender: "friend", text: "Hi there! How are you feeling today?", time: "Just now" }
        ]
    },
    {
        id: "alex",
        name: "Alex",
        avatar: "👦",
        status: "offline",
        personality: "thoughtful",
        conversation: [
            { sender: "friend", text: "Hello! What have you been up to?", time: "2 hours ago" }
        ]
    },
    {
        id: "sam",
        name: "Sam",
        avatar: "🧒",
        status: "online",
        personality: "playful",
        conversation: [
            { sender: "friend", text: "Hey! Want to hear a joke?", time: "5 minutes ago" }
        ]
    }
];

let activeFriendId = "maya";

// Render friends list
function renderFriendsList() {
    friendsList.innerHTML = '';
    friends.forEach(friend => {
        const friendElement = document.createElement('div');
        friendElement.classList.add('avatar-card');
        if (friend.id === activeFriendId) friendElement.classList.add('active');
        
        friendElement.innerHTML = `
            <div class="avatar-emoji">${friend.avatar}</div>
            <div class="avatar-name">${friend.name}</div>
            <div class="status ${friend.status}">${friend.status.charAt(0).toUpperCase() + friend.status.slice(1)}</div>
        `;
        
        friendElement.addEventListener('click', () => {
            activeFriendId = friend.id;
            renderFriendsList();
            renderConversation();
            updateCurrentFriend();
        });
        
        friendsList.appendChild(friendElement);
    });
}

// Update current friend info
function updateCurrentFriend() {
    const friend = friends.find(f => f.id === activeFriendId);
    currentAvatar.textContent = friend.avatar;
    currentFriend.textContent = `Chat with ${friend.name}`;
}

// Render conversation
function renderConversation() {
    chatWindow.innerHTML = '';
    const friend = friends.find(f => f.id === activeFriendId);
    
    friend.conversation.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (msg.sender === 'self') messageElement.classList.add('self');
        
        messageElement.innerHTML = `
            ${msg.sender === 'friend' ? friend.avatar + ' ' + friend.name + ': ' : 'You: '}${msg.text}
            <div class="message-time">${msg.time}</div>
        `;
        
        chatWindow.appendChild(messageElement);
    });
    
    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Send message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const now = new Date();
        const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        
        // Add user's message
        const friendIndex = friends.findIndex(f => f.id === activeFriendId);
        friends[friendIndex].conversation.push({
            sender: "self",
            text: message,
            time: timeString
        });
        
        // Render the message
        renderConversation();
        messageInput.value = '';
        
        // Award points
        addPoints(5, "Connection");
        addXP(10);
        
        // Generate response after delay
        setTimeout(generateResponse, 1000);
    }
}

// Send sticker
stickers.forEach(sticker => {
    sticker.addEventListener('click', () => {
        const stickerChar = sticker.textContent;
        const now = new Date();
        const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        
        // Add sticker as message
        const friendIndex = friends.findIndex(f => f.id === activeFriendId);
        friends[friendIndex].conversation.push({
            sender: "self",
            text: stickerChar,
            time: timeString
        });
        
        // Render the sticker
        renderConversation();
        
        // Award points
        addPoints(3, "Sending sticker");
        addXP(5);
        
        // Generate response after delay
        setTimeout(generateResponse, 1000);
    });
});

// Generate friend response
function generateResponse() {
    const friend = friends.find(f => f.id === activeFriendId);
    const now = new Date();
    const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    // Different responses based on personality
    let response = "";
    const lastMessage = friend.conversation[friend.conversation.length - 1].text.toLowerCase();
    
    if (friend.personality === "friendly") {
        if (lastMessage.includes("how are you")) {
            response = "I'm doing well, thanks for asking! I just tried a new calming exercise.";
        } else if (lastMessage.includes("happy") || lastMessage.includes("good")) {
            response = "That's wonderful to hear! What's making you feel happy today?";
        } else if (lastMessage.includes("sad") || lastMessage.includes("bad")) {
            response = "I'm sorry to hear that. Would you like to try a calming activity together?";
        } else {
            response = "Thanks for sharing! How does that make you feel?";
        }
    } 
    else if (friend.personality === "thoughtful") {
        if (lastMessage.includes("game")) {
            response = "I enjoy games too! They can be great for focusing the mind.";
        } else if (lastMessage.includes("breathe") || lastMessage.includes("calm")) {
            response = "Breathing exercises are so helpful. I do them every morning!";
        } else {
            response = "That's interesting. Have you noticed how your body feels when you experience that?";
        }
    }
    else if (friend.personality === "playful") {
        if (lastMessage.includes("joke")) {
            response = "Sure! Why don't scientists trust atoms? Because they make up everything! 😄";
        } else if (lastMessage.length < 5) {
            response = "Is that all? Come on, tell me more! I'm all ears! 🐘";
        } else {
            response = "Wow, that's cool! Want to play a quick word game while we chat?";
        }
    }
    
    // Add friend's response to conversation
    friend.conversation.push({
        sender: "friend",
        text: response,
        time: timeString
    });
    
    // Render the response
    renderConversation();
}

// Initialize chat system
function initChatSystem() {
    renderFriendsList();
    renderConversation();
    updateCurrentFriend();
    
    // Send message event listeners
    sendMessageBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Progress tracking
const emotionCount = document.getElementById('emotion-count');
const toolCount = document.getElementById('tool-count');
const connectionCount = document.getElementById('connection-count');
const achievementCount = document.getElementById('achievement-count');
const achievementsContainer = document.getElementById('achievements-container');

let progress = {
    emotions: 0,
    tools: 0,
    connections: 0,
    achievements: 0
};

const achievements = [
    { id: "emotion-explorer", icon: "😊", title: "Emotion Explorer", desc: "Recognized your first emotion" },
    { id: "calm-starter", icon: "🧘", title: "Calm Starter", desc: "Used your first calming tool" },
    { id: "social-butterfly", icon: "👥", title: "Social Butterfly", desc: "Sent your first message" },
    { id: "emotion-master", icon: "🌈", title: "Emotion Master", desc: "Recognized 5 different emotions" }
];

function updateProgress(type) {
    progress[type]++;
    
    // Update counts
    emotionCount.textContent = progress.emotions;
    toolCount.textContent = progress.tools;
    connectionCount.textContent = progress.connections;
    
    // Update achievements
    const earnedAchievements = [];
    if (progress.emotions >= 1 && !achievementsContainer.querySelector('#emotion-explorer')) {
        earnedAchievements.push(achievements[0]);
    }
    if (progress.tools >= 1 && !achievementsContainer.querySelector('#calm-starter')) {
        earnedAchievements.push(achievements[1]);
    }
    if (progress.connections >= 1 && !achievementsContainer.querySelector('#social-butterfly')) {
        earnedAchievements.push(achievements[2]);
    }
    if (progress.emotions >= 5 && !achievementsContainer.querySelector('#emotion-master')) {
        earnedAchievements.push(achievements[3]);
    }
    
    // Add new achievements
    earnedAchievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.classList.add('achievement-card');
        achievementElement.id = achievement.id;
        achievementElement.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.title}</div>
            <p>${achievement.desc}</p>
        `;
        achievementsContainer.appendChild(achievementElement);
        progress.achievements++;
        
        // Award points for achievement
        addPoints(50, achievement.title);
        addXP(30);
    });
    
    achievementCount.textContent = progress.achievements;
    
    // Save progress to localStorage
    localStorage.setItem('calmCompanionProgress', JSON.stringify(progress));
}

// Initialize progress
function initProgress() {
    // Load progress from localStorage if available
    const savedProgress = localStorage.getItem('calmCompanionProgress');
    if (savedProgress) {
        progress = JSON.parse(savedProgress);
    }
    
    // Update UI
    emotionCount.textContent = progress.emotions;
    toolCount.textContent = progress.tools;
    connectionCount.textContent = progress.connections;
    achievementCount.textContent = progress.achievements;
    
    // Render achievements
    achievements.forEach(achievement => {
        if (document.getElementById(achievement.id)) return;
        
        const achievementElement = document.createElement('div');
        achievementElement.classList.add('achievement-card');
        achievementElement.id = achievement.id;
        achievementElement.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.title}</div>
            <p>${achievement.desc}</p>
        `;
        achievementsContainer.appendChild(achievementElement);
    });
}

// Focus Game
const memoryGame = document.getElementById('memory-game');
const startGameBtn = document.getElementById('start-game-btn');
const resetGameBtn = document.getElementById('reset-game-btn');
const gamePoints = document.getElementById('game-points');

const cardValues = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🍑', '🍍'];
let cards = [];
let flippedCards = [];
let matchedCards = [];
let gameStarted = false;
let points = 0;

function initMemoryGame() {
    // Duplicate and shuffle cards
    cards = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
    
    // Create card elements
    memoryGame.innerHTML = '';
    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.value = value;
        card.dataset.index = index;
        card.textContent = '?';
        card.style.cursor = 'pointer';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.style.fontSize = '1.5rem';
        card.style.backgroundColor = '#f0f0f0';
        card.style.borderRadius = '10px';
        card.addEventListener('click', flipCard);
        memoryGame.appendChild(card);
    });
    
    // Reset game state
    flippedCards = [];
    matchedCards = [];
    points = 0;
    gamePoints.textContent = points;
}

function flipCard() {
    if (!gameStarted) return;
    if (flippedCards.length >= 2) return;
    if (this.textContent !== '?' || matchedCards.includes(this.dataset.index)) return;
    
    this.textContent = this.dataset.value;
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    
    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1.dataset.index, card2.dataset.index);
        points += 10;
        gamePoints.textContent = points;
        
        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                addPoints(30, "Completed memory game");
                addXP(25);
                gameStarted = false;
            }, 300);
        }
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
    }
    
    flippedCards = [];
}

startGameBtn.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        initMemoryGame();
    }
});

resetGameBtn.addEventListener('click', () => {
    gameStarted = false;
    flippedCards = [];
    matchedCards = [];
    initMemoryGame();
});

// Accessibility features
document.getElementById('contrast-toggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

document.getElementById('font-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dyslexic-font');
});

document.getElementById('zoom-in').addEventListener('click', () => {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize + 2) + 'px';
});

document.getElementById('zoom-out').addEventListener('click', () => {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    if (currentSize > 12) {
        document.body.style.fontSize = (currentSize - 2) + 'px';
    }
});

// Initialize the app
window.addEventListener('load', () => {
    console.log("CalmCompanion initialized successfully!");
    initChatSystem();
    initProgress();
    initMemoryGame();
    updatePointsDisplay();
    updateLevelDisplay();
    
    // Set daily challenge
    const challenges = [
        "Complete 3 emotional check-ins to earn your Calm Cape!",
        "Use a calming tool for 5 minutes to unlock your Super Breath power",
        "Send a message to a friend to build your Hero Team",
        "Play the memory game to strengthen your Focus Vision"
    ];
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById('daily-challenge-text').textContent = randomChallenge;
});




function initParentMode() {
    // Load child's actual data
    const progress = JSON.parse(localStorage.getItem('calmCompanionProgress')) || { emotions: 0, tools: 0, connections: 0 };
    
    document.getElementById('child-points').textContent = localStorage.getItem('userPoints') || '0';
    document.getElementById('emotion-checkins').textContent = progress.emotions;
    document.getElementById('tools-used').textContent = progress.tools;
    
    // Load saved settings or defaults
    const settings = JSON.parse(localStorage.getItem('parentSettings')) || {
        timeLimitEnabled: false,
        timeLimitValue: 60,
        contentFilter: true,
        progressSharing: true
    };
    
    // Apply settings to UI
    document.getElementById('time-limit-toggle').checked = settings.timeLimitEnabled;
    document.getElementById('time-limit-slider').value = settings.timeLimitValue;
    document.getElementById('content-filter-toggle').checked = settings.contentFilter;
    document.getElementById('progress-sharing').checked = settings.progressSharing;
    document.getElementById('time-limit-details').style.display = settings.timeLimitEnabled ? 'block' : 'none';
    document.getElementById('time-limit-value').textContent = settings.timeLimitValue;
    
    // Load recent activities (mock data - replace with real tracking)
    loadRecentActivities();
    
    // Set up event listeners
    document.getElementById('time-limit-toggle').addEventListener('change', function() {
        document.getElementById('time-limit-details').style.display = this.checked ? 'block' : 'none';
    });
    
    document.getElementById('time-limit-slider').addEventListener('input', function() {
        document.getElementById('time-limit-value').textContent = this.value;
    });
    
    document.getElementById('save-settings').addEventListener('click', saveParentSettings);
    document.getElementById('view-full-report').addEventListener('click', showFullReport);
}

function loadRecentActivities() {
    const activities = [
        { icon: '😊', action: 'Completed emotion check-in', time: 'Today' },
        { icon: '🧘', action: 'Used Bubble Breathing', time: 'Today' },
        { icon: '🎮', action: 'Played Focus Game', time: 'Yesterday' }
    ];
    
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    
    if (activities.length === 0) {
        activityList.innerHTML = '<div class="empty-state">No recent activities</div>';
    } else {
        activities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-info">
                    <p>${activity.action}</p>
                    <small>${activity.time}</small>
                </div>
            `;
            activityList.appendChild(item);
        });
    }
}

function saveParentSettings() {
    const settings = {
        timeLimitEnabled: document.getElementById('time-limit-toggle').checked,
        timeLimitValue: parseInt(document.getElementById('time-limit-slider').value),
        contentFilter: document.getElementById('content-filter-toggle').checked,
        progressSharing: document.getElementById('progress-sharing').checked
    };
    
    localStorage.setItem('parentSettings', JSON.stringify(settings));
    
    // Show confirmation
    const notification = document.createElement('div');
    notification.className = 'parent-notification';
    notification.innerHTML = '<i class="fas fa-check"></i> Settings saved!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

function showFullReport() {
    const progress = JSON.parse(localStorage.getItem('calmCompanionProgress')) || {};
    const report = `
        <h3>Activity Report</h3>
        <p>Total Points: ${localStorage.getItem('userPoints') || 0}</p>
        <p>Emotions Logged: ${progress.emotions || 0}</p>
        <p>Tools Used: ${progress.tools || 0}</p>
        <p>Connections Made: ${progress.connections || 0}</p>
    `;
    alert(report);
}