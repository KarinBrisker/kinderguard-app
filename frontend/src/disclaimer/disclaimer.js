import React from 'react';
import { styles } from "./styles";
import { InfoButtonWithModal } from "../infoButtonWithModal/InfoButtonWithModal";

const Disclaimer = () => {
    const buttonTitle = 'Disclaimer';
    const modalTitle = (<h1>Please read and understand the information provided before using our tool</h1>);
    const modalContent = (
        <div style={styles.textContainer}>
            <p style={styles.text}>
                <div>
                    <strong>The recordings uploaded using this tool can be accessed by anyone that has your account id and video id. Please take it into account.</strong>
                </div>
                <div>
                    This tool is experimental and is designed to assist in the analysis of
                    audio files from child care environments to help detect potential abuse. It is not a substitute for
                    professional judgment and should not be relied upon as the sole basis for any decision-making. The tool
                    may produce false positives or false negatives, and its results should be interpreted with caution.
                    Always consult with qualified professionals when dealing with sensitive and potentially harmful
                    situations.
                </div>
            </p>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.iconContainer}>
            </div>
            <div style={styles.textContainer}>
                <p style={styles.text}>
                    <InfoButtonWithModal buttonTitle={buttonTitle} modalTitle={modalTitle} modalContent={modalContent} closeButtonTitle='I Understand'/>
                </p>
            </div>
        </div>
    );
};


export { Disclaimer };