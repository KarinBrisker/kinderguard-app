import React from 'react';

const ClickableList = (props) => {
    const { ids, onClickItem } = props;
    const handleClick = (id) => {
        console.log(`Clicked ID: ${id}`);
        onClickItem(id)
    };

    return (
        <ul style={styles.list}>
            {ids.map((id) => (
                <li key={id} style={styles.listItem} onClick={() => handleClick(id)}>
                    {id}
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