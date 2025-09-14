import Link from 'next/link';
import { Star, Users, User, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-zayzoon-teal/20 to-zayzoon-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-zayzoon-orange/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-br from-zayzoon-teal via-blue-500 to-zayzoon-purple p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse">
                <Star className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-zayzoon-teal via-blue-600 to-zayzoon-purple bg-clip-text text-transparent animate-gradient">
                  KudosAI
                </h1>
                <p className="text-lg text-gray-600 font-medium">Employee Recognition Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
              🚀 Now Live!
            </span>
          </div>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            AI-Powered Employee Recognition
          </h2>
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your workplace culture with personalized recognition and flexible rewards.
            <br />
            <span className="text-zayzoon-teal font-semibold">Empower employees</span> to redeem rewards or take advances when needed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">✨ Personalized Messages</span>
            <span className="bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">💰 Points Advance System</span>
            <span className="bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">🎉 Celebration Effects</span>
            <span className="bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">📊 Real-time Analytics</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* Manager Dashboard Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex flex-col h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zayzoon-teal/5 to-blue-500/5 rounded-3xl"></div>
            <div className="relative z-10 text-center flex flex-col h-full">
              <div className="bg-gradient-to-br from-zayzoon-teal to-blue-500 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-zayzoon-teal to-blue-600 bg-clip-text text-transparent mb-3">Manager Dashboard</h3>
              <p className="text-gray-600 mb-8 flex-grow text-lg leading-relaxed">Personalized recognition messages and comprehensive team management tools</p>
              <div className="mt-auto">
                <Link href="/manager" className="bg-gradient-to-r from-zayzoon-teal to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full inline-block text-center">
                  View Dashboard →
                </Link>
              </div>
            </div>
          </div>

          {/* Worker Dashboard Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex flex-col h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zayzoon-orange/5 to-pink-500/5 rounded-3xl"></div>
            <div className="relative z-10 text-center flex flex-col h-full">
              <div className="bg-gradient-to-br from-zayzoon-orange to-pink-500 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-zayzoon-orange to-pink-600 bg-clip-text text-transparent mb-3">Worker Dashboard</h3>
              <p className="text-gray-600 mb-8 flex-grow text-lg leading-relaxed">Redeem points, take advances, and track your recognition journey</p>
              <div className="mt-auto">
                <Link href="/worker" className="bg-gradient-to-r from-zayzoon-orange to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full inline-block text-center">
                  View Dashboard →
                </Link>
              </div>
            </div>
          </div>

          {/* Peer Recognition Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex flex-col h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zayzoon-purple/5 to-indigo-500/5 rounded-3xl"></div>
            <div className="relative z-10 text-center flex flex-col h-full">
              <div className="bg-gradient-to-br from-zayzoon-purple to-indigo-500 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-zayzoon-purple to-indigo-600 bg-clip-text text-transparent mb-3">Peer Recognition</h3>
              <p className="text-gray-600 mb-8 flex-grow text-lg leading-relaxed">Build team culture through peer-to-peer recognition and appreciation</p>
              <div className="mt-auto">
                <Link href="/peer" className="bg-gradient-to-r from-zayzoon-purple to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full inline-block text-center">
                  View Dashboard →
                </Link>
              </div>
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex flex-col h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl"></div>
            <div className="relative z-10 text-center flex flex-col h-full">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Leaderboard</h3>
              <p className="text-gray-600 mb-8 flex-grow text-lg leading-relaxed">Discover top performers and celebrate team achievements</p>
              <div className="mt-auto">
                <Link href="/leaderboard" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full inline-block text-center">
                  View Leaderboard →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center flex flex-col h-full group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">✨</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Personalized Recognition</h4>
              <p className="text-gray-600 flex-grow text-lg leading-relaxed">Meaningful recognition messages that celebrate individual achievements</p>
            </div>
            <div className="text-center flex flex-col h-full group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">💰</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Flexible Rewards</h4>
              <p className="text-gray-600 flex-grow text-lg leading-relaxed">Employees can redeem rewards or take advances when needed</p>
            </div>
            <div className="text-center flex flex-col h-full group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎉</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Engaging Experience</h4>
              <p className="text-gray-600 flex-grow text-lg leading-relaxed">Celebration effects and visual feedback to boost engagement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
