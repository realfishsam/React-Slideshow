export default function Slide2() {
  const features = [
    'Instant data processing and analysis',
    'Predictive analytics with 95% accuracy',
    'Automated report generation',
    'Real-time dashboard updates',
    'Natural language query interface'
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-green-50 to-emerald-50 text-gray-800">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Our Solution
          </h1>
          <h2 className="text-2xl md:text-3xl font-light opacity-80">
            AI-Powered Business Intelligence
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xl leading-relaxed">
              Introducing our revolutionary AI platform that transforms raw data into actionable insights
            </p>
            <p className="text-xl leading-relaxed">
              Real-time analysis with predictive capabilities
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Features</h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-3 h-3 bg-current rounded-full mt-2"></span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 