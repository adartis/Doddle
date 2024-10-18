import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [workElements, setWorkElements] = useState([]); // Tracks work elements
  const [actionPlanRows, setActionPlanRows] = useState([]); // Tracks action plan rows
  const [presentMode, setPresentMode] = useState(false); // Tracks if present mode is active

  const addWorkElement = () => {
    const newWorkElement = {
      id: workElements.length + 1,
      workPackageTitle: '',
      workPackageDescription: '',
      workPackageLeader: '',
      ragSelection: ''
    };
    setWorkElements([...workElements, newWorkElement]);
  };

  const addActionPlanRow = () => {
    const newRow = {
      id: actionPlanRows.length + 1,
      workPackage: '',
      description: '',
      startDate: '',
      endDate: '',
      responsiblePerson: ''
    };
    setActionPlanRows([...actionPlanRows, newRow]);
  };

  const [isInputMode, setIsInputMode] = useState(true);
  const [inputData, setInputData] = useState({
    problemStatement: '',
    visionStatement: '',
    headlineGoal: '',
    workPackages: '',
    actionPlan: '',
    successIndicators: '',
    risksAndIssues: '',
    stakeholderCalendar: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('boxData');
    if (savedData) {
      setInputData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value
    });
  };

  const handleWorkPackageInputChange = (index, field, value) => {
    const updatedWorkElements = [...workElements];
    updatedWorkElements[index][field] = value;
    setWorkElements(updatedWorkElements);
  };

  const handleActionPlanInputChange = (index, field, value) => {
    const updatedRows = [...actionPlanRows];
    updatedRows[index][field] = value;
    setActionPlanRows(updatedRows);
  };

  const handleBoxClick = (box) => setActiveBox(box);

  const handleSave = () => {
    localStorage.setItem('boxData', JSON.stringify(inputData));
    alert('Data saved!');
  };

  const handleToggleInput = () => {
    setPresentMode(false); // Disable present mode when toggling input mode
    setIsInputMode(true);
  };

  const handleToggleReadOnly = () => {
    setPresentMode(false); // Disable present mode when toggling read-only mode
    setIsInputMode(false);
  };

  const handlePresent = () => {
    setPresentMode(true); // Enable present mode
  };

  // Function to remove a work package
  const removeWorkElement = (index) => {
    const updatedWorkElements = workElements.filter((_, i) => i !== index);
    setWorkElements(updatedWorkElements);
  };

  // Function to remove an action plan row
  const removeActionPlanRow = (index) => {
    const updatedActionPlanRows = actionPlanRows.filter((_, i) => i !== index);
    setActionPlanRows(updatedActionPlanRows);
  };

  return (
    <div className="container">
      <header className="header">
        <button className={`toggle-button ${isInputMode ? 'active' : ''}`} onClick={handleToggleInput}>
          Input Mode
        </button>
        <button className={`toggle-button ${!isInputMode ? 'active' : ''}`} onClick={handleToggleReadOnly}>
          Read Only Mode
        </button>
        <div className="present-button">
          <button className="save-button" onClick={handlePresent}>Present</button>
        </div>
      </header>

      <div className="main-content">
        <div className="left-column">
          <div className="clickable-box" onClick={() => handleBoxClick('Scope')}>
            Vision and Scope
          </div>
          <div className="clickable-box" onClick={() => handleBoxClick('Work packages')}>
            Work packages
          </div>
          <div className="clickable-box" onClick={() => handleBoxClick('Plan')}>
            Action Plan
          </div>
          <div className="clickable-box" onClick={() => handleBoxClick('Success Indicators')}>
            Success Indicators
          </div>
          <div className="clickable-box" onClick={() => handleBoxClick('Risks and issues')}>
            Risks and Issues
          </div>
          <div className="clickable-box" onClick={() => handleBoxClick('Stakeholder calendar')}>
            Stakeholder Calendar
          </div>
        </div>

        <div className="middle-section">
          {presentMode ? (
            <>
              <h2>Presentation Mode</h2>
              {/* Display all data in read-only format */}
              <div>
                <h3>Problem Statement</h3>
                <p>{inputData.problemStatement || 'No data entered'}</p>
                <h3>Vision Statement</h3>
                <p>{inputData.visionStatement || 'No data entered'}</p>
                <h3>Headline Goal</h3>
                <p>{inputData.headlineGoal || 'No data entered'}</p>
                <h3>Work Packages</h3>
                {workElements.length > 0 ? (
                  workElements.map((workElement) => (
                    <div key={workElement.id}>
                      <p>Title: {workElement.workPackageTitle || 'No title entered'}</p>
                      <p>Description: {workElement.workPackageDescription || 'No description entered'}</p>
                      <p>Leader: {workElement.workPackageLeader || 'No leader entered'}</p>
                      <p>RAG: {workElement.ragSelection || 'No RAG selected'}</p>
                    </div>
                  ))
                ) : (
                  <p>No work packages added</p>
                )}
                <h3>Action Plan</h3>
                {actionPlanRows.length > 0 ? (
                  actionPlanRows.map((row) => (
                    <div key={row.id}>
                      <p>Work Package: {row.workPackage || 'No work package selected'}</p>
                      <p>Description: {row.description || 'No description entered'}</p>
                      <p>Start Date: {row.startDate || 'No start date entered'}</p>
                      <p>End Date: {row.endDate || 'No end date entered'}</p>
                      <p>Responsible: {row.responsiblePerson || 'No responsible person entered'}</p>
                    </div>
                  ))
                ) : (
                  <p>No action plan added</p>
                )}
              </div>
            </>
          ) : activeBox ? (
            <>
              <h2>{activeBox} Information</h2>
              {isInputMode ? (
                <div>
                  {activeBox === 'Scope' && (
                    <>
                      <label>Problem Statement:</label>
                      <br/>
                      <textarea
                        className="textarea"
                        name="problemStatement"
                        value={inputData.problemStatement}
                        onChange={handleInputChange}
                        placeholder="Enter problem statement"
                      />
                      <br />
                      <label>Vision Statement:</label>
                      <br/>
                      <textarea
                        className="textarea"
                        name="visionStatement"
                        value={inputData.visionStatement}
                        onChange={handleInputChange}
                        placeholder="Enter vision statement"
                      />
                      <br />
                      <label>Headline goal:</label>
                      <br/>
                      <textarea
                        className="textarea"
                        name="headlineGoal"
                        value={inputData.headlineGoal}
                        onChange={handleInputChange}
                        placeholder="Enter headline goal"
                      />
                    </>
                  )}
                  {activeBox === 'Work packages' && (
                    <>
                      <label>Work packages:</label>
                      <div className="work-package-row">
                        <p>Title</p>
                        <p>Description</p>
                        <p>Accountable owner</p>
                        <p>RAG</p>
                      </div>
                      <br />
                      {workElements.map((workElement, index) => (
                        <div key={workElement.id} className="work-package-row">
                          <input
                            type="text"
                            placeholder="Enter title"
                            value={workElement.workPackageTitle}
                            onChange={(e) => handleWorkPackageInputChange(index, 'workPackageTitle', e.target.value)}
                            className="title-input"
                          />
                          
                          <textarea
                            placeholder="Enter description"
                            value={workElement.workPackageDescription}
                            onChange={(e) => handleWorkPackageInputChange(index, 'workPackageDescription', e.target.value)}
                            className="description-textarea"
                          />
                          
                          <input
                            type="text"
                            placeholder="Enter leader name"
                            value={workElement.workPackageLeader}
                            onChange={(e) => handleWorkPackageInputChange(index, 'workPackageLeader', e.target.value)}
                            className="leader-input"
                          />

                          <select
                            value={workElement.ragSelection}
                            onChange={(e) => handleWorkPackageInputChange(index, 'ragSelection', e.target.value)}
                            className="dropdown-select"
                          >
                            <option value="">Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                          </select>

                          {/* Delete Button */}
                          <button className="delete-button" onClick={() => removeWorkElement(index)}>
                            X
                          </button>
                          <br/>
                        </div>
                      ))}

                      <button className="add-button" onClick={addWorkElement}>
                        Add Work Package
                      </button>
                    </>
                  )}
                  {activeBox === 'Plan' && (
                    <>
                      <label>Action Plan:</label>
                      <br />
                      <div className="action-plan-row">
                        <p>Work Package</p>
                        <p>Description</p>
                        <p>Start Date</p>
                        <p>End Date</p>
                        <p>Responsible Person</p>
                      </div>
                      {actionPlanRows.map((row, index) => (
                        <div key={row.id} className="action-plan-row">
                          <select
                            value={row.workPackage}
                            onChange={(e) => handleActionPlanInputChange(index, 'workPackage', e.target.value)}
                            className="dropdown-select"
                          >
                            <option value="">Select Work Package</option>
                            {workElements.map((wp) => (
                              <option key={wp.id} value={wp.workPackageTitle}>
                                {wp.workPackageTitle}
                              </option>
                            ))}
                          </select>

                          <input
                            type="text"
                            placeholder="Enter action description"
                            value={row.description}
                            onChange={(e) => handleActionPlanInputChange(index, 'description', e.target.value)}
                            className="description-input"
                          />

                          <input
                            type="date"
                            value={row.startDate}
                            onChange={(e) => handleActionPlanInputChange(index, 'startDate', e.target.value)}
                            className="date-input"
                          />

                          <input
                            type="date"
                            value={row.endDate}
                            onChange={(e) => handleActionPlanInputChange(index, 'endDate', e.target.value)}
                            className="date-input"
                          />

                          <input
                            type="text"
                            placeholder="Enter responsible person"
                            value={row.responsiblePerson}
                            onChange={(e) => handleActionPlanInputChange(index, 'responsiblePerson', e.target.value)}
                            className="responsible-input"
                          />

                          {/* Delete Button */}
                          <button className="delete-button" onClick={() => removeActionPlanRow(index)}>
                            X
                          </button>
                        </div>
                      ))}
                      <button className="add-button" onClick={addActionPlanRow}>
                        Add Action
                      </button>
                      <br/>
                    </>
                  )}
                  <br />
                  <button className="save-button" onClick={handleSave}>
                    Save work
                  </button>
                </div>
              ) : (
                <div>
                  {/* Add readonly content for each box */}
                </div>
              )}
            </>
          ) : (
            <p>Please click a box on the left to view information.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
