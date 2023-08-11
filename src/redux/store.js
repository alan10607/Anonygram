import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';//支持異步
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  // stateReconciler: autoMergeLevel2, // 檢視 'Merge Process' 部分的具體情況
  whitelist: ['user'] // 白名单：只保存 reducer1 和 reducer2 的状态
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)
export default store;

// export default createStore(reducer, applyMiddleware(thunk));
// export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));