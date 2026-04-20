import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../api/axios'

export default function StudentForm({ initialData = {}, onSubmit, loading }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName:    initialData.fullName    || '',
    dob:         initialData.dob         || '',
    gender:      initialData.gender      || '',
    email:       initialData.email       || '',
    phoneNumber: initialData.phoneNumber || '',
    address:     initialData.address     || '',
    grade:       initialData.grade       || '',
  })
  const [imageFile, setImageFile]     = useState(null)
  const [imagePreview, setImagePreview] = useState(
    initialData.image ? initialData.image : null
)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file)) 
    }
}

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form, imageFile)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Image Upload */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
          {imagePreview ? (
            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
              No Image
            </div>
          )}
        </div>
        <label className="cursor-pointer text-sm text-blue-500 hover:underline">
          Upload Photo
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      </div>

      {/* Full Name */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          required
        />
      </div>

      {/* DOB + Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          required
        />
      </div>

      {/* Address */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter address"
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
          required
        />
      </div>

      {/* Grade */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Grade</label>
        <input
          name="grade"
          value={form.grade}
          onChange={handleChange}
          placeholder="e.g. 12"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

    </form>
  )
}