
import React, { useState } from 'react';
import BlockchainAnimation from './BlockchainAnimation';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  let rippleCount = 0;
  const navigate = useNavigate();

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: rippleCount++,
      x,
      y
    };
    
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(currentRipples => 
        currentRipples.filter(ripple => ripple.id !== newRipple.id)
      );
    }, 1000);
  };

  const handleTrackShipments = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    navigate('/dashboard');
  };

  const handleVerifyAuthenticity = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    navigate('/drug-authentication');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <BlockchainAnimation />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-lg">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald bg-opacity-10 text-emerald text-xs font-semibold tracking-wider opacity-0 animate-fade-in">
              BLOCKCHAIN TECHNOLOGY
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight opacity-0 animate-fade-in-delay-1">
              Securing Drug Supply Chains with Blockchain
            </h1>
            
            <p className="text-lg text-navy text-opacity-80 opacity-0 animate-fade-in-delay-2">
              Our platform provides end-to-end visibility and immutable authentication for pharmaceutical supply chains, ensuring patient safety and regulatory compliance.
            </p>
            
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-delay-3">
              <button 
                className="btn-primary ripple-container group"
                onClick={handleTrackShipments}
              >
                Track Shipments
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                {ripples.map(ripple => (
                  <span 
                    key={ripple.id}
                    className="ripple-effect"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                    }}
                  />
                ))}
              </button>
              
              <button 
                className="btn-outline ripple-container"
                onClick={handleVerifyAuthenticity}
              >
                Verify Authenticity
                {ripples.map(ripple => (
                  <span 
                    key={ripple.id}
                    className="ripple-effect"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                    }}
                  />
                ))}
              </button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px] glass rounded-xl shadow-soft overflow-hidden transform animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-navy to-emerald opacity-5"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-emerald bg-opacity-10 flex items-center justify-center animate-pulse-slow">
                  <div className="w-24 h-24 rounded-full bg-emerald bg-opacity-20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
                        <path 
                          d="M7 10L12 15L17 10" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M12 3V15" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-6 left-6 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald"></div>
                <div className="w-3 h-3 rounded-full bg-navy bg-opacity-30"></div>
                <div className="w-3 h-3 rounded-full bg-navy bg-opacity-30"></div>
              </div>
              
              <div className="absolute bottom-6 right-6 text-xs font-mono text-navy text-opacity-50">
                BLOCK #1872654
              </div>
            </div>
            
            {/* Decorative code snippets */}
            <div className="absolute -bottom-4 -left-4 w-64 h-32 glass-dark rounded-lg shadow-soft p-4 text-xs font-mono text-navy opacity-80 transform -rotate-3 animate-fade-in-delay-2">
              <div className="text-emerald">// Verify transaction on blockchain</div>
              <div className="mt-2">
                <span className="text-blue-500">function</span> <span className="text-purple-500">verifyDrugOrigin</span>(id) {'{'}
                <div className="pl-4">
                  <span className="text-blue-500">return</span> blockchain.verify(id);
                </div>
                {'}'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-softgray to-transparent"></div>
    </section>
  );
};

export default Hero;
