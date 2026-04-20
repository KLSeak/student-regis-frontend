import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import StudentForm from '../components/StudentForm'

export default function AddStudent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (form, imageFile) => {
    setLoading(true)
    setError('')
    try {
      let imageName = ''

      // Upload image first if selected
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        const uploadRes = await API.post('/upload', formData)
        imageName = uploadRes.data.filename
    }
    
    await API.post('/student', { ...form, image: imageName })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-800">Student Register</h1>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add Student</h2>
            <p className="text-gray-400 text-sm mt-1">Fill in the student details below</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-500 text-sm rounded-lg">
              {error}
            </div>
          )}

          <StudentForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  )
}