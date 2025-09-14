import { getEmployees, getEmployee } from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    
    if (id) {
      const employee = getEmployee(id);
      if (employee) {
        return res.status(200).json(employee);
      } else {
        return res.status(404).json({ message: 'Employee not found' });
      }
    } else {
      const employees = getEmployees();
      return res.status(200).json(employees);
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}
