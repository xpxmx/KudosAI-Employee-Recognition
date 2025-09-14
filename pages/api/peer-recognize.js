import { getEmployee, updateEmployee, addKudos, addPeerRecognition, generateAIKudos } from '../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fromEmployeeId, toEmployeeId, reason, points } = req.body;

  if (!fromEmployeeId || !toEmployeeId || !reason || !points) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const fromEmployee = getEmployee(fromEmployeeId);
  const toEmployee = getEmployee(toEmployeeId);

  if (!fromEmployee || !toEmployee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  // Check if fromEmployee has enough points
  if (fromEmployee.pointsBalance < parseInt(points)) {
    return res.status(400).json({ message: 'Insufficient points to give recognition' });
  }

  // Generate AI kudos message
  const aiMessage = generateAIKudos(toEmployee.name, reason, points);

  // Handle loan repayment for recipient
  let newToBalance = toEmployee.pointsBalance;
  let remainingPoints = parseInt(points);
  let loanRepaid = false;

  // If recipient has outstanding loan, repay it first
  if (toEmployee.pointsBalance < 0) {
    const outstandingLoan = Math.abs(toEmployee.pointsBalance);
    if (remainingPoints >= outstandingLoan) {
      // Full loan repayment
      remainingPoints -= outstandingLoan;
      newToBalance = remainingPoints;
      loanRepaid = true;
      
      // Update loan history
      const outstandingLoanEntry = toEmployee.loanHistory.find(loan => loan.repaymentStatus === 'outstanding');
      if (outstandingLoanEntry) {
        outstandingLoanEntry.repaymentStatus = 'repaid';
        outstandingLoanEntry.repaidDate = new Date();
      }
    } else {
      // Partial loan repayment
      newToBalance = toEmployee.pointsBalance + remainingPoints;
      remainingPoints = 0;
    }
  } else {
    // No loan, add points normally
    newToBalance = toEmployee.pointsBalance + remainingPoints;
  }

  // Update both employees
  updateEmployee(toEmployeeId, { pointsBalance: newToBalance });
  updateEmployee(fromEmployeeId, { 
    pointsBalance: fromEmployee.pointsBalance - parseInt(points) 
  });

  // Add kudos to recipient's recentKudos
  addKudos(toEmployeeId, {
    message: aiMessage,
    points: parseInt(points),
    from: fromEmployee.name
  });

  // Record peer recognition
  addPeerRecognition({
    fromEmployeeId,
    toEmployeeId,
    fromEmployeeName: fromEmployee.name,
    toEmployeeName: toEmployee.name,
    reason,
    points: parseInt(points),
    message: aiMessage
  });

  res.status(200).json({
    success: true,
    fromEmployee: getEmployee(fromEmployeeId),
    toEmployee: getEmployee(toEmployeeId),
    loanRepaid,
    message: aiMessage
  });
}
