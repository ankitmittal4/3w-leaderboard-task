import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:3021/api";

function History() {
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const historyPerPage = 10;

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const res = await axios.get(`${API}/history`);
        setHistory(res.data);
    };

    const indexOfLastHistory = currentPage * historyPerPage;
    const indexOfFirstHistory = indexOfLastHistory - historyPerPage;
    const paginatedHistory = history.slice(indexOfFirstHistory, indexOfLastHistory);
    const totalPages = Math.ceil(history.length / historyPerPage);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center my-5 mb-10">
                <h1 className="text-3xl font-bold text-gray-600 mx-auto">Claim History</h1>
                <Link
                    to="/"
                    className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Back
                </Link>
            </div>

            {history.length === 0 ? (
                <p>No history yet.</p>
            ) : (
                <>
                    <table className="w-full text-left border shadow bg-white rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Sr.No.</th>
                                <th className="p-2">User</th>
                                <th className="p-2">Points</th>
                                <th className="p-2">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedHistory.map((h, index) => (
                                <tr key={h._id} className="border-t">
                                    <td className="p-2">{indexOfFirstHistory + index + 1}</td>
                                    <td className="p-2">{h.userId?.name || "Unknown"}</td>
                                    <td className="p-2">{h.points}</td>
                                    <td className="p-2">{new Date(h.createdAt).toLocaleString()}</td>
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
                </>
            )}
        </div>
    );
}

export default History;
