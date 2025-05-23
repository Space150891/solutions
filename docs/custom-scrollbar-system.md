# Custom Scrollbar System for CubeX

This document provides an overview of the custom scrollbar system implemented in the CubeX project.

## Overview

The custom scrollbar system provides consistent, theme-aware scrollbar styling throughout the application. It adapts to both light and dark themes, enhancing the visual appeal and user experience of the application.

## Implementation Details

### Global Scrollbar Styling

The base styling for all scrollbars in the application is defined in `theme.provider.ts` through the `MuiCssBaseline` component. This provides consistent styling for all scrollbars in the application by default.

### Specialized Scrollbar Components

The system includes several specialized components to handle specific use cases:

1. **CustomScrollbar**
   - Base component for all scrollable content
   - Adapts to the current theme (light/dark)
   - Customizable through props: height, maxHeight, width

2. **PageScrollContainer**
   - For page layout scrolling
   - Used in main layout containers
   - Provides full-height scrolling for page content

3. **ChartContainer**
   - Specialized for chart content
   - Ensures proper scrolling behavior in chart components
   - Maintains chart aspect ratios

4. **DialogContent**
   - For modal and dialog content
   - Ensures scrollable content within fixed-size dialogs
   - Maintains consistent padding and layout

5. **ScrollableCardContent**
   - For card content with potential overflow
   - Maintains card aesthetics while allowing scrolling
   - Compatible with MUI Card components

6. **ScrollableTabPanel**
   - For tab content with scrolling
   - Maintains tab accessibility attributes
   - Handles tab panel content overflow

7. **ScrollableFormContent**
   - For form containers with many fields
   - Maintains consistent spacing between form elements
   - Provides convenient form styling

### Additional Styling

Custom scrollbar styling has also been added to:
- DataGrid components
- Modal components

## Usage Guidelines

### General Component Usage

```tsx
// Basic usage
<CustomScrollbar maxHeight="300px">
  {content}
</CustomScrollbar>

// Page layout
<PageScrollContainer>
  {pageContent}
</PageScrollContainer>

// Chart container
<ChartContainer height="320px">
  <Chart {...chartProps} />
</ChartContainer>

// Dialog content
<DialogContent maxHeight="500px">
  {dialogContent}
</DialogContent>

// Card content
<ScrollableCardContent maxHeight="300px">
  {cardContent}
</ScrollableCardContent>

// Tab panel
<ScrollableTabPanel value={tabValue} index={0} maxHeight="400px">
  {tabContent}
</ScrollableTabPanel>

// Form content
<ScrollableFormContent maxHeight="500px">
  <TextField label="Field 1" />
  <TextField label="Field 2" />
</ScrollableFormContent>
```

### Real-World Examples

The system includes several example implementations:

1. **Enhanced Stats Card** (`pages/medical-stats/enhanced-card-example.tsx`)
   - Demonstrates using `ScrollableCardContent` with dynamic data
   - Shows proper handling of overflow with custom scrollbars

2. **Tabbed Stats Example** (`pages/medical-stats/tabbed-stats-example.tsx`)
   - Demonstrates using `ScrollableTabPanel` for tab-based interfaces
   - Shows integration with Material UI's Tab system

3. **Patient Filter Form** (`pages/medical-stats/patient-filter-form.tsx`)
   - Demonstrates using `ScrollableFormContent` for form layouts
   - Shows proper spacing and scrolling for forms with many fields

These examples are integrated into the Medical Stats page for demonstration purposes.

### Best Practices

1. Use the most specific component for your use case
2. Set appropriate `maxHeight` values to avoid unnecessary scrollbars
3. For custom styling, use the `sx` prop rather than modifying the base components
4. For specialized cases not covered by the existing components, compose a new component using `CustomScrollbar` as the base

## Theme Customization

The scrollbar styling responds to the application's theme mode. The styling is defined in:

- Light theme: Subtle gray scrollbars (#f1f1f1, #c1c1c1)
- Dark theme: Subtle white scrollbars with opacity (rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2))

To modify the scrollbar appearance, update the styles in `theme.provider.ts` for global changes or in the specific component files for targeted changes.
