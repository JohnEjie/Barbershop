import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface PriceCardsProps {
  onBookClick: () => void;
}

const packages = [
  {
    name: 'ESSENTIAL',
    price: 500,
    features: [
      'Precision Haircut',
      'Wash & Style',
      'Hot Towel Service',
      'Complimentary Drink',
    ],
  },
  {
    name: 'PREMIUM',
    price: 850,
    popular: true,
    features: [
      'Signature Cut & Style',
      'Beard Trim & Shape',
      'Hot Towel Shave',
      'Scalp Massage',
      'Premium Products',
    ],
  },
  {
    name: 'VIP',
    price: 1200,
    features: [
      'Complete Grooming',
      'Face Treatment',
      'Extended Massage',
      'Product Package',
      'Priority Booking',
    ],
  },
];

function PriceCard({ pkg, index, onBookClick }: { pkg: typeof packages[0]; index: number; onBookClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

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
      initial={{ opacity: 0, y: 50, rotateX: -45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative p-8 bg-black border-2 ${
        pkg.popular ? 'border-amber-500' : 'border-white/10'
      } overflow-hidden group`}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        zIndex: 10,
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(245, 158, 11, 0.15), transparent 50%)',
        }}
        animate={
          isHovered
            ? {
                '--mouse-x': `${mouseX.get()}px`,
                '--mouse-y': `${mouseY.get()}px`,
              }
            : {}
        }
      />

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
        animate={isHovered ? { x: ['-100%', '100%'] } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {pkg.popular && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-6 py-1 text-xs tracking-widest overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(245, 158, 11, 0.5)',
              '0 0 40px rgba(245, 158, 11, 0.8)',
              '0 0 20px rgba(245, 158, 11, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            className="inline-flex items-center gap-1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3" />
            MOST POPULAR
            <Sparkles className="w-3 h-3" />
          </motion.span>
        </motion.div>
      )}

      <div
        className="text-center mb-8 relative"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
      >
        <motion.h3
          className="text-2xl tracking-widest mb-4"
          animate={
            isHovered
              ? {
                  letterSpacing: '0.3em',
                  color: '#f59e0b',
                }
              : { letterSpacing: '0.2em' }
          }
          transition={{ duration: 0.3 }}
        >
          {pkg.name}
        </motion.h3>

        <div className="flex items-baseline justify-center gap-1 relative">
          {/* ✅ Changed $ to ₱ */}
          <motion.span
            className="text-xl text-neutral-400"
            animate={isHovered ? { y: -5 } : { y: 0 }}
          >
            ₱
          </motion.span>
          <motion.span
            className="text-6xl relative"
            animate={
              isHovered
                ? {
                    scale: 1.1,
                    color: '#f59e0b',
                  }
                : { scale: 1 }
            }
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {pkg.price}
            {/* Number particles */}
            {isHovered &&
              [...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-500 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * 45 * Math.PI) / 180) * 40,
                    y: Math.sin((i * 45 * Math.PI) / 180) * 40,
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
          </motion.span>
        </div>
      </div>

      <ul
        className="space-y-4 mb-8 relative"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
      >
        {pkg.features.map((feature, idx) => (
          <motion.li
            key={idx}
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + idx * 0.1 }}
          >
            <motion.div
              className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 relative"
              whileHover={{ scale: 1.3, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Check className="w-3 h-3 text-black" />
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-amber-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: idx * 0.1,
                  }}
                />
              )}
            </motion.div>
            <span className="text-neutral-300">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        onClick={onBookClick}
        className={`w-full py-4 border-2 relative overflow-hidden ${
          pkg.popular
            ? 'border-amber-500 bg-amber-500 text-black'
            : 'border-white/30'
        } tracking-widest uppercase group/button`}
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="relative z-10"
          animate={
            isHovered
              ? { letterSpacing: '0.3em' }
              : { letterSpacing: '0.2em' }
          }
        >
          Book Now
        </motion.span>

        {/* Button hover effect */}
        <motion.div
          className={`absolute inset-0 ${
            pkg.popular ? 'bg-white' : 'bg-amber-500'
          }`}
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Ripple effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 border-2 border-amber-500"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Corner decorations */}
      {isHovered && (
        <>
          {[
            { top: 8, left: 8, rotate: 0 },
            { top: 8, right: 8, rotate: 90 },
            { bottom: 8, right: 8, rotate: 180 },
            { bottom: 8, left: 8, rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 border-t-2 border-l-2 border-amber-500"
              style={{ ...pos, rotate: pos.rotate }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

export function PriceCards({ onBookClick }: PriceCardsProps) {
  return (
    <section className="py-24 px-6 md:px-12 bg-neutral-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 className="text-5xl md:text-7xl mb-4 inline-block">
            {'PACKAGES'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  y: -10,
                  scale: 1.2,
                  color: '#f59e0b',
                  textShadow: '0 0 30px rgba(245, 158, 11, 0.8)',
                }}
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
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PriceCard
              key={index}
              pkg={pkg}
              index={index}
              onBookClick={onBookClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
