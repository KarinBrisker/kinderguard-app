export const styles = {
    container: {
      /* Main container styling with padding and shadow */
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#ffcc00', /* Yellow background */
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '20px auto',
    },
    iconContainer: {
      /* Spacing to the right of the icon */
      marginRight: '10px',
    },
    warningIcon: {
      /* Red color for the warning icon */
      fontSize: '1.5em',
      color: '#d9534f',
    },
    textContainer: {
      /* Flex property to fill remaining space */
      flex: 1,
    },
    text: {
      /* Basic text styling */
      margin: 0,
      fontSize: '1em',
      color: '#333333',
    },
    closeContainer: {
      /* Close button styling with cursor pointer */
      marginLeft: '10px',
      cursor: 'pointer',
    },
    closeIcon: {
      /* Close icon color */
      fontSize: '1.5em',
      color: '#333333',
    }
  };