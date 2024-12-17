import { Camera, LogOut, Mail, Moon, Sun, User, User2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout, notification } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const profileCompletion = () => {
    let completedFields = 0;
    if (authUser?.fullName) completedFields++;
    if (authUser?.username) completedFields++;
    if (authUser?.email) completedFields++;
    return Math.floor((completedFields / 3) * 100);
  };

  const handleThemeToggle = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="h-screen bg-gradient-to-b from-[#002233] to-[#001522] text-[#cdfdff] z-50 overflow-hidden">
      <div className="h-full overflow-y-auto pt-24">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-[#012e3f] rounded-xl p-8 space-y-8 shadow-lg relative z-10">
            {/* Notification */}
            {notification && (
              <div
                className={`fixed top-16 right-4 px-4 py-2 z-50 rounded-md ${
                  notification.type === "success" ? "bg-green-500" : "bg-red-500"
                } text-white shadow-lg`}
              >
                {notification.message}
              </div>
            )}

            {/* Profile Header */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2 text-sm text-[#87cfd8]">Manage your profile details below</p>
            </div>

            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser?.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover border-4 border-[#47e2ff]"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-[#47e2ff] hover:bg-[#38b8d6] p-2 rounded-full cursor-pointer shadow-md ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-[#002233]" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-[#87cfd8]">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* User Information */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-[#87cfd8] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#47e2ff]" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-[#003847] rounded-lg border border-[#47e2ff]">
                  {authUser?.fullName || "Not provided"}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-[#87cfd8] flex items-center gap-2">
                  <User2 className="w-4 h-4 text-[#47e2ff]" />
                  Username
                </div>
                <p className="px-4 py-2.5 bg-[#003847] rounded-lg border border-[#47e2ff]">
                  {authUser?.username || "Not provided"}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-[#87cfd8] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#47e2ff]" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-[#003847] rounded-lg border border-[#47e2ff]">
                  {authUser?.email || "Not provided"}
                </p>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mt-4 bg-[#003847] rounded-xl p-4">
              <h2 className="text-sm font-medium mb-2 text-[#87cfd8]">Profile Completion</h2>
              <div className="w-full bg-[#002833] rounded-full h-3">
                <div
                  className="bg-[#47e2ff] h-3 rounded-full"
                  style={{ width: `${profileCompletion()}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-[#87cfd8]">
                {profileCompletion()}% completed. Fill out all fields to reach 100%!
              </p>
            </div>

            {/* Logout and Theme Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium text-white transition-all shadow-md"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <p>Logout</p>
              </button>
              <button
                onClick={handleThemeToggle}
                className="flex items-center gap-2 px-3 py-2 bg-[#47e2ff]/10 rounded-lg text-sm font-medium hover:bg-[#47e2ff]/20 transition shadow-md"
              >
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-[#47e2ff]" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
                <span className="text-[#47e2ff]">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
