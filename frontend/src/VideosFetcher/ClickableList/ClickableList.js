import React from 'react';

const ClickableList = (props) => {
    const { videos, onClickItem } = props;
    const handleClick = (id) => {
        console.log(`Clicked ID: ${id}`);
        onClickItem(id)
    };

    return (
        <ul style={styles.list}>Choose from existing videos:
            {videos.map((video) => (
                <li key={video.id} style={styles.listItem} onClick={() => handleClick(video.id)}>
                    <div>Id: {video.id}</div>
                    <div>Name: {video?.name}</div>
                    <div>State: {video?.state}</div>
                    <div>Timestamp: {video?.created}</div>
                </li>
            ))}
        </ul>
    );
};

const styles = {
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        fontFamily: 'Arial, sans-serif',
    },
    listItem: {
        padding: '10px',
        margin: '5px 0',
        backgroundColor: '#007bff',
        color: '#ffffff',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
    }
};

export { ClickableList };