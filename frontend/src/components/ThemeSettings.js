import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Sun, Moon, Monitor, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const themeOptions = [
    {
      id: 'light',
      name: 'Light Theme',
      icon: Sun,
      description: 'Clean and bright interface',
      active: !isDark,
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      icon: Moon,
      description: 'Easy on the eyes',
      active: isDark,
    },
    {
      id: 'system',
      name: 'System Default',
      icon: Monitor,
      description: 'Follows your system preference',
      active: false, // We'll implement this later if needed
    },
  ];

  const handleThemeChange = (themeId) => {
    if (themeId === 'light' && isDark) {
      toggleTheme();
    } else if (themeId === 'dark' && !isDark) {
      toggleTheme();
    }
    // System theme implementation can be added later
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-azellar-navy to-azellar-teal text-white p-6 relative">
                  <h2 className="text-2xl font-bold mb-2">Theme Settings</h2>
                  <p className="text-azellar-aqua text-sm">Customize your viewing experience</p>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Theme Options */}
                <div className="p-6 space-y-4">
                  {themeOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleThemeChange(option.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        option.active
                          ? 'border-azellar-teal bg-azellar-teal/10 dark:bg-azellar-teal/20'
                          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-azellar-teal/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={option.id === 'system'} // Disable system option for now
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          option.active 
                            ? 'bg-azellar-teal text-white' 
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          <option.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            option.active 
                              ? 'text-azellar-teal' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {option.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </p>
                          {option.id === 'system' && (
                            <p className="text-xs text-gray-500 mt-1">Coming soon</p>
                          )}
                        </div>
                        {option.active && (
                          <div className="w-3 h-3 bg-azellar-teal rounded-full"></div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    Your theme preference is saved automatically
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSettings;