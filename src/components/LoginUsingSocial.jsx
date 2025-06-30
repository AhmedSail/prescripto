import React, { useContext } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook } from "react-icons/fa6";
import { AppointmentContext } from "../context/AppointmentContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid"; // تأكد من استيراد uuidv4

const LoginUsingSocial = ({ formData, setFormData }) => {
  const { users, addUser, navigate, setFromSocial } =
    useContext(AppointmentContext);
  const { loginUser, setIsAuthenticated, setUser } = useAuth(); // تم تغيير اسم الدالة إلى loginUser لتطابق AuthContext

  const LoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`, // تم تصحيح الخطأ الإملائي هنا
            },
          }
        );
        const userInfo = await res.json();
        console.log("🔍 Picture URL:", userInfo.picture);
        // البحث عن المستخدم الموجود في قاعدة البيانات المحلية الخاصة بك عن طريق البريد الإلكتروني
        const existingUser = users.find(
          (user) => user.email === userInfo.email
        );

        if (existingUser) {
          // المستخدم موجود، قم بتسجيل دخوله باستخدام بياناته المخزنة
          toast.success("Login Successfully");
          loginUser(existingUser, tokenResponse.access_token); // تمرير كائن existingUser الذي يحتوي على _id
          navigate(`/${existingUser._id}/`); // التنقل باستخدام _id الخاص بالمستخدم الموجود
        } else {
          // تسجيل مستخدم جديد عبر Google
          const newUser = {
            _id: uuidv4(), // إنشاء UUID جديد للمستخدم الجديد
            name: userInfo.name,
            email: userInfo.email,
            images: userInfo.picture,
            type: "Google",
            role: "user",
            // تهيئة الحقول الأخرى بقيم افتراضية لأنها مطلوبة في مكون Register
            age: 0,
            country: "",
            city: "",
            phone: "",
            address1: "",
            address2: "",
            appointments: [],
            gender: "Gender",
          };

          addUser(newUser); // إضافة المستخدم الجديد إلى قاعدة البيانات المحلية
          toast.success("Register Successfully!, Please Complete Your Profile");
          setIsAuthenticated(true);
          setUser(newUser);
          localStorage.setItem("token", tokenResponse.access_token);
          localStorage.setItem("userData", JSON.stringify(newUser));
          localStorage.setItem("userId", newUser._id);
          setFromSocial(true);
          navigate(`/${newUser._id}/Info`); // إعادة توجيه المستخدمين الجدد إلى صفحة Info لإكمال الملف الشخصي
        }
        console.log("Google User Info:", userInfo);
      } catch (error) {
        console.error("Error fetching Google user data:", error);
        toast.error("An error occurred during Google login/registration.");
      }
    },
    onError: () => toast.error("Google login failed."),
  });

  const fetchFacebookData = async (accessToken) => {
    try {
      const res = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
      );
      const data = await res.json();
      console.log("📥 Fetched from Graph API:", data);
      return data;
    } catch (err) {
      console.error("❌ Failed to fetch Facebook data:", err);
      return null;
    }
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="google"
        className="w-7 h-7 cursor-pointer"
        onClick={LoginGoogle}
      />
      <FacebookLogin
        appId="625684129790806"
        scope="public_profile,email"
        fields="name,email,picture"
        onSuccess={async (response) => {
          const userData = await fetchFacebookData(response.accessToken);
          if (!userData) {
            toast.error("فشل في جلب بيانات المستخدم من Facebook");
            return;
          }

          // البحث عن المستخدم الموجود في قاعدة البيانات المحلية الخاصة بك عن طريق البريد الإلكتروني
          const existingUser = users.find(
            (user) => user.email === userData.email
          );

          if (existingUser) {
            // المستخدم موجود، قم بتسجيل دخوله باستخدام بياناته المخزنة
            toast.success("Login Successfully");
            loginUser(existingUser, response.accessToken); // تمرير كائن existingUser الذي يحتوي على _id
            navigate(`/${existingUser._id}/`); // التنقل باستخدام _id الخاص بالمستخدم الموجود
          } else {
            // تسجيل مستخدم جديد عبر Facebook
            const newUser = {
              _id: uuidv4(), // إنشاء UUID جديد للمستخدم الجديد
              name: userData.name,
              email: userData.email,
              images: userData.picture?.data?.url,
              type: "Facebook",
              role: "user",
              // تهيئة الحقول الأخرى بقيم افتراضية
              age: 0,
              country: "",
              city: "",
              phone: "",
              address1: "",
              address2: "",
              appointments: [],
              gender: "Gender",
            };

            addUser(newUser); // إضافة المستخدم الجديد إلى قاعدة البيانات المحلية
            toast.success(
              "Register Successfully!, Please Complete Your Profile"
            );
            setIsAuthenticated(true);
            setUser(newUser);
            localStorage.setItem("token", response.accessToken);
            localStorage.setItem("userData", JSON.stringify(newUser));
            localStorage.setItem("userId", newUser._id);
            setFromSocial(true);
            navigate(`/${newUser._id}/Info`); // إعادة توجيه المستخدمين الجدد إلى صفحة Info لإكمال الملف الشخصي
          }
        }}
        onFail={(error) => {
          console.error("فشل تسجيل الدخول", error);
          toast.error("Facebook login failed.");
        }}
        render={({ onClick }) => (
          <FaFacebook
            className="w-7 h-7 text-[#4267B2] cursor-pointer"
            onClick={onClick}
          />
        )}
      />
    </div>
  );
};

export default LoginUsingSocial;
