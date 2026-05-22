import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Subjects": "Subjects",
      "PYQ": "PYQ",
      "Profile": "Profile",
      "Login": "Login",
      "Master Your Studies with": "Master Your Studies with",
      "DP Coaching Center": "DP Coaching Center",
      "Expert guidance": "Expert guidance, comprehensive notes, and structured learning under the mentorship of",
      "Join Now": "Join Now",
      "Explore Subjects": "Explore Subjects",
      "Why Choose Us?": "Why Choose Us?",
      "WhyChooseDesc": "Everything you need to excel in your board examinations.",
      "Expert Notes": "Expert Notes",
      "ExpertNotesDesc": "Comprehensive study materials prepared by top educators.",
      "PYQ Solutions": "PYQ Solutions",
      "PYQDesc": "Detailed solutions for previous year board questions.",
      "Student Tracking": "Student Tracking",
      "StudentTrackingDesc": "Regular tests and progress monitoring for all students.",
      "Welcome Back": "Welcome Back",
      "Login to access": "Login to access your study portal",
      "Email Address": "Email Address",
      "Password": "Password",
      "Forgot password?": "Forgot password?",
      "Sign In": "Sign In",
      "Don't have an account?": "Don't have an account?",
      "Register here": "Register here",
      "Explore": "Explore",
      "Choose a subject": "Choose a subject to view detailed syllabus, access expert notes, and track your progress.",
      "View Notes": "View Notes",
      "View All Notes": "View All Notes",
      "Student Profile": "Student Profile",
      "Manage your personal info": "Manage your personal information and preferences.",
      "Full Name": "Full Name",
      "Class": "Class",
      "Target Exam": "Target Exam",
      "Medium": "Medium",
      "Save Changes": "Save Changes",
      "Previous Year": "Previous Year",
      "Questions": "Questions",
      "Practice with original": "Practice with original board papers to evaluate your preparation.",
      "View": "View",
      "Download": "Download",
      "Active Students": "Active Students",
      "Subject Experts": "Subject Experts",
      "Success Rate": "Success Rate",
      "Years Experience": "Years Experience"
    }
  },
  hi: {
    translation: {
      "Home": "होम",
      "Subjects": "विषय",
      "PYQ": "पिछले वर्ष के प्रश्न",
      "Profile": "प्रोफ़ाइल",
      "Login": "लॉगिन",
      "Master Your Studies with": "अपनी पढ़ाई में महारत हासिल करें",
      "DP Coaching Center": "डीपी कोचिंग सेंटर",
      "Expert guidance": "के मार्गदर्शन में विशेषज्ञ सलाह, व्यापक नोट्स और संरचित शिक्षा",
      "Join Now": "अभी जुड़ें",
      "Explore Subjects": "विषयों का अन्वेषण करें",
      "Why Choose Us?": "हमें क्यों चुनें?",
      "WhyChooseDesc": "आपके बोर्ड परीक्षाओं में उत्कृष्टता प्राप्त करने के लिए आवश्यक सब कुछ।",
      "Expert Notes": "विशेषज्ञ नोट्स",
      "ExpertNotesDesc": "शीर्ष शिक्षकों द्वारा तैयार व्यापक अध्ययन सामग्री।",
      "PYQ Solutions": "पीवाईक्यू समाधान",
      "PYQDesc": "पिछले वर्ष के बोर्ड प्रश्नों के विस्तृत समाधान।",
      "Student Tracking": "छात्र ट्रैकिंग",
      "StudentTrackingDesc": "सभी छात्रों के लिए नियमित परीक्षण और प्रगति की निगरानी।",
      "Welcome Back": "वापसी पर स्वागत है",
      "Login to access": "अपने अध्ययन पोर्टल तक पहुंचने के लिए लॉगिन करें",
      "Email Address": "ईमेल पता",
      "Password": "पासवर्ड",
      "Forgot password?": "पासवर्ड भूल गए?",
      "Sign In": "साइन इन करें",
      "Don't have an account?": "क्या आपके पास खाता नहीं है?",
      "Register here": "यहां पंजीकरण करें",
      "Explore": "अन्वेषण करें",
      "Choose a subject": "विस्तृत पाठ्यक्रम देखने, विशेषज्ञ नोट्स तक पहुंचने और अपनी प्रगति को ट्रैक करने के लिए एक विषय चुनें।",
      "View Notes": "नोट्स देखें",
      "View All Notes": "सभी नोट्स देखें",
      "Student Profile": "छात्र प्रोफ़ाइल",
      "Manage your personal info": "अपनी व्यक्तिगत जानकारी और प्राथमिकताएं प्रबंधित करें।",
      "Full Name": "पूरा नाम",
      "Class": "कक्षा",
      "Target Exam": "लक्ष्य परीक्षा",
      "Medium": "माध्यम",
      "Save Changes": "परिवर्तन सहेजें",
      "Previous Year": "पिछले वर्ष के",
      "Questions": "प्रश्न",
      "Practice with original": "अपनी तैयारी का मूल्यांकन करने के लिए मूल बोर्ड पेपर के साथ अभ्यास करें।",
      "View": "देखें",
      "Download": "डाउनलोड करें",
      "Active Students": "सक्रिय छात्र",
      "Subject Experts": "विषय विशेषज्ञ",
      "Success Rate": "सफलता दर",
      "Years Experience": "वर्षों का अनुभव"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
