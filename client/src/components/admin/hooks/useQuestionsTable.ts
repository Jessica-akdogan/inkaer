
import { useState, useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";

interface Candidate {
  displayName: string;
  email: string;
  customQuestion?: string | null;
}

interface Interview {
  id: string;
  interviewStyle: string;
  questions: string[];
  candidates: Candidate[];
  createdAt?: Timestamp;
}

export function useQuestionsTable() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const snapshot = await getDocs(collection(db, "interviews"));
        const data: Interview[] = [];
        snapshot.forEach((doc) => {
          const d = doc.data() as Omit<Interview, "id">;
          data.push({ id: doc.id, ...d });
        });
        setInterviews(data);
      } catch (e) {
        console.error("Failed loading interviews:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  return { interviews, loading };
}
