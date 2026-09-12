import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient.js";
import { AuthContext } from "../context/AuthContext.js";

export function RegisterForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFormData((previous) => ({ ...previous, [name]: selectedFile }));
      setFileName(selectedFile.name);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // for image preview
    } else {
      setFormData((previous) => ({ ...previous, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("username", formData.username);
      form.append("password", formData.password);
      if (formData.profilePicture) {
        form.append("profilePicture", formData.profilePicture);
      }

      const response = await apiClient("/api/auth/register", {
        method: "POST",
        body: form,
      });

      setUser(response.user);
    } catch (err) {
      setError(err.message || "Unable to create account");
    } finally {
      setIsSubmitting(false);
    }

  };
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  return (
    <section className=" dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-5 py-6 mx-auto md:h-full lg:py-0">
        <div className="w-full rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="flex flex-col items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-3/4 h-40 bg-blue-80 border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-blue-800"
                >
                  <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                      />
                    </svg>
                    <div className="mb-2 text-sm">
                      <p className="text-center font-bold">Profile Photo</p>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </div>
                    <p className="text-xs">PNG, JPG, or WebP up to 5 MB</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="profilePicture"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleChange}
                  />
                </label>

                {/* Feedback: filename + preview */}
                {fileName && (
                  <div className="mt-3 flex flex-col items-center gap-2">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Selected profile preview"
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Selected: <span className="font-medium">{fileName}</span>
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              {error && <p style={{ color: "crimson" }}>{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-70"
              >
                {isSubmitting ? "Creating account..." : "Create an account"}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-medium text-orange-600 hover:underline dark:text-orange-500"
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
