import { MessageCircle } from "lucide-react";

          {/* Section header - now nested inside the main container */}
          <div className="text-center mb-10 relative z-10">
            {/* Enhanced header with special badge styling */}
            <div className="inline-flex flex-col items-center justify-center">
              {/* Main title with badge-like appearance */}
              <div className="relative inline-flex items-center justify-center mb-4">
                {/* Decorative gradient blob behind the title */}
                <div className="absolute -z-10 w-full h-full scale-150 bg-gradient-to-br from-blue-400/20 via-sky-300/10 to-indigo-400/5 dark:from-blue-400/10 dark:via-sky-300/5 dark:to-indigo-400/5 blur-2xl rounded-full"></div>
                
                {/* Badge container */}
                <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
                  px-8 py-4 rounded-2xl
                  shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                  dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                  flex items-center gap-4 border border-blue-200/50 dark:border-blue-800/30">
                  
                  {/* Left icon with enhanced styling */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-sky-300/20 blur-xl rounded-full"></div>
                    <div className="rounded-full p-3
                      bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                      border border-blue-100/50 dark:border-blue-800/30 relative">
                      <MessageCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                  </div>
                  
                  {/* Title with gradient text */}
                  <div className="flex flex-col items-start">
                    <h2 className="text-2xl md:text-4xl font-bold font-serif antialiased relative
                      bg-gradient-to-br from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 
                      bg-clip-text text-transparent">
                      {translate("Отзиви", "Testimonials")}
                    </h2>
                    <div className="h-1 w-3/4 mx-auto bg-gradient-to-r from-blue-500 to-sky-400 rounded-full mt-1"></div>
                  </div>
                </div>
              </div>
              
              {/* Description text */}
              <div className="max-w-2xl mx-auto mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg antialiased leading-relaxed">
                  {translate(
                    "Вижте какво казват хората, които са работили с мен, за услугите и продуктите, които предлагам.",
                    "See what people who have worked with me say about the services and products I offer."
                  )}
                </p>
              </div>
            </div>
          </div> 