import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Clock, 
  Edit2, 
  Power, 
  UserCheck, 
  Tag, 
  Trash2,
  CheckCircle2
} from 'lucide-react';

export const ServicesPage = () => {
  const { industry, industryConfig } = useAuth();
  const { services, team, addService, updateService, toggleServiceStatus, deleteService } = useData();
  const { addToast } = useToast();

  const terms = industryConfig.terms;

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Form State
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    duration: 30,
    price: 800,
    category: industryConfig.sampleCategories[0] || 'General',
    assignedStaff: [],
  });

  // Available staff for current industry
  const currentTeam = team.filter((t) => t.industry === industry || industry === 'general');

  // Filtered Services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchIndustry = s.industry === industry || industry === 'general';
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = categoryFilter === 'all' || s.category === categoryFilter;
      return matchIndustry && matchSearch && matchCategory;
    });
  }, [services, industry, searchQuery, categoryFilter]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!serviceForm.name.trim()) {
      addToast(`Please provide ${terms.service.toLowerCase()} name`, 'error');
      return;
    }

    addService({
      ...serviceForm,
      industry,
      assignedStaff:
        serviceForm.assignedStaff.length > 0
          ? serviceForm.assignedStaff
          : [currentTeam[0]?.name || 'All Staff'],
    });
    addToast(`${terms.service} added to catalogue`);
    setIsAddOpen(false);
    setServiceForm({
      name: '',
      description: '',
      duration: 30,
      price: 800,
      category: industryConfig.sampleCategories[0] || 'General',
      assignedStaff: [],
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingService) return;
    updateService(editingService.id, editingService);
    addToast(`${terms.service} updated`);
    setEditingService(null);
  };

  const handleToggleActive = (id, currentActive) => {
    toggleServiceStatus(id);
    addToast(`${terms.service} marked as ${currentActive ? 'Inactive' : 'Active'}`);
  };

  const confirmDelete = () => {
    if (!serviceToDelete) return;
    deleteService(serviceToDelete.id);
    addToast(`${terms.service} removed from catalogue`);
    setServiceToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              {terms.services} Catalogue
            </h1>
            <Badge variant="teal" size="sm">{industryConfig.name}</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Configure your pricing in ₹, service durations, and assigned {terms.staffPlural.toLowerCase()}.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsAddOpen(true)}>
          Add New {terms.service}
        </Button>
      </div>

      {/* Search & Categories Bar */}
      <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder={`Search ${terms.services.toLowerCase()} by name or description...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-brand-border rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border bg-slate-50 text-xs text-brand-navy">
            <Tag className="w-3.5 h-3.5 text-brand-muted" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">All Categories</option>
              {industryConfig.sampleCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <EmptyState
          title={`No ${terms.services.toLowerCase()} found`}
          description={`Create your first ${terms.service.toLowerCase()} to enable appointments and booking.`}
          actionLabel={`Add ${terms.service}`}
          onAction={() => setIsAddOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                service.isActive
                  ? 'bg-white border-brand-border shadow-subtle hover:border-brand-teal/40 hover:shadow-card'
                  : 'bg-slate-50/70 border-dashed border-slate-300 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant={service.isActive ? 'teal' : 'default'} size="sm">
                    {service.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(service.id, service.isActive)}
                      title={service.isActive ? 'Deactivate' : 'Activate'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        service.isActive ? 'text-brand-teal hover:bg-teal-50' : 'text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingService(service)}
                      title="Edit Service"
                      className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setServiceToDelete(service)}
                      title="Delete Service"
                      className="p-1.5 rounded-lg text-brand-muted hover:text-brand-error hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-brand-navy">{service.name}</h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-brand-muted">
                    <Clock className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{service.duration} mins</span>
                  </div>
                  <div className="text-base font-extrabold text-brand-navy">
                    ₹{service.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-[11px]">
                <span className="text-brand-muted font-medium">Assigned:</span>
                <span className="text-brand-navy font-semibold truncate max-w-[150px]">
                  {service.assignedStaff.join(', ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Service Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title={`Add New ${terms.service}`}
        subtitle={`Register an offering in the ${industryConfig.name} catalogue`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">
              {terms.service} Name *
            </label>
            <input
              type="text"
              required
              value={serviceForm.name}
              onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
              placeholder="e.g. Comprehensive Cardiology Review"
            />
          </div>

          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">Description</label>
            <textarea
              rows={2}
              value={serviceForm.description}
              onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl"
              placeholder="Clinical or treatment details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min={5}
                step={5}
                required
                value={serviceForm.duration}
                onChange={(e) => setServiceForm({ ...serviceForm, duration: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Price (INR ₹)
              </label>
              <input
                type="number"
                min={0}
                required
                value={serviceForm.price}
                onChange={(e) => setServiceForm({ ...serviceForm, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">Category</label>
            <select
              value={serviceForm.category}
              onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl"
            >
              {industryConfig.sampleCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
            <Button variant="secondary" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save {terms.service}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Service Modal */}
      {editingService && (
        <Modal
          isOpen={true}
          onClose={() => setEditingService(null)}
          title={`Edit ${editingService.name}`}
          subtitle={`Update duration and consultation fee`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Service Name</label>
              <input
                type="text"
                required
                value={editingService.name}
                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Description</label>
              <textarea
                rows={2}
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  min={5}
                  value={editingService.duration}
                  onChange={(e) => setEditingService({ ...editingService, duration: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Fee (INR ₹)</label>
                <input
                  type="number"
                  min={0}
                  value={editingService.price}
                  onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
              <Button variant="secondary" size="sm" onClick={() => setEditingService(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {serviceToDelete && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setServiceToDelete(null)}
          onConfirm={confirmDelete}
          title={`Remove ${serviceToDelete.name}?`}
          message={`Are you sure you want to remove this ${terms.service.toLowerCase()} from your active catalogue? Existing scheduled bookings will retain this record.`}
          confirmText="Yes, Remove"
          variant="danger"
        />
      )}
    </div>
  );
};
