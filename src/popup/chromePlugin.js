import { extensionApiService } from '../shared/ExtensionApiService';

// eslint-disable-next-line func-names
document.addEventListener('DOMContentLoaded', function() {
  const buttonTetris = document.getElementById('btn_settings');

  buttonTetris.addEventListener('click', () => {
    // eslint-disable-next-line func-names
    extensionApiService.tabsQuery({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];

      if (!/rapidView=(\d*)/im.test(tab.url)) {
        return;
      }

      extensionApiService.sendMessageToTab(tab.id, { openTetrisPlanningWindow: true }, response => {
        if (response && response.hideTetrisPlanningWindow) {
          window.console.info('Tetris Window is Hide');
        }
      });
    });
  });
});
