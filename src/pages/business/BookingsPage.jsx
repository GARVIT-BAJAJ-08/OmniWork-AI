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
  CalendarDays, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  User, 
  Calendar, 
  Edit2, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical
} from 'lucide-react';

export const BookingsPage = () => {
  const { industry, industryConfig } = useAuth();
  const { bookings, services, team, addBooking, updateBooking, deleteBooking } = useData();
  const { addToast } = useToast();

  const terms = industryConfig.terms;

  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  // Form State
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceName: '',
    staffName: '',
    date: '2026-10-19',
    time: '11:00 AM',
    duration: 30,
    price: 800,
    notes: '',
  });

  // Services & Team available for current industry
  const availableServices = services.filter((s) => s.industry === industry || industry === 'general');
  const availableTeam = team.filter((t) => t.industry === industry || industry === 'general');

  // Filter Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchIndustry = b.industry === industry || industry === 'general';
      const matchSearch =
        b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.staffName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || b.status === statusFilter;
      const matchDate = !dateFilter || b.date === dateFilter;

      return matchIndustry && matchSearch && matchStatus && matchDate;
    });
  }, [bookings, industry, searchQuery, statusFilter, dateFilter]);

  const handleOpenCreate = () => {
    const defaultSrv = availableServices[0] || { name: 'Consultation', price: 800, duration: 30 };
    const defaultStaff = availableTeam[0] || { name: 'Staff Member' };
    setBookingForm({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      serviceName: defaultSrv.name,
      staffName: defaultStaff.name,
      date: '2026-10-19',
      time: '10:00 AM',
      duration: defaultSrv.duration || 30,
      price: defaultSrv.price || 800,
      notes: '',
    });
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.customerName.trim()) {
      addToast(`Please provide ${terms.customer} name`, 'error');
      return;
    }

    addBooking({
      ...bookingForm,
      industry,
    });
    addToast(`${terms.booking} successfully scheduled!`);
    setIsCreateOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingBooking) return;
    updateBooking(editingBooking.id, editingBooking);
    addToast(`${terms.booking} details updated`);
    setEditingBooking(null);
  };

  const handleQuickStatusChange = (id, newStatus) => {
    updateBooking(id, { status: newStatus });
    addToast(`${terms.booking} status updated to ${newStatus}`);
  };

  const confirmCancel = () => {
    if (!bookingToCancel) return;
    updateBooking(bookingToCancel.id, { status: 'Cancelled' });
    addToast(`${terms.booking} was cancelled`);
    setBookingToCancel(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              {terms.bookings} Management
            </h1>
            <Badge variant="teal" size="sm">{industryConfig.name}</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Schedule, manage, and coordinate {terms.bookings.toLowerCase()} for your practice.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* List / Calendar Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-xl border border-brand-border text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'list' ? 'bg-white text-brand-navy shadow-xs' : 'text-brand-muted'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'calendar' ? 'bg-white text-brand-navy shadow-xs' : 'text-brand-muted'
              }`}
            >
              Calendar Schedule
            </button>
          </div>

          <Button variant="primary" size="md" icon={Plus} onClick={handleOpenCreate}>
            Create {terms.booking}
          </Button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder={`Search by ${terms.customer.toLowerCase()}, ${terms.service.toLowerCase()}, or ${terms.staff.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-brand-border rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border bg-slate-50 text-xs text-brand-navy">
            <Calendar className="w-3.5 h-3.5 text-brand-muted" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent focus:outline-none text-xs cursor-pointer"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                className="text-[10px] text-brand-teal font-bold hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border bg-slate-50 text-xs text-brand-navy">
            <Filter className="w-3.5 h-3.5 text-brand-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="No-show">No-show</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content: List or Calendar View */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle overflow-hidden">
          {filteredBookings.length === 0 ? (
            <EmptyState
              title={`No ${terms.bookings.toLowerCase()} found`}
              description={`There are no ${terms.bookings.toLowerCase()} matching your filter criteria.`}
              actionLabel={`Create ${terms.booking}`}
              onAction={handleOpenCreate}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-brand-border text-brand-muted uppercase font-bold text-[10px]">
                    <th className="py-3 px-4">{terms.customer}</th>
                    <th className="py-3 px-4">{terms.service}</th>
                    <th className="py-3 px-4">{terms.staff}</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Fee</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {filteredBookings.map((bk) => (
                    <tr key={bk.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-brand-navy">{bk.customerName}</div>
                        <div className="text-[11px] text-brand-muted truncate max-w-xs">
                          {bk.customerPhone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-brand-navy">
                        {bk.serviceName}
                      </td>
                      <td className="py-3.5 px-4 text-brand-muted">{bk.staffName}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-brand-navy">{bk.date}</div>
                        <div className="text-[11px] text-brand-muted">{bk.time}</div>
                      </td>
                      <td className="py-3.5 px-4 text-brand-muted">{bk.duration} mins</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={bk.status}
                          onChange={(e) => handleQuickStatusChange(bk.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            bk.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : bk.status === 'Scheduled'
                              ? 'bg-sky-50 text-sky-700 border-sky-200'
                              : bk.status === 'Completed'
                              ? 'bg-slate-100 text-slate-700 border-slate-300'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="No-show">No-show</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-brand-navy">
                        ₹{bk.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setEditingBooking(bk)}
                            title="Edit Details"
                            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setBookingToCancel(bk)}
                            title="Cancel Booking"
                            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-error hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
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
      ) : (
        /* Calendar Schedule Grid View */
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <h3 className="text-base font-bold text-brand-navy">Weekly Time Slot Matrix</h3>
            <span className="text-xs text-brand-muted">October 2026</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {['2026-10-19 (Mon)', '2026-10-20 (Tue)', '2026-10-21 (Wed)', '2026-10-22 (Thu)', '2026-10-23 (Fri)'].map(
              (dayLabel, i) => {
                const dateIso = `2026-10-${19 + i}`;
                const daysBookings = filteredBookings.filter((b) => b.date === dateIso);
                return (
                  <div key={dayLabel} className="bg-slate-50/70 p-3 rounded-xl border border-brand-border min-h-[220px]">
                    <div className="font-bold text-brand-navy text-xs pb-2 border-b border-brand-border mb-2.5 flex justify-between items-center">
                      <span>{dayLabel.split(' ')[0]}</span>
                      <Badge variant="teal" size="sm">{daysBookings.length}</Badge>
                    </div>

                    <div className="space-y-2">
                      {daysBookings.length === 0 ? (
                        <div className="text-[11px] text-brand-muted italic py-6 text-center">
                          Open availability
                        </div>
                      ) : (
                        daysBookings.map((b) => (
                          <div
                            key={b.id}
                            onClick={() => setEditingBooking(b)}
                            className="p-2.5 bg-white rounded-lg border border-brand-border shadow-2xs hover:border-brand-teal cursor-pointer transition-all text-xs"
                          >
                            <div className="font-bold text-brand-navy">{b.time}</div>
                            <div className="font-semibold text-brand-text truncate">{b.customerName}</div>
                            <div className="text-[10px] text-brand-muted truncate">{b.serviceName}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* Create Booking Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={`Create New ${terms.booking}`}
        subtitle={`Schedule a ${terms.service.toLowerCase()} for your ${terms.customer.toLowerCase()}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">
              {terms.customer} Full Name *
            </label>
            <input
              type="text"
              required
              value={bookingForm.customerName}
              onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
              placeholder="e.g. Aditi Rao"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={bookingForm.customerPhone}
                onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                placeholder="+91 98450 11223"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={bookingForm.customerEmail}
                onChange={(e) => setBookingForm({ ...bookingForm, customerEmail: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                placeholder="aditi@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Select {terms.service} *
              </label>
              <select
                value={bookingForm.serviceName}
                onChange={(e) => {
                  const s = availableServices.find((srv) => srv.name === e.target.value);
                  setBookingForm({
                    ...bookingForm,
                    serviceName: e.target.value,
                    price: s ? s.price : bookingForm.price,
                    duration: s ? s.duration : bookingForm.duration,
                  });
                }}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
              >
                {availableServices.map((srv) => (
                  <option key={srv.id} value={srv.name}>
                    {srv.name} (₹{srv.price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Assigned {terms.staff} *
              </label>
              <select
                value={bookingForm.staffName}
                onChange={(e) => setBookingForm({ ...bookingForm, staffName: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
              >
                {availableTeam.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Date</label>
              <input
                type="date"
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Time Slot</label>
              <input
                type="text"
                required
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
                placeholder="10:00 AM"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-brand-navy uppercase mb-1">Notes / Instructions</label>
            <textarea
              rows={2}
              value={bookingForm.notes}
              onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
              className="w-full px-3 py-2 border border-brand-border rounded-xl"
              placeholder="Clinical or treatment notes..."
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
            <Button variant="secondary" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save {terms.booking}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Booking Modal */}
      {editingBooking && (
        <Modal
          isOpen={true}
          onClose={() => setEditingBooking(null)}
          title={`Edit ${terms.booking}`}
          subtitle={`Update schedule for ${editingBooking.customerName}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                {terms.customer} Name
              </label>
              <input
                type="text"
                required
                value={editingBooking.customerName}
                onChange={(e) => setEditingBooking({ ...editingBooking, customerName: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={editingBooking.date}
                  onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Time</label>
                <input
                  type="text"
                  required
                  value={editingBooking.time}
                  onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Status</label>
                <select
                  value={editingBooking.status}
                  onChange={(e) => setEditingBooking({ ...editingBooking, status: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="No-show">No-show</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">Fee (INR)</label>
                <input
                  type="number"
                  value={editingBooking.price}
                  onChange={(e) => setEditingBooking({ ...editingBooking, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">Notes</label>
              <textarea
                rows={2}
                value={editingBooking.notes || ''}
                onChange={(e) => setEditingBooking({ ...editingBooking, notes: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
              <Button variant="secondary" size="sm" onClick={() => setEditingBooking(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Update {terms.booking}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Cancel Confirmation */}
      {bookingToCancel && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setBookingToCancel(null)}
          onConfirm={confirmCancel}
          title={`Cancel ${terms.booking}?`}
          message={`Are you sure you want to cancel the ${terms.booking.toLowerCase()} for ${
            bookingToCancel.customerName
          } on ${bookingToCancel.date} at ${bookingToCancel.time}?`}
          confirmText="Yes, Cancel Booking"
          variant="danger"
        />
      )}
    </div>
  );
};
