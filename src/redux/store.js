import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';//支持異步
import reducer from './reducers';

// export default createStore(reducer, applyMiddleware(thunk));
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));