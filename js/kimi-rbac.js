/* =============================================================================
   KIMI LAB - ROLE-BASED ACCESS CONTROL & USER MANAGEMENT MODULE
   User roles, permissions, access control, audit logging
   ============================================================================= */

// Role-Based Access Control System
const rbacSystem = {
  
  // Defined Roles
  roles: {
    student: {
      roleId: 'ROLE_STUDENT',
      roleName: 'Student',
      description: 'Can view chemicals, use learning center, explore reactions',
      permissions: [
        'VIEW_CHEMICALS',
        'VIEW_LOCATIONS',
        'SEARCH_CHEMICALS',
        'VIEW_REACTION_EXPLORER',
        'USE_LEARNING_CENTER',
        'COMPLETE_QUIZZES',
        'SCAN_QR_CODES',
        'VIEW_SAFETY_INFO',
        'VIEW_PERMITTED_HAZARDS'
      ]
    },
    
    labAssistant: {
      roleId: 'ROLE_LAB_ASSISTANT',
      roleName: 'Lab Assistant',
      description: 'Can record inventory transactions, scan containers, update quantities',
      permissions: [
        'VIEW_CHEMICALS',
        'VIEW_LOCATIONS',
        'SEARCH_CHEMICALS',
        'VIEW_REACTION_EXPLORER',
        'USE_LEARNING_CENTER',
        'COMPLETE_QUIZZES',
        'SCAN_QR_CODES',
        'VIEW_SAFETY_INFO',
        'ADD_INVENTORY_TRANSACTION',
        'UPDATE_CONTAINER_INFO',
        'VIEW_INVENTORY_HISTORY',
        'VIEW_ALERTS',
        'REPORT_LOW_STOCK'
      ]
    },
    
    teacher: {
      roleId: 'ROLE_TEACHER',
      roleName: 'Teacher',
      description: 'Can manage educational content, create quizzes, view analytics',
      permissions: [
        'VIEW_CHEMICALS',
        'VIEW_LOCATIONS',
        'SEARCH_CHEMICALS',
        'VIEW_REACTION_EXPLORER',
        'USE_LEARNING_CENTER',
        'COMPLETE_QUIZZES',
        'SCAN_QR_CODES',
        'VIEW_SAFETY_INFO',
        'CREATE_LEARNING_CONTENT',
        'MANAGE_QUIZZES',
        'VIEW_STUDENT_PROGRESS',
        'VIEW_ANALYTICS',
        'VIEW_REPORTS',
        'ADD_INVENTORY_TRANSACTION'
      ]
    },
    
    labManager: {
      roleId: 'ROLE_LAB_MANAGER',
      roleName: 'Lab Manager',
      description: 'Full inventory management, supplier management, QR codes, reports',
      permissions: [
        'VIEW_CHEMICALS',
        'VIEW_LOCATIONS',
        'SEARCH_CHEMICALS',
        'VIEW_REACTION_EXPLORER',
        'USE_LEARNING_CENTER',
        'SCAN_QR_CODES',
        'VIEW_SAFETY_INFO',
        'MANAGE_CHEMICALS',
        'MANAGE_CONTAINERS',
        'MANAGE_LOCATIONS',
        'ADD_INVENTORY_TRANSACTION',
        'UPDATE_CONTAINER_INFO',
        'VIEW_INVENTORY_HISTORY',
        'VIEW_ALERTS',
        'MANAGE_SUPPLIERS',
        'MANAGE_PURCHASES',
        'GENERATE_QR_CODES',
        'GENERATE_REPORTS',
        'VIEW_ANALYTICS',
        'TRANSFER_CONTAINERS',
        'MANAGE_EQUIPMENT'
      ]
    },
    
    administrator: {
      roleId: 'ROLE_ADMINISTRATOR',
      roleName: 'Administrator',
      description: 'Full system access, user management, permissions, system settings',
      permissions: [
        // All permissions
        'VIEW_CHEMICALS',
        'VIEW_LOCATIONS',
        'SEARCH_CHEMICALS',
        'VIEW_REACTION_EXPLORER',
        'USE_LEARNING_CENTER',
        'COMPLETE_QUIZZES',
        'SCAN_QR_CODES',
        'VIEW_SAFETY_INFO',
        'MANAGE_CHEMICALS',
        'MANAGE_CONTAINERS',
        'MANAGE_LOCATIONS',
        'ADD_INVENTORY_TRANSACTION',
        'UPDATE_CONTAINER_INFO',
        'VIEW_INVENTORY_HISTORY',
        'VIEW_ALERTS',
        'MANAGE_SUPPLIERS',
        'MANAGE_PURCHASES',
        'GENERATE_QR_CODES',
        'GENERATE_REPORTS',
        'VIEW_ANALYTICS',
        'TRANSFER_CONTAINERS',
        'MANAGE_EQUIPMENT',
        'CREATE_LEARNING_CONTENT',
        'MANAGE_QUIZZES',
        'VIEW_STUDENT_PROGRESS',
        'MANAGE_USERS',
        'MANAGE_ROLES',
        'CHANGE_USER_PERMISSIONS',
        'VIEW_AUDIT_LOG',
        'MANAGE_SYSTEM_SETTINGS',
        'DELETE_RECORDS'
      ]
    }
  },
  
  // User Database
  users: [
    {
      userId: 'USER-001',
      name: 'John Student',
      email: 'john@school.edu',
      role: 'ROLE_STUDENT',
      status: 'active',
      createdDate: '2024-01-15',
      lastActive: new Date(),
      permissions: []
    },
    {
      userId: 'USER-002',
      name: 'Sarah Assistant',
      email: 'sarah@school.edu',
      role: 'ROLE_LAB_ASSISTANT',
      status: 'active',
      createdDate: '2024-01-10',
      lastActive: new Date(),
      permissions: []
    },
    {
      userId: 'USER-003',
      name: 'Dr. Teacher',
      email: 'teacher@school.edu',
      role: 'ROLE_TEACHER',
      status: 'active',
      createdDate: '2024-01-05',
      lastActive: new Date(),
      permissions: []
    },
    {
      userId: 'USER-004',
      name: 'Manager Lab',
      email: 'manager@school.edu',
      role: 'ROLE_LAB_MANAGER',
      status: 'active',
      createdDate: '2023-12-01',
      lastActive: new Date(),
      permissions: []
    },
    {
      userId: 'USER-005',
      name: 'Admin System',
      email: 'admin@school.edu',
      role: 'ROLE_ADMINISTRATOR',
      status: 'active',
      createdDate: '2023-11-01',
      lastActive: new Date(),
      permissions: []
    }
  ],
  
  // Audit Log
  auditLog: [],
  
  // Methods
  getUserById: function(userId) {
    return this.users.find(u => u.userId === userId);
  },
  
  getUserRole: function(userId) {
    const user = this.getUserById(userId);
    if (!user) return null;
    return this.roles[user.role.toLowerCase().replace('role_', '')];
  },
  
  hasPermission: function(userId, permission) {
    const user = this.getUserById(userId);
    if (!user) return false;
    
    const role = this.getUserRole(userId);
    if (!role) return false;
    
    return role.permissions.includes(permission);
  },
  
  checkAccess: function(userId, requiredPermission) {
    const hasAccess = this.hasPermission(userId, requiredPermission);
    
    if (!hasAccess) {
      this.logAuditEvent(userId, 'ACCESS_DENIED', requiredPermission, {
        reason: 'Insufficient permissions'
      });
    }
    
    return hasAccess;
  },
  
  createUser: function(adminId, userData) {
    if (!this.checkAccess(adminId, 'MANAGE_USERS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const newUser = {
      userId: `USER-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: 'active',
      createdDate: new Date(),
      lastActive: null,
      permissions: []
    };
    
    this.users.push(newUser);
    this.logAuditEvent(adminId, 'USER_CREATED', newUser.userId, {
      userName: newUser.name,
      userRole: newUser.role
    });
    
    return { success: true, user: newUser };
  },
  
  updateUserRole: function(adminId, userId, newRole) {
    if (!this.checkAccess(adminId, 'MANAGE_ROLES')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const user = this.getUserById(userId);
    if (!user) return { success: false, message: 'User not found' };
    
    const oldRole = user.role;
    user.role = newRole;
    
    this.logAuditEvent(adminId, 'ROLE_CHANGED', userId, {
      previousRole: oldRole,
      newRole: newRole
    });
    
    return { success: true, message: 'Role updated successfully' };
  },
  
  changeUserStatus: function(adminId, userId, newStatus) {
    if (!this.checkAccess(adminId, 'MANAGE_USERS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const user = this.getUserById(userId);
    if (!user) return { success: false, message: 'User not found' };
    
    const previousStatus = user.status;
    user.status = newStatus;
    
    this.logAuditEvent(adminId, 'USER_STATUS_CHANGED', userId, {
      previousStatus: previousStatus,
      newStatus: newStatus
    });
    
    return { success: true, message: 'User status updated' };
  },
  
  logAuditEvent: function(userId, action, affectedItem, details = {}) {
    const auditEntry = {
      auditId: `AUDIT-${Date.now()}`,
      timestamp: new Date(),
      userId: userId,
      userRole: this.getUserRole(userId)?.roleName || 'Unknown',
      action: action,
      affectedItem: affectedItem,
      details: details
    };
    
    this.auditLog.push(auditEntry);
    
    // Keep only last 1000 entries
    if (this.auditLog.length > 1000) {
      this.auditLog = this.auditLog.slice(-1000);
    }
  },
  
  getAuditLog: function(userId, limit = 100) {
    if (!this.checkAccess(userId, 'VIEW_AUDIT_LOG')) {
      return [];
    }
    
    return this.auditLog.slice(-limit).reverse();
  },
  
  recordInventoryTransaction: function(userId, containerId, action, quantity, notes = '') {
    if (!this.checkAccess(userId, 'ADD_INVENTORY_TRANSACTION')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    // Record the transaction
    const result = recordInventoryTransaction(containerId, action, quantity, userId, notes);
    
    if (result) {
      this.logAuditEvent(userId, 'INVENTORY_UPDATED', containerId, {
        action: action,
        quantity: quantity,
        notes: notes
      });
    }
    
    return result;
  },
  
  addChemical: function(userId, chemicalData) {
    if (!this.checkAccess(userId, 'MANAGE_CHEMICALS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    this.logAuditEvent(userId, 'CHEMICAL_ADDED', chemicalData.name, {
      formula: chemicalData.formula,
      category: chemicalData.category
    });
    
    return { success: true, message: 'Chemical added successfully' };
  },
  
  updateChemical: function(userId, chemicalId, updates) {
    if (!this.checkAccess(userId, 'MANAGE_CHEMICALS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    this.logAuditEvent(userId, 'CHEMICAL_UPDATED', chemicalId, updates);
    
    return { success: true, message: 'Chemical updated successfully' };
  },
  
  deleteChemical: function(userId, chemicalId) {
    if (!this.checkAccess(userId, 'DELETE_RECORDS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    this.logAuditEvent(userId, 'CHEMICAL_DELETED', chemicalId, {
      reason: 'Deletion by authorized user'
    });
    
    return { success: true, message: 'Chemical deleted successfully' };
  },
  
  getAllUsers: function(adminId) {
    if (!this.checkAccess(adminId, 'MANAGE_USERS')) {
      return [];
    }
    
    return this.users.map(user => ({
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdDate: user.createdDate,
      lastActive: user.lastActive
    }));
  },
  
  getUserStats: function(adminId) {
    if (!this.checkAccess(adminId, 'MANAGE_USERS')) {
      return null;
    }
    
    const stats = {
      totalUsers: this.users.length,
      activeUsers: this.users.filter(u => u.status === 'active').length,
      inactiveUsers: this.users.filter(u => u.status === 'inactive').length,
      usersByRole: {}
    };
    
    this.users.forEach(user => {
      if (!stats.usersByRole[user.role]) {
        stats.usersByRole[user.role] = 0;
      }
      stats.usersByRole[user.role]++;
    });
    
    return stats;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = rbacSystem;
}
