export function EmbedContainer(data) { 

    const getPlayerUrl = () => {
      return `https://www.videoindexer.ai/embed/player/${data.accountId}/${data.videoId}?location=${data.location}`;
    };

    const getInsightsUrl = () => {
        return `https://www.videoindexer.ai/embed/insights/${data.accountId}/${data.videoId}?location=${data.location}`;
      };

    return (
      <div>
         <iframe title="insights" width="580" height="780" src={getInsightsUrl()} frameborder="0" allowfullscreen></iframe>
         <iframe title= "player" width="580" height="780" src={getPlayerUrl()} frameborder="0" allowfullscreen></iframe>
      </div>
    );
  }