import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const InviteLink: React.FC = () => {
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'invite'), (snap) => {
      const data = snap.data();
      if (data?.url) setInviteLink(data.url);
    });
    return () => unsub();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert('Link copied to clipboard!');
    } catch {
      alert('Failed to copy link.');
    }
  };


  const encoded = encodeURIComponent(inviteLink);

  return inviteLink ? (
    <div className="bg-white p-6 rounded-xl shadow-md mt-10 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Invite Friends</h2>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow transition"
        >
      Copy Link
        </button>
        <a
          href={`https://wa.me/?text=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow transition"
        >
         WhatsApp
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg shadow transition"
        >
           LinkedIn
        </a>
      </div>
    </div>
  ) : null;
};

export default InviteLink;
