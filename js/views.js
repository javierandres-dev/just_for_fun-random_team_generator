export function getFirstStepView() {
  return `
<section>
  <h2><span>1.</span> Participants</h2>
  <p>How would you like to name the participants?</p>
  <ul>
    <li>By name: You must enter one name at time</li>
    <li>
      By consecutive codes: You must enter the first number and the total
      number of codes
    </li>
  </ul>
  <form>
    <fieldset>
      <legend>Select an option</legend>
      <div>
        <input
          type="radio"
          id="byNames"
          name="participants"
          value="names"
        />
        <label for="byNames">By names</label>
      </div>
      <div>
        <input
          type="radio"
          id="byCodes"
          name="participants"
          value="codes"
        />
        <label for="byCodes">By consecutive codes</label>
      </div>
      <div id="names" class="d-none">
        <div>
          <label for="name">Name of participant:</label>
          <input type="text" id="name" />
        </div>
        <div>
          <button type="button" id="addName" class="btn btn-primary">Add <span class="material-symbols-outlined">add</span></button>
          <button type="button" id="addNames" class="btn btn-primary">Done <span class="material-symbols-outlined">done_all</span></button>
        </div>
      </div>
      <div id="codes" class="d-none">
        <div>
          <label for="iCode">Initial code:</label>
          <input type="number" id="iCode" />
        </div>
        <div>
          <label for="nCodes">Number of codes:</label>
          <input type="number" id="nCodes" />
        </div>
        <button type="button" id="addCodes" class="btn btn-primary">Add <span class="material-symbols-outlined">add</span></button>
      </div>
    </fieldset>
  </form>
</section>
  `;
}

export function getSecondStepView() {
  return `
<section>
  <h2><span>2.</span> Settings</h2>
  <p>How would you want the team to be generated?</p>
  <ul>
    <li>By number of groups: How many groups do you want?</li>
    <li>
      By number of participants per group: How many participants in each
      group?
    </li>
  </ul>
  <form>
    <fieldset>
      <legend>Select an option</legend>
      <div>
        <input type="radio" id="byNgroups" name="number" value="Groups" />
        <label for="byNgroups">By number of groups</label>
      </div>
      <div>
        <input
          type="radio"
          id="byNparticipants"
          name="number"
          value="Participants"
        />
        <label for="byNparticipants">By number of participants per group</label>
      </div>
      <div>
        <label for="number">Number</label>
        <input type="number" id="number" />
        <button type="button" id="generate" class="btn btn-primary">Generate Teams <span class="material-symbols-outlined">group_work</span></button>
      </div>
    </fieldset>
  </form>
</section>
  `;
}
