import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import {
  Leaf,
  Navigation,
  History,
  Search,
  Bike,
  PersonStanding as Walk,
  Car,
  ChevronDown,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Plus,
  X,
  MoveUp,
  MoveDown,
  Apple,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  MapPin,
  Globe,
  Compass,
  TreePine,
  Mountain,
  Bird,
  Sunrise,
  LogOut,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskBar } from './components/TaskBar';
import { RewardsPanel } from './components/RewardsPanel';

type RouteType = 'eco' | 'fitness' | 'explore';
type TravelMode = 'walking' | 'cycling' | 'driving';
type AuthPage = 'login' | 'signup';
type Weather = {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
};

interface Waypoint {
  id: string;
  location: string;
}

function WeatherIcon({ condition }: { condition: string }) {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="h-8 w-8 text-yellow-500 bounce-animation" />;
    case 'cloudy':
      return <Cloud className="h-8 w-8 text-gray-500 float-animation" />;
    case 'rainy':
      return <CloudRain className="h-8 w-8 text-blue-500 bounce-animation" />;
    default:
      return <Sun className="h-8 w-8 text-yellow-500" />;
  }
}

function App() {
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routeType, setRouteType] = useState<RouteType>('eco');
  const [travelMode, setTravelMode] = useState<TravelMode>('walking');
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { id: '1', location: '' },
    { id: '2', location: '' },
  ]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<Weather>({
    temp: 22,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
  });
  const [activeTab, setActiveTab] = useState('route');

  // Mock user data
  const mockUser = {
    name: "Eco Warrior",
    level: 5,
    experience: 450,
    nextLevelExp: 1000,
    achievements: 8,
    rank: 42
  };

  // Mock user stats
  const mockUserStats = {
    totalMiles: 1250,
    ecoMiles: 850,
    carbonSaved: 425,
    rank: 42,
    achievements: [
      {
        id: '1',
        name: 'Green Pioneer',
        description: 'Complete your first eco-friendly route',
        icon: '🌱',
        requiredMiles: 10,
        unlocked: true
      },
      {
        id: '2',
        name: 'Cycle Master',
        description: 'Complete 50 miles on bike',
        icon: '🚲',
        requiredMiles: 50,
        unlocked: false
      },
      {
        id: '3',
        name: 'Earth Guardian',
        description: 'Save 100kg of CO2',
        icon: '🌍',
        requiredMiles: 200,
        unlocked: false
      }
    ]
  };

  // Mock leaderboard data
  const mockLeaderboard = [
    {
      id: '1',
      name: 'EcoMaster',
      avatar: '👑',
      ecoMiles: 2500,
      rank: 1
    },
    {
      id: '2',
      name: 'GreenRider',
      avatar: '🚴',
      ecoMiles: 2200,
      rank: 2
    },
    {
      id: '3',
      name: 'EarthHero',
      avatar: '🌍',
      ecoMiles: 1800,
      rank: 3
    }
  ];

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
  });

  const addWaypoint = () => {
    setWaypoints([
      ...waypoints,
      { id: Math.random().toString(), location: '' },
    ]);
  };

  const removeWaypoint = (id: string) => {
    setWaypoints(waypoints.filter((wp) => wp.id !== id));
  };

  const updateWaypoint = (id: string, location: string) => {
    setWaypoints(
      waypoints.map((wp) =>
        wp.id === id ? { ...wp, location } : wp
      )
    );
  };

  const moveWaypoint = (id: string, direction: 'up' | 'down') => {
    const index = waypoints.findIndex((wp) => wp.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === waypoints.length - 1)
    ) {
      return;
    }

    const newWaypoints = [...waypoints];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newWaypoints[index], newWaypoints[targetIndex]] = [
      newWaypoints[targetIndex],
      newWaypoints[index],
    ];
    setWaypoints(newWaypoints);
  };

  useEffect(() => {
    const conditions = ['Sunny', 'Cloudy', 'Rainy'];
    const interval = setInterval(() => {
      const randomCondition =
        conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemp = Math.floor(Math.random() * 15) + 15;
      const randomHumidity = Math.floor(Math.random() * 30) + 50;
      const randomWind = Math.floor(Math.random() * 15) + 5;

      setWeather({
        temp: randomTemp,
        condition: randomCondition,
        humidity: randomHumidity,
        windSpeed: randomWind,
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsLoggedIn(true);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleAppleLogin = () => {
    console.log('Apple login clicked');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-green-50/90 to-blue-50/90 flex items-center justify-center p-4">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex justify-center mb-4 space-x-2"
            >
              <Leaf className="h-10 w-10 text-green-500" />
              <Globe className="h-10 w-10 text-blue-500" />
              <TreePine className="h-10 w-10 text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EcoRoute</h2>
            <p className="text-gray-600">Your sustainable journey starts here</p>
          </div>

          <AnimatePresence mode="wait">
            {authPage === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleAuth}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center space-x-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleAppleLogin}
                    className="flex items-center justify-center space-x-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Apple className="h-5 w-5" />
                    <span className="text-sm font-medium">Apple</span>
                  </motion.button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setAuthPage('signup')}
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Create an account
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleAuth}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center space-x-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleAppleLogin}
                    className="flex items-center justify-center space-x-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Apple className="h-5 w-5" />
                    <span className="text-sm font-medium">Apple</span>
                  </motion.button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setAuthPage('login')}
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Our Environment Partners
                </span>
              </div>
            </div>
            <div className="mt-6">
              <div className="grid grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <TreePine className="h-6 w-6 mx-auto text-green-600" />
                  <span className="text-xs text-gray-600 mt-1 block">Forest Conservation</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <Mountain className="h-6 w-6 mx-auto text-blue-600" />
                  <span className="text-xs text-gray-600 mt-1 block">Mountain Protection</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <Bird className="h-6 w-6 mx-auto text-yellow-600" />
                  <span className="text-xs text-gray-600 mt-1 block">Wildlife Preservation</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <Sunrise className="h-6 w-6 mx-auto text-orange-600" />
                  <span className="text-xs text-gray-600 mt-1 block">Clean Energy</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm relative">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }}
        />
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('route')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white/90 transition-all"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Back to Map</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </motion.button>
          </div>

          <TaskBar
            user={mockUser}
            onTabChange={setActiveTab}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'route' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <animated.div
                ref={ref}
                style={fadeIn}
                className="bg-white rounded-xl shadow-lg p-6 space-y-6 hover-scale"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Plan Your Route
                  </h2>

                  <div className="space-y-3">
                    {waypoints.map((waypoint, index) => (
                      <motion.div
                        key={waypoint.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="relative flex-grow">
                          <input
                            type="text"
                            placeholder={
                              index === 0
                                ? 'Start location'
                                : index === waypoints.length - 1
                                ? 'Final destination'
                                : `Stop ${index}`
                            }
                            value={waypoint.location}
                            onChange={(e) =>
                              updateWaypoint(waypoint.id, e.target.value)
                            }
                            className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <Navigation className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <div className="absolute right-2 top-1.5 flex items-center space-x-1">
                            {index > 0 && index < waypoints.length - 1 && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeWaypoint(waypoint.id)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </motion.button>
                            )}
                            {index > 0 && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => moveWaypoint(waypoint.id, 'up')}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <MoveUp className="h-4 w-4" />
                              </motion.button>
                            )}
                            {index < waypoints.length - 1 && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => moveWaypoint(waypoint.id, 'down')}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <MoveDown className="h-4 w-4" />
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addWaypoint}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Stop</span>
                  </motion.button>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Route Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { type: 'eco', icon: Leaf, color: 'green' },
                        { type: 'fitness', icon: Walk, color: 'blue' },
                        { type: 'explore', icon: Search, color: 'purple' },
                      ].map(({ type, icon: Icon, color }) => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setRouteType(type as RouteType)}
                          className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                            routeType === type
                              ? `bg-${color}-500 text-white`
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="capitalize">{type}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Travel Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { mode: 'walking', icon: Walk },
                        { mode: 'cycling', icon: Bike },
                        { mode: 'driving', icon: Car },
                      ].map(({ mode, icon: Icon }) => (
                        <motion.button
                          key={mode}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setTravelMode(mode as TravelMode)}
                          className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                            travelMode === mode
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="capitalize">{mode}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Navigation className="h-5 w-5" />
                    <span>Find Route</span>
                  </motion.button>
                </div>
              </animated.div>
            </div>

            <div className="lg:col-span-2">
              <animated.div
                ref={ref}
                style={fadeIn}
                className="bg-white rounded-xl shadow-lg p-6 hover-scale"
              >
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                    alt="Map View"
                    className="absolute inset-0 w-full h-full rounded-lg object-cover"
                  />

                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 hover-scale">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Distance</span>
                        <span className="text-sm">3.2 km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">CO₂ Saved</span>
                        <span className="text-sm text-green-500">1.2 kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Time</span>
                        <span className="text-sm">25 min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Weather</span>
                        <span className="text-sm flex items-center space-x-1">
                          <WeatherIcon condition={weather.condition} />
                          <span>{weather.temp}°C</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2"
                  >
                    {routeType === 'eco' && <Leaf className="h-5 w-5 text-green-500" />}
                    {routeType === 'fitness' && <Walk className="h-5 w-5 text-blue-500" />}
                    {routeType === 'explore' && <Search className="h-5 w-5 text-purple-500" />}
                    <span className="text-sm font-medium capitalize">{routeType} Route</span>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2"
                  >
                    {travelMode === 'walking' && <Walk className="h-5 w-5 text-indigo-500" />}
                    {travelMode === 'cycling' && <Bike className="h-5 w-5 text-indigo-500" />}
                    {travelMode === 'driving' && <Car className="h-5 w-5 text-indigo-500" />}
                    <span className="text-sm font-medium capitalize">{travelMode}</span>
                  </motion.div>
                </div>
              </animated.div>
            </div>
          </div>
        )}

        {activeTab !== 'route' && (
          <RewardsPanel
            userStats={mockUserStats}
            leaderboard={mockLeaderboard}
          />
        )}
      </main>
    </div>
  );
}

export default App;
