import React from 'react';
import { WikiAzurePortal } from "./wikiAzurePortal";
import { WikiAPIManagementPortal } from "./wikiAPIManagementPortal";
import { WikiColumns } from "./wikiColumns";
import { InfoButtonWithModal } from "../infoButtonWithModal/InfoButtonWithModal";


const titleStyle = {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#0a4275',
    textAlign: 'center',
    marginBottom: '20px'
};

// HowToModal Component: Displays an informational modal about obtaining credentials
const HowToModal = () => {
    // Reusable components for Azure and API Management credential instructions
    const wikiAzurePortal = <WikiAzurePortal />;
    const wikiAPIManagementPortal = <WikiAPIManagementPortal />;
    
    // Configuration for the Info button and modal titles
    const buttonTitle = 'How to Get Credentials';

    // Content to be displayed inside the modal, organized into columns
    const modalContent = (
        
        <div>
            <h2 style={titleStyle}>There are two main ways to get credentials</h2>
            <WikiColumns column1={wikiAzurePortal} column2={wikiAPIManagementPortal} />
        </div>
    );

    // Render the Info button with the modal component
    return (
        <InfoButtonWithModal
            buttonTitle={buttonTitle}
            modalContent={modalContent}
        />
    );
};

export { HowToModal };