import { types } from './actions';
import { extensionApiService } from '../shared/ExtensionApiService';

const regexpBoardUrl = /rapidView=(\d*)/im;
const regexpBoardSettingsTabUrl = /tab=/im;
const regexpChartControlChart = /chart=controlChart/im;

// FOR ROATING OF TAB
extensionApiService.onTabsUpdated(async (tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    const isScopeControlChart = await extensionApiService.checkTabURLByPattern(tabId, regexpChartControlChart);
    if (isScopeControlChart) {
      extensionApiService.sendMessageToTab(
        tabId,
        {
          type: types.TAB_URL_CHANGE,
          url: isScopeControlChart.url,
        },
        response => {
          // eslint-disable-next-line no-console
          console.log(response?.message);
        }
      );
    }
  }

  if (changeInfo.url == null) return;
  if (regexpBoardUrl.test(changeInfo.url) && regexpBoardSettingsTabUrl.test(changeInfo.url)) {
    extensionApiService.sendMessageToTab(
      tabId,
      {
        type: types.TAB_URL_CHANGE,
        url: changeInfo.url,
      },
      response => {
        // eslint-disable-next-line no-console
        console.log(response?.message);
      }
    );
  }
});

extensionApiService.addContextMenuListener(async (info, tab) => {
  const isScope = await extensionApiService.checkTabURLByPattern(tab.id, regexpBoardUrl);
  if (isScope) {
    extensionApiService.sendMessageToTab(tab.id, { blurSensitive: info.checked });
  }
});

const createContextMenuItem = isBlurSensitive => {
  extensionApiService.createContextMenu({
    title: 'Blur secret data',
    type: 'checkbox',
    id: 'checkbox',
    checked: isBlurSensitive,
    contexts: ['page'],
  });
};

export const createContextMenu = (tabId, changeInfo) => {
  extensionApiService.removeAllContextMenus(async () => {
    const isScope = await extensionApiService.checkTabURLByPattern(tabId, regexpBoardUrl);
    if (!isScope || changeInfo == null || changeInfo.status !== 'complete') {
      return;
    }
    extensionApiService.sendMessageToTab(tabId, { getBlurSensitive: true }, response => {
      if (response && Object.prototype.hasOwnProperty.call(response, 'blurSensitive')) {
        createContextMenuItem(response.blurSensitive);
      }
    });
  });
};

extensionApiService.onTabsUpdated(async (tabId, changeInfo) => {
  createContextMenu(tabId, changeInfo);
});

extensionApiService.onTabsActivated(async activeInfo => {
  createContextMenu(activeInfo.tabId);
});
