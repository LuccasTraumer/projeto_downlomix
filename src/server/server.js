const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.get('/downloadmp3', async (req, res, next) => {
  try {
    var url = req.query.url;

    let title = 'audio';

    if(!ytdl.validateURL(url)) {
      return res.sendStatus(400);
    }

    await ytdl.getInfo(url).then(res => {
      title = res.videoDetails.title;
    });

    await ytdl.getBasicInfo(url, {
      format: 'mp4'
    }, (err, info) => {
      if (err) throw err;
      title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });

    console.warn(title);
    res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
    ytdl(url, {
      format: 'mp3',
      filter: 'audioonly',
    }).pipe(res);

  } catch (err) {
    console.error(err);
  }
});

app.get('/downloadmp4', async (req, res, next) => {
  try {
    let url = req.query.url;
    let resolution = req.query.resolution;

    let title = 'video';

    if(!ytdl.validateURL(url)) {
      return res.sendStatus(400);
    }

    await ytdl.getInfo(url).then(res => {
      title = res.videoDetails.title;
    });

    await ytdl.getBasicInfo(url, {
      format: 'mp4'
    }, (err, info) => {
      if (err) throw err;
      title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });

    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    ytdl(url, {
      format: 'mp4',
      filter: 'videoandaudio'
    }).pipe(res);

  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});