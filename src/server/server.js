const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors())

app.post('/download', async (req, res) => {
  try {
    const mediaURL = req.body.videoUrl;
    if (!mediaURL) {
      return res.status(400).json({ error: 'URL do vídeo não fornecida' });
    }
  
    console.log(`Iniciando o download de ${mediaURL}`);

    let title = '';
    await ytdl.getInfo(mediaURL).then(res => {
      title = res.videoDetails.title;
    });

    res.setHeader('Content-Disposition', `attachment; filename="${title}.${isAudio ? `mp3` : `mp4`}"`);

    const isAudio = !req.body.isVideo;
      // Música e video
    if(isAudio) {
      ytdl(mediaURL, {
        format: 'mp3',
        filter: 'audioonly',
      }).pipe(res);
    } else {
      ytdl(mediaURL, {
        quality: 'highestvideo',
        format: 'mp4',
        filter: 'videoandaudio'
      }).pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro no servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});