// server-production.ts - Production server for Vercel deployment
// This file is used for local production testing, not for Vercel deployment
// Vercel will use the Next.js standalone output

import { setupSocket } from '@/lib/socket';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

// Custom server with Socket.IO integration for local production testing
async function createCustomServer() {
  try {
    // Create Next.js app
    const nextApp = next({ 
      dev,
      dir: process.cwd(),
      conf: { 
        distDir: './.next',
        // Disable experimental features that might cause issues in production
        experimental: {
          optimizeCss: true,
        }
      }
    });

    await nextApp.prepare();
    const handle = nextApp.getRequestHandler();

    // Create HTTP server that will handle both Next.js and Socket.IO
    const server = createServer((req, res) => {
      // Skip socket.io requests from Next.js handler
      if (req.url?.startsWith('/api/socketio')) {
        return;
      }
      handle(req, res);
    });

    // Setup Socket.IO
    const io = new Server(server, {
      path: '/api/socketio',
      cors: {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ["http://localhost:3000"],
        methods: ["GET", "POST"]
      },
      transports: ['websocket', 'polling']
    });

    setupSocket(io);

    // Start the server
    server.listen(Number(port), hostname, () => {
      console.log(`> Production server ready on http://${hostname}:${port}`);
      console.log(`> Socket.IO server running at ws://${hostname}:${port}/api/socketio`);
    });

  } catch (err) {
    console.error('Production server startup error:', err);
    process.exit(1);
  }
}

// Only start the server if this file is run directly
if (require.main === module) {
  createCustomServer();
}

export default createCustomServer;