/* =============================================================================
   KIMI LAB - ANALYTICS DASHBOARD MODULE
   Statistics, Charts, Reports, and Inventory Analytics
   ============================================================================= */

// Analytics Dashboard System
const analyticsDashboard = {
  
  // Calculate Dashboard Statistics
  getStatistics: function() {
    const totalChemicals = chemicalDatabase.length;
    const totalContainers = chemicalDatabase.reduce((sum, chem) => 
      sum + chem.containers.length, 0);
    
    const totalLocations = new Set(
      chemicalDatabase.flatMap(chem => 
        chem.containers.map(c => c.location.cabinet)
      )
    ).size;
    
    let availableCount = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let expiringCount = 0;
    let expiredCount = 0;
    
    const today = new Date();
    
    chemicalDatabase.forEach(chemical => {
      chemical.containers.forEach(container => {
        if (container.quantity === 0) {
          outOfStockCount++;
        } else if (container.quantity < container.minimumStock) {
          lowStockCount++;
        } else {
          availableCount++;
        }
        
        const expiryDate = new Date(container.expiryDate);
        const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry <= 0) {
          expiredCount++;
        } else if (daysUntilExpiry <= 30) {
          expiringCount++;
        }
      });
    });
    
    return {
      totalChemicals: totalChemicals,
      totalContainers: totalContainers,
      totalLocations: totalLocations,
      availableChemicals: availableCount,
      lowStockChemicals: lowStockCount,
      outOfStockChemicals: outOfStockCount,
      expiringChemicals: expiringCount,
      expiredChemicals: expiredCount,
      totalTransactions: inventoryHistory.length,
      activeUsers: 12 // Mock data
    };
  },
  
  // Get Chemicals by Category
  getChemicalsByCategory: function() {
    const categories = {};
    
    chemicalDatabase.forEach(chemical => {
      if (!categories[chemical.category]) {
        categories[chemical.category] = 0;
      }
      categories[chemical.category]++;
    });
    
    return Object.entries(categories).map(([name, count]) => ({
      category: name,
      count: count
    }));
  },
  
  // Get Chemicals by Hazard Classification
  getChemicalsByHazard: function() {
    const hazards = {};
    
    chemicalDatabase.forEach(chemical => {
      chemical.hazards.forEach(hazard => {
        if (!hazards[hazard]) {
          hazards[hazard] = 0;
        }
        hazards[hazard]++;
      });
    });
    
    return Object.entries(hazards).map(([hazard, count]) => ({
      hazard: hazard,
      count: count
    }));
  },
  
  // Get Chemicals by Storage Location
  getChemicalsByLocation: function() {
    const locations = {};
    
    chemicalDatabase.forEach(chemical => {
      chemical.containers.forEach(container => {
        const room = container.location.room;
        if (!locations[room]) {
          locations[room] = new Set();
        }
        locations[room].add(chemical.name);
      });
    });
    
    return Object.entries(locations).map(([room, chemicals]) => ({
      room: room,
      count: chemicals.size
    }));
  },
  
  // Get Chemicals by Stock Status
  getChemicalsByStockStatus: function() {
    let available = 0, lowStock = 0, outOfStock = 0;
    
    chemicalDatabase.forEach(chemical => {
      chemical.containers.forEach(container => {
        if (container.quantity === 0) {
          outOfStock++;
        } else if (container.quantity < container.minimumStock) {
          lowStock++;
        } else {
          available++;
        }
      });
    });
    
    return [
      { status: 'Available', count: available, color: '#4CAF50' },
      { status: 'Low Stock', count: lowStock, color: '#FFC107' },
      { status: 'Out of Stock', count: outOfStock, color: '#F44336' }
    ];
  },
  
  // Get Inventory Quantity by Category
  getInventoryQuantityByCategory: function() {
    const quantities = {};
    
    chemicalDatabase.forEach(chemical => {
      const category = chemical.category;
      if (!quantities[category]) {
        quantities[category] = 0;
      }
      
      chemical.containers.forEach(container => {
        quantities[category] += container.quantity;
      });
    });
    
    return Object.entries(quantities).map(([category, totalQuantity]) => ({
      category: category,
      totalQuantity: totalQuantity
    }));
  },
  
  // Get Most Frequently Used Chemicals
  getMostUsedChemicals: function() {
    const usage = {};
    
    inventoryHistory.forEach(transaction => {
      if (transaction.action === 'used') {
        if (!usage[transaction.container]) {
          usage[transaction.container] = 0;
        }
        usage[transaction.container]++;
      }
    });
    
    return Object.entries(usage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([container, count]) => {
        const chemical = findChemicalByContainer(container);
        return {
          container: container,
          chemical: chemical ? chemical.name : 'Unknown',
          usageCount: count
        };
      });
  },
  
  // Get Recently Added Chemicals
  getRecentlyAddedChemicals: function(days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return chemicalDatabase
      .flatMap(chemical => 
        chemical.containers.map(container => ({
          chemical: chemical.name,
          container: container.containerId,
          dateAdded: container.dateReceived,
          quantity: container.quantity
        }))
      )
      .filter(item => new Date(item.dateAdded) > cutoffDate)
      .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  },
  
  // Get Expiring Chemicals
  getExpiringChemicals: function(daysThreshold = 90) {
    const today = new Date();
    const expiringList = [];
    
    chemicalDatabase.forEach(chemical => {
      chemical.containers.forEach(container => {
        const expiryDate = new Date(container.expiryDate);
        const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry > 0 && daysUntilExpiry <= daysThreshold) {
          expiringList.push({
            chemical: chemical.name,
            container: container.containerId,
            expiryDate: container.expiryDate,
            daysRemaining: daysUntilExpiry
          });
        }
      });
    });
    
    return expiringList.sort((a, b) => a.daysRemaining - b.daysRemaining);
  },
  
  // Get Monthly Usage Statistics
  getMonthlyUsageStats: function(months = 12) {
    const stats = {};
    const today = new Date();
    
    for (let i = 0; i < months; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      stats[monthKey] = { used: 0, received: 0, disposed: 0 };
    }
    
    inventoryHistory.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (stats[monthKey]) {
        if (transaction.action === 'used') stats[monthKey].used += transaction.quantity;
        else if (transaction.action === 'received') stats[monthKey].received += transaction.quantity;
        else if (transaction.action === 'disposed') stats[monthKey].disposed += transaction.quantity;
      }
    });
    
    return Object.entries(stats)
      .reverse()
      .map(([month, data]) => ({ month, ...data }));
  },
  
  // Get Location Analytics
  getLocationAnalytics: function() {
    const locations = {};
    
    labMap.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        room.cabinets.forEach(cabinet => {
          const cabKey = `${room.roomName} - ${cabinet.name}`;
          locations[cabKey] = {
            containers: cabinet.containers,
            chemicals: cabinet.chemicals,
            shelves: cabinet.shelves
          };
        });
      });
    });
    
    return Object.entries(locations).map(([location, data]) => ({
      location: location,
      ...data
    }));
  },
  
  // Generate Inventory Report
  generateInventoryReport: function() {
    return {
      generatedDate: new Date(),
      totalChemicals: chemicalDatabase.length,
      totalContainers: chemicalDatabase.reduce((sum, c) => sum + c.containers.length, 0),
      chemicals: chemicalDatabase.map(chemical => ({
        name: chemical.name,
        formula: chemical.formula,
        category: chemical.category,
        containers: chemical.containers.length,
        totalQuantity: chemical.containers.reduce((sum, c) => sum + c.quantity, 0),
        unit: chemical.containers[0]?.unit || 'N/A'
      }))
    };
  },
  
  // Generate Low Stock Report
  generateLowStockReport: function() {
    const lowStockItems = [];
    
    chemicalDatabase.forEach(chemical => {
      chemical.containers.forEach(container => {
        if (container.quantity < container.minimumStock) {
          lowStockItems.push({
            chemical: chemical.name,
            container: container.containerId,
            currentQuantity: container.quantity,
            minimumStock: container.minimumStock,
            unit: container.unit,
            location: container.location.cabinet
          });
        }
      });
    });
    
    return {
      generatedDate: new Date(),
      totalLowStockItems: lowStockItems.length,
      items: lowStockItems
    };
  },
  
  // Generate Expiry Report
  generateExpiryReport: function() {
    const today = new Date();
    const expiredItems = [];
    const expiringItems = [];
    
    chemicalDatabase.forEach(chemical => {
      chemical.containers.forEach(container => {
        const expiryDate = new Date(container.expiryDate);
        const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        const item = {
          chemical: chemical.name,
          container: container.containerId,
          expiryDate: container.expiryDate,
          daysRemaining: daysUntilExpiry
        };
        
        if (daysUntilExpiry <= 0) {
          expiredItems.push(item);
        } else if (daysUntilExpiry <= 90) {
          expiringItems.push(item);
        }
      });
    });
    
    return {
      generatedDate: new Date(),
      expiredCount: expiredItems.length,
      expiringCount: expiringItems.length,
      expiredItems: expiredItems,
      expiringItems: expiringItems.sort((a, b) => a.daysRemaining - b.daysRemaining)
    };
  },
  
  // Generate Safety Report
  generateSafetyReport: function() {
    const hazardSummary = {};
    
    chemicalDatabase.forEach(chemical => {
      chemical.hazards.forEach(hazard => {
        if (!hazardSummary[hazard]) {
          hazardSummary[hazard] = [];
        }
        hazardSummary[hazard].push({
          chemical: chemical.name,
          category: chemical.category
        });
      });
    });
    
    return {
      generatedDate: new Date(),
      hazardSummary: hazardSummary
    };
  },
  
  // Export Report to CSV
  exportToCSV: function(reportData, filename) {
    let csv = `Kimi Lab Report - ${reportData.generatedDate}\n\n`;
    
    if (reportData.items) {
      const headers = Object.keys(reportData.items[0]);
      csv += headers.join(',') + '\n';
      
      reportData.items.forEach(item => {
        csv += headers.map(h => `"${item[h]}"`).join(',') + '\n';
      });
    }
    
    return csv;
  }
};

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = analyticsDashboard;
}
