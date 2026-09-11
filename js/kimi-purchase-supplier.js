/* =============================================================================
   KIMI LAB - CHEMICAL PURCHASE & SUPPLIER MANAGEMENT MODULE
   Supplier management, Purchase orders, Receiving workflow, Purchase history
   ============================================================================= */

// Chemical Purchase & Supplier Management System
const purchaseSupplierSystem = {
  
  // Suppliers Database
  suppliers: [
    {
      supplierId: 'SUPP-001',
      companyName: 'ChemTech Solutions',
      contactPerson: 'John Smith',
      phone: '+1-555-0100',
      email: 'sales@chemtech.com',
      address: '123 Lab Street, Science City, SC 12345',
      website: 'www.chemtech.com',
      status: 'active',
      createdDate: '2024-01-10',
      notes: 'Reliable supplier for lab chemicals'
    },
    {
      supplierId: 'SUPP-002',
      companyName: 'Pure Elements Inc',
      contactPerson: 'Sarah Johnson',
      phone: '+1-555-0200',
      email: 'info@pureelements.com',
      address: '456 Chemistry Ave, Test Town, TT 54321',
      website: 'www.pureelements.com',
      status: 'active',
      createdDate: '2024-01-15',
      notes: 'Specialty organic chemicals'
    },
    {
      supplierId: 'SUPP-003',
      companyName: 'Lab Supply Co',
      contactPerson: 'Mike Brown',
      phone: '+1-555-0300',
      email: 'orders@labsupply.com',
      address: '789 Reaction Rd, Formula Falls, FF 98765',
      website: 'www.labsupply.com',
      status: 'active',
      createdDate: '2024-02-01',
      notes: 'General lab supplies and chemicals'
    }
  ],
  
  // Purchase Orders Database
  purchaseOrders: [
    {
      purchaseId: 'PO-001',
      supplierId: 'SUPP-001',
      purchaseDate: '2024-09-01',
      invoiceNumber: 'INV-2024-001',
      status: 'received',
      totalCost: 450.00,
      createdBy: 'USER-004',
      items: [
        {
          itemId: 'POI-001-01',
          chemicalId: 'CHEM-001',
          chemicalName: 'Hydrochloric Acid',
          quantity: 10,
          unit: 'L',
          pricePerUnit: 45.00,
          totalPrice: 450.00,
          batchNumber: 'HCL-2024-001',
          manufacturingDate: '2024-08-15',
          expiryDate: '2026-08-15'
        }
      ],
      receivedDate: '2024-09-05',
      receivedBy: 'USER-002',
      notes: 'Good condition, stored in Acid Cabinet A'
    }
  ],
  
  // Received Chemicals/Containers Database
  receivedChemicals: [
    {
      receiptId: 'REC-001',
      purchaseId: 'PO-001',
      supplierId: 'SUPP-001',
      chemicalId: 'CHEM-001',
      chemicalName: 'Hydrochloric Acid',
      totalQuantityReceived: 10,
      unit: 'L',
      batchNumber: 'HCL-2024-001',
      manufacturingDate: '2024-08-15',
      expiryDate: '2026-08-15',
      receivedDate: '2024-09-05',
      receivedBy: 'USER-002',
      purchaseReferenceNumber: 'INV-2024-001',
      containers: [
        {
          containerId: 'KML-HCL-00031',
          quantity: 2,
          unit: 'L',
          storageLocation: 'Acid Cabinet A / Shelf A-03',
          qrCode: 'QR-KML-HCL-00031',
          status: 'active',
          createdDate: '2024-09-05'
        },
        {
          containerId: 'KML-HCL-00032',
          quantity: 2,
          unit: 'L',
          storageLocation: 'Acid Cabinet A / Shelf A-04',
          qrCode: 'QR-KML-HCL-00032',
          status: 'active',
          createdDate: '2024-09-05'
        },
        {
          containerId: 'KML-HCL-00033',
          quantity: 2,
          unit: 'L',
          storageLocation: 'Acid Cabinet A / Shelf A-05',
          qrCode: 'QR-KML-HCL-00033',
          status: 'active',
          createdDate: '2024-09-05'
        },
        {
          containerId: 'KML-HCL-00034',
          quantity: 2,
          unit: 'L',
          storageLocation: 'Acid Cabinet B / Shelf B-01',
          qrCode: 'QR-KML-HCL-00034',
          status: 'active',
          createdDate: '2024-09-05'
        },
        {
          containerId: 'KML-HCL-00035',
          quantity: 2,
          unit: 'L',
          storageLocation: 'Acid Cabinet B / Shelf B-02',
          qrCode: 'QR-KML-HCL-00035',
          status: 'active',
          createdDate: '2024-09-05'
        }
      ],
      status: 'completed',
      notes: 'All containers received and stored'
    }
  ],
  
  // Purchase History
  purchaseHistory: [],
  
  // Methods
  getSupplierById: function(supplierId) {
    return this.suppliers.find(s => s.supplierId === supplierId);
  },
  
  addSupplier: function(userId, supplierData, rbac) {
    if (!rbac.checkAccess(userId, 'MANAGE_SUPPLIERS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const newSupplier = {
      supplierId: `SUPP-${Date.now()}`,
      companyName: supplierData.companyName,
      contactPerson: supplierData.contactPerson,
      phone: supplierData.phone,
      email: supplierData.email,
      address: supplierData.address,
      website: supplierData.website,
      status: 'active',
      createdDate: new Date(),
      notes: supplierData.notes || ''
    };
    
    this.suppliers.push(newSupplier);
    rbac.logAuditEvent(userId, 'SUPPLIER_ADDED', newSupplier.supplierId, {
      companyName: newSupplier.companyName
    });
    
    return { success: true, supplier: newSupplier };
  },
  
  updateSupplier: function(userId, supplierId, updates, rbac) {
    if (!rbac.checkAccess(userId, 'MANAGE_SUPPLIERS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const supplier = this.getSupplierById(supplierId);
    if (!supplier) return { success: false, message: 'Supplier not found' };
    
    Object.assign(supplier, updates);
    rbac.logAuditEvent(userId, 'SUPPLIER_UPDATED', supplierId, updates);
    
    return { success: true, supplier: supplier };
  },
  
  deactivateSupplier: function(userId, supplierId, rbac) {
    if (!rbac.checkAccess(userId, 'MANAGE_SUPPLIERS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const supplier = this.getSupplierById(supplierId);
    if (!supplier) return { success: false, message: 'Supplier not found' };
    
    supplier.status = 'inactive';
    rbac.logAuditEvent(userId, 'SUPPLIER_DEACTIVATED', supplierId, {});
    
    return { success: true, message: 'Supplier deactivated' };
  },
  
  searchSuppliers: function(query) {
    const lowerQuery = query.toLowerCase();
    return this.suppliers.filter(s => 
      s.companyName.toLowerCase().includes(lowerQuery) ||
      s.contactPerson.toLowerCase().includes(lowerQuery) ||
      s.email.toLowerCase().includes(lowerQuery)
    );
  },
  
  filterSuppliers: function(filters) {
    return this.suppliers.filter(s => {
      if (filters.status && s.status !== filters.status) return false;
      if (filters.createdAfter && new Date(s.createdDate) < new Date(filters.createdAfter)) return false;
      if (filters.createdBefore && new Date(s.createdDate) > new Date(filters.createdBefore)) return false;
      return true;
    });
  },
  
  createPurchaseOrder: function(userId, purchaseData, rbac) {
    if (!rbac.checkAccess(userId, 'MANAGE_PURCHASES')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const newPO = {
      purchaseId: `PO-${Date.now()}`,
      supplierId: purchaseData.supplierId,
      purchaseDate: new Date(),
      invoiceNumber: purchaseData.invoiceNumber,
      status: 'pending',
      totalCost: purchaseData.totalCost,
      createdBy: userId,
      items: purchaseData.items,
      receivedDate: null,
      receivedBy: null,
      notes: purchaseData.notes || ''
    };
    
    this.purchaseOrders.push(newPO);
    rbac.logAuditEvent(userId, 'PURCHASE_ORDER_CREATED', newPO.purchaseId, {
      supplierId: purchaseData.supplierId,
      totalCost: purchaseData.totalCost
    });
    
    return { success: true, purchaseOrder: newPO };
  },
  
  receivePurchaseOrder: function(userId, purchaseId, receiveData, rbac) {
    if (!rbac.checkAccess(userId, 'MANAGE_PURCHASES')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const po = this.purchaseOrders.find(p => p.purchaseId === purchaseId);
    if (!po) return { success: false, message: 'Purchase order not found' };
    
    po.status = 'received';
    po.receivedDate = new Date();
    po.receivedBy = userId;
    
    rbac.logAuditEvent(userId, 'PURCHASE_ORDER_RECEIVED', purchaseId, {
      receivedBy: userId,
      totalQuantityReceived: receiveData.totalQuantity
    });
    
    return { success: true, message: 'Purchase order marked as received' };
  },
  
  createContainersFromPurchase: function(userId, purchaseId, containerData, rbac) {
    if (!rbac.checkAccess(userId, 'MANAGE_CONTAINERS')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    const po = this.purchaseOrders.find(p => p.purchaseId === purchaseId);
    if (!po) return { success: false, message: 'Purchase order not found' };
    
    const receipt = {
      receiptId: `REC-${Date.now()}`,
      purchaseId: purchaseId,
      supplierId: po.supplierId,
      chemicalId: containerData.chemicalId,
      chemicalName: containerData.chemicalName,
      totalQuantityReceived: containerData.totalQuantity,
      unit: containerData.unit,
      batchNumber: containerData.batchNumber,
      manufacturingDate: containerData.manufacturingDate,
      expiryDate: containerData.expiryDate,
      receivedDate: new Date(),
      receivedBy: userId,
      purchaseReferenceNumber: po.invoiceNumber,
      containers: containerData.containers,
      status: 'completed',
      notes: containerData.notes || ''
    };
    
    this.receivedChemicals.push(receipt);
    rbac.logAuditEvent(userId, 'CONTAINERS_CREATED', purchaseId, {
      containerCount: containerData.containers.length,
      totalQuantity: containerData.totalQuantity
    });
    
    return { success: true, receipt: receipt };
  },
  
  generateQRCode: function(containerId, chemicalName, batchNumber) {
    return {
      qrCode: `QR-${containerId}`,
      data: {
        containerId: containerId,
        chemicalName: chemicalName,
        batchNumber: batchNumber,
        generatedDate: new Date()
      }
    };
  },
  
  getPurchaseHistory: function(filters = {}) {
    let history = this.purchaseOrders;
    
    if (filters.supplierId) {
      history = history.filter(p => p.supplierId === filters.supplierId);
    }
    
    if (filters.status) {
      history = history.filter(p => p.status === filters.status);
    }
    
    if (filters.dateFrom && filters.dateTo) {
      history = history.filter(p => 
        new Date(p.purchaseDate) >= new Date(filters.dateFrom) &&
        new Date(p.purchaseDate) <= new Date(filters.dateTo)
      );
    }
    
    if (filters.chemicalId) {
      history = history.filter(p =>
        p.items.some(item => item.chemicalId === filters.chemicalId)
      );
    }
    
    if (filters.batchNumber) {
      history = history.filter(p =>
        p.items.some(item => item.batchNumber === filters.batchNumber)
      );
    }
    
    return history.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
  },
  
  getSupplierDetails: function(supplierId) {
    const supplier = this.getSupplierById(supplierId);
    if (!supplier) return null;
    
    const purchases = this.purchaseOrders.filter(p => p.supplierId === supplierId);
    const chemicalsPurchased = [...new Set(purchases.flatMap(p => 
      p.items.map(item => item.chemicalName)
    ))];
    
    const recentPurchases = purchases
      .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
      .slice(0, 5);
    
    const totalSpending = purchases.reduce((sum, p) => sum + p.totalCost, 0);
    
    return {
      supplier: supplier,
      totalPurchases: purchases.length,
      chemicalsPurchased: chemicalsPurchased,
      recentPurchases: recentPurchases,
      totalSpending: totalSpending,
      purchaseHistory: purchases
    };
  },
  
  createLowStockPurchaseRequest: function(userId, chemicalId, chemicalName, minimumLevel, rbac) {
    if (!rbac.checkAccess(userId, 'MANAGE_PURCHASES')) {
      return { success: false, message: 'Insufficient permissions' };
    }
    
    rbac.logAuditEvent(userId, 'PURCHASE_REQUEST_CREATED', chemicalId, {
      chemicalName: chemicalName,
      minimumLevel: minimumLevel,
      note: 'Created due to low stock'
    });
    
    return { 
      success: true, 
      message: 'Purchase request created. Review suppliers and create a purchase order.',
      chemicalId: chemicalId
    };
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = purchaseSupplierSystem;
}
