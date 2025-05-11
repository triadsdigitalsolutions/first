'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { collection, where, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firabase';

interface AccountDetails {
  email: string;
  phone_number: string;
  address: string;
}

function MyAccountPage() {
  const { data: session } = useSession();
  const [account, setAccount] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState<null | keyof Omit<AccountDetails, 'email'>>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [docId, setDocId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      if (session?.user?.email) {
        const usersCollection = collection(db, "USERS");
        const q = query(usersCollection, where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setAccount(querySnapshot.docs[0].data() as AccountDetails);
          setDocId(querySnapshot.docs[0].id);
        }
      }
      setLoading(false);
    };
    fetchAccount();
  }, [session?.user?.email]);

  const handleEdit = (field: keyof Omit<AccountDetails, 'email'>) => {
    setEditField(field);
    setEditValue(account ? account[field] : '');
  };

  const handleSave = async () => {
    if (!account || !docId || !editField) return;
    const userDoc = doc(db, "USERS", docId);
    await updateDoc(userDoc, { [editField]: editValue });
    setAccount({ ...account, [editField]: editValue });
    setEditField(null);
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (!account) return <div className="flex items-center justify-center h-64">No account details found.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">My Account</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-gray-600 font-semibold">Username:</label>
          <div className="flex items-center">
            <span className="flex-1">{session?.user?.name || 'N/A'}</span>
          </div>
        </div>
        <div>
          <label className="block text-gray-600 font-semibold">Email:</label>
          <div className="flex items-center">
            <span className="flex-1 text-gray-500">{account.email}</span>
          </div>
        </div>
        <div>
          <label className="block text-gray-600 font-semibold">Mobile Number:</label>
          <div className="flex items-center">
            {editField === 'phone_number' ? (
              <>
                <input
                  className="border rounded px-2 py-1 flex-1"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  autoFocus
                />
                <button
                  className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="ml-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEditField(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{account.phone_number}</span>
                <button
                  className="ml-2 px-2 py-1 text-blue-600 hover:underline"
                  onClick={() => handleEdit('phone_number')}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          <label className="block text-gray-600 font-semibold">Address:</label>
          <div className="flex items-center">
            {editField === 'address' ? (
              <>
                <input
                  className="border rounded px-2 py-1 flex-1"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  autoFocus
                />
                <button
                  className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="ml-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEditField(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{account.address}</span>
                <button
                  className="ml-2 px-2 py-1 text-blue-600 hover:underline"
                  onClick={() => handleEdit('address')}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;