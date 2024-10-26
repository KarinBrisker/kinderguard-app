import React from 'react';
import PropTypes from 'prop-types';

const WikiColumns = ({ column1, column2 }) => {
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

// Define styles with responsive design in mind
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        gap: '20px', // Adds space between columns
        flexWrap: 'wrap', // Allows columns to stack on smaller screens
    },
    column: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '45%',
        minWidth: '400px', // Ensures readability on smaller screens
    },
};

// PropTypes for type-checking props
WikiColumns.propTypes = {
    column1: PropTypes.node.isRequired,
    column2: PropTypes.node.isRequired,
};

export { WikiColumns };