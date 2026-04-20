import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { FiEdit2, FiTrash2, FiPlus, FiLogOut, FiUser } from 'react-icons/fi'

export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchStudents = async () => {
    try {
      const res = await API.get('/student')
      setStudents(res.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this student?')) return
    await API.delete(`/student/${id}`)
    fetchStudents()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => { fetchStudents() }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">Student Register</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <FiLogOut size={15} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </nav>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Students</h2>
            <p className="text-xs text-gray-400 mt-0.5">{students.length} total students</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/add')}
            className="flex items-center gap-1.5 bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
          >
            <FiPlus size={15} />
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
            <FiUser size={32} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">No students found</p>
            <button
              onClick={() => navigate('/dashboard/add')}
              className="mt-4 text-sm text-blue-500 hover:underline"
            >Add your first student</button>
          </div>
        ) : (
          <>
            {/* ── Desktop Table (md and above) ── */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['#', 'Photo', 'Name', 'DOB', 'Gender', 'Email', 'Phone', 'Address', 'Grade', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr key={s._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                        <td className="px-4 py-3">
                          <img
                            src={`http://localhost:8000/upload/${s.image}`}
                            alt={s.fullName}
                            className="w-9 h-9 rounded-full object-cover bg-gray-100"
                            onError={(e) => e.target.src = '/default-avatar.png'}
                          />
                        </td>
                        <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{s.fullName}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{s.dob}</td>
                        <td className="px-4 py-3 text-gray-500 capitalize">{s.gender}</td>
                        <td className="px-4 py-3 text-gray-500">{s.email}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{s.phoneNumber}</td>
                        <td className="px-4 py-3 text-gray-500 max-w-[140px] truncate">{s.address}</td>
                        <td className="px-4 py-3 text-gray-500">{s.grade}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 items-center">
                            <button
                              onClick={() => navigate(`/dashboard/edit/${s._id}`)}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                              title="Edit"
                            ><FiEdit2 size={15} /></button>
                            <button
                              onClick={() => handleDelete(s._id)}
                              className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                            ><FiTrash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Mobile Cards (below md) ── */}
            <div className="md:hidden space-y-3">
              {students.map((s, i) => (
                <div key={s._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    {/* Left — avatar + name */}
                    <div className="flex items-center gap-3">
                      <img
                        src={`http://localhost:8000/upload/${s.image}`}
                        alt={s.fullName}
                        className="w-11 h-11 rounded-full object-cover bg-gray-100 flex-shrink-0"
                        onError={(e) => e.target.src = '/default-avatar.png'}
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{s.fullName}</p>
                        <p className="text-xs text-gray-400 capitalize">{s.gender} · Grade {s.grade}</p>
                      </div>
                    </div>
                    {/* Right — actions */}
                    <div className="flex gap-1">
                      <button
                        onClick={() => navigate(`/dashboard/edit/${s._id}`)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                      ><FiEdit2 size={15} /></button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                      ><FiTrash2 size={15} /></button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs text-gray-500">
                    <div><span className="text-gray-400">Email: </span>{s.email}</div>
                    <div><span className="text-gray-400">Phone: </span>{s.phoneNumber}</div>
                    <div><span className="text-gray-400">DOB: </span>{s.dob}</div>
                    <div><span className="text-gray-400">Address: </span>{s.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}