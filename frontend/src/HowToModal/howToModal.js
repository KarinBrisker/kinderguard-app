import React, { useEffect, useState } from 'react';
import { styles } from "./howToModalStyles";
import { WikiAzurePortal } from "./wikiAzurePortal";
import { WikiAPIManagementPortal } from "./wikiAPIManagementPortal";
import { WikiColumns } from "./wikiColumns";

const InfoButtonWithModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const wikiAzurePortal = <WikiAzurePortal/>;
    const wikiAPIManagementPortal = <WikiAPIManagementPortal/>;

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleOpenModal}>
                <span style={styles.icon}>ℹ️ How to get credentials</span>
            </button>
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2 style={styles.modalTitle}>How to get credentials</h2>
                        <div>
                            <p style={styles.modalContent}>There are two main ways to get credentials:</p>
                            <WikiColumns column1={wikiAzurePortal} column2={wikiAPIManagementPortal}/>
                        </div>
                        <button style={styles.closeButton} onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};


export { InfoButtonWithModal };