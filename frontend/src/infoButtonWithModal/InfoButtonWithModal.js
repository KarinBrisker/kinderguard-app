import React, { useEffect, useState } from 'react';
import { styles } from "./styles";

const InfoButtonWithModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { buttonTitle, modalTitle, modalContent } = props;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);


    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleOpenModal}>
                <span style={styles.icon}>{buttonTitle}</span>
            </button>
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2 style={styles.modalTitle}>{modalTitle}</h2>
                        <div styles={styles.modalContent}>
                            {modalContent}
                        </div>
                        <button style={styles.closeButton} onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};


export { InfoButtonWithModal };