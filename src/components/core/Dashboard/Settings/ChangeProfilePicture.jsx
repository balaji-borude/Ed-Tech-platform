import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)

      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 text-richblack-5 gap-6">
      
      {/* Left Image */}
      <img
        src={previewSource || user?.image}
        alt={`profile-${user?.firstName}`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
      />

      {/* Right Section */}
      <div className="flex flex-col items-center sm:items-start gap-4 w-full">
        <p className="text-center sm:text-left font-medium">Change Profile Picture</p>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/gif, image/jpeg"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 w-full sm:w-auto"
          >
            Select
          </button>

          <IconBtn
            text={loading ? "Uploading..." : "Upload"}
            onClick={handleFileUpload}
            disabled={loading}
            className="w-full sm:w-auto "
          >
            {!loading && <FiUpload className="text-lg text-richblack-900 text-center" />}
          </IconBtn>
        </div>
      </div>
    </div>
  )
}
