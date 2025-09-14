// Mock in-memory database
let employees = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    role: 'Marketing Manager',
    pointsBalance: 150,
    recentKudos: [
      {
        id: 1,
        message: 'Great campaign strategy and execution!',
        points: 25,
        date: new Date('2024-01-15'),
        from: 'Manager'
      }
    ],
    loanHistory: []
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Senior Engineer',
    pointsBalance: 80,
    recentKudos: [
      {
        id: 2,
        message: 'Excellent technical leadership and code quality',
        points: 30,
        date: new Date('2024-01-14'),
        from: 'Manager'
      }
    ],
    loanHistory: []
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Sales Representative',
    pointsBalance: -50, // Has an advance
    recentKudos: [],
    loanHistory: [
      {
        id: 1,
        amount: 50,
        date: new Date('2024-01-10'),
        redeemedPerk: 'Coffee Gift Card',
        repaymentStatus: 'outstanding'
      }
    ]
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Product Manager',
    pointsBalance: 200,
    recentKudos: [
      {
        id: 3,
        message: 'Outstanding product roadmap and stakeholder management',
        points: 40,
        date: new Date('2024-01-13'),
        from: 'Manager'
      }
    ],
    loanHistory: []
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'UX Designer',
    pointsBalance: 120,
    recentKudos: [
      {
        id: 4,
        message: 'Handled complex user research with exceptional insights',
        points: 35,
        date: new Date('2024-01-12'),
        from: 'Manager'
      }
    ],
    loanHistory: []
  },
  {
    id: 6,
    name: 'Alex Thompson',
    role: 'Data Analyst',
    pointsBalance: 95,
    recentKudos: [
      {
        id: 5,
        message: 'Provided crucial insights that drove business decisions',
        points: 20,
        date: new Date('2024-01-11'),
        from: 'Manager'
      }
    ],
    loanHistory: []
  },
  {
    id: 7,
    name: 'Emma Davis',
    role: 'HR Specialist',
    pointsBalance: 75,
    recentKudos: [
      {
        id: 6,
        message: 'Streamlined recruitment process and improved candidate experience',
        points: 25,
        date: new Date('2024-01-10'),
        from: 'Manager'
      }
    ],
    loanHistory: []
  },
  {
    id: 8,
    name: 'Michael Brown',
    role: 'DevOps Engineer',
    pointsBalance: 180,
    recentKudos: [
      {
        id: 7,
        message: 'Improved system reliability and deployment efficiency',
        points: 30,
        date: new Date('2024-01-09'),
        from: 'Manager'
      }
    ],
    loanHistory: []
  }
];

let perks = [
  {
    id: 1,
    name: 'Coffee Gift Card',
    cost: 50,
    description: '$10 Starbucks gift card',
    category: 'food'
  },
  {
    id: 2,
    name: 'Lunch Voucher',
    cost: 75,
    description: '$15 lunch voucher',
    category: 'food'
  },
  {
    id: 3,
    name: 'Transit Pass',
    cost: 100,
    description: 'Monthly transit pass',
    category: 'transportation'
  },
  {
    id: 4,
    name: 'Wellness Package',
    cost: 150,
    description: 'Spa treatment or gym membership',
    category: 'wellness'
  },
  {
    id: 5,
    name: 'Tech Accessory',
    cost: 200,
    description: 'Wireless headphones or phone case',
    category: 'electronics'
  }
];

let peerRecognitions = [];

// AI Kudos Generator
function generateAIKudos(employeeName, reason, points) {
  const messages = [
    `🌟 ${employeeName}, your ${reason} is truly inspiring! You've earned ${points} points for your outstanding contribution!`,
    `🎉 Amazing work, ${employeeName}! Your ${reason} shows incredible dedication. Here are ${points} well-deserved points!`,
    `✨ ${employeeName}, your ${reason} has made a real difference! You've earned ${points} points for your excellence!`,
    `🏆 Outstanding performance, ${employeeName}! Your ${reason} deserves recognition. Here are ${points} points!`,
    `💫 ${employeeName}, your ${reason} is exactly what we need! You've earned ${points} points for your hard work!`
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}

// Database functions
export function getEmployees() {
  return employees;
}

export function getEmployee(id) {
  return employees.find(emp => emp.id === parseInt(id));
}

export function updateEmployee(id, updates) {
  const index = employees.findIndex(emp => emp.id === parseInt(id));
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updates };
    return employees[index];
  }
  return null;
}

export function addKudos(employeeId, kudos) {
  const employee = getEmployee(employeeId);
  if (employee) {
    employee.recentKudos.unshift({
      id: Date.now(),
      ...kudos,
      date: new Date()
    });
    // Keep only last 10 kudos
    employee.recentKudos = employee.recentKudos.slice(0, 10);
    return employee;
  }
  return null;
}

export function addLoan(employeeId, loan) {
  const employee = getEmployee(employeeId);
  if (employee) {
    employee.loanHistory.unshift({
      id: Date.now(),
      ...loan,
      date: new Date()
    });
    return employee;
  }
  return null;
}

export function getPerks() {
  return perks;
}

export function getPerk(id) {
  return perks.find(perk => perk.id === parseInt(id));
}

export function addPeerRecognition(recognition) {
  peerRecognitions.unshift({
    id: Date.now(),
    ...recognition,
    date: new Date()
  });
  return peerRecognitions;
}

export function getPeerRecognitions() {
  return peerRecognitions;
}

export function getLeaderboard() {
  return employees
    .sort((a, b) => b.pointsBalance - a.pointsBalance)
    .slice(0, 10);
}

export { generateAIKudos };
