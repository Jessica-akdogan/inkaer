import { db} from '../firebase/config';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';


const AdminCountDown: React.FC = () => {
    const [dateInput, setDateInput] = useState('');
    const [timeInput, setTimeInput] = useState('');
  
    // Fetch existing countdown values
    useEffect(() => {
      const fetchCountdown = async () => {
        const docRef = doc(db, 'settings', 'countdown');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const endTime: Date = data.endTime.toDate();
          setDateInput(endTime.toISOString().slice(0, 10));
          setTimeInput(endTime.toTimeString().slice(0, 5)); // "HH:MM"
        }
      };
      fetchCountdown();
    }, []);
  
    const handleUpdateCountdown = async () => {
      if (!dateInput || !timeInput) return alert('Date and time are required');
      const endDateTime = new Date(`${dateInput}T${timeInput}`);
      await setDoc(doc(db, 'settings', 'countdown'), {
        endTime: Timestamp.fromDate(endDateTime),
      });
      alert('Countdown updated!');
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Set New Countdown</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Date</label>
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Time</label>
            <input
              type="time"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={handleUpdateCountdown}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Update Countdown
          </button>
        </div>
      </div>
    );
  };
  
  export default AdminCountDown;