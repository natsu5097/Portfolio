# BloxTreck Project Organization Guide

## 📁 Project Structure

```
Bloxtreck/
├── assets/
│   ├── images/
│   │   ├── sitelogo/
│   │   ├── fruits_images/
│   │   ├── swords_images/
│   │   ├── guns_images/
│   │   ├── styles_images/
│   │   └── accessories_images/
│   └── styles/
│       └── tools.css
├── content/
│   ├── about.html
│   ├── item-template.html
│   └── tierlist.html
├── community/
│   └── quiz.html
├── game-content/
│   ├── accessories/
│   │   ├── accessories.html
│   │   └── pages/
│   ├── fruits/
│   │   ├── fruits.html
│   │   └── pages/
│   ├── swords/
│   │   ├── swords.html
│   │   └── pages/
│   ├── guns/
│   │   ├── guns.html
│   │   └── pages/
│   ├── fighting-styles/
│   │   ├── fighting-styles.html
│   │   └── pages/
│   ├── islands/
│   │   ├── islands.html
│   │   └── pages/
│   ├── bosses/
│   │   ├── bosses.html
│   │   └── pages/
│   └── npcs/
│       ├── npcs.html
│       └── pages/
├── tools-utilities/
│   ├── calculators/
│   ├── maps/
│   ├── planners/
│   ├── simulators/
│   └── trackers/
├── documentation/
│   └── ORGANIZATION_GUIDE.md
├── index.html
├── 404.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── package.json
├── .eslintrc.json
├── .stylelintrc.json
├── .htmlhintrc
├── .gitignore
├── README.md
├── IMPLEMENTATION_GUIDE.md
└── OPTIMIZATION_SUMMARY.md
```

## 🎯 File Organization Principles

### 1. **Content Hierarchy**
- **Main Pages**: Root level (`index.html`, `404.html`)
- **Content Pages**: `/content/` for general site content
- **Game Content**: `/game-content/` organized by category
- **Community**: `/community/` for user-generated content
- **Tools**: `/tools-utilities/` for interactive features

### 2. **Asset Organization**
- **Images**: Organized by content type in `/assets/images/`
- **Styles**: Main `style.css` + component styles in `/assets/styles/`
- **Scripts**: Main `script.js` with modular organization

### 3. **Page Structure Standards**

#### Main Page Template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Standard meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | BloxTreck Wiki</title>
  <meta name="description" content="Page description">
  
  <!-- SEO meta tags -->
  <link rel="canonical" href="page-url">
  <meta property="og:title" content="Page Title">
  
  <!-- Resources -->
  <link rel="stylesheet" href="path/to/style.css">
  <link rel="icon" href="path/to/favicon.ico">
</head>
<body>
  <!-- Skip link -->
  <a class="skip-link" href="#main-content">Skip to main content</a>
  
  <!-- Main content -->
  <main id="main-content" role="main">
    <!-- Breadcrumbs for sub-pages -->
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <!-- breadcrumb items -->
      </ol>
    </nav>
    
    <!-- Page content -->
  </main>
  
  <script src="path/to/script.js"></script>
</body>
</html>
```

#### Item Page Template (`content/item-template.html`):
- Consistent structure for all game items
- Collapsible sections for stats, moveset, obtainment
- Responsive image galleries
- Related items suggestions

### 4. **Naming Conventions**

#### Files:
- **HTML**: lowercase with hyphens (`dark-blade.html`)
- **Images**: descriptive names (`Dragon_Fruit.png`)
- **Directories**: lowercase with hyphens where needed

#### CSS Classes:
- **Components**: `.component-name` (`.nav-dropdown`)
- **Modifiers**: `.component--modifier` (`.btn--primary`)
- **States**: `.is-active`, `.is-loading`

#### JavaScript:
- **Functions**: camelCase (`initializeSearch`)
- **Variables**: camelCase (`searchResults`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### 5. **Development Workflow**

#### Adding New Content:
1. **Create HTML file** in appropriate category folder
2. **Add images** to corresponding assets folder
3. **Update navigation** if needed in `script.js`
4. **Add to sitemap.xml** for SEO
5. **Test accessibility** with provided tools

#### Code Quality Checks:
```bash
# Run before committing
npm run audit

# Individual checks
npm run lint:html
npm run lint:css
npm run lint:js
```

### 6. **Performance Guidelines**

#### Images:
- **Format**: WebP with PNG/JPG fallback
- **Size**: Optimize all images > 100KB
- **Loading**: Use `loading="lazy"` for below-fold images
- **Dimensions**: Always include `width` and `height` attributes

#### CSS:
- **Organization**: Component-based structure
- **Variables**: Use CSS custom properties
- **Performance**: Minimize unused styles

#### JavaScript:
- **Modularity**: Split large functions into smaller ones
- **Performance**: Use `content-visibility` for large lists
- **Accessibility**: Ensure keyboard navigation works

### 7. **SEO & Accessibility Standards**

#### Every Page Must Have:
- [ ] Unique, descriptive title
- [ ] Meta description (150-160 characters)
- [ ] Canonical URL
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Alt text for all images
- [ ] Skip navigation link
- [ ] ARIA labels for interactive elements

#### Game Content Pages Must Have:
- [ ] Breadcrumb navigation
- [ ] Structured data markup
- [ ] Related items section
- [ ] Mobile-optimized layout
- [ ] Search-friendly content

### 8. **Content Update Process**

#### Regular Maintenance:
1. **Weekly**: Check for broken links
2. **Monthly**: Update tier lists and meta
3. **Quarterly**: Review and optimize images
4. **Game Updates**: Add new content within 48 hours

#### Quality Assurance:
- Test on multiple devices and screen sizes
- Validate HTML/CSS/accessibility
- Check loading performance
- Verify all links work correctly

### 9. **Backup & Version Control**

#### Git Workflow:
- **Main branch**: Production-ready code
- **Feature branches**: For new content/features
- **Commit messages**: Descriptive and concise
- **Regular pushes**: Don't let changes pile up

#### Backup Strategy:
- **Daily**: Git commits for any changes
- **Weekly**: Full backup of assets folder
- **Monthly**: Export of complete project

## 🔄 Future Expansion Plans

### Phase 1: Content Growth
- Complete all fruit pages with detailed guides
- Add comprehensive sword and gun databases
- Create interactive tier list tools

### Phase 2: Feature Enhancement
- User accounts and favorites system
- Advanced search with filters
- Community contribution system

### Phase 3: Performance & Scale
- Service Worker for offline access
- CDN implementation for images
- Progressive Web App features

This organization ensures maintainable, scalable, and high-quality content that serves both users and search engines effectively.