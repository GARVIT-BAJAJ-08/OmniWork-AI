import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Drawer } from '../../components/ui/Drawer';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Edit2, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Sparkles,
  CreditCard
} from 'lucide-react';

export const CustomersPage = () => {
  const { industry, industryConfig } = useAuth();
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useData();
  const { addToast } = useToast();

  const terms = industryConfig.terms;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals & Drawers
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  // Form State
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active',
    notes: '',
  });

  // Filtered List
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchIndustry = c.industry === industry || industry === 'general';
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchIndustry && matchSearch && matchStatus;
    });
  }, [customers, industry, searchQuery, statusFilter]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!customerForm.name.trim()) {
      addToast(`Please enter ${terms.customer.toLowerCase()} name`, 'error');
      return;
    }

    addCustomer({
      ...customerForm,
      industry,
    });
    addToast(`${terms.customer} registered in directory`);
    setIsAddOpen(false);
    setCustomerForm({ name: '', email: '', phone: '', status: 'Active', notes: '' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editCustomer) return;
    updateCustomer(editCustomer.id, editCustomer);
    addToast(`${terms.customer} details updated`);
    setEditCustomer(null);
  };

  const confirmDelete = () => {
    if (!customerToDelete) return;
    deleteCustomer(customerToDelete.id);
    addToast(`${terms.customer} record deleted`);
    setCustomerToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              {terms.customers} Directory
            </h1>
            <Badge variant="teal" size="sm">{industryConfig.name}</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Maintain complete profile records, contact history, and notes for your {terms.customers.toLowerCase()}.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsAddOpen(true)}>
          Add New {terms.customer}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder={`Search ${terms.customers.toLowerCase()} by name, phone, or email...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-brand-border rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border bg-slate-50 text-xs text-brand-navy">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">All Tiers</option>
              <option value="VIP">VIP</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-subtle overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <EmptyState
            title={`No ${terms.customers.toLowerCase()} found`}
            description={`No records match your query in the ${industryConfig.name} directory.`}
            actionLabel={`Add ${terms.customer}`}
            onAction={() => setIsAddOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-brand-muted uppercase font-bold text-[10px]">
                  <th className="py-3 px-4">{terms.customer}</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Last Interaction</th>
                  <th className="py-3 px-4">Upcoming {terms.booking}</th>
                  <th className="py-3 px-4">Total Visits</th>
                  <th className="py-3 px-4">Total Spend</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-brand-navy">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-brand-mint text-brand-teal font-bold flex items-center justify-center text-xs">
                          {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div>{c.name}</div>
                          <span className="text-[10px] text-brand-muted font-normal">ID: {c.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-brand-navy font-medium">{c.phone}</div>
                      <div className="text-[11px] text-brand-muted truncate max-w-xs">{c.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-brand-muted">{c.lastInteraction}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-brand-teal">
                        {c.upcomingBooking || 'None scheduled'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-brand-navy">{c.totalBookings}</td>
                    <td className="py-3.5 px-4 font-bold text-brand-navy">
                      ₹{c.totalSpend.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={c.status === 'VIP' ? 'navy' : c.status === 'Active' ? 'success' : 'outline'}
                        size="sm"
                      >
                        {c.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewCustomer(c)}
                          title="View Profile"
                          className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditCustomer(c)}
                          title="Edit Customer"
                          className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setCustomerToDelete(c)}
                          title="Delete Record"
                          className="p-1.5 rounded-lg text-brand-muted hover:text-brand-error hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title={`Register New ${terms.customer}`}
        subtitle={`Add a new ${terms.customer.toLowerCase()} profile to your ${industryConfig.name} workspace`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">
              {terms.customer} Full Name *
            </label>
            <input
              type="text"
              required
              value={customerForm.name}
              onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
              placeholder="e.g. Radhika Merchant"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Phone</label>
              <input
                type="text"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                placeholder="+91 99000 11223"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Email</label>
              <input
                type="email"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                placeholder="client@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">Status Tier</label>
            <select
              value={customerForm.status}
              onChange={(e) => setCustomerForm({ ...customerForm, status: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
            >
              <option value="Active">Active</option>
              <option value="VIP">VIP</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">
              Internal Notes / Preferences
            </label>
            <textarea
              rows={3}
              value={customerForm.notes}
              onChange={(e) => setCustomerForm({ ...customerForm, notes: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl"
              placeholder="Allergies, preferences, history..."
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
            <Button variant="secondary" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Register {terms.customer}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Customer Modal */}
      {editCustomer && (
        <Modal
          isOpen={true}
          onClose={() => setEditCustomer(null)}
          title={`Edit ${editCustomer.name}`}
          subtitle={`Update profile records for ${terms.customer.toLowerCase()}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={editCustomer.name}
                onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Phone</label>
                <input
                  type="text"
                  value={editCustomer.phone}
                  onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Status</label>
                <select
                  value={editCustomer.status}
                  onChange={(e) => setEditCustomer({ ...editCustomer, status: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                >
                  <option value="Active">Active</option>
                  <option value="VIP">VIP</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Notes</label>
              <textarea
                rows={3}
                value={editCustomer.notes || ''}
                onChange={(e) => setEditCustomer({ ...editCustomer, notes: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
              <Button variant="secondary" size="sm" onClick={() => setEditCustomer(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Detail Drawer */}
      {viewCustomer && (
        <Drawer
          isOpen={true}
          onClose={() => setViewCustomer(null)}
          title={viewCustomer.name}
          subtitle={`${terms.customer} Profile File • ID: ${viewCustomer.id}`}
        >
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-brand-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Account Tier</span>
                <Badge variant={viewCustomer.status === 'VIP' ? 'navy' : 'success'} size="sm">
                  {viewCustomer.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Total Lifetime Value</span>
                <span className="font-extrabold text-brand-teal text-sm">
                  ₹{viewCustomer.totalSpend.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Completed Visits</span>
                <span className="font-bold text-brand-navy">{viewCustomer.totalBookings}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy uppercase tracking-wider">Contact Credentials</h4>
              <div className="p-3 rounded-xl border border-brand-border space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{viewCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{viewCustomer.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy uppercase tracking-wider">Medical / Client Notes</h4>
              <div className="p-3 rounded-xl border border-brand-border bg-slate-50/50 text-brand-navy leading-relaxed">
                {viewCustomer.notes || 'No specialized clinical or styling notes recorded yet.'}
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => {
                  const c = viewCustomer;
                  setViewCustomer(null);
                  setEditCustomer(c);
                }}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </Drawer>
      )}

      {/* Delete Confirmation */}
      {customerToDelete && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setCustomerToDelete(null)}
          onConfirm={confirmDelete}
          title={`Delete ${customerToDelete.name}?`}
          message={`Are you sure you want to permanently remove this ${terms.customer.toLowerCase()} record from the database? This action cannot be reversed.`}
          confirmText="Yes, Delete Record"
          variant="danger"
        />
      )}
    </div>
  );
};
