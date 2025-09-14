import { useState, useEffect } from 'react';
import { Trophy, Star, Award, Crown, Medal, Zap, Heart } from 'lucide-react';

export default function Leaderboard() {
  const [employees, setEmployees] = useState([]);
  const [peerRecognitions, setPeerRecognitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [employeesRes, peerRes] = await Promise.all([
        fetch('/api/employees'),
        fetch('/api/peer-recognitions')
      ]);
      
      const employeesData = await employeesRes.json();
      const peerData = await peerRes.json();
      
      setEmployees(employeesData);
      setPeerRecognitions(peerData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 1: return <Medal className="h-6 w-6 text-gray-400" />;
      case 2: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Star className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 1: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 2: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gray-200';
    }
  };

  const getRecentPeerRecognition = (employeeId) => {
    return peerRecognitions.filter(rec => rec.toEmployeeId === employeeId).slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zayzoon-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const sortedEmployees = [...employees].sort((a, b) => b.pointsBalance - a.pointsBalance);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500 p-4 rounded-2xl shadow-xl">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-yellow-600">
                  Leaderboard
                </h1>
                <p className="text-lg text-gray-600 font-medium">🏆 Top performers and team achievements</p>
              </div>
            </div>
            <a href="/" className="bg-zayzoon-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top 3 Podium */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-600 mb-4">
              🏆 Top Performers
            </h2>
            <p className="text-xl text-gray-600">Celebrating our amazing team members</p>
          </div>
          
          {/* Podium Container */}
          <div className="flex justify-center items-end space-x-8 mb-8">
            {/* 2nd Place */}
            {sortedEmployees[1] && (
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="bg-gray-400 w-24 h-12 rounded-t-2xl mb-4 mx-auto shadow-2xl flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-lg">#2</span>
                </div>
                <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto shadow-2xl border-4 border-white overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sortedEmployees[1].name}&backgroundColor=9CA3AF&textColor=ffffff`}
                    alt={sortedEmployees[1].name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl" style={{display: 'none'}}>
                    {sortedEmployees[1].name.charAt(0)}
                  </div>
                </div>
              </div>
            )}
            
            {/* 1st Place */}
            {sortedEmployees[0] && (
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="bg-yellow-500 w-28 h-16 rounded-t-2xl mb-4 mx-auto shadow-2xl flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-xl">#1</span>
                </div>
                <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 mx-auto shadow-2xl border-4 border-white overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sortedEmployees[0].name}&backgroundColor=F59E0B&textColor=ffffff`}
                    alt={sortedEmployees[0].name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl" style={{display: 'none'}}>
                    {sortedEmployees[0].name.charAt(0)}
                  </div>
                </div>
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold animate-bounce mb-2">
                  🥇 CHAMPION
                </div>
              </div>
            )}
            
            {/* 3rd Place */}
            {sortedEmployees[2] && (
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="bg-orange-400 w-20 h-8 rounded-t-2xl mb-4 mx-auto shadow-2xl flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-sm">#3</span>
                </div>
                <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-2xl border-4 border-white overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sortedEmployees[2].name}&backgroundColor=FB923C&textColor=ffffff`}
                    alt={sortedEmployees[2].name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl" style={{display: 'none'}}>
                    {sortedEmployees[2].name.charAt(0)}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sortedEmployees.slice(0, 3).map((employee, index) => (
              <div key={employee.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      {getRankIcon(index)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{employee.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{employee.role}</p>
                  
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className={`text-3xl font-bold ${employee.pointsBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {employee.pointsBalance}
                    </div>
                    <div className="text-sm text-gray-500 font-semibold">points</div>
                  </div>
                  
                  {index === 0 && (
                    <div className="mt-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                      🥇 CHAMPION
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-zayzoon-teal to-zayzoon-purple bg-clip-text text-transparent mb-8 text-center">
            📊 Complete Leaderboard
          </h3>
          <div className="space-y-3">
            {sortedEmployees.map((employee, index) => {
              const recentPeerRecognition = getRecentPeerRecognition(employee.id);
              const isTopThree = index < 3;
              return (
                <div key={employee.id} className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  isTopThree 
                    ? 'bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-200' 
                    : 'bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200'
                }`}>
                  <div className="flex items-center space-x-6">
                    {/* Rank Badge */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold shadow-lg ${
                      isTopThree 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                        : 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-zayzoon-teal to-zayzoon-purple rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white overflow-hidden">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}&backgroundColor=00A9A5,FF6F00,9C27B0&textColor=ffffff`}
                        alt={employee.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl" style={{display: 'none'}}>
                        {employee.name.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-grow">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{employee.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{employee.role}</p>
                      {recentPeerRecognition.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                            ✨ Recently recognized by {recentPeerRecognition[0].fromEmployeeName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Points */}
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${employee.pointsBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {employee.pointsBalance}
                    </div>
                    <div className="text-sm text-gray-500 font-semibold">points</div>
                    {employee.loanHistory.some(loan => loan.repaymentStatus === 'outstanding') && (
                      <div className="text-xs text-red-600 mt-1 bg-red-100 px-2 py-1 rounded-full font-semibold">
                        💳 Has advance
                      </div>
                    )}
                    {isTopThree && (
                      <div className="text-xs text-yellow-600 mt-1 font-bold">
                        🏆 Top Performer
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company-Wide Team Overview */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/20 mt-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 rounded-3xl"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-zayzoon-teal via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                🏢 Company-Wide Team Overview
              </h2>
              <p className="text-xl text-gray-600">Real-time insights into team performance and engagement</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 text-center shadow-xl border border-teal-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                <div className="bg-gradient-to-br from-zayzoon-teal to-blue-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-zayzoon-teal mb-2">
                  {employees.reduce((sum, emp) => sum + emp.pointsBalance, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 font-semibold">Total Points Awarded</div>
                <div className="text-xs text-gray-500 mt-1">Across all employees</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 text-center shadow-xl border border-orange-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                <div className="bg-gradient-to-br from-zayzoon-orange to-red-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-zayzoon-orange mb-2">
                  {peerRecognitions.length}
                </div>
                <div className="text-sm text-gray-600 font-semibold">Peer Recognitions</div>
                <div className="text-xs text-gray-500 mt-1">This month</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center shadow-xl border border-purple-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                <div className="bg-gradient-to-br from-zayzoon-purple to-pink-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-zayzoon-purple mb-2">
                  {employees.filter(emp => emp.recentKudos.length > 0).length}
                </div>
                <div className="text-sm text-gray-600 font-semibold">Active Contributors</div>
                <div className="text-xs text-gray-500 mt-1">Recently recognized</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center shadow-xl border border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {employees.length}
                </div>
                <div className="text-sm text-gray-600 font-semibold">Total Team Members</div>
                <div className="text-xs text-gray-500 mt-1">Across all departments</div>
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Department Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(() => {
                  const departments = {};
                  employees.forEach(emp => {
                    const dept = emp.role.split(' ')[0]; // Get first word as department
                    if (!departments[dept]) {
                      departments[dept] = { count: 0, totalPoints: 0, avgPoints: 0 };
                    }
                    departments[dept].count++;
                    departments[dept].totalPoints += emp.pointsBalance;
                  });
                  
                  Object.keys(departments).forEach(dept => {
                    departments[dept].avgPoints = Math.round(departments[dept].totalPoints / departments[dept].count);
                  });
                  
                  return Object.entries(departments).map(([dept, data], index) => (
                    <div key={dept} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{dept}</div>
                      <div className="text-3xl font-bold text-zayzoon-teal mb-1">{data.avgPoints}</div>
                      <div className="text-sm text-gray-600 mb-2">Avg Points</div>
                      <div className="text-lg font-semibold text-gray-700">{data.count} members</div>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Team Health Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900">Team Engagement</h4>
                  <div className="text-2xl">📈</div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round((employees.filter(emp => emp.recentKudos.length > 0).length / employees.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Active participation rate</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900">Recognition Frequency</h4>
                  <div className="text-2xl">🎯</div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(employees.reduce((sum, emp) => sum + emp.recentKudos.length, 0) / employees.length)}
                </div>
                <div className="text-sm text-gray-600">Kudos per person</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900">Peer Recognition</h4>
                  <div className="text-2xl">🤝</div>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(peerRecognitions.length / employees.length * 10) / 10}
                </div>
                <div className="text-sm text-gray-600">Per team member</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Peer Recognitions */}
        {peerRecognitions.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 mt-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">
              💝 Recent Peer Recognitions
            </h3>
            <div className="space-y-6">
              {peerRecognitions.slice(0, 5).map((recognition) => (
                <div key={recognition.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-zayzoon-purple to-zayzoon-orange rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${recognition.fromEmployeeName}&backgroundColor=9C27B0,FF6F00&textColor=ffffff`}
                          alt={recognition.fromEmployeeName}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                          {recognition.fromEmployeeName.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-lg">{recognition.fromEmployeeName}</span>
                        <span className="text-gray-600 mx-2">❤️ recognized</span>
                        <span className="font-bold text-gray-900 text-lg">{recognition.toEmployeeName}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-lg">
                        +{recognition.points} points
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(recognition.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 ml-16">
                    <p className="text-gray-700 text-base italic">"{recognition.message}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
