import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const {
    profileData,
    loadingProfile,
    wallpaper,
    setWallpaper,
    bubbleColor,
    setBubbleColor,
  } = useContext(AppContext);

  if (loadingProfile) return (<Loading />);
  if (!profileData) return <Loading />;

  // Handle wallpaper file selection
  const handleWallpaperChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setWallpaper(base64);
        localStorage.setItem("chatWallpaper", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle bubble color change
  const handleBubbleColorChange = (color) => {
    setBubbleColor(color);
    localStorage.setItem("bubbleColor", color);
  };

  // Predefined colors
  const predefinedColors = [
    "#16a34a", // Green
    "#2563eb", // Blue
    "#db2777", // Pink
    "#d97706", // Orange
    "#7c3aed", // Purple
    "#ef4444", // Red
    "#0891b2", // Teal
    "#6b7280", // Gray
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-2 items-start justify-center px-8 py-2 bg-[#fcf5eb]">
      {/* Left: User Details */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 px-8 relative">
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-2 mt-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500">
            {profileData.name?.[0] || "U"}
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">{profileData.name}</h1>
          <p className="text-gray-600 text-sm">{profileData.email}</p>
        </div>

        {/* Wallpaper Selector */}
        <div>
          <label className="block text-gray-700 text-sm mb-1">Chat Wallpaper</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleWallpaperChange}
            className="block w-full text-sm border text-black border-gray-300 rounded p-2 bg-white"
          />
          {wallpaper && (
            <div className="mt-2">
              <img
                src={wallpaper}
                alt="Wallpaper Preview"
                className="w-full h-40 object-cover rounded border"
              />
            </div>
          )}
        </div>

        {/* Bubble Color Selector */}
        <div>
          <label className="block text-gray-700 text-sm mb-1">Chat Bubble Color</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() => handleBubbleColorChange(color)}
                className={`w-8 h-8 rounded border-2 ${bubbleColor === color ? "border-black" : "border-transparent"}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex w-full items-center">
          {/* Logout Button */}
          <div
            className="card bg-black rounded-2xl grid h-10 grow place-items-center  hover:bg-gray-800 transition"
            onClick={() => {
              // You can customize your logout logic here:
              localStorage.clear();
              navigate("/login");
            }}
          >Logout</div>
          <div className="divider divider-horizontal text-black ">OR</div>
          {/* Return to Home Button */}
          <div
            onClick={() => navigate("/home")}
            className="card bg-black rounded-2xl grid h-10 grow place-items-center  hover:bg-gray-800 transition"
          >Home</div>

        </div>
      </div>

      {/* Right: Preview */}
      <aside className="hidden md:flex w-1/2 justify-center">
        <div className="mockup-phone border-primary">
          <div className="mockup-phone-camera w-20 h-4"></div>
          <div
            className="mockup-phone-display h-135 w-70"
            style={{
              backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex justify-end items-end h-full p-4 pb-8">
              <div
                className="max-w-[70%] px-3 py-2 text-white text-sm rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                style={{ backgroundColor: bubbleColor }}
              >
                This is how your chat bubble will look.
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Profile;
