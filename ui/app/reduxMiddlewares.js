const {
  loadLocalStorageData,
  saveLocalStorageData,
} = require('../lib/local-storage-helpers')
const {
  getSelectedAccount,
} = require('./selectors')

export const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === 'UPDATE_METAMASK_STATE') {
    const accounts = action.value.accounts
    const cachedAccounts = loadLocalStorageData('accounts')
    const accountsToCache = { ...cachedAccounts }
    Object.keys(accounts).forEach(accountID => {
      const account = accounts[accountID]
      if (account.balance !== null) {
        accountsToCache[accountID] = account
      }
    })
    saveLocalStorageData(accountsToCache, `accounts`)
  }
  return next(action);
}
