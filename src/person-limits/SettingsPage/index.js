import { PageModification } from '../../shared/PageModification';
import { getSettingsTab } from '../../routing';
import { btnGroupIdForColumnsSettingsPage, BOARD_PROPERTIES } from '../../shared/constants';
import { settingsJiraDOM, groupSettingsBtnTemplate, formPersonalWipLimit } from './htmlTemplates';
import { Popup } from '../../shared/getPopup';

export default class PersonalWIPLimit extends PageModification {
  static jiraSelectors = {
    panelConfig: `#${btnGroupIdForColumnsSettingsPage}`,
  };

  async shouldApply() {
    return (await getSettingsTab()) === 'columns';
  }

  getModificationId() {
    return `add-person-settings-${this.getBoardId()}`;
  }

  waitForLoading() {
    // after button column button
    return Promise.all([this.waitForElement(PersonalWIPLimit.jiraSelectors.panelConfig)]);
  }

  loadData() {
    return Promise.all([this.getBoardEditData(), this.getBoardProperty(BOARD_PROPERTIES.PERSON_LIMITS)]);
  }

  apply([boardData = {}, personLimits = { limits: [] }]) {
    if (!boardData.canEdit) return;

    this.boardData = boardData;
    this.personLimits = personLimits;

    this.renderEditButton();
    this.onDOMChange('#columns', () => {
      this.renderEditButton();
    });
  }

  renderEditButton() {
    this.editBtn = this.insertHTML(
      document.getElementById(btnGroupIdForColumnsSettingsPage),
      'beforeend',
      groupSettingsBtnTemplate({
        openEditorBtn: settingsJiraDOM.openEditorButton,
        groupOfBtnsId: btnGroupIdForColumnsSettingsPage,
      })
    );

    this.popup = new Popup({
      title: 'Personal WIP Limit',
      okButtonText: 'Save',
      size: 'large',
      onConfirm: this.handleSubmit,
      onCancel: this.handleClose,
    });

    this.addEventListener(this.editBtn, 'click', this.openPersonalSettingsPopup);
  }

  openPersonalSettingsPopup = async () => {
    await this.popup.render();
    await this.popup.appendToContent(formPersonalWipLimit());

    this.selectSwimlane = document.getElementById(settingsJiraDOM.idSwimlaneSelect);
    this.selectColumns = document.getElementById(settingsJiraDOM.idColumnSelect);

    this.addOptionsToSelect(this.selectSwimlane, this.boardData.rapidListConfig.mappedColumns);
    this.addOptionsToSelect(this.selectColumns, this.boardData.swimlanesConfig.swimlanes);
  };

  addOptionsToSelect = (DOMSelect, items) => {
    this.swimlanesOptions = items.forEach(({ id, name, isKanPlanColumn }) => {
      if (isKanPlanColumn) {
        // for backlog kanban board
        return;
      }
      const option = document.createElement('option');
      option.text = name;
      option.value = id;
      option.selected = true;
      DOMSelect.appendChild(option);
    });
  };

  handleSubmit = async unmountPopup => {
    // await this.updateBoardProperty(BOARD_PROPERTIES.WIP_LIMITS_SETTINGS, this.getWipLimitsForOnlyExistsColumns());
    unmountPopup();
  };
}
