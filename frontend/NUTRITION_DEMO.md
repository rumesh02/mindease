# Nutrition Tracker - Quick Demo

## What You Built

You've successfully implemented a **Nutrition Tracker** feature in your MindEase app! Here's what was created:

### 🎯 New Files Created:

1. **`src/screens/NutritionScreen.js`** - Complete nutrition search and display screen
2. **`NUTRITION_SETUP.md`** - Setup guide for API key

### 🔧 Modified Files:

1. **`src/services/api.js`** - Added `fetchNutritionInfo()` function
2. **`src/navigation/AppNavigator.js`** - Added Nutrition tab to bottom navigation

## What It Does

### Search Functionality

Users can search for any food item and get instant nutrition information from a real public API (API-Ninjas).

### Data Displayed

For each food item, users see:

**Main Macros (Color-coded cards):**

- 🟨 Calories
- 🟦 Protein (grams)
- 🟪 Carbohydrates (grams)
- 🟩 Fat (grams)

**Detailed Nutrition:**

- Sugar
- Fiber
- Sodium
- Potassium
- Cholesterol
- Saturated Fat

## How to Test It

### 1. Get Your Free API Key

Follow the instructions in `NUTRITION_SETUP.md` to get a free API key from api-ninjas.com (takes 2 minutes).

### 2. Add API Key

In `src/services/api.js`, line ~249, replace:

```javascript
const apiKey = "YOUR_API_KEY";
```

with your actual key.

### 3. Run the App

```bash
npm start
```

### 4. Try These Searches

- `apple` - Simple fruit
- `grilled chicken breast` - Specific protein
- `1 cup brown rice` - With quantity
- `salmon` - Fish
- `greek yogurt` - Dairy
- `almonds` - Nuts
- `avocado` - Healthy fat

## UI Features

✨ **Modern Design:**

- Gradient header with app branding
- Card-based nutrition display
- Color-coded macro nutrients
- Responsive search interface
- Loading states and error handling
- Empty state messaging

🎨 **Theme Support:**

- Automatically adapts to light/dark mode
- Uses your app's existing theme context

📱 **Mobile-Optimized:**

- Keyboard-aware scrolling
- Touch-friendly buttons
- Smooth animations
- Safe area support

## API Details

**Provider:** API-Ninjas  
**Endpoint:** https://api.api-ninjas.com/v1/nutrition  
**Free Tier:** 50,000 requests/month  
**Cost:** Free (no credit card needed)  
**Response Time:** ~200-500ms

## Example API Response

When searching for "apple":

```json
[
  {
    "name": "apple",
    "calories": 95.0,
    "serving_size_g": 182.0,
    "fat_total_g": 0.3,
    "fat_saturated_g": 0.1,
    "protein_g": 0.5,
    "sodium_mg": 2.0,
    "potassium_mg": 195.0,
    "cholesterol_mg": 0.0,
    "carbohydrates_total_g": 25.0,
    "fiber_g": 4.4,
    "sugar_g": 19.0
  }
]
```

## Integration Points

The Nutrition feature integrates seamlessly with your existing app:

✅ Uses existing theme system (`ThemeContext`)  
✅ Follows app's design patterns  
✅ Uses same icon library (Feather)  
✅ Matches existing color scheme  
✅ Integrated into bottom tab navigation

## Next Steps

Once you add your API key, you can:

1. **Test the feature** with various food items
2. **Customize colors** in the macro cards
3. **Add more features** like:
   - Save favorite foods
   - Daily nutrition tracking
   - Meal planning
   - Compare foods side-by-side

## Need Help?

Check these files if you need to modify anything:

- **Search logic**: `src/screens/NutritionScreen.js` (handleSearch function)
- **API call**: `src/services/api.js` (fetchNutritionInfo function)
- **Navigation**: `src/navigation/AppNavigator.js` (MainTabs component)
- **Styling**: `src/screens/NutritionScreen.js` (StyleSheet at bottom)

---

**Enjoy your new Nutrition Tracker! 🥗✨**
