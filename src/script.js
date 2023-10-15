let isVideo = false;
const serverURL = 'http://localhost:3000';

function selectype(event){
    isVideo = event.target.value === "mp4";
    const quality = document.querySelector("#quality");
    quality.classList.add(isVideo ? "block":"none");
    quality.classList.remove(isVideo ? "none":"block");
}

() => {
    const quality = document.querySelector("#quality");
    quality.classList.add(isVideo ? "block":"none");
}

async function downloadMedia() {
    const mediaURLYT = document.getElementById('videoUrl').value;
    const typeFile = document.querySelector("#typeDownload").value;

    if (typeFile === 'mp3') {
        await fetch(`${serverURL}/downloadmp3?url=${mediaURLYT}`)
            .then(res => {
                var a = document.createElement('a');
                a.href = `${serverURL}/downloadmp3?url=${mediaURLYT}`;
                a.setAttribute('download', '');
                a.click();
            }).catch(error => {
                alert("Invalid url", error);
            });
    } else {
        const resolutionVideo = quality.value;
        await fetch(`${serverURL}/downloadmp4?url=${mediaURLYT}&resolution=${resolutionVideo}`)
            .then(res => {
                var a = document.createElement('a');
                a.href = `${serverURL}/downloadmp4?url=${mediaURLYT}&resolution=${resolutionVideo}`;
                a.setAttribute('download', '');
                a.click();
            }).catch(error => {
                alert('Invalid url', error);
            });
    }
}