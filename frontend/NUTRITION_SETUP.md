# Nutrition Feature Setup Guide

## Overview

The MindEase app now includes a **Nutrition Tracker** feature that allows users to search for food items and get detailed nutritional information using the API-Ninjas Nutrition API.

## Features

- 🔍 Search for any food item (e.g., "apple", "chicken breast", "brown rice")
- 📊 View comprehensive nutrition facts including:
  - Calories
  - Macronutrients (Protein, Carbs, Fat)
  - Sugar, Fiber, Sodium, Potassium
  - Cholesterol and Saturated Fat
- 🎨 Beautiful, color-coded UI with macro cards
- 📱 Fully responsive and mobile-optimized

## Getting Your Free API Key

### Step 1: Sign Up for API-Ninjas

1. Visit [https://api-ninjas.com/](https://api-ninjas.com/)
2. Click **"Sign Up"** in the top right corner
3. Create a free account (no credit card required)

### Step 2: Get Your API Key

1. After signing in, go to your **Profile** or **Dashboard**
2. You'll find your API key displayed prominently
3. Copy the API key (it looks like: `aBcD1234eFgH5678+iJkL9012==`)

### Step 3: Add API Key to the App

1. Open the file: `frontend/src/services/api.js`
2. Find the `fetchNutritionInfo` function (around line 247)
3. Replace `'YOUR_API_KEY'` with your actual API key:

```javascript
const apiKey = "aBcD1234eFgH5678+iJkL9012=="; // Replace with your actual key
```

## API Limits (Free Tier)

- **50,000 requests per month** (Free)
- No credit card required
- More than enough for personal use and testing

## How to Use the Feature

### In the App:

1. Log in to MindEase
2. Tap the **"Nutrition"** tab in the bottom navigation (pie-chart icon)
3. Enter a food item in the search box (e.g., "banana", "grilled chicken", "white rice")
4. Tap the search button or press Enter
5. View detailed nutrition information for your food item

### Search Tips:

- Be specific: "grilled chicken breast" instead of just "chicken"
- Use common food names: "apple", "banana", "rice", "salmon"
- You can search for meals: "1 cup brown rice" or "200g chicken breast"
- The API understands quantities: "2 eggs", "1 medium apple"

## Example Searches

- `apple`
- `grilled chicken breast`
- `1 cup brown rice`
- `banana`
- `salmon fillet`
- `greek yogurt`
- `almonds`
- `avocado`

## API Documentation

Full API documentation: [https://api-ninjas.com/api/nutrition](https://api-ninjas.com/api/nutrition)

## Troubleshooting

### "Failed to fetch nutrition data"

- Check your internet connection
- Verify your API key is correct
- Ensure you haven't exceeded the monthly limit

### "No nutrition information found"

- Try a more common food name
- Be more specific (e.g., "grilled chicken" vs "chicken")
- Check spelling

### API Key Not Working

- Make sure you copied the entire key
- Remove any extra spaces before or after the key
- Ensure the key is inside quotes: `'your-key-here'`

## File Locations

- **API Service**: `frontend/src/services/api.js`
- **Nutrition Screen**: `frontend/src/screens/NutritionScreen.js`
- **Navigator**: `frontend/src/navigation/AppNavigator.js`

## Future Enhancements

Potential improvements for this feature:

- [ ] Save favorite foods
- [ ] Track daily nutrition intake
- [ ] Set nutrition goals
- [ ] Compare multiple foods
- [ ] Barcode scanning
- [ ] Meal planning

---

**Note**: The Nutrition feature uses a real public API, so an internet connection is required. The free tier provides generous limits for personal use.
