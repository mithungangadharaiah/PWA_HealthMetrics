// Firebase Analytics Module
// ========================================
// Tracks user activity for the health app (with user consent)

// Log health test session
async function logHealthTest(userId, userEmail, testData) {
    try {
        if (!window.ANALYTICS_ENABLED || !db) {
            return; // Analytics disabled or Firestore not available
        }

        const healthTestLog = {
            userId: userId,
            userEmail: userEmail,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            testType: 'heart_rate_detection',
            duration: testData.duration || 60,
            avgHeartRate: testData.avgHeartRate || 0,
            samples: testData.samples || 0
        };

        await db.collection('analytics').doc().set(healthTestLog);
        console.log('[OK] Health test logged successfully');
        
    } catch (error) {
        console.error('[ERROR] Failed to log health test:', error);
    }
}

// Export analytics functions to global scope
window.logHealthTest = logHealthTest;
