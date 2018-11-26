const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const createLogger = require('redux-logger').createLogger
const {
  localStorageMiddleware,
} = require('./reduxMiddlewares')
const rootReducer = require('./reducers')

global.METAMASK_DEBUG = process.env.METAMASK_DEBUG

module.exports = configureStore

const loggerMiddleware = createLogger({
  predicate: () => global.METAMASK_DEBUG,
})

const middlewares = [localStorageMiddleware, thunkMiddleware, loggerMiddleware]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
