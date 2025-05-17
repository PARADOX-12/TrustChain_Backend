
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Animation for reveal sections
    const revealSections = document.querySelectorAll('.reveal-section');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      rootMargin: '-100px 0px',
      threshold: 0.1
    });
    
    revealSections.forEach(section => {
      revealObserver.observe(section);
    });
    
    return () => {
      revealSections.forEach(section => {
        revealObserver.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-softgray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-section">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald bg-opacity-10 text-emerald text-xs font-semibold tracking-wider mb-3">
                HOW IT WORKS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Blockchain-Powered Supply Chain Management
              </h2>
              <p className="text-navy text-opacity-80">
                Our platform uses distributed ledger technology to create an immutable record of every transaction in the pharmaceutical supply chain.
              </p>
            </div>
            
            <div className="relative py-8 max-w-4xl mx-auto reveal-section">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-navy bg-opacity-10"></div>
              
              {/* Timeline items */}
              <div className="relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center mb-16">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right">
                    <h3 className="text-xl font-bold text-navy mb-2">Product Registration</h3>
                    <p className="text-navy text-opacity-70">
                      Manufacturers register products with unique identifiers on the blockchain, establishing authenticity from the source.
                    </p>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald text-white font-bold">
                    1
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0 hidden md:block"></div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center mb-16">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right hidden md:block"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald text-white font-bold">
                    2
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                    <h3 className="text-xl font-bold text-navy mb-2">Secure Transport</h3>
                    <p className="text-navy text-opacity-70">
                      IoT sensors record environmental conditions during transport, and all custody transfers are documented on the blockchain.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center mb-16">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right">
                    <h3 className="text-xl font-bold text-navy mb-2">Distribution Tracking</h3>
                    <p className="text-navy text-opacity-70">
                      Distributors verify incoming shipments and record outgoing deliveries, maintaining the chain of custody.
                    </p>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald text-white font-bold">
                    3
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0 hidden md:block"></div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right hidden md:block"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald text-white font-bold">
                    4
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                    <h3 className="text-xl font-bold text-navy mb-2">End-User Verification</h3>
                    <p className="text-navy text-opacity-70">
                      Pharmacies and healthcare providers verify product authenticity before dispensing to patients, completing the secure supply chain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-section">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald bg-opacity-10 text-emerald text-xs font-semibold tracking-wider mb-3">
                BENEFITS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Why Choose TrustChain
              </h2>
              <p className="text-navy text-opacity-80">
                Our blockchain solution offers unique advantages for pharmaceutical supply chain management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-section">
              {/* Benefit 1 */}
              <div className="bg-softgray p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-emerald bg-opacity-10 flex items-center justify-center mb-4">
                  <span className="text-emerald font-bold text-xl">01</span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">Tamper-Proof Records</h3>
                <p className="text-navy text-opacity-70">
                  Immutable blockchain records prevent fraudulent data manipulation.
                </p>
              </div>
              
              {/* Benefit 2 */}
              <div className="bg-softgray p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-emerald bg-opacity-10 flex items-center justify-center mb-4">
                  <span className="text-emerald font-bold text-xl">02</span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">Full Transparency</h3>
                <p className="text-navy text-opacity-70">
                  End-to-end visibility throughout the supply chain for all stakeholders.
                </p>
              </div>
              
              {/* Benefit 3 */}
              <div className="bg-softgray p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-emerald bg-opacity-10 flex items-center justify-center mb-4">
                  <span className="text-emerald font-bold text-xl">03</span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">Immediate Recalls</h3>
                <p className="text-navy text-opacity-70">
                  Quickly identify and recall affected products with precision.
                </p>
              </div>
              
              {/* Benefit 4 */}
              <div className="bg-softgray p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-emerald bg-opacity-10 flex items-center justify-center mb-4">
                  <span className="text-emerald font-bold text-xl">04</span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">Cost Efficiency</h3>
                <p className="text-navy text-opacity-70">
                  Reduce overhead costs associated with supply chain management.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-20 bg-navy text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center reveal-section">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Secure Your Supply Chain?
              </h2>
              <p className="text-white text-opacity-80 mb-8">
                Join leading pharmaceutical companies already using TrustChain to secure their supply chains and ensure medication safety and integrity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-emerald text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all active:scale-95">
                  Request a Demo
                </button>
                <button className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-all active:scale-95">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
