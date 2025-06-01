export default function Slide1() {
  const bulletPoints = [
    '73% of businesses report data analysis bottlenecks',
    'Average decision delay: 2.5 weeks',
    '$2.3M average annual loss due to slow insights',
    'Manual processes consume 40% of analyst time'
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-red-50 to-orange-50 text-gray-800">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            The Problem
          </h1>
          <h2 className="text-2xl md:text-3xl font-light opacity-80">
            Current Market Challenges
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-xl leading-relaxed">
              Businesses struggle with data overload and inefficient processes
            </p>
            <p className="text-xl leading-relaxed">
              Manual analysis leads to delayed decision-making
            </p>
            <p className="text-xl leading-relaxed">
              Lack of real-time insights costs companies millions annually
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Key Statistics</h3>
            <ul className="space-y-4">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-current rounded-full mt-3"></span>
                  <span className="text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 