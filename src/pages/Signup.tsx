
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { DollarSign, CheckCircle, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAgreed) {
      toast.error("You must agree to the terms and privacy policy.");
      return;
    }
    
    setIsLoading(true);
    
    // Simulating signup process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      navigate('/');
    }, 1500);
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-background to-muted">
      {/* Left side branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-budget-blue to-budget-teal-dark p-12 text-white flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-10 w-10" />
            <span className="font-bold text-3xl">Budgeta</span>
          </div>
          <h2 className="mt-24 text-4xl font-bold">Start your financial journey</h2>
          <p className="mt-6 text-xl opacity-80">
            Create your account and experience the smarter way to manage your personal finances.
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-budget-teal-light mt-0.5" />
              <p>Track your expenses with intelligent categorization</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-budget-teal-light mt-0.5" />
              <p>Set and achieve your financial goals with ease</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-budget-teal-light mt-0.5" />
              <p>Get personalized insights to improve your financial health</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm opacity-70 mt-auto">
          © {new Date().getFullYear()} Budgeta. All rights reserved.
        </p>
      </div>
      
      {/* Right side form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-budget-blue" />
              <span className="font-bold text-2xl">Budgeta</span>
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-xl p-8 border">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground mt-2">
                Enter your details to get started with Budgeta
              </p>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 8 characters with 1 uppercase, 1 lowercase & 1 number
                </p>
              </div>
              
              <div className="flex items-start space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="agree"
                  className="mt-1 rounded border-gray-300 text-budget-blue focus:ring-budget-blue"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <Label htmlFor="agree" className="text-sm font-normal">
                  I agree to the <Link to="/terms" className="text-budget-blue hover:underline">Terms of Service</Link> and{' '}
                  <Link to="/privacy" className="text-budget-blue hover:underline">Privacy Policy</Link>
                </Label>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create account
                  </div>
                )}
              </Button>
              
              <div className="relative my-4">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-2 text-sm text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2" />
                  </svg>
                  Facebook
                </Button>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-budget-blue font-medium hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
