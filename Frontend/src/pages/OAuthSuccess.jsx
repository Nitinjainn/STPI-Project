// src/pages/OAuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const _id = searchParams.get("_id");
    const profileCompleted = searchParams.get("profileCompleted") === "true";
    const redirectTo = searchParams.get("redirectTo");

    if (token && name && email && _id) {
      // ✅ Save full user with _id to context/localStorage
      const userData = { _id, name, email, profileCompleted };
      login(userData, token);
      
      // Redirect based on profile completion
      if (!profileCompleted) {
        navigate("/complete-profile");
      } else if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate("/dashboard");
      }
    } else {
      // 🔁 fallback if something went wrong
      console.warn("OAuth response missing fields");
      navigate("/login");
    }
  }, []);

  return (
    <div className="text-center mt-20 text-lg font-medium text-gray-800">
      Logging you in via OAuth...
    </div>
  );
}

export default OAuthSuccess;
