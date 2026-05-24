// Parent Sidebar Controller
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const parentSidebar = document.getElementById('parent-sidebar');
    const parentModeBtn = document.querySelector('[data-screen="parent-mode"]');
    const closeParentBtn = document.getElementById('close-parent-btn');
    const contentArea = document.querySelector('.content-area');
    
    // Toggle Parent Sidebar
    function toggleParentSidebar() {
        parentSidebar.classList.toggle('active');
        
        // Dim main content when sidebar is active
        if (parentSidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            contentArea.style.pointerEvents = 'none';
            contentArea.style.opacity = '0.7';
        } else {
            document.body.style.overflow = ''; // Re-enable scrolling
            contentArea.style.pointerEvents = '';
            contentArea.style.opacity = '';
        }
    }
    
    // Event Listeners
    parentModeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleParentSidebar();
        loadParentData(); // Load data when opened
    });
    
    closeParentBtn.addEventListener('click', toggleParentSidebar);
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (parentSidebar.classList.contains('active') && 
            !parentSidebar.contains(e.target) && 
            e.target !== parentModeBtn) {
            toggleParentSidebar();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && parentSidebar.classList.contains('active')) {
            toggleParentSidebar();
        }
    });
    
    // Parent Mode Functionality
    function loadParentData() {
        // In a real app, this would fetch from an API
        console.log("Loading parent data...");
        
        // Mock data - replace with actual API calls
        const mockData = {
            emotionCheckins: 3,
            toolsUsed: 5,
            childPoints: 120,
            activities: [
                { icon: '😊', action: 'Completed emotion check-in', time: '10 mins ago' },
                { icon: '🧘', action: 'Used Bubble Breathing tool', time: '45 mins ago' },
                { icon: '🎮', action: 'Played Focus Game', time: '2 hours ago' },
                { icon: '🌟', action: 'Earned 10 Super Points', time: 'Yesterday' }
            ]
        };
        
        // Update UI with data
        document.getElementById('emotion-checkins').textContent = mockData.emotionCheckins;
        document.getElementById('tools-used').textContent = mockData.toolsUsed;
        document.getElementById('child-points').textContent = mockData.childPoints;
        
        // Populate activity list
        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = mockData.activities.length > 0 ? 
            mockData.activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-info">
                        <p>${activity.action}</p>
                        <small>${activity.time}</small>
                    </div>
                </div>
            `).join('') : `
                <div class="empty-state">
                    <i class="fas fa-info-circle"></i>
                    <p>No recent activities found</p>
                </div>
            `;
    }
    
    // Parental Controls
    const timeLimitToggle = document.getElementById('time-limit-toggle');
    const timeLimitSlider = document.getElementById('time-limit-slider');
    const timeLimitDetails = document.getElementById('time-limit-details');
    const saveSettingsBtn = document.getElementById('save-settings');
    
    if (timeLimitToggle) {
        timeLimitToggle.addEventListener('change', function() {
            timeLimitDetails.style.display = this.checked ? 'block' : 'none';
        });
        
        timeLimitSlider.addEventListener('input', function() {
            document.querySelector('#time-limit-details p').textContent = 
                `Maximum ${this.value} minutes per day`;
        });
    }
    
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            const settings = {
                timeLimit: {
                    enabled: timeLimitToggle.checked,
                    minutes: timeLimitSlider.value
                },
                contentFilter: document.getElementById('content-filter-toggle').checked,
                progressSharing: document.getElementById('progress-sharing').checked
            };
            
            // In a real app, save to server/localStorage
            console.log('Saving settings:', settings);
            
            // Show confirmation
            const confirmation = document.createElement('div');
            confirmation.className = 'save-confirmation';
            confirmation.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Settings saved successfully!</span>
            `;
            saveSettingsBtn.parentNode.appendChild(confirmation);
            
            setTimeout(() => {
                confirmation.remove();
            }, 3000);
        });
    }
    
    // View Full Report
    const viewReportBtn = document.getElementById('view-full-report');
    if (viewReportBtn) {
        viewReportBtn.addEventListener('click', function() {
            // In a real app, this would open a detailed report
            console.log('Viewing full report...');
            alert('This would open a detailed activity report in a complete implementation');
        });
    }
    
    // Add some sample activity graph visualization
    const activityGraph = document.getElementById('activity-graph');
    if (activityGraph) {
        // This is just a placeholder - in a real app you'd use a charting library
        activityGraph.innerHTML = `
            <div class="graph-visualization">
                <div class="graph-bar" style="height: 30%"></div>
                <div class="graph-bar" style="height: 60%"></div>
                <div class="graph-bar" style="height: 45%"></div>
                <div class="graph-bar" style="height: 75%"></div>
                <div class="graph-bar" style="height: 50%"></div>
                <div class="graph-bar" style="height: 65%"></div>
                <div class="graph-bar" style="height: 40%"></div>
            </div>
            <div class="graph-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
        `;
    }
});

// Add this to your CSS for the graph visualization
/*
.graph-visualization {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 120px;
    padding: 0 20px;
    margin-bottom: 10px;
}

.graph-bar {
    width: 30px;
    background: #3a86ff;
    border-radius: 5px 5px 0 0;
    transition: height 0.5s ease;
}

.graph-labels {
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
    font-size: 0.8rem;
    color: #7f8c8d;
}

.save-confirmation {
    position: absolute;
    right: 20px;
    background: rgba(46, 204, 113, 0.9);
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
*/