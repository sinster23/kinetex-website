import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    // Validate form fields
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    } else if (!formData.email.endsWith('@kiit.ac.in')) {
      newErrors.email = 'Only @kiit.ac.in email addresses are allowed';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    
    // Don't proceed if there are validation errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPopupMessage('Sign in successful!');
      setShowPopup(true);
      setIsSignedIn(true); // Set user as signed in
    }, 2000);
  };

  const handleGoogleLogin = () => {
    // Check if user is signed in first
    if (!isSignedIn) {
      setPopupMessage('Please sign in first to use Google login');
      setShowPopup(true);
      return;
    }

    // Simulate Google OAuth response with email
    // In real implementation, you would get this from Google OAuth
    const mockGoogleEmail = 'user@gmail.com'; // This would come from Google OAuth
    
    // Check if the email is from kiit.ac.in domain
    if (mockGoogleEmail.endsWith('@kiit.ac.in')) {
      setPopupMessage('Google Login Successful');
      setShowPopup(true);
    } else {
      setPopupMessage('Only @kiit.ac.in email addresses are allowed for Google login');
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-start pl-20 pr-10 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleGoogleLogin}
              disabled={!isSignedIn}
              className={`w-full ${!isSignedIn ? 'bg-gray-900 cursor-not-allowed opacity-50' : 'bg-gray-800 hover:bg-gray-700'} border border-gray-700 rounded-lg py-4 px-6 flex items-center justify-center gap-3 transition-all duration-200 ${isSignedIn ? 'hover:border-gray-600' : ''}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className={`font-medium ${!isSignedIn ? 'text-gray-500' : 'text-white'}`}>
                {!isSignedIn ? 'Sign in first to use Google' : 'Log in with Google'}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-400">OR</span>
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-3">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your @kiit.ac.in email address"
              className={`w-full bg-transparent border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg py-4 px-4 text-white placeholder-gray-500 focus:outline-none ${errors.email ? 'focus:border-red-400' : 'focus:border-gray-500'} transition-colors duration-200`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-300 text-sm">Password</label>
              <button className="text-gray-400 hover:text-white text-sm underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className={`w-full bg-transparent border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg py-4 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none ${errors.password ? 'focus:border-red-400' : 'focus:border-gray-500'} transition-colors duration-200`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>

          {/* Sign up link */}
          <p className="text-gray-400 text-center">
            Have an account?{' '}
            <button className="text-white hover:text-gray-300 underline">
              Log in
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Join Our Society with 3D Animation */}
      <div className="flex-1 relative flex flex-col justify-center items-center p-20">
        {/* Join Our Society Text */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Society</span>
          </h2>
          <p className="text-gray-400 text-xl">Be part of something extraordinary</p>
        </div>

        {/* 3D Animated Elements */}
        <div className="relative w-96 h-96 flex items-center justify-center">
          {/* Main 3D Cube */}
          <div 
            className="relative w-32 h-32 transform-gpu"
            style={{ 
              animation: 'float 4s ease-in-out infinite, rotate3d 8s linear infinite'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 transform rotate-12 rounded-lg opacity-80 shadow-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform -rotate-12 rounded-lg opacity-60 shadow-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg opacity-90 shadow-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
          </div>

          {/* Orbiting Elements */}
          <div 
            className="absolute inset-0"
            style={{ animation: 'spin 20s linear infinite' }}
          >
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-8 shadow-lg"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-400 rounded-full transform -translate-x-1/2 translate-y-8 shadow-lg"></div>
            <div className="absolute left-0 top-1/2 w-4 h-4 bg-indigo-400 rounded-full transform -translate-x-8 -translate-y-1/2 shadow-lg"></div>
            <div className="absolute right-0 top-1/2 w-4 h-4 bg-cyan-400 rounded-full transform translate-x-8 -translate-y-1/2 shadow-lg"></div>
          </div>

          {/* Inner Orbiting Ring */}
          <div 
            className="absolute inset-8"
            style={{ animation: 'spin 15s linear infinite reverse' }}
          >
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-pink-400 rounded-full transform -translate-x-1/2 -translate-y-6 opacity-80"></div>
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-emerald-400 rounded-full transform -translate-x-1/2 translate-y-6 opacity-80"></div>
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-orange-400 rounded-full transform -translate-x-6 -translate-y-1/2 opacity-80"></div>
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-violet-400 rounded-full transform translate-x-6 -translate-y-1/2 opacity-80"></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute w-2 h-2 bg-purple-300 rounded-full top-12 left-12 animate-pulse opacity-60"></div>
          <div 
            className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full top-16 right-16 animate-pulse opacity-70"
            style={{ animationDelay: '300ms' }}
          ></div>
          <div 
            className="absolute w-2.5 h-2.5 bg-indigo-300 rounded-full bottom-12 left-20 animate-pulse opacity-50"
            style={{ animationDelay: '700ms' }}
          ></div>
          <div 
            className="absolute w-1 h-1 bg-cyan-300 rounded-full bottom-20 right-12 animate-pulse opacity-80"
            style={{ animationDelay: '1000ms' }}
          ></div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            Join Now
          </button>
          <p className="text-gray-500 text-sm mt-3">Connect • Create • Collaborate</p>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2000ms' }}></div>
      </div>

      {/* Success/Error Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-600 rounded-2xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className={`w-16 h-16 ${popupMessage.includes('Only @kiit.ac.in') || popupMessage.includes('Please sign in first') ? 'bg-red-500' : 'bg-green-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {popupMessage.includes('Only @kiit.ac.in') || popupMessage.includes('Please sign in first') ? (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {popupMessage.includes('Only @kiit.ac.in') || popupMessage.includes('Please sign in first') ? 'Access Denied' : 'Success!'}
              </h3>
              <p className="text-gray-300 mb-6">{popupMessage}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 w-full"
              >
                {popupMessage.includes('Only @kiit.ac.in') || popupMessage.includes('Please sign in first') ? 'Try Again' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes rotate3d {
          from { transform: rotateY(0deg) rotateX(0deg); }
          25% { transform: rotateY(90deg) rotateX(15deg); }
          50% { transform: rotateY(180deg) rotateX(0deg); }
          75% { transform: rotateY(270deg) rotateX(-15deg); }
          to { transform: rotateY(360deg) rotateX(0deg); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}