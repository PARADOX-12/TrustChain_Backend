
import React, { useEffect, useRef } from 'react';
import { Shield, Activity, ClipboardCheck } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('active');
          // Once animation is triggered, disconnect the observer
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '-100px 0px',
      threshold: 0.1
    });
    
    observer.observe(section);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      icon: <Activity className="h-10 w-10 text-emerald" />,
      title: "Real-Time Drug Tracking",
      description: "Monitor pharmaceutical products from manufacturing to patient delivery with immutable blockchain records and real-time location data."
    },
    {
      icon: <Shield className="h-10 w-10 text-emerald" />,
      title: "Counterfeit Prevention",
      description: "Verify authenticity with cryptographic proof, eliminating counterfeit medications from entering the legitimate supply chain."
    },
    {
      icon: <ClipboardCheck className="h-10 w-10 text-emerald" />,
      title: "Regulatory Compliance",
      description: "Automatically maintain documentation for regulatory requirements with tamper-proof records and complete chain of custody."
    }
  ];

  return (
    <section 
      id="features" 
      className="py-20 bg-white"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-section">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald bg-opacity-10 text-emerald text-xs font-semibold tracking-wider mb-3">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Transforming Pharmaceutical Supply Chains
          </h2>
          <p className="text-navy text-opacity-80">
            Our blockchain platform provides unparalleled visibility, security, and efficiency
            for pharmaceutical logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-soft p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] reveal-section"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald bg-opacity-10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">
                {feature.title}
              </h3>
              <p className="text-navy text-opacity-70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
