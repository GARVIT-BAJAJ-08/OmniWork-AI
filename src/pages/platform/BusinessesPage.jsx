import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Drawer } from '../../components/ui/Drawer';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Power, 
  MapPin, 
  Mail, 
  Calendar,
  Layers,
  ExternalLink
} from 'lucide-react';

export const BusinessesPage = () => {
  const { businesses, addBusiness, updateBusiness, toggleBusinessStatus } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals & Drawers
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedBizForView, setSelectedBizForView] = useState(null);
  const [selectedBizForEdit, setSelectedBizForEdit] = useState(null);
  const [bizToToggleStatus, setBizToToggleStatus] = useState(null);

  // Add Form state
  const [newBizForm, setNewBizForm] = useState({
    name: '',
    industry: 'healthcare',
    ownerName: '',
    ownerEmail: '',
    locations: 1,
    plan: 'Growth',
  });

  // Filtered businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      const matchesSearch =
        biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || biz.industry === industryFilter;
      const matchesStatus = statusFilter === 'all' || biz.status === statusFilter;
      return matchesSearch && matchesIndustry && matchesStatus;
    });
  }, [businesses, searchQuery, industryFilter, statusFilter]);

  const handleCreateBusiness = (e) => {
    e.preventDefault();
    if (!newBizForm.name.trim() || !newBizForm.ownerEmail.trim()) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    const priceMap = { Starter: 2499, Growth: 6999, Enterprise: 14999 };
    addBusiness({
      ...newBizForm,
      monthlyRevenue: priceMap[newBizForm.plan] || 2499,
    });
    addToast(`Added ${newBizForm.name} to platform registry`);
    setIsAddOpen(false);
    setNewBizForm({
      name: '',
      industry: 'healthcare',
      ownerName: '',
      ownerEmail: '',
      locations: 1,
      plan: 'Growth',
    });
  };

  const handleEditBusiness = (e) => {
    e.preventDefault();
    if (!selectedBizForEdit) return;
    updateBusiness(selectedBizForEdit.id, selectedBizForEdit);
    addToast(`Updated ${selectedBizForEdit.name} details`);
    setSelectedBizForEdit(null);
  };

  const confirmToggleStatus = () => {
    if (!bizToToggleStatus) return;
    toggleBusinessStatus(bizToToggleStatus.id);
    const nextStatus = bizToToggleStatus.status === 'Active' ? 'Suspended' : 'Active';
    addToast(`${bizToToggleStatus.name} status changed to ${nextStatus}`);
    setBizToToggleStatus(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">Business Management</h1>
          <p className="text-xs text-brand-muted mt-1">
            Supervise registered organizations across Healthcare, Salon, Coaching, and Real Estate.
          </p>
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsAddOpen(true)}>
          Register Business
        </Button>
      </div>

      {/* Search & Filters Bar */}
      <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by business name, owner, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-brand-border rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Industry Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border bg-slate-50 text-xs text-brand-navy">
            <Filter className="w-3.5 h-3.5 text-brand-muted" />
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">All Industries</option>
              <option value="healthcare">Healthcare & Clinics</option>
              <option value="salon">Salon & Wellness</option>
              <option value="education">Education & Coaching</option>
              <option value="real_estate">Real Estate & Property</option>
              <option value="general">Corporate & Services</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border bg-slate-50 text-xs text-brand-navy">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Businesses Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-subtle overflow-hidden">
        {filteredBusinesses.length === 0 ? (
          <EmptyState
            title="No matching businesses"
            description="Try clearing your search query or reset the industry filters to see businesses."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setIndustryFilter('all');
              setStatusFilter('all');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-brand-muted uppercase font-bold text-[10px]">
                  <th className="py-3 px-4">Business</th>
                  <th className="py-3 px-4">Industry</th>
                  <th className="py-3 px-4">Owner & Contact</th>
                  <th className="py-3 px-4">Locations</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredBusinesses.map((biz) => (
                  <tr key={biz.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-navy">{biz.name}</div>
                      <span className="text-[10px] text-brand-muted">ID: {biz.id}</span>
                    </td>
                    <td className="py-3.5 px-4 capitalize">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-brand-ice text-sky-800 border border-sky-100">
                        {biz.industry.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-brand-navy">{biz.ownerName}</div>
                      <div className="text-[11px] text-brand-muted truncate max-w-xs">{biz.ownerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-brand-navy">
                      {biz.locations} {biz.locations > 1 ? 'Branches' : 'Branch'}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={biz.plan === 'Enterprise' ? 'navy' : 'teal'} size="sm">
                        {biz.plan}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          biz.status === 'Active'
                            ? 'success'
                            : biz.status === 'Trial'
                            ? 'warning'
                            : 'error'
                        }
                        size="sm"
                      >
                        {biz.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-brand-muted">{biz.joinedDate}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedBizForView(biz)}
                          title="View Details"
                          className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedBizForEdit(biz)}
                          title="Edit Business"
                          className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setBizToToggleStatus(biz)}
                          title={biz.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            biz.status === 'Active'
                              ? 'text-brand-muted hover:text-brand-error hover:bg-red-50'
                              : 'text-brand-teal hover:bg-teal-50'
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
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

      {/* Add Business Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Register New Multi-Industry Business"
        subtitle="Create an onboarding tenant profile on BusinessOS AI"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateBusiness} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={newBizForm.name}
              onChange={(e) => setNewBizForm({ ...newBizForm, name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal"
              placeholder="e.g. Aura Wellness Centre"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
              Industry Vertical *
            </label>
            <select
              value={newBizForm.industry}
              onChange={(e) => setNewBizForm({ ...newBizForm, industry: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal"
            >
              <option value="healthcare">Healthcare & Clinics</option>
              <option value="salon">Salon & Wellness</option>
              <option value="education">Education & Coaching</option>
              <option value="real_estate">Real Estate & Property</option>
              <option value="general">Corporate & Services</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                Owner Full Name
              </label>
              <input
                type="text"
                required
                value={newBizForm.ownerName}
                onChange={(e) => setNewBizForm({ ...newBizForm, ownerName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal"
                placeholder="e.g. Dr. A. Sharma"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                Owner Email *
              </label>
              <input
                type="email"
                required
                value={newBizForm.ownerEmail}
                onChange={(e) => setNewBizForm({ ...newBizForm, ownerEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal"
                placeholder="owner@domain.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                Branches
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={newBizForm.locations}
                onChange={(e) => setNewBizForm({ ...newBizForm, locations: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                Subscription Plan
              </label>
              <select
                value={newBizForm.plan}
                onChange={(e) => setNewBizForm({ ...newBizForm, plan: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal"
              >
                <option value="Starter">Starter (₹2,499/mo)</option>
                <option value="Growth">Growth (₹6,999/mo)</option>
                <option value="Enterprise">Enterprise (₹14,999/mo)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
            <Button variant="secondary" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Register Business
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Business Modal */}
      {selectedBizForEdit && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBizForEdit(null)}
          title={`Edit ${selectedBizForEdit.name}`}
          subtitle="Update tenant properties and billing tier"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleEditBusiness} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                Business Name
              </label>
              <input
                type="text"
                required
                value={selectedBizForEdit.name}
                onChange={(e) => setSelectedBizForEdit({ ...selectedBizForEdit, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                  Owner Name
                </label>
                <input
                  type="text"
                  value={selectedBizForEdit.ownerName}
                  onChange={(e) => setSelectedBizForEdit({ ...selectedBizForEdit, ownerName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                  Locations
                </label>
                <input
                  type="number"
                  min={1}
                  value={selectedBizForEdit.locations}
                  onChange={(e) => setSelectedBizForEdit({ ...selectedBizForEdit, locations: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                  Plan Tier
                </label>
                <select
                  value={selectedBizForEdit.plan}
                  onChange={(e) => setSelectedBizForEdit({ ...selectedBizForEdit, plan: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl"
                >
                  <option value="Starter">Starter (₹2,499)</option>
                  <option value="Growth">Growth (₹6,999)</option>
                  <option value="Enterprise">Enterprise (₹14,999)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                  Status
                </label>
                <select
                  value={selectedBizForEdit.status}
                  onChange={(e) => setSelectedBizForEdit({ ...selectedBizForEdit, status: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-brand-border rounded-xl"
                >
                  <option value="Active">Active</option>
                  <option value="Trial">Trial</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
              <Button variant="secondary" size="sm" onClick={() => setSelectedBizForEdit(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Drawer */}
      {selectedBizForView && (
        <Drawer
          isOpen={true}
          onClose={() => setSelectedBizForView(null)}
          title={selectedBizForView.name}
          subtitle={`Organization ID: ${selectedBizForView.id}`}
        >
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-brand-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Vertical</span>
                <span className="font-bold text-brand-navy capitalize">
                  {selectedBizForView.industry.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Operational Status</span>
                <Badge variant={selectedBizForView.status === 'Active' ? 'success' : 'warning'} size="sm">
                  {selectedBizForView.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Plan Tier</span>
                <Badge variant="navy" size="sm">{selectedBizForView.plan}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Monthly Contribution</span>
                <span className="font-bold text-brand-teal text-sm">
                  ₹{selectedBizForView.monthlyRevenue.toLocaleString('en-IN')}/mo
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider">
                Primary Contact
              </h4>
              <div className="p-3 rounded-xl border border-brand-border space-y-1.5">
                <div className="font-bold text-brand-navy">{selectedBizForView.ownerName}</div>
                <div className="text-brand-muted flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-teal" />
                  {selectedBizForView.ownerEmail}
                </div>
                <div className="text-brand-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-teal" />
                  {selectedBizForView.locations} Physical Branches Active
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider">
                System Metadata
              </h4>
              <div className="p-3 rounded-xl border border-brand-border space-y-1 text-brand-muted">
                <div>Onboarded: {selectedBizForView.joinedDate}</div>
                <div>Billing Cycle: Automated 1st of Month</div>
                <div>Storage Usage: 2.4 GB / 50 GB</div>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => {
                  const b = selectedBizForView;
                  setSelectedBizForView(null);
                  setSelectedBizForEdit(b);
                }}
              >
                Edit Organization
              </Button>
            </div>
          </div>
        </Drawer>
      )}

      {/* Status Toggle Confirmation */}
      {bizToToggleStatus && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setBizToToggleStatus(null)}
          onConfirm={confirmToggleStatus}
          title={bizToToggleStatus.status === 'Active' ? 'Suspend Business Account' : 'Reactivate Business Account'}
          message={`Are you sure you want to ${
            bizToToggleStatus.status === 'Active' ? 'suspend' : 'reactivate'
          } ${bizToToggleStatus.name}? Suspended accounts cannot schedule new appointments.`}
          confirmText={bizToToggleStatus.status === 'Active' ? 'Yes, Suspend' : 'Yes, Reactivate'}
          variant={bizToToggleStatus.status === 'Active' ? 'danger' : 'primary'}
        />
      )}
    </div>
  );
};
