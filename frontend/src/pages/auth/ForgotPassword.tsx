import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF7F2] to-white p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link 
            to="/auth/login" 
            className="inline-flex items-center text-[#4B4B4B] hover:text-[#F68B1F] mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Login
          </Link>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-[#F68B1F] rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Forgot Password</h1>
          <p className="text-[#4B4B4B]">Reset your UIU Healthcare password</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Password Reset</CardTitle>
            <CardDescription>
              This feature is coming soon. Please contact the UIU Medical Center for password reset assistance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-800 mb-2">Contact Information:</p>
              <p className="text-sm text-blue-700">📞 +880-2-8431645</p>
              <p className="text-sm text-blue-700">✉️ medical@uiu.ac.bd</p>
              <p className="text-sm text-blue-700">🏥 UIU Medical Center</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
