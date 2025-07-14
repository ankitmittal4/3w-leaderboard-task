import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3021/api";

function App() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [lastClaimed, setLastClaimed] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/leaderboard`);
    setUsers(res.data);
  };

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    await axios.post(`${API}/add-user`, { name: newUserName });
    setNewUserName('');
    fetchUsers();
  };

  const handleClaim = async (userId) => {
    const res = await axios.post(`${API}/claim/${userId}`);
    setLastClaimed(prev => ({ ...prev, [userId]: res.data.points }));
    fetchUsers();
  };

  //Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      <button
        onClick={() => navigate('/history')}
        className="absolute top-6 right-14 bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        View History
      </button>
      <div className="p-6 max-w-3xl mx-auto relative">

        <h1 className="text-2xl font-bold text-center mb-6">🔥 Claim Points System</h1>

        {/* Add User */}
        <div className="mb-6 flex gap-4 items-center">
          <input
            type="text"
            value={newUserName}
            onChange={e => setNewUserName(e.target.value)}
            placeholder="Enter new user name"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 whitespace-nowrap"
          >
            Add user
          </button>
        </div>

        {/* Leaderboard */}
        <h2 className="text-xl font-semibold mb-2">🏆 Leaderboard</h2>
        <div className="border rounded p-4 shadow bg-white">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Rank</th>
                <th className="p-2">User</th>
                <th className="p-2">Points</th>
                <th className="p-2 w-48">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2">{indexOfFirstUser + index + 1}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.points}</td>
                  <td className="p-2 w-48">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleClaim(user._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Claim
                      </button>
                      {lastClaimed[user._id] && (
                        <span className="text-green-600 text-sm">
                          +{lastClaimed[user._id]} pts
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
