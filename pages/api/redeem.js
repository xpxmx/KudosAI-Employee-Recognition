import { getEmployee, updateEmployee, addLoan, getPerk } from '../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { employeeId, perkId, advance } = req.body;

  if (!employeeId || !perkId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const employee = getEmployee(employeeId);
  const perk = getPerk(perkId);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  if (!perk) {
    return res.status(404).json({ message: 'Perk not found' });
  }

  const isAdvance = advance || employee.pointsBalance < perk.cost;
  const newBalance = employee.pointsBalance - perk.cost;

  // Check if standard redemption is possible
  if (!isAdvance && employee.pointsBalance < perk.cost) {
    return res.status(400).json({ 
      message: 'Insufficient points for standard redemption. Use advance option.',
      canUseAdvance: true
    });
  }

  // Update employee balance
  updateEmployee(employeeId, { pointsBalance: newBalance });

  // If it's an advance, record in loan history
  if (isAdvance) {
    addLoan(employeeId, {
      amount: perk.cost,
      redeemedPerk: perk.name,
      repaymentStatus: 'outstanding'
    });
  }

  res.status(200).json({
    success: true,
    employee: getEmployee(employeeId),
    isAdvance,
    perk: perk.name,
    newBalance
  });
}
