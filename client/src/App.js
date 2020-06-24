import React from 'react';
import {Route, Link} from 'react-router-dom'
import HomePage from './components/HomePage'

function App() {
    return (
        <div>
            <main>
                <Route exact path="/" component={HomePage}/>
            </main>
        </div>
    );
}

export default App;
