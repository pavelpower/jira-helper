import { extensionApiService } from '../shared/ExtensionApiService';

document.addEventListener('DOMContentLoaded', function() {
  const buttonTetris = document.getElementById('btn_settings');

  buttonTetris.addEventListener('click', () => {
    extensionApiService.tabsQuery({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];

      if (/rapidView=(\d*)/im.test(tab.url)) {
        buttonTetris.addEventListener('click', () => {
          extensionApiService.tabsExecuteScript(null, {
            code: 'window.openTetrisPlanningWindow && window.openTetrisPlanningWindow();',
          });
        });
      }
    });
  });
});
