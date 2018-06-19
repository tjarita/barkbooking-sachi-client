import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './scenes/Home'
import registerServiceWorker from './registerServiceWorker';

import fontawesome from '@fortawesome/fontawesome';
import fas from '@fortawesome/fontawesome-pro-solid';

fontawesome.library.add(fas);
ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
