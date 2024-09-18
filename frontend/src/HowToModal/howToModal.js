import React from 'react';
import { WikiAzurePortal } from "./wikiAzurePortal";
import { WikiAPIManagementPortal } from "./wikiAPIManagementPortal";
import { WikiColumns } from "./wikiColumns";
import { InfoButtonWithModal } from "../infoButtonWithModal/InfoButtonWithModal";

const HowToModal = () => {
    const wikiAzurePortal = <WikiAzurePortal/>;
    const wikiAPIManagementPortal = <WikiAPIManagementPortal/>;
    const buttonTitle = 'ℹ️ How to get credentials';
    const modalTitle = 'How to get credentials'
    const modalContent = (
        <div>
            <p>There are two main ways to get credentials:</p>
            <WikiColumns column1={wikiAzurePortal} column2={wikiAPIManagementPortal}/>
        </div>
    );

    return (<InfoButtonWithModal buttonTitle={buttonTitle} modalTitle={modalTitle} modalContent={modalContent}/>)
};


export { HowToModal };