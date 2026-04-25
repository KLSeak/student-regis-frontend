import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import StudentForm from '../components/StudentForm'

export default function AddStudent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (form, imageFile) => {
    setLoading(true)
    setError('')
    try {
      let imageName = ''

      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        const uploadRes = await API.post('/upload', formData)
        console.log('Upload response:', uploadRes.data)
        imageName = uploadRes.data.filename
        console.log('Image URL:', imageName)
      }

      await API.post('/student', { ...form, image: imageName })
      console.log('Student saved with image:', imageName)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Add Student</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in the student details</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-500 text-sm rounded-lg">
            {error}
          </div>
        )}

        <StudentForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}