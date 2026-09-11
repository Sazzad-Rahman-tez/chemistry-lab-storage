/* =============================================================================
   KIMI LAB - ADVANCED LABORATORY MANAGEMENT SYSTEM
   Interactive Lab Map, Inventory Management, Safety Center, Smart Alerts
   ============================================================================= */

// Chemical Database with Inventory Information
const chemicalDatabase = [
  {
    id: 'CHM001',
    name: 'Hydrochloric Acid',
    commonName: 'HCl',
    formula: 'HCl',
    casNumber: '7647-01-0',
    category: 'Acid',
    hazards: ['corrosive', 'harmful'],
    properties: {
      state: 'Liquid',
      color: 'Colorless to yellow',
      odor: 'Pungent',
      pH: '< 1'
    },
    containers: [
      {
        containerId: 'HCL-001',
        batchNumber: 'B2024-0145',
        quantity: 2500,
        unit: 'mL',
        minimumStock: 1000,
        maximumStock: 5000,
        expiryDate: '2026-09-15',
        dateReceived: '2024-03-10',
        status: 'available',
        location: {
          building: 'Main Lab Building',
          floor: '2nd Floor',
          room: 'Room 02',
          cabinet: 'Acid Cabinet A',
          shelf: 'A-03',
          containerNumber: 'HCL-025'
        }
      },
      {
        containerId: 'HCL-002',
        batchNumber: 'B2024-0146',
        quantity: 1800,
        unit: 'mL',
        minimumStock: 1000,
        maximumStock: 5000,
        expiryDate: '2026-10-20',
        dateReceived: '2024-04-05',
        status: 'available',
        location: {
          building: 'Main Lab Building',
          floor: '2nd Floor',
          room: 'Room 02',
          cabinet: 'Acid Cabinet A',
          shelf: 'A-04',
          containerNumber: 'HCL-026'
        }
      },
      {
        containerId: 'HCL-003',
        batchNumber: 'B2024-0147',
        quantity: 500,
        unit: 'mL',
        minimumStock: 1000,
        maximumStock: 5000,
        expiryDate: '2026-08-30',
        dateReceived: '2024-02-20',
        status: 'low-stock',
        location: {
          building: 'Main Lab Building',
          floor: '2nd Floor',
          room: 'Room 02',
          cabinet: 'Acid Cabinet A',
          shelf: 'A-02',
          containerNumber: 'HCL-024'
        }
      }
    ],
    sds: 'https://example.com/sds/hcl',
    safetyInfo: {
      signalWord: 'Danger',
      ghs: ['corrosive', 'harmful'],
      ppe: ['Safety goggles', 'Chemical-resistant gloves', 'Lab coat', 'Closed-toe shoes'],
      storageRequirements: 'Store in cool, dry area. Keep container tightly closed. Store away from incompatible substances.',
      incompatibilities: ['Bases', 'Ammonia', 'Alkalis', 'Oxidizing agents'],
      emergencyInfo: 'In case of contact with eyes, rinse immediately for at least 15 minutes with water.'
    }
  },
  {
    id: 'CHM002',
    name: 'Sodium Hydroxide',
    commonName: 'NaOH',
    formula: 'NaOH',
    casNumber: '1310-73-2',
    category: 'Base',
    hazards: ['corrosive', 'harmful'],
    properties: {
      state: 'Solid',
      color: 'White',
      odor: 'Odorless',
      pH: '> 13'
    },
    containers: [
      {
        containerId: 'NAO-001',
        batchNumber: 'B2024-0150',
        quantity: 250,
        unit: 'g',
        minimumStock: 100,
        maximumStock: 500,
        expiryDate: '2027-05-10',
        dateReceived: '2024-05-10',
        status: 'available',
        location: {
          building: 'Main Lab Building',
          floor: '2nd Floor',
          room: 'Room 02',
          cabinet: 'Base Cabinet B',
          shelf: 'B-02',
          containerNumber: 'NAO-010'
        }
      }
    ],
    sds: 'https://example.com/sds/naoh',
    safetyInfo: {
      signalWord: 'Danger',
      ghs: ['corrosive'],
      ppe: ['Safety goggles', 'Chemical-resistant gloves', 'Lab coat'],
      storageRequirements: 'Store in cool, dry area in tightly sealed container. Keep away from moisture and incompatible substances.',
      incompatibilities: ['Acids', 'Aluminum', 'Zinc'],
      emergencyInfo: 'In case of skin contact, wash with large amounts of water for at least 15 minutes.'
    }
  },
  {
    id: 'CHM003',
    name: 'Acetone',
    commonName: 'Propanone',
    formula: 'C₃H₆O',
    casNumber: '67-64-1',
    category: 'Solvent',
    hazards: ['flammable', 'irritant'],
    properties: {
      state: 'Liquid',
      color: 'Colorless',
      odor: 'Characteristic acetone odor',
      pH: 'Neutral'
    },
    containers: [
      {
        containerId: 'ACE-001',
        batchNumber: 'B2024-0160',
        quantity: 4500,
        unit: 'mL',
        minimumStock: 2000,
        maximumStock: 5000,
        expiryDate: '2025-12-20',
        dateReceived: '2024-06-15',
        status: 'available',
        location: {
          building: 'Main Lab Building',
          floor: '2nd Floor',
          room: 'Room 03',
          cabinet: 'Flammable Storage Cabinet D',
          shelf: 'D-01',
          containerNumber: 'ACE-005'
        }
      }
    ],
    sds: 'https://example.com/sds/acetone',
    safetyInfo: {
      signalWord: 'Warning',
      ghs: ['flammable', 'irritant'],
      ppe: ['Safety goggles', 'Nitrile gloves', 'Lab coat'],
      storageRequirements: 'Store in flammable storage cabinet. Keep away from heat, sparks, and open flames.',
      incompatibilities: ['Oxidizing agents', 'Strong bases'],
      emergencyInfo: 'In case of inhalation, move to fresh air immediately.'
    }
  }
];

