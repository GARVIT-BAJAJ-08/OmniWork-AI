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
  UserCheck, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock
} from 'lucide-react';

export const TeamPage = () => {
  const { industry, industryConfig } = useAuth();
  const { team, services, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const { addToast } = useToast();

  const terms = industryConfig.terms;

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Form State
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Staff',
    assignedServices: [],
  });

  const availableServices = services.filter((s) => s.industry === industry || industry === 'general');

  // Filtered Team
  const filteredTeam = useMemo(() => {
    return team.filter((t) => {
      const matchIndustry = t.industry === industry || industry === 'general';
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = roleFilter === 'all' || t.role === roleFilter;
      return matchIndustry && matchSearch && matchRole;
    });
  }, [team, industry, searchQuery, roleFilter]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.email.trim()) {
      addToast('Please provide name and work email', 'error');
      return;
    }

    addTeamMember({
      ...memberForm,
      industry,
      assignedServices:
        memberForm.assignedServices.length > 0
          ? memberForm.assignedServices
          : [availableServices[0]?.name || 'Standard Service'],
    });
    addToast(`Demo invitation sent to ${memberForm.email}`);
    setIsAddOpen(false);
    setMemberForm({
      name: '',
      email: '',
      phone: '',
      role: 'Staff',
      assignedServices: [],
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingMember) return;
    updateTeamMember(editingMember.id, editingMember);
    addToast(`${editingMember.name} permissions updated`);
    setEditingMember(null);
  };

  const confirmDelete = () => {
    if (!memberToDelete) return;
    deleteTeamMember(memberToDelete.id);
    addToast(`${memberToDelete.name} was removed from the team`);
    setMemberToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              {terms.staffPlural} Management
            </h1>
            <Badge variant="teal" size="sm">{industryConfig.name}</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Coordinate staff roles, assign {terms.services.toLowerCase()}, and manage scheduling permissions.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsAddOpen(true)}>
          Invite {terms.staff}
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder={`Search ${terms.staffPlural.toLowerCase()} by name or email...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-brand-border rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border bg-slate-50 text-xs text-brand-navy">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">All Roles</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-subtle overflow-hidden">
        {filteredTeam.length === 0 ? (
          <EmptyState
            title={`No ${terms.staffPlural.toLowerCase()} found`}
            description={`Invite team members to coordinate appointments and shifts.`}
            actionLabel={`Invite ${terms.staff}`}
            onAction={() => setIsAddOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-brand-muted uppercase font-bold text-[10px]">
                  <th className="py-3 px-4">{terms.staff}</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Assigned {terms.services}</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredTeam.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-brand-navy">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg ${member.avatarColor || 'bg-brand-teal'} text-white font-bold flex items-center justify-center text-xs`}>
                          {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div>{member.name}</div>
                          <span className="text-[10px] text-brand-muted font-normal">ID: {member.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-brand-navy font-medium">{member.email}</div>
                      <div className="text-[11px] text-brand-muted">{member.phone || 'No phone'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          member.role === 'Business Owner'
                            ? 'navy'
                            : member.role === 'Manager'
                            ? 'teal'
                            : 'default'
                        }
                        size="sm"
                      >
                        {member.role}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-brand-navy">
                      <div className="max-w-xs truncate">
                        {member.assignedServices.join(', ')}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={member.status === 'Active' ? 'success' : 'outline'}
                        size="sm"
                      >
                        {member.status === 'Invited' ? 'Pending Invite' : member.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingMember(member)}
                          title="Edit Role"
                          className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {member.role !== 'Business Owner' && (
                          <button
                            onClick={() => setMemberToDelete(member)}
                            title="Remove Member"
                            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-error hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Team Member Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title={`Invite New ${terms.staff}`}
        subtitle="Simulated invitation link will be queued"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={memberForm.name}
              onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
              placeholder="e.g. Dr. Sunita Mehta"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={memberForm.email}
                onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                placeholder="sunita@clinic.com"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Phone</label>
              <input
                type="text"
                value={memberForm.phone}
                onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                placeholder="+91 98444 55667"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">Access Role</label>
            <select
              value={memberForm.role}
              onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl"
            >
              <option value="Staff">Staff (Standard Schedule Access)</option>
              <option value="Manager">Manager (Roster & Client Access)</option>
              <option value="Business Owner">Business Owner (Full Workspace Control)</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
            <Button variant="secondary" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Send Demo Invitation
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Role Modal */}
      {editingMember && (
        <Modal
          isOpen={true}
          onClose={() => setEditingMember(null)}
          title={`Edit ${editingMember.name}`}
          subtitle="Update permissions and active roster status"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={editingMember.name}
                onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Role</label>
                <select
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                >
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="Business Owner">Business Owner</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Status</label>
                <select
                  value={editingMember.status}
                  onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                >
                  <option value="Active">Active</option>
                  <option value="Invited">Invited (Pending)</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
              <Button variant="secondary" size="sm" onClick={() => setEditingMember(null)}>
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
      {memberToDelete && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setMemberToDelete(null)}
          onConfirm={confirmDelete}
          title={`Remove ${memberToDelete.name}?`}
          message={`Are you sure you want to remove ${memberToDelete.name} from your team? They will no longer be available for appointment bookings.`}
          confirmText="Yes, Remove"
          variant="danger"
        />
      )}
    </div>
  );
};
