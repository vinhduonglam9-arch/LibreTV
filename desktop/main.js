const { app, BrowserWindow, shell, Menu } = require('electron');
const net = require('net');
const path = require('path');
const http = require('http');
const fs = require('fs');

let mainWindow = null;
let nextServer = null;

const gotSingleInstanceLock = app.requestSingleInstanceLock();
if (!gotSingleInstanceLock) {
  app.quit();
  process.exit(0);
}

function findOpenPort(startPort = 8080) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      resolve(findOpenPort(startPort + 1));
    });
  });
}

async function startNextServer(port) {
  process.env.NODE_ENV = 'production';
  process.env.PORT = String(port);
  process.env.HOST = '127.0.0.1';

  const appDir = path.join(__dirname, '..');

  // 加载 .env 环境变量
  const envPath = path.join(appDir, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const { loadEnvConfig } = require('@next/env');
      loadEnvConfig(appDir);
    } catch (e) {
      console.warn('Load .env failed:', e.message);
    }
  }

  const next = require('next');
  const nextApp = next({ dev: false, dir: appDir });
  await nextApp.prepare();

  const handle = nextApp.getRequestHandler();
  nextServer = http.createServer((req, res) => handle(req, res));

  await new Promise((resolve, reject) => {
    nextServer.listen(port, '127.0.0.1', (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function createWindow() {
  const port = await findOpenPort(8080);
  await startNextServer(port);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 600,
    show: false,
    backgroundColor: '#0F0F0F',
    title: 'LibreTV',
    icon: path.join(__dirname, '..', 'build', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false
    }
  });

  Menu.setApplicationMenu(null);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (nextServer) {
      try {
        nextServer.close();
      } catch (e) {}
      nextServer = null;
    }
  });

  await mainWindow.loadURL(`http://127.0.0.1:${port}`);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
  else if (mainWindow) mainWindow.focus();
});

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});
