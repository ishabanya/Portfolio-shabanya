# PWA Icon Generation Guide

## Required Icons for PWA

Your PWA needs the following icon sizes:

### Standard PWA Icons
- `icon-192.png` - 192x192px (Android home screen)
- `icon-512.png` - 512x512px (Android splash screen)
- `icon-384.png` - 384x384px (Windows start menu)
- `apple-touch-icon.png` - 180x180px (iOS home screen)
- `favicon.ico` - 16x16, 32x32, 48x48px (Browser tab)

### How to Generate Icons

1. **Design a Square Icon (512x512px)**
   - Use your initials "YSK" or "S" 
   - Use portfolio brand colors (#2563eb, #7c3aed)
   - Ensure it's readable at small sizes
   - Keep design simple and recognizable

2. **Tools for Icon Generation**
   - [Favicon.io](https://favicon.io/) - Generate all sizes from one image
   - [PWA Builder](https://www.pwabuilder.com/) - Microsoft's PWA tool
   - [Maskable.app](https://maskable.app/) - Test Android adaptive icons

3. **Online Icon Generators**
   - Upload your 512x512 image
   - Download the generated zip with all sizes
   - Replace the placeholder files in `/public/`

## Design Guidelines

### Colors
- Primary: #2563eb (Blue)
- Secondary: #7c3aed (Purple) 
- Background: #ffffff (White)

### Content
- Use your initials "YSK" or just "S"
- Include subtle coding elements (brackets, etc.)
- Ensure good contrast for readability

### Technical Requirements
- **Maskable icons**: Include safe area for Android
- **Purpose**: Set to "any maskable" for adaptive icons
- **Format**: PNG for colored icons, ICO for favicon

## Temporary Placeholder

Until you create custom icons, the app will use default React icons. The manifest.json is already configured with the correct file names and sizes.

## Testing Your Icons

1. Build the app: `npm run build`
2. Serve locally: `npx serve -s build`
3. Open Chrome DevTools > Application > Manifest
4. Check if all icons load correctly

## After Adding Real Icons

1. Replace placeholder files in `/public/`
2. Test on multiple devices
3. Verify adaptive icons work on Android
4. Check iOS home screen appearance