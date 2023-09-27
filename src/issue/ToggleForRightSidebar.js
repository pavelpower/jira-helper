import { PageModification } from '../shared/PageModification';
import { getIssueId } from '../routing';

const toggleMap = {
  false: { text: ' >> ', title: 'Collapse sidebar' },
  true: { text: ' << ', title: 'Expand sidebar' },
};

function changeHiddenSidebar(toggle) {
  const sidebar = document.getElementById('viewissuesidebar');
  if (sidebar) {
    sidebar.hidden = !sidebar.hidden;
    toggle.textContent = toggleMap[sidebar.hidden].text;
    toggle.title = toggleMap[sidebar.hidden].title;
  }
}

const getToggle = sidebarHidden => {
  const toggle = document.createElement('button');
  toggle.textContent = toggleMap[sidebarHidden].text;
  toggle.title = toggleMap[sidebarHidden].title;
  toggle.setAttribute('class', 'aui-button');
  toggle.addEventListener('click', function() {
    changeHiddenSidebar(toggle);
  });
  return toggle;
};

export default class extends PageModification {
  shouldApply() {
    return getIssueId() != null;
  }

  getModificationId() {
    return 'toggle-right-sidebar';
  }

  waitForLoading() {
    return this.waitForElement('#viewissuesidebar');
  }

  async apply() {
    const opsNav = document.getElementById('opsbar-jira.issue.tools');
    const toggle = getToggle(false);
    opsNav.appendChild(toggle);
  }
}
