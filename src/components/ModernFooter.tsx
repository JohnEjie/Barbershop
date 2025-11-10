<<<<<<< HEAD
﻿import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Scissors } from 'lucide-react';
=======
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Facebook, Scissors } from 'lucide-react';
>>>>>>> origin/main

export function ModernFooter() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Scissors className="w-8 h-8 text-amber-500" />
<<<<<<< HEAD
              <span className="text-2xl tracking-wider">GUPIT POGI</span>
=======
              <span className="text-2xl tracking-wider">ELITE CUTS</span>
>>>>>>> origin/main
            </div>
            <p className="text-neutral-400 mb-6">
              Premium grooming for the modern gentleman
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-white/20 hover:border-amber-500 flex items-center justify-center cursor-pointer transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 border border-white/20 hover:border-amber-500 flex items-center justify-center cursor-pointer transition-colors">
<<<<<<< HEAD
=======
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 border border-white/20 hover:border-amber-500 flex items-center justify-center cursor-pointer transition-colors">
>>>>>>> origin/main
                <Facebook className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              HOURS
            </h3>
            <div className="space-y-2 text-neutral-400">
              <p>Monday - Friday</p>
              <p className="text-white">9:00 AM - 8:00 PM</p>
              <p className="mt-3">Saturday</p>
              <p className="text-white">9:00 AM - 6:00 PM</p>
              <p className="mt-3">Sunday</p>
              <p className="text-white">10:00 AM - 4:00 PM</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              LOCATION
            </h3>
            <div className="space-y-3 text-neutral-400">
<<<<<<< HEAD
              <p>BLK 1 LOT 95 NEPTUNE ST.</p>
              <p>SOUTH PLAINS 2 BINAN CITY</p>
              <p className="mt-4 text-white hover:text-amber-500 cursor-pointer transition-colors">

=======
              <p>123 Downtown Street</p>
              <p>New York, NY 10001</p>
              <p className="mt-4 text-white hover:text-amber-500 cursor-pointer transition-colors">
                Get Directions →
>>>>>>> origin/main
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg tracking-wider mb-4">CONTACT</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-amber-500" />
<<<<<<< HEAD
                <span> 0963-197-7939</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-amber-500" />
                <span>gupitpogi@gmail.com</span>
=======
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-amber-500" />
                <span>info@elitecuts.com</span>
>>>>>>> origin/main
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-400 text-sm">
<<<<<<< HEAD
          <p>&copy; 2025 Gupit Pogi. All rights reserved.</p>
=======
          <p>&copy; 2025 Elite Cuts. All rights reserved.</p>
>>>>>>> origin/main
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
<<<<<<< HEAD




=======
>>>>>>> origin/main
