export const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    button: {
        padding: '5px 10px',
        fontSize: '0.8em',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#0b1e6c',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: '1.2em',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#ffffff',
        color: 'black',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    modalTitle: {
        margin: '0 0 10px 0',
    },
    modalContent: {
        margin: '0 0 20px 0',
    },
    closeButton: {
        padding: '10px 20px',
        fontSize: '1em',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#dc3545',
        color: '#ffffff',
        cursor: 'pointer',
    }
};