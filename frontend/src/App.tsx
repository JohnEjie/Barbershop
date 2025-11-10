import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { AuthModal } from './components/AuthModal';
import { AnimatedHero } from './components/AnimatedHero';
import { ModernServices } from './components/ModernServices';
import { BeforeAfter } from './components/BeforeAfter';
import { WorkGallery } from './components/WorkGallery';
import { PriceCards } from './components/PriceCards';
import { ModernFooter } from './components/ModernFooter';
import { CustomerDashboard } from './components/CustomerDashboard';
import { BarberDashboard } from './components/BarberDashboard';
import { api, type User } from './services/api';
import { LogOut, User as UserIcon, Home as HomeIcon } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(false); // 👈 Add this state

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleGoHome = () => {
    // 👇 Instead of logging out, show landing page but keep user
    setShowLanding(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-500 mb-4">Barbershop</h1>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // 👇 If user clicked "Home", show landing page
  if (showLanding) {
    return (
      <div className="min-h-screen bg-black">
        <Toaster position="top-right" />
        <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-zinc-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-amber-500">Barbershop</h1>
            <button
              onClick={() => setShowLanding(false)} // 👈 go back to dashboard
              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </nav>

        <AnimatedHero onBookClick={() => setShowLanding(false)} />

        <section id="services" className="py-20">
          <ModernServices />
        </section>

        <section className="py-20">
          <BeforeAfter />
        </section>

        <section id="gallery" className="py-20">
          <WorkGallery />
        </section>

        <section id="pricing" className="py-20">
          <PriceCards onBookClick={() => setShowLanding(false)} />
        </section>

        <ModernFooter />
      </div>
    );
  }

  // 👇 If user is logged in and not viewing landing, show dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-black">
        <Toaster position="top-right" />
        
        {/* Header */}
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-amber-500">Barbershop</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <UserIcon className="w-5 h-5" />
                <span>{user.username}</span>
                <span className="text-amber-500 text-sm">({user.role})</span>
              </div>

              {/* ✅ Home Button */}
              <button
                onClick={handleGoHome}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-colors"
              >
                <HomeIcon className="w-4 h-4" />
                Home
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {user.role === 'customer' ? (
          <CustomerDashboard 
            user={user} 
            onLogout={handleLogout}
            onBookNew={() => console.log('Book new appointment')}
          />
        ) : (
          <BarberDashboard user={user} onLogout={handleLogout} />
        )}
      </div>
    );
  }

  // 👇 Default landing page (when no user)
  return (
    <div className="min-h-screen bg-black">
      <Toaster position="top-right" />
      
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-amber-500">Barbershop</h1>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors"
          >
            Sign In / Sign Up
          </button>
        </div>
      </nav>

      <AnimatedHero onBookClick={() => setShowAuthModal(true)} />
      <section id="services" className="py-20"><ModernServices /></section>
      <section className="py-20"><BeforeAfter /></section>
      <section id="gallery" className="py-20"><WorkGallery /></section>
      <section id="pricing" className="py-20"><PriceCards onBookClick={() => setShowAuthModal(true)} /></section>
      <ModernFooter />

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setShowAuthModal(false);
          }}
        />
      )}
    </div>
  );
}
