import React from 'react';

const WikiColumns = (props) => {
    const { column1, column2 } = props;
    return (
        <div style={styles.container}>
            <div style={styles.column}>
                {column1}
            </div>
            <div style={styles.column}>
                {column2}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '20px',
        backgroundColor: '#f0f0f0',
    },
    column: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '45%',
    }
};

export { WikiColumns };