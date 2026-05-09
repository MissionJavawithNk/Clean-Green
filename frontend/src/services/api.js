const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const fetchLeaderboard = async (type, parentId = null) => {
  const endpoint = type === 'Household' ? 'households' : 'societies';
  const param = type === 'Household' ? 'societyId' : 'districtId';
  const url = `${API_BASE_URL}/leaderboards/${endpoint}${parentId ? `?${param}=${parentId}` : ''}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${type} leaderboard:`, error);
    return []; // Return empty array on error
  }
};

export const logActivity = async (activityData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/points/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData),
    });
    return await response.text();
  } catch (error) {
    console.error('Error logging activity:', error);
    throw error;
  }
};