// Laboratory Map Structure
const labMap = {
  building: 'Main Lab Building',
  floors: [
    {
      floorNumber: 1,
      floorName: '1st Floor',
      rooms: [
        {
          roomId: 'ROOM-101',
          roomName: 'Room 01',
          description: 'General Chemistry Lab',
          cabinets: [
            {
              cabinetId: 'CAB-101',
              name: 'Salt Cabinet C',
              type: 'General Chemical Storage',
              shelves: 5,
              containers: 12,
              chemicals: 8
            }
          ]
        }
      ]
    },
    {
      floorNumber: 2,
      floorName: '2nd Floor',
      rooms: [
        {
          roomId: 'ROOM-201',
          roomName: 'Room 02',
          description: 'Acid-Base Chemistry Lab',
          cabinets: [
            {
              cabinetId: 'CAB-201',
              name: 'Acid Cabinet A',
              type: 'Acid/Corrosive Storage',
              shelves: 5,
              containers: 24,
              chemicals: 15,
              color: '#4CAF50'
            },
            {
              cabinetId: 'CAB-202',
              name: 'Base Cabinet B',
              type: 'Base/Alkaline Storage',
              shelves: 4,
              containers: 18,
              chemicals: 12,
              color: '#2196F3'
            }
          ]
        },
        {
          roomId: 'ROOM-202',
          roomName: 'Room 03',
          description: 'Organic Chemistry Lab',
          cabinets: [
            {
              cabinetId: 'CAB-203',
              name: 'Flammable Storage Cabinet D',
              type: 'Flammable Solvent Storage',
              shelves: 3,
              containers: 15,
              chemicals: 10,
              color: '#FF5722'
            }
          ]
        }
      ]
    }
  ]
};

// Reaction Database
const reactionDatabase = [
  {
    reactionId: 'RXN001',
    name: 'Acid-Base Neutralization',
    type: 'Neutralization',
    reactants: [
      { chemicalId: 'CHM001', name: 'Hydrochloric Acid', formula: 'HCl' },
      { chemicalId: 'CHM002', name: 'Sodium Hydroxide', formula: 'NaOH' }
    ],
    products: [
      { name: 'Sodium Chloride', formula: 'NaCl', hazard: 'non-hazardous' },
      { name: 'Water', formula: 'H₂O', hazard: 'non-hazardous' }
    ],
    balancedEquation: 'HCl + NaOH → NaCl + H₂O',
    description: 'A classic acid-base neutralization reaction producing salt and water.',
    educationalOnly: true,
    safetyWarning: 'This is an exothermic reaction. Only for theoretical/educational viewing.'
  },
  {
    reactionId: 'RXN002',
    name: 'Silver Chloride Precipitation',
    type: 'Precipitation',
    reactants: [
      { name: 'Silver Nitrate', formula: 'AgNO₃' },
      { chemicalId: 'CHM001', name: 'Hydrochloric Acid', formula: 'HCl' }
    ],
    products: [
      { name: 'Silver Chloride', formula: 'AgCl', hazard: 'toxic' },
      { name: 'Nitric Acid', formula: 'HNO₃', hazard: 'corrosive' }
    ],
    balancedEquation: 'AgNO₃ + HCl → AgCl↓ + HNO₃',
    description: 'Demonstrates ionic precipitation forming a white precipitate.',
    educationalOnly: true,
    safetyWarning: 'AgCl product is light-sensitive and toxic. Theoretical viewing only.'
  }
];

