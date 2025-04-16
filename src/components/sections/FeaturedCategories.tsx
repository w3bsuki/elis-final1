            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center justify-center"
              >
                {/* Section badge/pill - improved for better readability */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20 rounded-full mb-3 border border-blue-200/50 dark:border-blue-800/30 shadow-md backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-black dark:text-white" />
                  <span className="text-xs font-medium text-black dark:text-white">
                    {language === 'en' ? "Categories" : "Категории"}
                  </span>
                </div>
                
                {/* Main title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2 sm:mb-3 
                  bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400
                  bg-clip-text text-transparent">
                  {language === 'en' ? "Featured Categories" : "Избрани Категории"}
                </h2>
                
                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  {language === 'en' 
                    ? "Discover personalized development resources for every stage of your journey." 
                    : "Открийте персонализирани ресурси за развитие за всеки етап от вашето пътуване."}
                </p>
              </motion.div>
            </div>

      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-gray-700/30
            ${index === 0 ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10' : ''}
            ${index === 1 ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10' : ''}
            ${index === 2 ? 'bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10' : ''}
            ${index === 3 ? 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10' : ''}
          `}
        >
          {/* Color accent strip at top */}
          <div className={`h-1.5 w-full absolute top-0 left-0 right-0
            ${index === 0 ? 'bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500 dark:to-purple-500' : ''}
            ${index === 1 ? 'bg-gradient-to-r from-amber-400 to-orange-400 dark:from-amber-500 dark:to-orange-500' : ''}
            ${index === 2 ? 'bg-gradient-to-r from-green-400 to-teal-400 dark:from-green-500 dark:to-teal-500' : ''}
            ${index === 3 ? 'bg-gradient-to-r from-rose-400 to-pink-400 dark:from-rose-500 dark:to-pink-500' : ''}
          `}></div>
          
          {/* Category card content */}
          <div className="p-4 sm:p-5 flex flex-col h-full pt-5">
            
            {/* Category badge - improved nested look */}
            <div className={`absolute -top-3 left-4 inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border shadow-sm ${
              index === 0 ? 'bg-gradient-to-r from-blue-100 to-purple-50 border-blue-200/50 dark:from-blue-900/50 dark:to-purple-900/40 dark:border-blue-900/30' : 
              index === 1 ? 'bg-gradient-to-r from-amber-100 to-orange-50 border-amber-200/50 dark:from-amber-900/50 dark:to-orange-900/40 dark:border-amber-900/30' : 
              index === 2 ? 'bg-gradient-to-r from-green-100 to-teal-50 border-green-200/50 dark:from-green-900/50 dark:to-teal-900/40 dark:border-green-900/30' : 
              'bg-gradient-to-r from-rose-100 to-pink-50 border-rose-200/50 dark:from-rose-900/50 dark:to-pink-900/40 dark:border-rose-900/30'
            }`}>
              <category.icon className={`h-3.5 w-3.5 text-black dark:text-white`} /> 
              <span className="text-[10px] sm:text-xs font-medium text-black dark:text-white">
                {language === 'en' ? category.type : category.typeBg}
              </span>
            </div>

            {/* Category Title - nested look with accent line */}
            <div className="mb-3 pl-0.5 border-l-2 mt-2 
              ${index === 0 ? 'border-blue-300 dark:border-blue-700' : ''}
              ${index === 1 ? 'border-amber-300 dark:border-amber-700' : ''}
              ${index === 2 ? 'border-green-300 dark:border-green-700' : ''}
              ${index === 3 ? 'border-rose-300 dark:border-rose-700' : ''}
            ">
              <h3 className="text-base sm:text-lg md:text-xl font-bold pl-2 text-gray-900 dark:text-white">
                {language === 'en' ? category.title : category.titleBg}
              </h3>
            </div>
            
            {/* Category Description - nested in a subtle container */}
            <div className="bg-white/50 dark:bg-gray-800/20 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {language === 'en' ? category.description : category.descriptionBg}
              </p>
            </div>

            {/* Category Topics - nested chip design */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-auto">
              {category.topics?.map((topic, i) => (
                <span 
                  key={i} 
                  className={`text-[10px] sm:text-xs inline-flex px-2 py-0.5 rounded-md
                    ${index === 0 ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                    ${index === 1 ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                    ${index === 2 ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : ''}
                    ${index === 3 ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' : ''}
                  `}
                >
                  {topic}
                </span>
              ))}
            </div>
            
            {/* Action Button - nested at bottom with hover effect */}
            <div className="mt-4 pt-3 border-t border-gray-200/70 dark:border-gray-700/30 w-full">
              <Link 
                href={category.url} 
                className={`flex items-center justify-between w-full text-xs sm:text-sm font-medium transition-colors 
                  ${index === 0 ? 'text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300' : ''}
                  ${index === 1 ? 'text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300' : ''}
                  ${index === 2 ? 'text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300' : ''}
                  ${index === 3 ? 'text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300' : ''}
                `}
              >
                <span>{language === 'en' ? 'Explore Category' : 'Разгледай Категория'}</span>
                <div className={`rounded-full w-6 h-6 flex items-center justify-center 
                  ${index === 0 ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                  ${index === 1 ? 'bg-amber-100 dark:bg-amber-900/30' : ''}
                  ${index === 2 ? 'bg-green-100 dark:bg-green-900/30' : ''}
                  ${index === 3 ? 'bg-rose-100 dark:bg-rose-900/30' : ''}
                `}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 