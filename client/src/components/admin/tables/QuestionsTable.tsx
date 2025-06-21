import React from "react";
import { useQuestionsTable } from "../hooks/useQuestionsTable";
import "../styles/questions/QuestionsTable.scss";

const QuestionsTable: React.FC = () => {
  const { interviews, loading } = useQuestionsTable();

  if (loading) return <div className="questions-table__loading">Loading…</div>;
  if (interviews.length === 0)
    return <div className="questions-table__empty">No interview data available.</div>;

  return (
    <div className="questions-table">
      {interviews.map((iv) => (
        <div className="questions-table__interview" key={iv.id}>
          <h3 className="questions-table__header">
            {iv.interviewStyle.charAt(0).toUpperCase() + iv.interviewStyle.slice(1)} Interview
            <span className="questions-table__timestamp">
              {iv.createdAt?.toDate().toLocaleString()}
            </span>
          </h3>

          <table className="questions-table__table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {iv.questions.map((q, i) => (
                <tr key={`default-${iv.id}-${i}`}>
                  <td>{q}</td>
                  <td>All Candidates</td>
                </tr>
              ))}
              {iv.candidates.map((c, i) =>
                c.customQuestion ? (
                  <tr key={`custom-${iv.id}-${i}`}>
                    <td>{c.customQuestion}</td>
                    <td>{c.displayName} ({c.email})</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default QuestionsTable;
