import * as React from 'react';

const Value = (props) => {
    const { value } = props;
    return (
        <div style={styles.main}>
            <h3 style={{ color: '#389926' }}>Values</h3>
            <pre style={styles.text}>{JSON.stringify(value, null, 2)}</pre>
        </div>
    );
};

const styles = {
    main: {
        border: '1px solid #ccc',
        backgroundColor: '#000',
        borderRadius: '4px',
        width: '80%',
        marginLeft: '7%',
        marginTop: '20px',
        padding: '10px 20px',
        textAlign: 'left' as any,
    },
    text: {
        color: '#DDE1DC',
        fontSize: '18px',
        lineHeight: '30px',
    },
};

export default Value;