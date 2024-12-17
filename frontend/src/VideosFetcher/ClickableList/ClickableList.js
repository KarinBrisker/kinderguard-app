import React from 'react';
import { MDBBtn } from "mdb-react-ui-kit";


const ClickableList = (props) => {
    const { videos, onClickItem, onDeleteVideo } = props;
    const handleClick = (id) => {
        console.log(`Clicked ID: ${id}`);
        onClickItem(id)
    };

    const handleDeleteClick = (e, videoId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this video from video indexer?");
        if (userConfirmed) {
            onDeleteVideo(videoId);
        }
        e.stopPropagation();
    }

    return (
        <ul style={styles.list}>Choose from existing videos:
            {videos.map((video) => (
                <li key={video.id} style={styles.listItem} onClick={() => handleClick(video.id)}>
                    <div>Id: {video.id}</div>
                    <div>Name: {video?.name}</div>
                    <div>State: {video?.state}</div>
                    <div>Timestamp: {video?.created}</div>
                    <MDBBtn size='lg'
                            type='button'
                            outline
                            color="danger"
                            rounded
                            target='_blank'
                            onClick={(e) => handleDeleteClick(e, video.id)}>Delete</MDBBtn>
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