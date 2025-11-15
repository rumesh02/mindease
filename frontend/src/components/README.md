# MindEase Components

This directory is for reusable React Native components.

## Suggested Components to Add

### UI Components

- **TipCard.js** - Reusable card component for displaying tips
- **Button.js** - Custom button component with variants
- **Input.js** - Custom input field with validation
- **Avatar.js** - User avatar component
- **Badge.js** - Category/status badge component
- **EmptyState.js** - Empty state placeholder

### Feature Components

- **BreathingCircle.js** - Extracted breathing animation component
- **StatCard.js** - Statistics display card
- **SettingsItem.js** - Settings menu item component

### Layout Components

- **Screen.js** - Screen wrapper with safe area
- **Header.js** - Custom header component
- **Card.js** - Generic card container

## Usage Example

```javascript
import TipCard from "../components/TipCard";

<TipCard
  tip={tipData}
  onPress={() => navigation.navigate("TipDetails")}
  onFavourite={handleFavourite}
/>;
```

## Best Practices

1. Keep components small and focused
2. Use PropTypes or TypeScript for type checking
3. Make components reusable and configurable
4. Extract common styling to a theme file
5. Document props and usage
