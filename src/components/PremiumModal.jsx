import React, { useState } from 'react';
import { X, Crown, Check, Star, Download, Zap, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PremiumModal = ({ isOpen, onClose, user }) => {
  const { purchasePremium } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      purchasePremium(user.email);
      setIsProcessing(false);
      alert('Premium subscription activated successfully!');
      onClose();
    }, 2000);
  };

  const premiumFeatures = [
    {
      icon: <Download className="w-5 h-5" />,
      title: 'Unlimited Downloads',
      description: 'Download as many movies as you want without any limits'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'High-Speed Downloads',
      description: 'Get priority access to our fastest download servers'
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: 'Premium Quality',
      description: 'Access to exclusive 4K, HDR, and IMAX quality content'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Ad-Free Experience',
      description: 'Enjoy browsing and downloading without any advertisements'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10 text-white fill-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {user?.isPremium ? 'Premium Active' : 'Upgrade to Premium'}
            </h2>
            <p className="text-gray-400">
              {user?.isPremium 
                ? 'You have access to all premium features' 
                : 'Unlock unlimited downloads and premium features'
              }
            </p>
          </div>

          {user?.isPremium ? (
            /* Premium Active View */
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center space-x-2 text-green-400 mb-4">
                  <Check className="w-6 h-6" />
                  <span className="text-xl font-semibold">Premium Subscription Active</span>
                </div>
                <p className="text-gray-300">
                  Thank you for being a premium member! Enjoy unlimited access to all features.
                </p>
              </div>

              {/* Premium Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 text-left">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-yellow-400">
                        {feature.icon}
                      </div>
                      <h3 className="text-white font-semibold">{feature.title}</h3>
                      <Check className="w-4 h-4 text-green-400 ml-auto" />
                    </div>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Purchase View */
            <>
              {/* Pricing */}
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6 mb-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">₹299</div>
                <div className="text-gray-300 mb-4">Lifetime Premium Access</div>
                <div className="text-sm text-yellow-300">
                  One-time payment • No recurring charges
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-yellow-400">
                        {feature.icon}
                      </div>
                      <h3 className="text-white font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5" />
                    <span>Purchase Premium - ₹299</span>
                  </>
                )}
              </button>

              {/* Demo Notice */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-6">
                <p className="text-blue-300 text-sm text-center">
                  <strong>Demo Mode:</strong> This is a demonstration. No actual payment will be processed.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;