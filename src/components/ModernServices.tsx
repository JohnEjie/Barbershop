import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Scissors, Sparkles, Droplet, Crown } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'GUPIT POGI',
    price: '₱200',
    description: 'Classic cuts and trendy fades',
    features: ['Standard Cuts', 'Fades & Undercuts', 'Hair Designs', 'Long Hair Maintenance'],
    popular: true,
  },
  {
    icon: Sparkles,
    title: 'HAIR COLORING',
    price: '₱500',
    description: 'Full color and gray blending',
    features: ['Full Hair Coloring', 'Gray Blending', 'Root Touch-ups', 'Bleaching'],
  },
  {
    icon: Droplet,
    title: 'BEARD GROOMING & SHAVE',
    price: '₱150',
    description: 'Facial hair styling and care',
    features: ['Beard Shaping', 'Hot Towel Treatment', 'Conditioning', 'Oil Application'],
  },
  {
    icon: Crown,
    title: 'FULL PACKAGE',
    price: '₱800',
    description: 'Complete grooming experience',
    features: ['Haircut + Beard', 'Hair Coloring', 'Face Mask', 'Head Massage'],
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -45 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={item}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative p-8 border-2 cursor-pointer ${
        service.popular 
          ? 'border-amber-500 bg-gradient-to-b from-amber-500/10 to-transparent' 
          : 'border-white/10 hover:border-amber-500/50'
      } transition-colors group`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 border-2 border-amber-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1.05 : 0,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {service.popular && (
        <motion.div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 text-xs tracking-wider"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          POPULAR
        </motion.div>
      )}
      
      <div className="flex justify-center mb-6 relative">
        <motion.div 
          className="w-16 h-16 border-2 border-amber-500 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors relative"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <service.icon className="w-8 h-8" />
          </motion.div>
          
          {/* Orbiting particles */}
          {isHovered && [...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-500 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                rotate: 360,
                x: [0, 40 * Math.cos((i * 120 * Math.PI) / 180)],
                y: [0, 40 * Math.sin((i * 120 * Math.PI) / 180)],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      <motion.h3 
        className="text-xl mb-2 text-center tracking-wider"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
      >
        {service.title}
      </motion.h3>
      
      <motion.div 
        className="text-4xl text-amber-500 text-center mb-2"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
      >
        {service.price}
      </motion.div>
      
      <p className="text-neutral-400 text-center mb-6 text-sm">{service.description}</p>

      <motion.ul 
        className="space-y-2"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
      >
        {service.features.map((feature, idx) => (
          <motion.li 
            key={idx} 
            className="flex items-center gap-2 text-sm text-neutral-300"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <motion.div 
              className="w-1 h-1 bg-amber-500 rounded-full"
              animate={isHovered ? { scale: [1, 2, 1] } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            />
            {feature}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export function ModernServices() {
  return (
    <section 
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/gallery/services.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/65" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5 z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-amber-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl mb-4 inline-block"
            whileHover={{ scale: 1.05 }}
          >
            {'SERVICES'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                whileHover={{ 
                  y: -20,
                  color: '#f59e0b',
                  rotate: Math.random() * 20 - 10,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: '100%', maxWidth: 384 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}




