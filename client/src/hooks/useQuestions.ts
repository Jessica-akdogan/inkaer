import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";



interface Question {
  value: string;
  placeholder: string;
}

interface User {
  displayName: string;
  email: string;
  customQuestion?: string;
}

export function useQuestions() {
  const [interviewStyle, setInterviewStyle] = useState("behavioral");
  const [questions, setQuestions] = useState<Question[]>([
    {
      value: "",
      placeholder:
        "Tell us about a project you're most proud of and the impact it had.",
    },
    {
      value: "",
      placeholder:
        "Describe a time you had to navigate a team conflict. What did you do?",
    },
  ]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList: User[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userList.push({
            displayName: data.displayName,
            email: data.email,
          });
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterviewStyle(e.target.value);
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { value: "", placeholder: "Enter your new question..." },
    ]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].value = value;
    setQuestions(updated);
  };

  const handleCustomQuestionChange = (userIndex: number, value: string) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex].customQuestion = value;
    setUsers(updatedUsers);
  };

 const sendInterviewQuestions = async () => {
  const formattedQuestions = questions
    .map((q) => q.value.trim())
    .filter(Boolean); // Only keep non-empty questions

  const hasCustomQuestions = users.some(
    (u) => u.customQuestion && u.customQuestion.trim() !== ""
  );

  if (formattedQuestions.length === 0 && !hasCustomQuestions) {
    toast("Please fill out at least one default or custom question before submitting.");
    return;
  }

  setLoading(true);
  setSuccess(false);

  try {
    const payload = {
      interviewStyle,
      questions: formattedQuestions,
      candidates: users.map((u) => ({
        displayName: u.displayName,
        email: u.email,
        customQuestion: u.customQuestion?.trim() || null,
      })),
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "interviews"), payload);
    setSuccess(true);
    toast.success("Interview questions sent successfully.");
  } catch (err) {
    console.error("Error submitting:", err);
    toast.error("Failed to send questions.");
  } finally {
    setLoading(false);
  }
};


  return {
    interviewStyle,
    handleStyleChange,
    questions,
    addQuestion,
    handleQuestionChange,
    users,
    handleCustomQuestionChange,
    sendInterviewQuestions,
    loading,
    success,
  };
}
