# Pritiranjan Mohanty - Portfolio

A modern, responsive portfolio website showcasing my journey as a **Java & Spring Boot Developer** with QA expertise. Built with React, Tailwind CSS, and integrated with a headless CMS backend.

## 🚀 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Mode** - Theme toggle with persistent user preference
- **Blog System** - Dynamic blog posts powered by CMS backend
- **Project Showcase** - Featured projects with demo videos
- **SEO Optimized** - Comprehensive meta tags, robots.txt, structured data
- **Fast Performance** - Optimized builds with Vite
- **Accessible** - WCAG compliant components
- **Modern Stack** - React 19, Vite, React Router v7

## 🛠️ Tech Stack

### Frontend

- **React** 19.2.0 - UI library
- **Vite** 7.3.1 - Build tool & dev server
- **Tailwind CSS** 3.4.19 - Utility-first styling
- **React Router** 7.13.1 - Routing
- **Axios** 1.13.6 - HTTP client
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering

### Development

- **ESLint** 9.39.1 - Code linting
- **PostCSS** & **Autoprefixer** - CSS processing

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/pritiranjan-01/pritiranjandev.git
   cd pritiranjandev
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Update `VITE_API_BASE_URL` in `.env` with your CMS backend URL

4. **Start development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProjectCard.jsx
│   ├── BlogCard.jsx
│   ├── VideoModal.jsx
│   └── ...
├── pages/              # Route pages
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── Blogs.jsx
│   ├── BlogPost.jsx
│   └── ...
├── context/            # React Context
│   └── AppContext.jsx
├── services/           # API integration
│   └── api.js
├── assets/             # Images, videos, data
└── styles/            # Global styles
```

## 🔌 CMS Backend Integration

This portfolio is integrated with a **Blog CMS Backend** (separate repository). It connects via REST APIs to fetch:

- Blog posts with categories
- Project metadata
- Dynamic content management

**Environment Variable:**

```
VITE_API_BASE_URL=https://your-cms-backend-url.com
```

## 📄 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Deploy to Other Platforms

- **Netlify**: Drag & drop `dist/` folder or connect GitHub
- **GitHub Pages**: Configure in repository settings
- **Railway**: Connect GitHub repo and set `npm run build`

## 📱 Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## 🎨 Theming

- **Light Mode**: White background with black text
- **Dark Mode**: Black background with white text
- Theme preference saved in `localStorage`

## ♿ Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliant with WCAG

## 🔒 Security

- Environment variables properly configured
- No sensitive data in version control
- API authentication with JWT tokens
- CORS properly configured

## 📊 Performance Optimizations

- Code splitting with lazy loading
- Image optimization
- Video preload optimization
- Memoized React components
- Efficient CSS with Tailwind

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

- **Email**: pritiranjan.mohanty2003@gmail.com
- **GitHub**: [@pritiranjan-01](https://github.com/pritiranjan-01)
- **LinkedIn**: [Pritiranjan Mohanty](https://linkedin.com/in/pritiranjan-01)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Pritiranjan Mohanty**
