export const settingsJiraDOM = {
  openEditorBtn: 'edit-personal-wip-limit-btn-jh',
  idPersonName: 'personal-name',
  idLimit: 'limit',
  idColumnSelect: 'column-select',
  idApplyColumnSelect: 'apply-columns',
  idSwimlaneSelect: 'column-select',
  idApplySwimlaneSelect: 'apply-columns',
  idButtonAddLimit: 'person-limit-save-button',
  idButtonEditLimit: 'person-limit-edit-button',
};

export const groupSettingsBtnTemplate = () =>
  `<button id="${settingsJiraDOM.openEditorBtn}" class="aui-button">Manage per-person WIP-limits</button>`;

export const formPersonalWipLimit = () => {
  return `<form class="aui">
    <fieldset>
      <table>
        <tr>
          <td>
            <div class="field-group">
              <label for="${settingsJiraDOM.idPersonName}">Person JIRA name</label>
              <input class="text medium-field" type="text" id="${settingsJiraDOM.idPersonName}" name="${settingsJiraDOM.idPersonName}" placeholder="">
            </div>

            <div class="field-group">
              <label for="${settingsJiraDOM.idLimit}">Max issues at work</label>
              <input class="text medium-field" type="number" id="${settingsJiraDOM.idLimit}" name="${settingsJiraDOM.idLimit}" placeholder="">
            </div>
          </td>
          <td>
            <div class="field-group columns" style="display: flex">
              <label>Columns</label>
              <select id="${settingsJiraDOM.idColumnSelect}" class="select2" multiple style="margin: 0 12px; width: 195px;" size="4"></select>
              <button id="${settingsJiraDOM.idApplyColumnSelect}" class="aui-button aui-button-link">Apply columns<br/>for selected users</button>
            </div>

            <div class="field-group swimlanes" style="display: flex">
              <label>Swimlanes</label>
              <select id="${settingsJiraDOM.idSwimlaneSelect}" class="select2" multiple style="margin: 0 12px;  width: 195px;" size="5"></select>
              <button id="${settingsJiraDOM.idApplySwimlaneSelect}" class="aui-button aui-button-link">Apply swimlanes<br/>for selected users</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>
            <div class="buttons-container">
              <div class="buttons">
                <button class="aui-button aui-button-primary" type="submit" id="${settingsJiraDOM.idButtonAddLimit}">Add limit</button>
                <button class="aui-button aui-button-primary" type="submit" disabled id="${settingsJiraDOM.idButtonEditLimit}">Edit limit</button>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </fieldset>
  </form>`;
};

export const AddPersonalWipLimit = ({ id, person, limit, columns, swimlanes }) => {
  return `<tr id="row-${id}" class="person-row">
      <td><input type="checkbox" class="checkbox select-user-chb" data-id="${id}"></td>
      <td>${person.displayName}</td>
      <td>${limit}</td>
      <td>${columns.map(c => c.name).join(', ')}</td>
      <td>${swimlanes.map(s => s.name).join(', ')}</td>
      <td><div><button class="aui-button" id="delete-${id}">Delete</button></div><hr><div><button class="aui-button" id="edit-${id}">Edit</button></div></td>
    </tr>
  `;
};

export const personLimitsModal = () => {
  return `<section id="person-limits-dialog" class="aui-dialog2 aui-dialog2-large" role="dialog">
  <header class="aui-dialog2-header" class="aui-dialog2-header">
    <h2 class="aui-dialog2-header-main">Person limits</h2>
  </header>

  <div class="aui-dialog2-content">
    <form class="aui">
      <fieldset>
        <table>
          <tr>
            <td>
              <div class="field-group">
                <label for="person-name">Person JIRA name</label>
                <input class="text medium-field" type="text" id="person-name" name="person-name" placeholder="">
              </div>

              <div class="field-group">
                <label for="limit">Max issues at work</label>
                <input class="text medium-field" type="number" id="limit" name="limit" placeholder="">
              </div>
            </td>
            <td>
              <div class="field-group columns" style="display: flex">
                <label>Columns</label>
                <select id="column-select" class="select2" multiple style="margin: 0 12px; width: 195px;" size="4"></select>
                <button id="apply-columns" class="aui-button aui-button-link">Apply columns<br/>for selected users</button>
              </div>

              <div class="field-group swimlanes" style="display: flex">
                <label>Swimlanes</label>
                <select id="swimlanes-select" class="select2" multiple style="margin: 0 12px;  width: 195px;" size="5"></select>
                <button id="apply-swimlanes" class="aui-button aui-button-link">Apply swimlanes<br/>for selected users</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <div class="buttons-container">
                <div class="buttons">
                  <button class="aui-button aui-button-primary" type="submit" id="person-limit-save-button">Add limit</button>
                  <button class="aui-button aui-button-primary" type="submit" disabled id="person-limit-edit-button">Edit limit</button>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </fieldset>
    </form>

    <table class="aui">
      <thead>
      <tr>
        <th></th>
        <th id="person">Person</th>
        <th id="limits">Limit</th>
        <th id="columns">Columns</th>
        <th id="swimlanes">Swimlanes</th>
        <th id="delete">Delete</th>
      </tr>
      </thead>
      <tbody id="persons-limit-body"></tbody>
    </table>
  </div>
</section>`;
};
