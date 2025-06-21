
import React from "react";
import "../styles/questions/addQuestions.scss";
import { useQuestions } from "../../../hooks/useQuestions";

const AddQuestions: React.FC = () => {
  const {
    interviewStyle,
    handleStyleChange,
    questions,
    addQuestion,
    handleQuestionChange,
    users,
    loading,
    handleCustomQuestionChange,
 //   sendInterviewQuestions,
  } = useQuestions();

  return (
    <div className="add-questions">
      <h2 className="add-questions__title">
        Set Interview Questions for Product Manager Role
      </h2>

      <div className="add-questions__section">
        <label className="add-questions__label">Interview Style</label>
        <select
          id="interview-style-select"
          value={interviewStyle}
          onChange={handleStyleChange}
          className="add-questions__select"
          required
        >
          <option value="behavioral">Behavioral (STAR)</option>
          <option value="technical">Technical Challenge</option>
          <option value="situational">Situational Judgement</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <div className="add-questions__section">
        <span className="add-questions__label">
          Default Questions (Sent to all candidates):
        </span>
        {questions.map((q, idx) => (
          <div className="add-questions__question-box" key={idx}>
            <label className="add-questions__question-label">
              Question {idx + 1}
            </label>
            <textarea
              placeholder={q.placeholder}
              value={q.value}
              onChange={(e) => handleQuestionChange(idx, e.target.value)}
              className="add-questions__textarea"
            ></textarea>
          </div>
        ))}
        <button
          className="add-questions__add-btn"
          onClick={addQuestion}
        >
          + Add Another Default Question
        </button>
      </div>

      <div className="add-questions__section">
        <h2 className="add-questions__subtitle">Candidate Pool</h2>
        <p className="add-questions__description">
          You can add a custom question for any specific candidate below
          (optional).
        </p>
        <table className="add-questions__table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Email</th>
              <th>Custom Question</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  <textarea
                    className="add-questions__custom-textarea"
                    placeholder={`Optional custom question for ${user.displayName}...`}
                    value={user.customQuestion || ""}
                    onChange={(e) =>
                      handleCustomQuestionChange(idx, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     <button
  className="add-questions__submit-btn"
 // onClick={sendInterviewQuestions}
  disabled={loading}
>
  {loading ? (
    <span className="add-questions__spinner"></span>
  ) : (
    "Send Interview Questions"
  )}
</button>

    </div>
  );
};

export default AddQuestions;
