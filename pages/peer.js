import { useState, useEffect } from 'react';
import { Star, Users, Heart, Award, CheckCircle } from 'lucide-react';

export default function PeerDashboard() {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showRecognizeModal, setShowRecognizeModal] = useState(false);
  const [reason, setReason] = useState('');
  const [points, setPoints] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchEmployees();
    // For demo purposes, set current employee as Maria (ID 1)
    setCurrentEmployee({ id: 1, name: 'Maria Rodriguez', pointsBalance: 150 });
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
    if (!selectedEmployee || !reason.trim() || !currentEmployee) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/peer-recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromEmployeeId: currentEmployee.id,
          toEmployeeId: selectedEmployee.id,
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
        setPoints(10);
        fetchEmployees(); // Refresh employee data
        
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error recognizing peer:', error);
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
              <div className="bg-gradient-to-br from-zayzoon-purple to-zayzoon-orange p-3 rounded-xl shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zayzoon-purple">Peer Recognition</h1>
                <p className="text-sm text-gray-600 font-medium">Recognize your colleagues and build team culture</p>
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
        {/* Current Employee Info */}
        {currentEmployee && (
          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-zayzoon-purple to-zayzoon-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {currentEmployee.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentEmployee.name}</h2>
                  <p className="text-gray-600">Your Points: <span className="font-bold text-zayzoon-purple">{currentEmployee.pointsBalance}</span></p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Available to give</div>
                <div className="text-2xl font-bold text-zayzoon-purple">{currentEmployee.pointsBalance}</div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </div>
          </div>
        )}

        {/* Team Members */}
        <div className="card mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recognize Your Colleagues</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees
              .filter(emp => emp.id !== currentEmployee?.id)
              .map((employee) => (
                <div key={employee.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
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
                        <h4 className="text-lg font-bold text-gray-900">{employee.name}</h4>
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
                    <div className="mb-4 flex-grow">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Recent Recognition</h5>
                      <div className="space-y-2">
                        {employee.recentKudos.slice(0, 1).map((kudos) => (
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

                  <div className="mt-auto">
                    <button
                      onClick={() => openRecognizeModal(employee)}
                      disabled={!currentEmployee || currentEmployee.pointsBalance < 5}
                      className="w-full bg-zayzoon-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <Heart className="h-4 w-4" />
                      <span>Recognize</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Recognition Guidelines */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recognition Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col h-full">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">What to Recognize</h4>
              <ul className="text-sm text-gray-600 space-y-2 flex-grow">
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span>Going above and beyond</span>
                </li>
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span>Helping a colleague</span>
                </li>
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span>Great customer service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span>Innovative solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span>Team collaboration</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col h-full">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Point Guidelines</h4>
              <ul className="text-sm text-gray-600 space-y-2 flex-grow">
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span><span className="font-semibold">5-10 points:</span> Small gestures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span><span className="font-semibold">15-25 points:</span> Good work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span><span className="font-semibold">30-50 points:</span> Exceptional effort</span>
                </li>
                <li className="flex items-start">
                  <span className="text-zayzoon-purple mr-2">•</span>
                  <span><span className="font-semibold">50+ points:</span> Outstanding achievement</span>
                </li>
              </ul>
            </div>
          </div>
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
                  What did they do well?
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zayzoon-purple"
                  rows={3}
                  placeholder="e.g., helped me with a difficult customer, shared a great idea, covered my shift..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points to Give
                </label>
                <select
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zayzoon-purple"
                >
                  <option value={5}>5 points</option>
                  <option value={10}>10 points</option>
                  <option value={15}>15 points</option>
                  <option value={25}>25 points</option>
                  <option value={50}>50 points</option>
                </select>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center text-sm">
                  <span>Your current balance:</span>
                  <span className="font-bold text-zayzoon-purple">{currentEmployee?.pointsBalance || 0} points</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span>After giving:</span>
                  <span className="font-bold text-zayzoon-purple">
                    {(currentEmployee?.pointsBalance || 0) - points} points
                  </span>
                </div>
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
                  disabled={isLoading || !currentEmployee || currentEmployee.pointsBalance < points}
                  className="flex-1 bg-zayzoon-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