// Inventory History
let inventoryHistory = [];

// Alert System
const alertSystem = {
  alerts: [],
  
  checkAllAlerts: function() {
    this.alerts = [];
    
    chemicalDatabase.forEach(chemical => {
      chemical.containers.forEach(container => {
        // Check for out of stock
        if (container.quantity === 0) {
          this.alerts.push({
            severity: 'critical',
            type: 'out-of-stock',
            chemical: chemical.name,
            container: container.containerId,
            message: `${chemical.name} (${container.containerId}) is OUT OF STOCK`,
            timestamp: new Date()
          });
        }
        
        // Check for low stock
        if (container.quantity > 0 && container.quantity < container.minimumStock) {
          this.alerts.push({
            severity: 'warning',
            type: 'low-stock',
            chemical: chemical.name,
            container: container.containerId,
            message: `${chemical.name} (${container.containerId}) is LOW STOCK: ${container.quantity} ${container.unit}`,
            timestamp: new Date()
          });
        }
        
        // Check for expiry
        const expiryDate = new Date(container.expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry <= 0) {
          this.alerts.push({
            severity: 'critical',
            type: 'expired',
            chemical: chemical.name,
            container: container.containerId,
            message: `${chemical.name} (${container.containerId}) has EXPIRED`,
            timestamp: new Date()
          });
        } else if (daysUntilExpiry <= 30) {
          this.alerts.push({
            severity: 'warning',
            type: 'expiring-soon',
            chemical: chemical.name,
            container: container.containerId,
            message: `${chemical.name} (${container.containerId}) expires in ${daysUntilExpiry} days`,
            timestamp: new Date()
          });
        }
      });
    });
    
    return this.alerts;
  },
  
  getCriticalAlerts: function() {
    return this.alerts.filter(alert => alert.severity === 'critical');
  },
  
  getWarningAlerts: function() {
    return this.alerts.filter(alert => alert.severity === 'warning');
  }
};

// Inventory Transaction Functions
function recordInventoryTransaction(containerId, action, quantity, user, notes = '') {
  const container = findContainer(containerId);
  if (!container) return false;
  
  const previousQuantity = container.quantity;
  
  switch(action) {
    case 'received':
      container.quantity += quantity;
      break;
    case 'used':
      if (container.quantity < quantity) {
        console.error('Cannot use more than available quantity');
        return false;
      }
      container.quantity -= quantity;
      break;
    case 'disposed':
      if (container.quantity < quantity) {
        console.error('Cannot dispose more than available quantity');
        return false;
      }
      container.quantity -= quantity;
      break;
    case 'transferred':
      if (container.quantity < quantity) {
        console.error('Cannot transfer more than available quantity');
        return false;
      }
      container.quantity -= quantity;
      break;
    case 'corrected':
      container.quantity = quantity;
      break;
    default:
      return false;
  }
  
  // Record transaction
  inventoryHistory.push({
    date: new Date(),
    container: containerId,
    action: action,
    quantity: quantity,
    unit: container.unit,
    previousQuantity: previousQuantity,
    newQuantity: container.quantity,
    user: user,
    notes: notes
  });
  
  // Update status
  updateContainerStatus(container);
  
  return true;
}

function updateContainerStatus(container) {
  if (container.quantity === 0) {
    container.status = 'out-of-stock';
  } else if (container.quantity < container.minimumStock) {
    container.status = 'low-stock';
  } else if (container.quantity > container.maximumStock) {
    container.status = 'overstocked';
  } else {
    container.status = 'available';
  }
}

function findContainer(containerId) {
  for (let chemical of chemicalDatabase) {
    const container = chemical.containers.find(c => c.containerId === containerId);
    if (container) return container;
  }
  return null;
}

