const handleSubmit = async (form, imageFile) => {
  setLoading(true)
  setError('')
  try {
    let imageName = ''

    if (imageFile) {
      const formData = new FormData()
      formData.append('file', imageFile)
      const uploadRes = await API.post('/upload', formData)
      console.log('Upload response:', uploadRes.data) // ✅ add this
      imageName = uploadRes.data.filename
      console.log('Image URL:', imageName) // ✅ add this
    }

    await API.post('/student', { ...form, image: imageName })
    console.log('Student saved with image:', imageName) // ✅ add this
    navigate('/dashboard')
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to add student!')
  } finally {
    setLoading(false)
  }
}