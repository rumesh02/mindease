/**
 * API Service (Local Storage Only - No Backend)
 * Handles all data operations using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock tips data
const MOCK_TIPS = [
  {
    "id": "1",
    "title": "Morning Meditation",
    "description": "Start your day with a 10-minute meditation session to clear your mind and set positive intentions.",
    "category": "meditation",
    "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    "fullContent": "Morning meditation is one of the most powerful habits you can develop. By taking just 10 minutes each morning to sit quietly, focus on your breath, and set intentions for the day, you create a foundation of calm and clarity.\n\nHow to practice:\n1. Find a quiet space\n2. Sit comfortably with your back straight\n3. Close your eyes and take 5 deep breaths\n4. Focus on your breathing for 10 minutes\n5. Set a positive intention for your day\n\nBenefits include reduced stress, improved focus, and better emotional regulation throughout your day.",
    "duration": "10 min",
    "difficulty": "beginner"
  },
  {
    "id": "2",
    "title": "Hydration Habit",
    "description": "Drink a glass of water first thing in the morning to jumpstart your metabolism and hydrate your body.",
    "category": "nutrition",
    "image": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
    "fullContent": "Starting your day with water is one of the simplest yet most effective health habits. After 6-8 hours of sleep, your body is naturally dehydrated and needs replenishment.\n\nWhy morning hydration matters:\n- Kickstarts your metabolism\n- Flushes out toxins accumulated overnight\n- Improves brain function and alertness\n- Aids in digestion\n- Boosts energy levels naturally\n\nTip: Keep a glass of water by your bedside and drink it as soon as you wake up, before coffee or breakfast.",
    "duration": "2 min",
    "difficulty": "beginner"
  },
  {
    "id": "3",
    "title": "Gratitude Journaling",
    "description": "Write down three things you're grateful for each day to boost positivity and mental well-being.",
    "category": "mindfulness",
    "image": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400",
    "fullContent": "Gratitude journaling is a scientifically-proven practice that can significantly improve your mental health and overall life satisfaction.\n\nHow to start:\n1. Keep a dedicated journal or use your phone\n2. Each evening, write down 3 things you're grateful for\n3. Be specific - instead of 'family', write 'the hug my child gave me this morning'\n4. Reflect on why you're grateful for each item\n5. Notice patterns over time\n\nResearch shows that consistent gratitude practice can reduce depression, improve sleep quality, and increase overall happiness levels by up to 25%.",
    "duration": "5 min",
    "difficulty": "beginner"
  },
  {
    "id": "4",
    "title": "Digital Detox Hour",
    "description": "Set aside one hour before bed without screens to improve sleep quality and reduce anxiety.",
    "category": "sleep",
    "image": "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400",
    "fullContent": "The blue light from screens interferes with melatonin production, making it harder to fall asleep and reducing sleep quality. A digital detox hour can transform your sleep and mental health.\n\nImplementation steps:\n1. Set a daily alarm for 1 hour before bedtime\n2. Put all devices in another room or a drawer\n3. Replace screen time with calming activities:\n   - Reading a physical book\n   - Gentle stretching or yoga\n   - Journaling\n   - Listening to calm music\n   - Having meaningful conversations\n\nBenefits: Better sleep quality, reduced anxiety, improved relationships, and enhanced mental clarity.",
    "duration": "60 min",
    "difficulty": "intermediate"
  },
  {
    "id": "5",
    "title": "Nature Walk",
    "description": "Spend 20 minutes walking in nature to reduce stress hormones and boost mood naturally.",
    "category": "exercise",
    "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    "fullContent": "Nature walks, also called 'forest bathing' in Japanese culture (Shinrin-yoku), have profound effects on both physical and mental health.\n\nScientific benefits:\n- Reduces cortisol (stress hormone) by up to 16%\n- Lowers blood pressure and heart rate\n- Boosts immune system function\n- Improves mood and reduces symptoms of depression\n- Enhances creativity and problem-solving abilities\n\nHow to practice:\n1. Find a local park, trail, or green space\n2. Leave your phone on silent or at home\n3. Walk at a comfortable, leisurely pace\n4. Engage all your senses - notice sounds, smells, textures\n5. Practice mindful breathing\n\nEven 20 minutes can make a significant difference in your day.",
    "duration": "20 min",
    "difficulty": "beginner"
  },
  {
    "id": "6",
    "title": "Progressive Muscle Relaxation",
    "description": "Release physical tension by systematically tensing and relaxing different muscle groups.",
    "category": "relaxation",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    "fullContent": "Progressive Muscle Relaxation (PMR) is a technique developed by physician Edmund Jacobson that helps reduce physical tension and mental stress.\n\nHow to practice:\n1. Lie down or sit in a comfortable position\n2. Starting with your toes, tense the muscles for 5 seconds\n3. Release and notice the difference for 10 seconds\n4. Move up through your body:\n   - Feet and calves\n   - Thighs\n   - Abdomen\n   - Chest and shoulders\n   - Arms and hands\n   - Neck and jaw\n   - Face\n\nThis technique is particularly effective for:\n- Reducing anxiety and stress\n- Improving sleep quality\n- Managing chronic pain\n- Lowering blood pressure\n\nPractice daily for best results, especially before bed.",
    "duration": "15 min",
    "difficulty": "beginner"
  },
  {
    "id": "7",
    "title": "Mindful Eating",
    "description": "Practice eating slowly and deliberately, savoring each bite without distractions.",
    "category": "nutrition",
    "image": "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400",
    "fullContent": "Mindful eating transforms your relationship with food and can lead to better digestion, weight management, and enjoyment of meals.\n\nPrinciples of mindful eating:\n1. Eat without distractions (no TV, phone, or computer)\n2. Chew each bite 20-30 times\n3. Notice colors, textures, aromas, and flavors\n4. Put your utensil down between bites\n5. Check in with your hunger levels throughout the meal\n6. Stop eating when you're 80% full\n\nBenefits:\n- Better digestion and nutrient absorption\n- Natural portion control and weight management\n- Reduced stress around food\n- Greater appreciation and enjoyment of meals\n- Improved awareness of hunger and fullness cues\n\nStart with one mindful meal per day and gradually expand.",
    "duration": "30 min",
    "difficulty": "intermediate"
  },
  {
    "id": "8",
    "title": "Box Breathing Technique",
    "description": "A powerful breathing exercise used by Navy SEALs to reduce stress and improve focus.",
    "category": "breathing",
    "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    "fullContent": "Box breathing, also known as square breathing, is a simple yet powerful technique used by athletes, military personnel, and meditation practitioners to calm the nervous system and enhance focus.\n\nHow to practice:\n1. Inhale through your nose for 4 counts\n2. Hold your breath for 4 counts\n3. Exhale through your mouth for 4 counts\n4. Hold empty for 4 counts\n5. Repeat for 5-10 cycles\n\nVisualize a box:\n- Inhale as you trace up one side\n- Hold as you trace across the top\n- Exhale as you trace down the other side\n- Hold as you trace across the bottom\n\nBenefits:\n- Activates the parasympathetic nervous system (rest and digest)\n- Reduces cortisol and adrenaline\n- Improves concentration and mental clarity\n- Helps manage panic attacks and anxiety\n- Can be done anywhere, anytime\n\nPerfect for before important meetings, tests, or stressful situations.",
    "duration": "5 min",
    "difficulty": "beginner"
  }
];

// ========================================
// Authentication (Local Only)
// ========================================

export const register = async (username, email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  try {
    const usersData = await AsyncStorage.getItem('mindease_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In real app, this should be hashed
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await AsyncStorage.setItem('mindease_users', JSON.stringify(users));
    
    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      },
      token: `local_token_${newUser.id}`
    };
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  try {
    const usersData = await AsyncStorage.getItem('mindease_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token: `local_token_${user.id}`
    };
  } catch (error) {
    throw error;
  }
};

// ========================================
// Tips (Local Data)
// ========================================

export const fetchTips = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return {
    success: true,
    count: MOCK_TIPS.length,
    tips: MOCK_TIPS
  };
};

export const fetchTipById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const tip = MOCK_TIPS.find(t => t.id === id);
  return {
    success: true,
    tip
  };
};

export const fetchDailyTip = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const randomIndex = Math.floor(Math.random() * MOCK_TIPS.length);
  return {
    success: true,
    tip: MOCK_TIPS[randomIndex]
  };
};

// ========================================
// Favourites (Local Storage)
// ========================================

export const fetchUserFavourites = async (userId) => {
  const favouritesData = await AsyncStorage.getItem('mindease_favourites');
  const allFavourites = favouritesData ? JSON.parse(favouritesData) : [];
  const userFavourites = allFavourites.filter(fav => fav.userId === userId);
  
  return {
    success: true,
    count: userFavourites.length,
    favourites: userFavourites
  };
};

export const addFavourite = async (userId, tipId, tipData) => {
  const favouritesData = await AsyncStorage.getItem('mindease_favourites');
  const favourites = favouritesData ? JSON.parse(favouritesData) : [];
  
  const newFavourite = {
    id: Date.now().toString(),
    userId,
    tipId,
    tipData,
    createdAt: new Date().toISOString()
  };
  
  favourites.push(newFavourite);
  await AsyncStorage.setItem('mindease_favourites', JSON.stringify(favourites));
  
  return {
    success: true,
    message: 'Added to favourites',
    favourite: newFavourite
  };
};

export const removeFavourite = async (favouriteId, userId) => {
  const favouritesData = await AsyncStorage.getItem('mindease_favourites');
  const favourites = favouritesData ? JSON.parse(favouritesData) : [];
  
  const updatedFavourites = favourites.filter(fav => fav.id !== favouriteId);
  await AsyncStorage.setItem('mindease_favourites', JSON.stringify(updatedFavourites));
  
  return {
    success: true,
    message: 'Removed from favourites'
  };
};

export default { register, login, fetchTips, fetchTipById, fetchDailyTip, fetchUserFavourites, addFavourite, removeFavourite };
