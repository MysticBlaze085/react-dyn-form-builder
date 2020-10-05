import React from 'react';
import './App.css';

import ExampleFeature from './modules/ExampleFeature/containers/ExampleFeature';
const App = () => {
    return (
        <div className="container h-100 w-100 mt-5">
            <div className="d-flex flex-column justify-content-center">
                <ExampleFeature />
            </div>
        </div>
    );
};

export default App;
