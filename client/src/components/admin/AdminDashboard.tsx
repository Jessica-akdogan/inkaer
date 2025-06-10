import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminCountDown from './AdminCountDown';
import AdminInviteLink from './AdminInviteLink';
import { Button } from '../ui/Button';

type Subscriber = {
  id: string;
  name: string;
  email: string;
  subscribedAt: string;
};


const AdminDashboard = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, 'subscribers'));
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        name: d.name,
        email: d.email,
        subscribedAt: d.subscribedAt?.toDate().toLocaleString() ?? '',
      };
    });
    setSubscribers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const exportEmails = () => {
    const csvContent = [
     // ['Email'], // header
      ...subscribers.map((s) => [s.email]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers-emails.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
   <>
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-center w-full">Admin Dashboard</h2>
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-gray-500 text-center">No subscribers yet.</p>
      ) : (
        <>
          <div className="flex justify-end mb-3">
            <Button
              onClick={exportEmails}
              className="bg-green-600 w-40 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Export Emails
            </Button>
          </div>

          <table className="w-full table-auto border-collapse border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className='text-gray-700'>
                  <td className="border px-4 py-2">{s.name}</td>
                  <td className="border px-4 py-2">{s.email}</td>
                  <td className="border px-4 py-2 text-sm">{s.subscribedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>

    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
          <AdminCountDown />
      </div>

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
          <AdminInviteLink/>
      </div>
   </>
  );
};

export default AdminDashboard;