import { useState, useEffect } from 'react';
import { Star, Gift, Award, Coffee, Utensils, Car, Home, Smartphone, AlertCircle, TrendingUp, TrendingDown, DollarSign, Target, PiggyBank, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WorkerDashboard() {
  const [employee, setEmployee] = useState(null);
  const [perks, setPerks] = useState([]);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedPerk, setSelectedPerk] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // For demo purposes, we'll use employee ID 1 (Maria)
    fetchEmployee(1);
    fetchPerks();
  }, []);

  const fetchEmployee = async (id) => {
    try {
      const response = await fetch(`/api/employees/${id}`);
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const fetchPerks = async () => {
    try {
      const response = await fetch('/api/perks');
      const data = await response.json();
      setPerks(data);
    } catch (error) {
      console.error('Error fetching perks:', error);
    }
  };

  const handleRedeem = async (perk, isAdvance = false) => {
    if (!employee) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: employee.id,
          perkId: perk.id,
          advance: isAdvance
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(
          isAdvance 
            ? `Advance redeemed! You now have ${data.newBalance} points.`
            : `Successfully redeemed ${perk.name}! You now have ${data.newBalance} points.`
        );
        setShowSuccess(true);
        setShowRedeemModal(false);
        fetchEmployee(employee.id); // Refresh employee data
        
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00A9A5', '#FF6F00', '#9C27B0', '#10B981', '#F59E0B']
        });
        
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      } else if (data.canUseAdvance) {
        // Show advance option
        setSelectedPerk(perk);
        setShowRedeemModal(true);
      }
    } catch (error) {
      console.error('Error redeeming perk:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAdvance = async () => {
    if (selectedPerk) {
      await handleRedeem(selectedPerk, true);
    }
  };

  const getPerkIcon = (category) => {
    switch (category) {
      case 'food': return <Coffee className="h-6 w-6" />;
      case 'transportation': return <Car className="h-6 w-6" />;
      case 'wellness': return <Award className="h-6 w-6" />;
      case 'electronics': return <Smartphone className="h-6 w-6" />;
      default: return <Gift className="h-6 w-6" />;
    }
  };

  const getPerkColor = (category) => {
    switch (category) {
      case 'food': return 'bg-orange-100 text-orange-600';
      case 'transportation': return 'bg-blue-100 text-blue-600';
      case 'wellness': return 'bg-green-100 text-green-600';
      case 'electronics': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zayzoon-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const outstandingLoan = employee.loanHistory.find(loan => loan.repaymentStatus === 'outstanding');
  const canRedeemStandard = (perk) => employee.pointsBalance >= perk.cost;
  const canRedeemAdvance = true; // Always allow advance

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-zayzoon-teal to-zayzoon-purple p-3 rounded-xl shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zayzoon-teal">Worker Dashboard</h1>
                <p className="text-sm text-gray-600 font-medium">Welcome back, {employee.name}!</p>
              </div>
            </div>
            <a href="/" className="text-gray-600 hover:text-gray-900">← Back to Home</a>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Points Balance Card */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Points Balance</h2>
              <div className={`text-4xl font-bold ${employee.pointsBalance >= 0 ? 'points-positive' : 'points-negative'}`}>
                {employee.pointsBalance}
              </div>
              <p className="text-gray-600">KudosPoints</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-gradient-to-br from-zayzoon-teal to-zayzoon-purple rounded-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}&backgroundColor=00A9A5,FF6F00,9C27B0&textColor=ffffff`}
                  alt={employee.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl" style={{display: 'none'}}>
                  {employee.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Outstanding Loan Alert */}
          {outstandingLoan && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Outstanding Advance</h3>
                  <p className="text-sm text-red-700">
                    You have an outstanding advance of {Math.abs(employee.pointsBalance)} points for "{outstandingLoan.redeemedPerk}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loan History */}
          {employee.loanHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan History</h3>
              <div className="space-y-3">
                {employee.loanHistory.map((loan) => (
                  <div key={loan.id} className={`p-4 rounded-lg border ${
                    loan.repaymentStatus === 'outstanding' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{loan.redeemedPerk}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(loan.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          loan.repaymentStatus === 'outstanding' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {loan.repaymentStatus === 'outstanding' ? '-' : '+'}{loan.amount} pts
                        </div>
                        <div className={`text-xs ${
                          loan.repaymentStatus === 'outstanding' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {loan.repaymentStatus === 'outstanding' ? 'Outstanding' : 'Repaid'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Financial Wellness Dashboard */}
        <div className="card mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl">
              <PiggyBank className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Financial Wellness</h2>
          </div>

          {/* Financial Health Score */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Financial Health Score</h3>
              <div className="text-2xl">💚</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-green-600">
                {(() => {
                  let score = 50; // Base score
                  
                  // Add points for positive balance
                  if (employee.pointsBalance > 0) {
                    score += Math.min(30, employee.pointsBalance / 5); // Up to 30 points for balance
                  }
                  
                  // Subtract points for debt
                  if (employee.pointsBalance < 0) {
                    score -= Math.min(40, Math.abs(employee.pointsBalance) / 2); // Up to 40 points penalty
                  }
                  
                  // Add points for recent recognition
                  score += Math.min(20, employee.recentKudos.length * 3); // Up to 20 points for recognition
                  
                  return Math.max(10, Math.min(100, Math.round(score)));
                })()}
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-2">Overall Score</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(() => {
                        let score = 50; // Base score
                        
                        // Add points for positive balance
                        if (employee.pointsBalance > 0) {
                          score += Math.min(30, employee.pointsBalance / 5);
                        }
                        
                        // Subtract points for debt
                        if (employee.pointsBalance < 0) {
                          score -= Math.min(40, Math.abs(employee.pointsBalance) / 2);
                        }
                        
                        // Add points for recent recognition
                        score += Math.min(20, employee.recentKudos.length * 3);
                        
                        return Math.max(10, Math.min(100, Math.round(score)));
                      })()}%` 
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {employee.pointsBalance >= 0 ? 'Excellent financial health!' : 'Consider building your points balance'}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Points Balance Status */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">
                  {employee.pointsBalance >= 0 ? '💰' : '⚠️'}
                </div>
                <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  employee.pointsBalance >= 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {employee.pointsBalance >= 0 ? 'Positive' : 'In Debt'}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {employee.pointsBalance}
              </div>
              <div className="text-sm text-gray-600">Current Balance</div>
            </div>

            {/* Spending Analysis */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">📊</div>
                <TrendingDown className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {employee.loanHistory.reduce((sum, loan) => sum + loan.amount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>

            {/* Recognition Streak */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🎯</div>
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {employee.recentKudos.length}
              </div>
              <div className="text-sm text-gray-600">Recent Recognitions</div>
            </div>

            {/* Available Rewards */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🎁</div>
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {(() => {
                  // Count how many perks they can afford
                  const availablePerks = perks.filter(perk => employee.pointsBalance >= perk.cost).length;
                  return availablePerks;
                })()}
              </div>
              <div className="text-sm text-gray-600">Available Rewards</div>
            </div>
          </div>

          {/* Financial Tips & Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <div className="text-2xl mr-3">💡</div>
              Financial Tips & Insights
            </h3>
            <div className="space-y-3">
              {(() => {
                const tips = [];
                
                if (employee.pointsBalance < 0) {
                  tips.push({
                    icon: '🚨',
                    text: `You have an outstanding advance of ${Math.abs(employee.pointsBalance)} points. Focus on earning recognition to repay it.`,
                    type: 'warning'
                  });
                }
                
                if (employee.pointsBalance >= 100) {
                  tips.push({
                    icon: '🎉',
                    text: 'Excellent! You have a healthy points balance. You can afford multiple rewards!',
                    type: 'success'
                  });
                } else if (employee.pointsBalance >= 50) {
                  tips.push({
                    icon: '👍',
                    text: 'Good balance! You can afford some rewards. Keep earning recognition for more options.',
                    type: 'info'
                  });
                } else if (employee.pointsBalance >= 0) {
                  tips.push({
                    icon: '💪',
                    text: 'Keep earning recognition to build your points balance for more reward options.',
                    type: 'info'
                  });
                }
                
                const recentKudos = employee.recentKudos.length;
                if (recentKudos === 0) {
                  tips.push({
                    icon: '📝',
                    text: 'No recent recognition. Consider asking for feedback or taking on new challenges.',
                    type: 'suggestion'
                  });
                } else if (recentKudos >= 3) {
                  tips.push({
                    icon: '⭐',
                    text: `Excellent! You've received ${recentKudos} recognitions recently. Keep up the great work!`,
                    type: 'success'
                  });
                }
                
                return tips.slice(0, 3).map((tip, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    tip.type === 'warning' ? 'bg-red-50 border-red-400' :
                    tip.type === 'success' ? 'bg-green-50 border-green-400' :
                    tip.type === 'info' ? 'bg-blue-50 border-blue-400' :
                    'bg-yellow-50 border-yellow-400'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className="text-xl">{tip.icon}</div>
                      <p className="text-sm text-gray-700">{tip.text}</p>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Goals & Recommendations */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 text-purple-600 mr-2" />
                Recommended Goals
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Build Emergency Fund</span>
                  <span className="text-xs text-purple-600 font-semibold">100+ points</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Maintain Positive Balance</span>
                  <span className="text-xs text-green-600 font-semibold">Always</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Earn Monthly Recognition</span>
                  <span className="text-xs text-blue-600 font-semibold">2+ times</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                Quick Actions
              </h4>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-gray-700">View Spending History</div>
                  <div className="text-xs text-gray-500">Track your points usage</div>
                </button>
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-gray-700">Set Savings Goal</div>
                  <div className="text-xs text-gray-500">Plan for future rewards</div>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-gray-700">Request Recognition</div>
                  <div className="text-xs text-gray-500">Ask for feedback</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Recognition */}
        {employee.recentKudos.length > 0 && (
          <div className="card mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Recognition</h3>
            <div className="space-y-4">
              {employee.recentKudos.map((kudos) => (
                <div key={kudos.id} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">{kudos.message}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">From: {kudos.from}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-green-600">+{kudos.points} points</span>
                      <span className="text-xs text-gray-500">
                        {new Date(kudos.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Perks */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Available Perks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div key={perk.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${getPerkColor(perk.category)}`}>
                    {getPerkIcon(perk.category)}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{perk.cost}</div>
                    <div className="text-sm text-gray-600">points</div>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{perk.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{perk.description}</p>
                
                <div className="space-y-2">
                  {canRedeemStandard(perk) ? (
                    <button
                      onClick={() => handleRedeem(perk, false)}
                      disabled={isLoading}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Redeem Now
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRedeem(perk, false)}
                      disabled={isLoading}
                      className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Take Advance
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advance Confirmation Modal */}
      {showRedeemModal && selectedPerk && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Take Points Advance</h3>
            </div>
            <p className="text-gray-600 mb-6">
              You don't have enough points for "{selectedPerk.name}" ({selectedPerk.cost} points). 
              You can take an advance and repay it as you earn more points.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Current Balance:</span>
                <span className={`font-bold ${employee.pointsBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {employee.pointsBalance} points
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">After Advance:</span>
                <span className="font-bold text-red-600">
                  {employee.pointsBalance - selectedPerk.cost} points
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdvance}
                disabled={isLoading}
                className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Take Advance'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
