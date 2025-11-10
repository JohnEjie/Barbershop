<<<<<<< HEAD
﻿import { useState } from 'react';
import { motion } from 'framer-motion';
=======
import { useState } from 'react';
import { motion } from 'motion/react';
>>>>>>> origin/main
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const transformations = [
  {
<<<<<<< HEAD
    before: '/images/gallery/FUSION.jpg',
    after: '/images/gallery/RESULT.jpg',
    title: 'Fresh Fade',
  },
  {
    before: 'https://images.unsplash.com/photo-1638383257977-e575d80a2121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwdXJiYW4lMjBzdHlsZXxlbnwxfHx8fDE3NjI1MjA3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    after: 'https://images.unsplash.com/photo-1547648946-2b1fd7eab923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBjdXR0aW5nJTIwaGFpcnxlbnwxfHx8fDE3NjI0MzUzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
=======
    before: 'https://images.unsplash.com/photo-1590503347339-ccd768ad83d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhhaXJjdXQlMjB0cmFuc2Zvcm1hdGlvbnxlbnwxfHx8fDE3NjI1MjA3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    after: 'https://images.unsplash.com/photo-1593702233354-259d1f794ed1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwZmFkZSUyMGhhaXJjdXR8ZW58MXx8fHwxNzYyNDYzMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Fresh Fade',
  },
  {
    before: 'https://images.unsplash.com/photo-1638383257977-e575d80a2121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwdXJiYW4lMjBzdHlsZXxlbnwxfHx8fDE3NjI1MjA3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    after: 'https://images.unsplash.com/photo-1547648946-2b1fd7eab923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBjdXR0aW5nJTIwaGFpcnxlbnwxfHx8fDE3NjI0MzUzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
>>>>>>> origin/main
    title: 'Classic Cut',
  },
];

export function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
    setSliderPosition(50);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setSliderPosition(50);
  };

  const current = transformations[currentIndex];

  return (
<<<<<<< HEAD
    <section
      className="py-24 px-6 md:px-12 relative"
      style={{
        backgroundImage: 'url(/images/gallery/services.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background wrapper with overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/65 z-0" />

        {/* Animated glowing circles */}
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
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
=======
    <section className="py-24 px-6 md:px-12 bg-black">
      <motion.div
        className="max-w-6xl mx-auto"
>>>>>>> origin/main
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
<<<<<<< HEAD
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl mb-4 text-white font-bold"
=======
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-7xl mb-4"
>>>>>>> origin/main
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            TRANSFORMATIONS
          </motion.h2>
<<<<<<< HEAD
          <motion.div
=======
          <motion.div 
>>>>>>> origin/main
            className="h-1 w-24 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>

<<<<<<< HEAD
        {/* Before/After Slider */}
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
=======
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
>>>>>>> origin/main
          {/* After Image */}
          <ImageWithFallback
            src={current.after}
            alt="After"
            className="absolute inset-0 w-full h-full object-cover"
          />
<<<<<<< HEAD

          {/* Before Image with Clip */}
          <div
=======
          
          {/* Before Image with Clip */}
          <div 
>>>>>>> origin/main
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <ImageWithFallback
              src={current.before}
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

<<<<<<< HEAD
          {/* Slider Line */}
          <div
=======
          {/* Slider */}
          <div 
>>>>>>> origin/main
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 text-black absolute left-1" />
              <ChevronRight className="w-4 h-4 text-black absolute right-1" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-6 left-6 bg-black/70 px-4 py-2 rounded">
<<<<<<< HEAD
            <span className="text-sm uppercase tracking-wider text-white">Before</span>
          </div>
          <div className="absolute top-6 right-6 bg-black/70 px-4 py-2 rounded">
            <span className="text-sm uppercase tracking-wider text-white">After</span>
          </div>

          {/* Range Input */}
=======
            <span className="text-sm uppercase tracking-wider">Before</span>
          </div>
          <div className="absolute top-6 right-6 bg-black/70 px-4 py-2 rounded">
            <span className="text-sm uppercase tracking-wider">After</span>
          </div>

          {/* Interactive Slider Input */}
>>>>>>> origin/main
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
<<<<<<< HEAD
            className="w-12 h-12 border border-white/30 hover:border-amber-500 rounded-full flex items-center justify-center transition-colors text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm uppercase tracking-wider text-white">{current.title}</span>
          <button
            onClick={handleNext}
            className="w-12 h-12 border border-white/30 hover:border-amber-500 rounded-full flex items-center justify-center transition-colors text-white"
=======
            className="w-12 h-12 border border-white/30 hover:border-amber-500 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm uppercase tracking-wider">{current.title}</span>
          <button
            onClick={handleNext}
            className="w-12 h-12 border border-white/30 hover:border-amber-500 rounded-full flex items-center justify-center transition-colors"
>>>>>>> origin/main
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
<<<<<<< HEAD




=======
>>>>>>> origin/main
