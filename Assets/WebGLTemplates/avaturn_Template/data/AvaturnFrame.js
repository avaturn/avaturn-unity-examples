function setupIframe(link) {
    document.getElementById("avaturn-iframe").src = link;

    window.addEventListener("message", subscribe);
    document.addEventListener("message", subscribe);

    function subscribe(event) {
        /* Here we process the events from the iframe */
        const json = parse(event);

        if (gameInstance == null ||
            json?.source !== "avaturn" ||
            json?.eventName == null) {
            return;
        }

        // Get avatar GLB URL
        if (json.eventName === 'v2.avatar.exported') {
            
            let data = json.data;
            let url;
            if(data.urlType == 'dataURL') {
                url = window.URL.createObjectURL(dataURItoBlob(data.url));
            } else if (data.urlType == 'httpURL'){
                url = data.url;
            } else { 
                console.log("error, wrong url type " + data.urlType);
                url = 'error';
            }
            console.log(`Avatar URL: ${url}`);
            gameInstance.SendMessage(
                "AvatarReceiver",
                "ReceiveAvatarLink",
                url
            );
            
            iframeContainer.style.display = "none";
        }
    }

    function parse(event) {
        try {
            return JSON.parse(event.data);
        } catch (error) {
            return null;
        }
    }

    function dataURItoBlob(dataURI) {
        let mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mime
        });
    }
}

function displayIframe() {
    console.log("Display");
    iframeContainer.style.display = "block";
}

function hideIframe() {
    console.log("Hide");
    iframeContainer.style.display = "none";
}