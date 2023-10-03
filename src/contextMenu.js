import { extensionApiService } from './shared/ExtensionApiService';

// Blure
const blurSecretDataJira = (info, tab) => {
  extensionApiService.sendMessageToTab(tab.id, { blurSensitive: info.checked });
};

const createContextMenu = tabId => {
  extensionApiService.removeAllContextMenus(() => {
    extensionApiService.sendMessageToTab(tabId, { getBlurSensitive: true }, response => {
      if (response && Object.prototype.hasOwnProperty.call(response, 'blurSensitive')) {
        const checked = response.blurSensitive;
        extensionApiService.createContextMenu({
          title: 'Blur secret data',
          type: 'checkbox',
          checked,
          onclick: blurSecretDataJira,
        });
      }
    });
  });
};

// eslint-disable-next-line func-names
extensionApiService.tabsQuery({ active: true, currentWindow: true }, function(tabs) {
  const tab = tabs[0];
  // Board JIRA
  if (!/rapidView=(\d*)/im.test(tab.url)) {
    return;
  }

  extensionApiService.onTabsUpdated((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
      createContextMenu(tabId);
    }
  });

  extensionApiService.onTabsActivated(activeInfo => {
    createContextMenu(activeInfo.tabId);
  });
});
