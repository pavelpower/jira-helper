import { extensionApiService } from '../shared/ExtensionApiService';

const setBlurSensitive = isBlur => {
  const html = document.getElementsByTagName('html')[0];
  if (isBlur) {
    html.classList.add('blur');
    return;
  }
  html.classList.remove('blur');
};

const changeBlurSensitive = isBlur => {
  localStorage.setItem('blurSensitive', isBlur);
  setBlurSensitive(isBlur);
};

export const setUpBlurSensitiveOnPage = () => {
  const isBlure = localStorage.getItem('blurSensitive') === 'true';
  setBlurSensitive(!!isBlure);
};

export const initBlurSensitive = () => {
  extensionApiService.onMessage((request, sender) => {
    if (!sender.tab && Object.prototype.hasOwnProperty.call(request, 'blurSensitive')) {
      changeBlurSensitive(request.blurSensitive);
    }
  });

  extensionApiService.onMessage((request, sender, sendResponse) => {
    if (!sender.tab && Object.prototype.hasOwnProperty.call(request, 'getBlurSensitive')) {
      sendResponse({ blurSensitive: localStorage.getItem('blurSensitive') === 'true' });
    }
  });
};
