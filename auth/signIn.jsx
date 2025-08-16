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
    }, 2000);
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth response with email
    // In real implementation, you would get this from Google OAuth
  const mockGoogleEmail = 'student@kiit.ac.in';
    
    // Check if the email is from kiit.ac.in domain
    if (mockGoogleEmail.endsWith('@kiit.ac.in')) {
      setPopupMessage('Login Successful');
      setShowPopup(true);
    } else {
      setPopupMessage('Only @kiit.ac.in email addresses are allowed for Google login');
      setShowPopup(true);
    }
  };

  const handleAppleLogin = () => {
    setPopupMessage('Login Successful');
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-start pl-20 pr-10 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
            <p className="text-gray-400 text-lg">Log in to Kindle3D to continue to Kindle3D.</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg py-4 px-6 flex items-center justify-center gap-3 transition-all duration-200 hover:border-gray-600"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-white font-medium">Log in with Google</span>
            </button>

            <button
              onClick={handleAppleLogin}
              className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg py-4 px-6 flex items-center justify-center gap-3 transition-all duration-200 hover:border-gray-600"
            >
              <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-white font-medium">Log in with Apple</span>
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Log in'
            )}
          </button>

          {/* Sign up link */}
          <p className="text-gray-400 text-center">
            Don't have an account?{' '}
            <button className="text-white hover:text-gray-300 underline">
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Right side - 3D Graphics and Stats */}
      <div className="flex-1 relative flex flex-col justify-between p-20">
        {/* Top right - Join button */}
        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
            Join Now
          </button>
        </div>

        {/* Center - 3D Object */}
        <div className="flex items-center justify-center relative">
          <div className="relative w-80 h-80">
            {/* 3D Wireframe Object */}
            <svg
              width="320"
              height="320"
              viewBox="0 0 320 320"
              className="absolute inset-0 animate-pulse"
            >
              {/* Wireframe cube/geometric shape */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              
              {/* Top face */}
              <polygon
                points="160,60 240,100 160,140 80,100"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                opacity="0.6"
              />
              
              {/* Bottom face */}
              <polygon
                points="160,180 240,220 160,260 80,220"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                opacity="0.6"
              />
              
              {/* Connecting lines */}
              <line x1="80" y1="100" x2="80" y2="220" stroke="url(#gradient)" strokeWidth="2" opacity="0.4" />
              <line x1="240" y1="100" x2="240" y2="220" stroke="url(#gradient)" strokeWidth="2" opacity="0.4" />
              <line x1="160" y1="60" x2="160" y2="180" stroke="url(#gradient)" strokeWidth="2" opacity="0.4" />
              <line x1="160" y1="140" x2="160" y2="260" stroke="url(#gradient)" strokeWidth="2" opacity="0.4" />
              
              {/* Corner points */}
              <circle cx="160" cy="60" r="3" fill="#8B5CF6" />
              <circle cx="240" cy="100" r="3" fill="#8B5CF6" />
              <circle cx="160" cy="140" r="3" fill="#8B5CF6" />
              <circle cx="80" cy="100" r="3" fill="#8B5CF6" />
              <circle cx="160" cy="180" r="3" fill="#3B82F6" />
              <circle cx="240" cy="220" r="3" fill="#3B82F6" />
              <circle cx="160" cy="260" r="3" fill="#3B82F6" />
              <circle cx="80" cy="220" r="3" fill="#3B82F6" />
            </svg>
            
            {/* Rotation indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <svg width="60" height="20" viewBox="0 0 60 20">
                <path
                  d="M 10 10 A 20 20 0 1 1 50 10"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  opacity="0.5"
                />
                <polygon
                  points="50,10 45,7 45,13"
                  fill="url(#gradient)"
                  opacity="0.7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom right - Stats */}
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-300 mb-2">
            400K+ users. 50M+ AI<br />
            generated graphics.
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Success/Error Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-600 rounded-2xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className={`w-16 h-16 ${popupMessage.includes('Only @kiit.ac.in') ? 'bg-red-500' : 'bg-green-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {popupMessage.includes('Only @kiit.ac.in') ? (
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
                {popupMessage.includes('Only @kiit.ac.in') ? 'Access Denied' : 'Success!'}
              </h3>
              <p className="text-gray-300 mb-6">{popupMessage}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 w-full"
              >
                {popupMessage.includes('Only @kiit.ac.in') ? 'Try Again' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}