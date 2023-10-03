import { extensionApiService } from '../shared/ExtensionApiService';

function jiraHelperTetrisPlanningModal(sendResponse) {
  const dialog = window.AJS.dialog2('#static-dialog');
  dialog.show();

  document.querySelector('#dialog-cancel').addEventListener('click', () => {
    dialog.hide();
    document.querySelector('#static-dialog').remove();
    sendResponse({ hideTetrisPlanningWindow: true });
  });
}

extensionApiService.onMessage((request, sender, sendResponse) => {
  if (!sender.tab && typeof request.blurSensitive === 'boolean') {
    jiraHelperTetrisPlanningModal(sendResponse);
  }
});
