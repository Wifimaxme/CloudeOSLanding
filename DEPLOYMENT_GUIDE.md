# Промпт для Gemini: Развертывание React/Vite приложения на GitHub Pages

## Контекст проекта
Я разрабатываю лендинг на React + TypeScript + Vite. Название репозитория: CloudeOSLanding. Нужно настроить автоматическое развертывание на GitHub Pages.

## Важные требования к коду и конфигурации

### 1. package.json
**КРИТИЧНО:** Добавь все необходимые зависимости и скрипты:

```json
{
  "name": "cloudeos-landing-page",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit",
    "clean": "rm -rf dist",
    "predeploy": "npm run clean && npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3"
    // другие зависимости проекта
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "gh-pages": "^6.3.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

**ВАЖНО:** Обязательно включи `@types/react` и `@types/react-dom` - без них CI/CD падает!

### 2. vite.config.ts
**КРИТИЧНО:** Правильно настрой base path для GitHub Pages:

```typescript
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Для GitHub Pages обязательно используй имя репозитория в base path
  const isProduction = mode === 'production' || process.env.NODE_ENV === 'production';
  const base = isProduction ? '/CloudeOSLanding/' : '/';
  
  console.log(`Vite config: mode=${mode}, NODE_ENV=${process.env.NODE_ENV}, base=${base}`);
  
  return {
    base, // ЭТО ОБЯЗАТЕЛЬНО! Без этого будет черный экран
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
```

### 3. index.html
**КРИТИЧНО:** НЕ используй import maps! Добавь правильную точку входа:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CloudeOS</title>
    <!-- НЕ ДОБАВЛЯЙ <script type="importmap">! Это ломает сборку -->
    <script type="module" src="/index.tsx"></script>
  </head>
  <body>
    <!-- Скрипт для SPA routing на GitHub Pages -->
    <script type="text/javascript">
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
    <div id="root"></div>
  </body>
</html>
```

### 4. tsconfig.json
Правильная конфигурация TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "types": ["node"],
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "strict": false,
    "paths": {
      "@/*": ["./*"]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

### 5. public/404.html
**КРИТИЧНО:** Создай этот файл для SPA routing на GitHub Pages:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CloudeOS</title>
    <script type="text/javascript">
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
      }
      .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 4px solid white;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 20px auto;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div>
      <div class="spinner"></div>
      <div>Загрузка...</div>
    </div>
    <script type="text/javascript">
      var segmentCount = 2;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </body>
</html>
```

### 6. .github/workflows/deploy.yml
**КРИТИЧНО:** Правильная настройка CI/CD:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          # НЕ ИСПОЛЬЗУЙ cache: 'npm' - это вызывает проблемы с Rollup!

      - name: Install dependencies
        run: |
          set -e
          echo "Installing dependencies..."
          echo "Node version: $(node --version)"
          echo "NPM version: $(npm --version)"
          # Удаляем для чистой установки - исправляет ошибку Rollup
          rm -rf package-lock.json node_modules
          # npm install корректно устанавливает optional dependencies
          npm install
          echo "Dependencies installed successfully"

      - name: Build
        run: |
          set -e
          echo "Starting build..."
          npm run build || (echo "Build failed!" && exit 1)
          echo "Build completed successfully"
          ls -la dist/
        env:
          NODE_ENV: production
          GITHUB_ACTIONS: true

      - name: Copy 404.html
        run: |
          if [ -f public/404.html ]; then
            cp public/404.html dist/404.html
          fi

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 7. .gitignore
```
# Dependencies
node_modules

# Build
dist
dist-ssr

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store

# Optional npm cache
.npm

# Lock files (будут пересоздаваться)
package-lock.json
```

## Типичные ошибки и их решения

### ❌ Черный экран на GitHub Pages
**Причина:** Не настроен `base` в `vite.config.ts`
**Решение:** Добавь `base: '/CloudeOSLanding/'` для продакшена

### ❌ Error: Cannot find module @rollup/rollup-linux-x64-gnu
**Причина:** Проблема npm с optional dependencies
**Решение:** 
- Удали `cache: 'npm'` из workflow
- Используй `npm install` вместо `npm ci`
- Удаляй `package-lock.json` и `node_modules` перед установкой

### ❌ Build fails with TypeScript errors
**Причина:** Отсутствуют `@types/react` и `@types/react-dom`
**Решение:** Добавь их в `devDependencies`

### ❌ 404 при переходе по прямым ссылкам
**Причина:** Нет файла `public/404.html`
**Решение:** Создай файл с SPA routing скриптом

## Инструкции для коммита

```bash
# 1. Создай все файлы конфигурации
# 2. Закоммить изменения
git add .
git commit -m "feat: настройка развертывания на GitHub Pages"
git push origin main

# 3. В настройках GitHub репозитория:
#    Settings → Pages → Source: GitHub Actions
```

## Проверка развертывания

1. Перейди в раздел **Actions** репозитория
2. Дождись завершения workflow (2-3 минуты)
3. Сайт будет доступен по адресу: `https://username.github.io/CloudeOSLanding/`

## Чеклист перед коммитом

- [ ] В `package.json` есть `@types/react` и `@types/react-dom`
- [ ] В `vite.config.ts` настроен правильный `base` path
- [ ] В `index.html` НЕТ `<script type="importmap">`
- [ ] В `index.html` ЕСТЬ `<script type="module" src="/index.tsx"></script>`
- [ ] Создан файл `public/404.html`
- [ ] Создан `.github/workflows/deploy.yml`
- [ ] В workflow НЕТ `cache: 'npm'`
- [ ] В workflow используется `npm install`, не `npm ci`
- [ ] Локально сборка проходит: `npm run build`

## Важные замечания

1. **ВСЕГДА** удаляй `import maps` из HTML - они несовместимы со сборкой Vite
2. **ВСЕГДА** указывай правильный base path с именем репозитория
3. **ВСЕГДА** включай TypeScript типы для React в devDependencies
4. **НИКОГДА** не используй `npm ci` в GitHub Actions для Vite проектов - это вызывает проблемы с Rollup
5. **НИКОГДА** не используй кеширование npm в workflow - оно ломает optional dependencies

