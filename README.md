# 🌍 Radio Browser

A modern web application for discovering and streaming radio stations worldwide.

![Demo Screenshot](screenshot-1.pnghttps://raw.githubusercontent.com/habitual69/radioBrow/refs/heads/main/screenshot-1.png)  
*(Consider adding an actual screenshot here)*

## ✨ Key Features

- **Global Radio Discovery**  
  Browse thousands of radio stations from every corner of the world
- **Smart Search**  
  Find stations by name, genre, country, or language
- **Personal Collection**  
  Save and organize your favorite stations
- **Instant Playback**  
  Stream directly in your browser with one-click play
- **Rich Station Details**  
  View comprehensive information including bitrate, format, and popularity
- **Responsive Experience**  
  Fully optimized for desktop, tablet, and mobile devices

## 🛠 Technology Stack

| Frontend       | Build Tool | API           | Deployment |
|----------------|------------|---------------|------------|
| React 18       | Vite 4     | Radio Browser | Vercel     |
| SCSS Modules   | Vitest     | Axios Client  | Netlify    |
| React Router   | ESLint     |               |            |

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm v8+ or yarn

### Installation
```bash
git clone https://github.com/habitual69/radioBrow.git
cd radioBrow
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:3000 in your browser

### Production Build
```bash
npm run build
```
Output will be in the `/dist` directory

## 🌐 Deployment

This project is pre-configured for seamless deployment:

1. **Vercel**  
   Connect your GitHub repository for automatic deployments
2. **Netlify**  
   Drag-and-drop your `dist` folder
3. **Static Hosting**  
   Works with any static file server

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📚 API Documentation

This application uses the free [Radio Browser API](https://www.radio-browser.info/):

- Rate limit: 1 request/second
- Endpoints used:
  - `/stations/search`
  - `/stations/bycountry`
  - `/stations/bylanguage`
  - `/tags`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📜 License

MIT License - See [LICENSE](LICENSE) for full text.

## 🙏 Acknowledgments

- [Radio Browser API](https://www.radio-browser.info/) for their comprehensive radio database
- The React community for amazing open-source tools
- All our contributors and users

💡 **Tip**: For the best experience, use Chrome or Firefox with Web Audio API support.
