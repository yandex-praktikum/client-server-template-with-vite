import bodyParser from 'body-parser';
import type { Express } from 'express';

import Message from './database/tables/Message';
import Thread from './database/tables/Thread';
import User from './database/tables/User';
import { createClientAndConnect } from './db';

const MISSING_BODY_MESSAGE = 'Отсутствует тело запроса';
const MISSING_AUTHOR_MESSAGE = 'Отсутствует автор';

module.exports = function (app: Express) {
  createClientAndConnect();

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  app.get('/getThreads', async (_, res) => {
    Thread.findAll({
      include: [
        {
          model: User,
          association: 'author',
          attributes: { exclude: ['is_night_mode_enabled', 'created_at'] },
        },
      ],
      attributes: { exclude: ['author_id'] },
    }).then(result => {
      res.status(200);
      res.json(result);
    });
  });

  app.get('/getMessagesByThreadId', async (req, res) => {
    const { id } = req.query;

    if (!id) {
      res.status(400);
      res.send('Не указан id треда');
    }

    Message.findAll({
      where: {
        thread_id: id,
      },
      include: [
        {
          model: User,
          association: 'author',
          attributes: { exclude: ['is_night_mode_enabled', 'created_at'] },
        },
      ],
      attributes: { exclude: ['author_id', 'thread_id'] },
    }).then(result => {
      res.status(200);
      res.json(result);
    });
  });

  app.post('/createThread', bodyParser.json(), async (req, res) => {
    try {
      const body = req.body;
      const { user, title, description } = body ?? {};

      if (!body) {
        res.status(400);
        res.send(MISSING_BODY_MESSAGE);
      }

      if (!user) {
        res.status(400);
        res.send(MISSING_AUTHOR_MESSAGE);
      }

      if (!title) {
        res.status(400);
        res.send('Не указана тема треда');
      }

      const [author] = await User.findOrCreate({
        where: { id: user.id },
        defaults: { ...user, is_night_mode_enabled: false },
      });

      await Thread.create({
        title,
        description,
        author_id: author.id,
        created_at: new Date().getTime(),
      });

      res.status(200);
      res.send('Тред успешно создан');
    } catch (err) {
      console.error(err);
    }
  });

  app.post('/createMessage', bodyParser.json(), async (req, res) => {
    try {
      const body = req.body;
      const { user, thread_id, content } = body ?? {};

      if (!body) {
        res.status(400);
        res.send(MISSING_BODY_MESSAGE);
      }

      if (!user) {
        res.status(400);
        res.send(MISSING_AUTHOR_MESSAGE);
      }

      if (!thread_id) {
        res.status(400);
        res.send('Не указан id треда');
      }

      const [author] = await User.findOrCreate({
        where: { id: user.id },
        defaults: { ...user, is_night_mode_enabled: false },
      });

      await Message.create({
        thread_id,
        content,
        author_id: author.id,
        created_at: new Date().getTime(),
      });

      res.status(200);
      res.send('Сообщение успешно создано');
    } catch (err) {
      console.error(err);
    }
  });

  app.get('/getIsNightModeEnabled', async (req, res) => {
    const { id } = req.query;

    if (!id) {
      res.status(400);
      res.send('Не указан id юзера');
    }

    const user = await User.findByPk(`${id}`);

    res.status(200);
    res.json({ isNightModeEnabled: user ? user.is_night_mode_enabled : false });
  });

  app.put('/setIsNightModeEnabled', bodyParser.json(), async (req, res) => {
    try {
      const body = req.body;
      const { user, isNightModeEnabled } = body ?? {};

      if (!body) {
        res.status(400);
        res.send(MISSING_BODY_MESSAGE);
      }

      if (!user) {
        res.status(400);
        res.send(MISSING_AUTHOR_MESSAGE);
      }

      const [userFromDb] = await User.findOrCreate({
        where: { id: user.id },
        defaults: { ...user, is_night_mode_enabled: false },
      });

      userFromDb.set({ is_night_mode_enabled: isNightModeEnabled });
      await userFromDb.save();

      res.status(200);
      res.send('Успешно');
    } catch (err) {
      console.error(err);
    }
  });
};
