import React, { useState, useCallback } from 'react';
import { ChevronLeft, CheckCircle2, Lock, ShieldCheck, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Scanner } from '@yudiel/react-qr-scanner';

type Subject = 'Science' | 'Social Science' | 'English';
type ScanState = 'idle' | 'scanning' | 'success';

const profiles = {
  'Science': {
    lead: { name: 'ALAKH PANDEY', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202409/alakh-pandey-is-the-founder-and-ceo-of-physics-wallah-275822217-1x1.jpg?VersionId=JAk2OvDak1pik2Ca7J8SdFtDUKMudXg0', role: 'Lead Educator', color: 'ring-blue-500' },
    sub: { name: 'PRASHANT KIRAD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxYTJN7y2ftx9YNhcoKw3COrV4TQdO9mpouw&s', role: 'Team Educator', color: 'ring-purple-500' }
  },
  'Social Science': {
    lead: { name: 'DIGRAJ SINGH RAJPUT', image: 'https://magazinehubz.com/wp-content/uploads/2025/01/Digraj-Singh-Rajput-Instagram-1024x1024.jpg', role: 'Educator', color: 'ring-emerald-500' }
  },
  'English': {
    lead: { name: 'ANURAG SIR', image: 'https://media.licdn.com/dms/image/v2/D4D03AQFRJ2XaG21xXg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1675954256336?e=2147483647&v=beta&t=e2Ncp2L3cQ0i-dFqi6dR0fxwKQVb_qrLTXJfdLf74Ls', role: 'Educator', color: 'ring-amber-500' }
  }
};

export default function App() {
  const [subject, setSubject] = useState<Subject>('Science');
  const [scanState, setScanState] = useState<ScanState>('idle');

  const handleScan = useCallback((result: any) => {
    if (scanState !== 'idle') return;
    if (result && result.length > 0) {
      setScanState('scanning');
      setTimeout(() => {
        setScanState('success');
      }, 1500);
    }
  }, [scanState]);

  const resetScan = () => {
    setScanState('idle');
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans">
      {/* Header */}
      <header className="px-4 sm:px-8 py-4 flex items-center justify-between bg-white border-b border-gray-100 z-20 sticky top-0 shadow-sm">
        <div className="flex items-center">
          {scanState === 'success' ? (
            <button 
              onClick={resetScan} 
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex items-center text-sm font-bold"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Back to Scanner</span>
            </button>
          ) : (
            <div className="flex items-center text-gray-900 font-extrabold text-lg sm:text-xl tracking-tight">
              <Camera className="w-6 h-6 mr-2 text-blue-600" />
              EduScan
            </div>
          )}
        </div>
        
        {/* Subject Dropdown */}
        <div className="relative flex items-center bg-gray-50 rounded-full px-1.5 py-1.5 border border-gray-200 transition-colors hover:bg-gray-100">
          <span className="text-xs font-bold text-gray-500 ml-3 mr-2 uppercase tracking-wider hidden sm:inline-block">Subject</span>
          <div className="relative">
            <select 
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value as Subject);
                setScanState('idle');
              }}
              className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm font-bold py-1.5 pl-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
            >
              <option value="Science">Science</option>
              <option value="Social Science">Social Science</option>
              <option value="English">English</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          
          {/* Scanner View */}
          {scanState !== 'success' && (
            <motion.div 
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-gray-950 flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Camera Feed */}
              <div className="absolute inset-0 z-0 opacity-60">
                <Scanner 
                    onScan={handleScan}
                    components={{ finder: false }}
                    styles={{ container: { width: '100%', height: '100%' }, video: { objectFit: 'cover' } }}
                  />
              </div>
              
              <div className="relative z-10 flex flex-col items-center w-full px-4">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-10">
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-2xl"></div>

                  {/* Scanning Line Animation */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_20px_4px_rgba(59,130,246,0.6)] z-20"
                  />

                  {/* Scanning Overlay */}
                  {scanState === 'scanning' && (
                    <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center rounded-2xl transition-all z-30">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent shadow-lg"></div>
                    </div>
                  )}
                </div>

                <p className="text-white/90 text-sm sm:text-base font-medium tracking-wide bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-xl">
                  {scanState === 'idle' ? 'Point camera at a QR code' : 'Scanning QR Code...'}
                </p>
              </div>
            </motion.div>
          )}

          {/* Result View */}
          {scanState === 'success' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-1 bg-white flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto"
            >
              <div className="w-full max-w-3xl flex flex-col items-center">
                
                {/* Success Icon */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-50 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-sm">
                    <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                  </div>
                </div>
                
                {/* Status Text */}
                <div className="flex items-center text-xs sm:text-sm font-bold text-gray-400 tracking-widest mb-4 uppercase">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                  ACCESSING SECURE DATABASE...
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8 tracking-tight">
                  QR AUTHENTICATION SUCCESSFUL
                </h2>

                {/* File Details Card */}
                <div className="w-full max-w-xl bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-100 mb-12 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-red-100 shadow-sm">
                      <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-red-500 tracking-widest uppercase mb-2">
                        CONFIDENTIAL FILE DETECTED
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                        (CLASS 10 {subject.toUpperCase()} QUESTION PAPER)
                      </h3>
                      <div className="mt-4 flex items-center justify-center sm:justify-start space-x-3 text-sm text-gray-600 font-semibold bg-white inline-flex px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Verified Source
                      </div>
                    </div>
                  </div>
                </div>

                {/* Created By Section */}
                <div className="w-full pb-12">
                  <div className="flex items-center justify-center mb-10">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-400 tracking-widest uppercase px-6">
                      FILE CREATED BY
                    </h4>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>
                  
                  {subject === 'Science' ? (
                    <div className="flex flex-col items-center space-y-6">
                      {/* Lead Educator */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex flex-col items-center group"
                      >
                        <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 shadow-xl border-4 border-white ring-4 ${profiles['Science'].lead.color}`}>
                          <img 
                            src={profiles['Science'].lead.image} 
                            alt={profiles['Science'].lead.name} 
                            className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-base sm:text-lg font-extrabold text-gray-900 text-center tracking-wider uppercase">
                          {profiles['Science'].lead.name}
                        </span>
                        <span className="text-xs text-blue-600 font-bold mt-1.5 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                          {profiles['Science'].lead.role}
                        </span>
                      </motion.div>

                      {/* Connector Line */}
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 32, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="w-1 bg-gradient-to-b from-blue-200 to-purple-200 rounded-full"
                      />

                      {/* Sub Educator */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-col items-center group"
                      >
                        <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 shadow-lg border-4 border-white ring-2 ${profiles['Science'].sub.color}`}>
                          <img 
                            src={profiles['Science'].sub.image} 
                            alt={profiles['Science'].sub.name} 
                            className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-sm sm:text-base font-bold text-gray-800 text-center tracking-wider uppercase">
                          {profiles['Science'].sub.name}
                        </span>
                        <span className="text-[10px] text-purple-600 font-bold mt-1.5 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                          {profiles['Science'].sub.role}
                        </span>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex flex-col items-center group"
                      >
                        <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 shadow-xl border-4 border-white ring-4 ${profiles[subject].lead.color}`}>
                          <img 
                            src={profiles[subject].lead.image} 
                            alt={profiles[subject].lead.name} 
                            className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-base sm:text-lg font-extrabold text-gray-900 text-center tracking-wider uppercase">
                          {profiles[subject].lead.name}
                        </span>
                        <span className={`text-xs font-bold mt-1.5 uppercase tracking-widest px-3 py-1 rounded-full ${
                          subject === 'Social Science' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                        }`}>
                          {profiles[subject].lead.role}
                        </span>
                      </motion.div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