function findChemicalByContainer(containerId) {
  for (let chemical of chemicalDatabase) {
    const container = chemical.containers.find(c => c.containerId === containerId);
    if (container) return chemical;
  }
  return null;
}

// Search Functions
function searchChemicals(query) {
  const lowerQuery = query.toLowerCase();
  
  return chemicalDatabase.filter(chemical => {
    return (
      chemical.name.toLowerCase().includes(lowerQuery) ||
      chemical.commonName.toLowerCase().includes(lowerQuery) ||
      chemical.formula.toLowerCase().includes(lowerQuery) ||
      chemical.casNumber.includes(query) ||
      chemical.category.toLowerCase().includes(lowerQuery) ||
      chemical.hazards.some(h => h.toLowerCase().includes(lowerQuery)) ||
      chemical.containers.some(c => 
        c.containerId.toLowerCase().includes(lowerQuery) ||
        c.batchNumber.toLowerCase().includes(lowerQuery) ||
        c.location.cabinet.toLowerCase().includes(lowerQuery) ||
        c.location.room.toLowerCase().includes(lowerQuery)
      )
    );
  });
}

function searchReactions(query) {
  const lowerQuery = query.toLowerCase();
  
  return reactionDatabase.filter(reaction => {
    return (
      reaction.name.toLowerCase().includes(lowerQuery) ||
      reaction.type.toLowerCase().includes(lowerQuery) ||
      reaction.reactants.some(r => 
        r.name.toLowerCase().includes(lowerQuery) ||
        r.formula.toLowerCase().includes(lowerQuery)
      ) ||
      reaction.products.some(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.formula.toLowerCase().includes(lowerQuery)
      ) ||
      reaction.balancedEquation.toLowerCase().includes(lowerQuery)
    );
  });
}

// Interactive Lab Map Functions
function getLabFloors() {
  return labMap.floors;
}

function getRoomsByFloor(floorNumber) {
  const floor = labMap.floors.find(f => f.floorNumber === floorNumber);
  return floor ? floor.rooms : [];
}

function getCabinetsByRoom(roomId) {
  for (let floor of labMap.floors) {
    for (let room of floor.rooms) {
      if (room.roomId === roomId) {
        return room.cabinets;
      }
    }
  }
  return [];
}

function findChemicalLocation(chemicalId) {
  const chemical = chemicalDatabase.find(c => c.id === chemicalId);
  if (!chemical) return null;
  
  return chemical.containers.map(container => ({
    chemical: chemical.name,
    formula: chemical.formula,
    container: container.containerId,
    quantity: container.quantity,
    unit: container.unit,
    location: container.location
  }));
}

function highlightChemicalOnMap(chemicalId) {
  const locations = findChemicalLocation(chemicalId);
  return locations;
}

// Reaction Explorer Functions
function getReactionDetails(reactionId) {
  return reactionDatabase.find(r => r.reactionId === reactionId);
}

function checkInventoryForReactants(reactionId) {
  const reaction = getReactionDetails(reactionId);
  if (!reaction) return null;
  
  const inventory = reaction.reactants.map(reactant => {
    const chemical = chemicalDatabase.find(c => c.id === reactant.chemicalId || c.name === reactant.name);
    if (!chemical) {
      return {
        reactant: reactant.name,
        formula: reactant.formula,
        available: false,
        quantity: 0
      };
    }
    
    const totalQuantity = chemical.containers.reduce((sum, c) => sum + c.quantity, 0);
    const locations = chemical.containers
      .filter(c => c.quantity > 0)
      .map(c => ({
        location: c.location,
        quantity: c.quantity,
        unit: c.unit,
        container: c.containerId
      }));
    
    return {
      reactant: chemical.name,
      formula: chemical.formula,
      available: totalQuantity > 0,
      totalQuantity: totalQuantity,
      locations: locations
    };
  });
  
  return inventory;
}

// Export functions for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    chemicalDatabase,
    labMap,
    reactionDatabase,
    inventoryHistory,
    alertSystem,
    recordInventoryTransaction,
    findContainer,
    findChemicalByContainer,
    searchChemicals,
    searchReactions,
    getLabFloors,
    getRoomsByFloor,
    getCabinetsByRoom,
    findChemicalLocation,
    highlightChemicalOnMap,
    getReactionDetails,
    checkInventoryForReactants
  };
}
