export function EmbedContainer(data) { 

    const getPlayerUrl = () => {
      return `https://www.videoindexer.ai/embed/player/${data.accountId}/${data.videoId}?location=${data.location}`;
    };

    const getInsightsUrl = () => {
        return `https://www.videoindexer.ai/embed/insights/${data.accountId}/${data.videoId}?location=${data.location}`;
      };

      // Jump to specific time from message payload
      const notifyWidgets = (evt) => {
        if (!evt) {
            return;
        }
        var origin = evt.origin || evt.originalEvent.origin;

        // Validate that event comes from video indexer domain.
        if ((origin.indexOf(".videoindexer.ai") !== -1 || origin.indexOf("videoindexer.ai.azure.us") !== -1) ) {

            // Pass message to other iframe.
            if ('postMessage' in window) {
                var iframes = window.document.getElementsByTagName('iframe');
                try {
                    for (var index = 0; index < iframes.length; index++) {
                        iframes[index].contentWindow.postMessage(evt.data, origin);
                    }
                } catch (error) {
                    throw error;
                }
            }
        }
      }

    // Listen to message events from breakdown iframes
    window.addEventListener("message", notifyWidgets, false);

    return (
      <div>
         <iframe title="insights" width="580" height="780" src={getInsightsUrl()} frameborder="0" allowfullscreen></iframe>
         <iframe title= "player" width="580" height="780" src={getPlayerUrl()} frameborder="0" allowfullscreen></iframe>
      </div>
    );
  }