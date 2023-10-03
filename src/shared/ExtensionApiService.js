/* global browser */

class ExtensionApiService {
  constructor() {
    this.extensionAPI = window.chrome || window.browser;

    if (!this.extensionAPI && typeof browser !== 'undefined') {
      this.extensionAPI = browser;
    }
  }

  isFirefox() {
    return window.navigator.userAgent.includes('Firefox');
  }

  getUrl(resource) {
    return this.extensionAPI.runtime.getURL(resource);
  }

  onMessage(cb) {
    return this.extensionAPI.runtime.onMessage.addListener(cb);
  }

  onTabsUpdated(cb) {
    return this.extensionAPI.tabs.onUpdated.addListener(cb);
  }

  onTabsActivated(cb) {
    return this.extensionAPI.tabs.onActivated.addListener(cb);
  }

  tabsQuery(options, cb) {
    return this.extensionAPI.tabs.query(options, cb);
  }

  tabsExecuteScript(tabId, details) {
    return this.extensionAPI.tabs.executeScript(tabId, details);
  }

  sendMessageToTab(tabId, message, response) {
    if (this.isFirefox()) {
      return this.extensionAPI.tabs.sendMessage(tabId, message).then(response);
    }
    return this.extensionAPI.tabs.sendMessage(tabId, message, response);
  }

  reload() {
    this.extensionAPI.runtime.reload();
  }

  bgRequest(action) {
    return new Promise(resolve => {
      this.extensionAPI.runtime.sendMessage(action, response => {
        resolve(response);
      });
    });
  }

  updateStorageValue(key, value) {
    return new Promise(resolve => {
      this.extensionAPI.storage.local.set({ [key]: value }, () => resolve());
    });
  }

  fetchStorageValueByKey(key) {
    return new Promise((resolve, reject) => {
      this.extensionAPI.storage.local.get([key], result =>
        result[key] ? resolve(result[key]) : reject(Error('Not found the key in the storage of browser'))
      );
    });
  }

  createContextMenu(config) {
    return this.extensionAPI.contextMenus.create(config);
  }

  removeAllContextMenus(cb) {
    return this.extensionAPI.contextMenus.removeAll(cb);
  }
}

export const extensionApiService = new ExtensionApiService();
