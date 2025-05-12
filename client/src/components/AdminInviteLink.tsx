
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AdminInviteLink: React.FC = () => {
    const [link, setLink] = useState('');
  
    // Fetch the existing invite link
    useEffect(() => {
      const fetchLink = async () => {
        const docRef = doc(db, 'settings', 'invite');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.url) setLink(data.url);
        }
      };
      fetchLink();
    }, []);
  
    const handleSaveLink = async () => {
      if (!link.trim()) return alert('Link cannot be empty');
      await setDoc(doc(db, 'settings', 'invite'), { url: link.trim() });
      alert('Invite link saved!');
    };
  
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
        <h2 className="text-xl font-semibold mb-4">Set Invite Link</h2>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com/invite"
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          onClick={handleSaveLink}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Save Link
        </button>
      </div>
    );
  };
  
  export default AdminInviteLink;