import { getEmployee, updateEmployee, addKudos, generateAIKudos } from '../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { employeeId, reason, points } = req.body;

  if (!employeeId || !reason || !points) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const employee = getEmployee(employeeId);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  // Generate AI kudos message
  const aiMessage = generateAIKudos(employee.name, reason, points);

  // Handle loan repayment logic
  let newBalance = employee.pointsBalance;
  let remainingPoints = parseInt(points);
  let loanRepaid = false;

  // If employee has outstanding loan, repay it first
  if (employee.pointsBalance < 0) {
    const outstandingLoan = Math.abs(employee.pointsBalance);
    if (remainingPoints >= outstandingLoan) {
      // Full loan repayment
      remainingPoints -= outstandingLoan;
      newBalance = remainingPoints;
      loanRepaid = true;
      
      // Update loan history
      const outstandingLoanEntry = employee.loanHistory.find(loan => loan.repaymentStatus === 'outstanding');
      if (outstandingLoanEntry) {
        outstandingLoanEntry.repaymentStatus = 'repaid';
        outstandingLoanEntry.repaidDate = new Date();
      }
    } else {
      // Partial loan repayment
      newBalance = employee.pointsBalance + remainingPoints;
      remainingPoints = 0;
    }
  } else {
    // No loan, add points normally
    newBalance = employee.pointsBalance + remainingPoints;
  }

  // Update employee balance
  updateEmployee(employeeId, { pointsBalance: newBalance });

  // Add kudos to recentKudos
  addKudos(employeeId, {
    message: aiMessage,
    points: parseInt(points),
    from: 'Manager'
  });

  res.status(200).json({
    success: true,
    employee: getEmployee(employeeId),
    loanRepaid,
    message: aiMessage
  });
}
