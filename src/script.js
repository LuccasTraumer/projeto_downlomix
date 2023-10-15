let isVideo = false

function selectype(event){
    console.log(event.target.value)
    isVideo = event.target.value === "mp4"
    const quality = document.querySelector("#quality")
    quality.classList.add(isVideo ? "block":"none")
    quality.classList.remove(isVideo ? "none":"block")
}


document.addEventListener('DOMContentLoaded', function () {
    const quality = document.querySelector("#quality").classList.add(isVideo ? "block":"none")

    const downloadButton = document.getElementById('downloadButton');
    const videoUrlInput = document.getElementById('videoUrl');
    const resultDiv = document.getElementById('result');

    const typeFile = document.querySelector("#typeDownload").value;
    console.log(typeFile)

    downloadButton.addEventListener('click', () => {
        const videoUrl = videoUrlInput.value;
        if (videoUrl.trim() === '') {
            alert("Por favor, insira uma URL válida.");
            return;
        }

        fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoUrl, isVideo }),
        })
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                // throw new Error('Erro ao fazer o download do vídeo.');
                alert("Erro ao fazer o download do vídeo.")
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', ``);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                resultDiv.textContent = `Erro: ${error.message}`;
            });
    });
});