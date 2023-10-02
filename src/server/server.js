const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/download', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    if (!videoUrl) {
      return res.status(400).json({ error: 'URL do vídeo não fornecida' });
    }
  
    console.log(`Iniciando o download de ${videoUrl}`);

    const info = await ytdl.getInfo(videoUrl);
    const videoStream = ytdl(videoUrl, { quality: 'highestvideo' });

    res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');

    videoStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro no servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});