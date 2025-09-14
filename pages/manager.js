import { useState, useEffect } from 'react';
import { Star, Users, Award, Plus, CheckCircle } from 'lucide-react';

export default function ManagerDashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showRecognizeModal, setShowRecognizeModal] = useState(false);
  const [reason, setReason] = useState('');
  const [points, setPoints] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleRecognize = async (e) => {
    e.preventDefault();
    if (!selectedEmployee || !reason.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/kudos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: selectedEmployee.id,
          reason: reason.trim(),
          points: parseInt(points)
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(data.message);
        setShowSuccess(true);
        setShowRecognizeModal(false);
        setReason('');
        setPoints(25);
        fetchEmployees(); // Refresh employee data
        
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error recognizing employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openRecognizeModal = (employee) => {
    setSelectedEmployee(employee);
    setShowRecognizeModal(true);
  };

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
                <h1 className="text-3xl font-bold text-zayzoon-teal">Manager Dashboard</h1>
                <p className="text-sm text-gray-600 font-medium">Recognize your team with AI-powered messages</p>
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
            <CheckCircle className="h-5 w-5" />
            <span>Recognition sent successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-zayzoon-teal mb-2">{employees.length}</div>
            <div className="text-gray-600">Total Employees</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {employees.filter(emp => emp.pointsBalance > 0).length}
            </div>
            <div className="text-gray-600">Positive Balance</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {employees.filter(emp => emp.pointsBalance < 0).length}
            </div>
            <div className="text-gray-600">With Advances</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-zayzoon-orange mb-2">
              {employees.reduce((sum, emp) => sum + emp.pointsBalance, 0)}
            </div>
            <div className="text-gray-600">Total Points</div>
          </div>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="card hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-zayzoon-teal to-zayzoon-purple rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}&backgroundColor=00A9A5,FF6F00,9C27B0&textColor=ffffff`}
                      alt={employee.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                      {employee.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                  </div>
                </div>
                <div className={`text-right ${employee.pointsBalance >= 0 ? 'points-positive' : 'points-negative'}`}>
                  <div className="text-xl font-bold">{employee.pointsBalance}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>

              {/* Recent Kudos */}
              {employee.recentKudos.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Recognition</h4>
                  <div className="space-y-2">
                    {employee.recentKudos.slice(0, 2).map((kudos) => (
                      <div key={kudos.id} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{kudos.message}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">+{kudos.points} points</span>
                          <span className="text-xs text-gray-500">
                            {new Date(kudos.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loan History */}
              {employee.loanHistory.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Outstanding Advances</h4>
                  {employee.loanHistory
                    .filter(loan => loan.repaymentStatus === 'outstanding')
                    .map((loan) => (
                      <div key={loan.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-red-800">{loan.redeemedPerk}</span>
                          <span className="text-sm font-bold text-red-600">-{loan.amount} pts</span>
                        </div>
                        <div className="text-xs text-red-600 mt-1">
                          {new Date(loan.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              <button
                onClick={() => openRecognizeModal(employee)}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Recognize</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recognition Modal */}
      {showRecognizeModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Recognize {selectedEmployee.name}
            </h3>
            <form onSubmit={handleRecognize} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Recognition
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zayzoon-teal"
                  rows={3}
                  placeholder="e.g., excellent customer service, great teamwork, innovative solution..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points to Award
                </label>
                <select
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zayzoon-teal"
                >
                  <option value={10}>10 points</option>
                  <option value={25}>25 points</option>
                  <option value={50}>50 points</option>
                  <option value={100}>100 points</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRecognizeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Recognition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
