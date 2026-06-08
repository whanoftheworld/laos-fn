import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { Server as SocketIOServer } from 'socket.io';
import { z } from 'zod';

const PORT = Number(process.env.PORT ?? 8080);

const app = Fastify({
  logger: {
    transport: { target: 'pino-pretty', options: { translateTime: 'HH:MM:ss Z' } },
  },
});

await app.register(cors, { origin: true });
await app.register(rateLimit, { max: 120, timeWindow: '1 minute' });

app.get('/health', () => ({ status: 'ok', service: 'laos-finance-api', ts: Date.now() }));

app.get('/api/results', async () => ({ data: [] }));

const chatMessageSchema = z.object({
  userName: z.string().min(1).max(40),
  message: z.string().min(1).max(200),
});

app.post('/api/chat/post', async (req, reply) => {
  const parsed = chatMessageSchema.safeParse(req.body);
  if (!parsed.success) return reply.code(400).send({ error: 'invalid input' });
  return { ok: true, id: `c-${Date.now()}`, ...parsed.data };
});

await app.listen({ port: PORT, host: '0.0.0.0' });

const io = new SocketIOServer(app.server, {
  cors: { origin: '*' },
  path: '/socket.io',
});

io.on('connection', (socket) => {
  socket.on('chat:join', (room: string) => socket.join(room));
  socket.on('chat:message', (room: string, msg: unknown) => {
    const parsed = chatMessageSchema.safeParse(msg);
    if (!parsed.success) return;
    io.to(room).emit('chat:message', {
      id: `c-${Date.now()}`,
      ...parsed.data,
      postedAt: new Date().toISOString(),
    });
  });
});

app.log.info(`LAOS-Finance API + Socket.IO listening on :${PORT}`);
