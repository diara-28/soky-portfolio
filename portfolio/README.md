# Chiamaka's Portfolio

Modern, responsive frontend developer portfolio — vanilla HTML, CSS & JavaScript.

## 📁 Folder Structure

```
portfolio/
├── index.html          ← Main page (all sections)
├── css/
│   └── style.css       ← All styles + design system
├── js/
│   └── main.js         ← All interactivity
├── images/
│   └── profile.jpg     ← Add your photo here
└── assets/
    └── Chiamaka_CV.pdf ← Add your CV here
```

## ✏️ How to Customize

### Add your photo
1. Place your photo as `images/profile.jpg`
2. In `index.html`, find `about-avatar-placeholder` and replace with:
   ```html
   <img src="images/profile.jpg" alt="Chiamaka" />
   ```

### Add your CV
1. Place your CV as `assets/Chiamaka_CV.pdf`
2. The "Download CV" button will work automatically.

### Update contact links
Search `index.html` for these placeholders and replace:
- `chiamaka@example.com` → your real email
- `your-handle` → your LinkedIn/Twitter handle
- `your-username` → your GitHub username

### Add a new project
Copy one `<article class="project-card">` block in `index.html`.
- Set `data-tags` for filtering: `"react"`, `"javascript"`, `"css"` (space-separated)
- Replace the gradient color and emoji in `.project-img-placeholder`
- Or add a real screenshot: `<img src="images/project-name.jpg" alt="..." />`
- Update title, description, stack badges, and the two `href="#"` links

### Add a new skill
Copy one `.skill-card` block in the Skills section.
Update the emoji, name, level label, proficiency bar width (e.g. `style="width:85%"`), and the small description.

## 🚀 Deploying

**Netlify (free, recommended):**
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the `portfolio/` folder onto the deploy area
3. Your site is live instantly ✅

**GitHub Pages:**
1. Push the folder to a GitHub repo
2. Go to Settings → Pages → Deploy from branch (main / root)

## 🎨 Changing the Color Theme

All colors live in `css/style.css` under `:root`. The key ones:
- `--accent-indigo: #6366F1` — primary accent (buttons, highlights)
- `--accent-rose: #E2A87B` — secondary warm accent (role text, hearts)
- `--bg-primary: #0A0F1E` — dark background
