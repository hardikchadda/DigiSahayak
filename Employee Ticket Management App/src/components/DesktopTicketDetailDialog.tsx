import { useState, useEffect } from 'react';
import { X, User, Mail, Calendar, Phone, Send, Clock, CheckCircle2, FileText, MessageSquare, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Ticket, TicketActivity } from '../types';

interface DesktopTicketDetailDialogProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (ticketId: string, updates: Partial<Ticket>) => void;
  employeeId: string;
  employeeName: string;
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

const statusColors = {
  'todo': { bg: 'bg-orange-100', text: 'text-orange-600', label: 'To Do' },
  'in-progress': { bg: 'bg-blue-100', text: 'text-blue-600', label: 'In Progress' },
  'resolved': { bg: 'bg-green-100', text: 'text-green-600', label: 'Resolved' }
};

export function DesktopTicketDetailDialog({ 
  ticket, 
  isOpen, 
  onClose, 
  onUpdate,
  employeeId,
  employeeName
}: DesktopTicketDetailDialogProps) {
  const [response, setResponse] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [callbackTime, setCallbackTime] = useState('');
  const [newStatus, setNewStatus] = useState('in-progress');

  useEffect(() => {
    if (ticket) {
      setResponse(ticket.response || '');
      setAdminNotes(ticket.adminNotes || '');
      setCallbackTime(ticket.estimatedResolutionTime || '');
      setNewStatus(ticket.status);
      
      // Mark ticket as viewed
      if (!ticket.viewedBy || !ticket.viewedBy.includes(employeeId)) {
        const viewedBy = [...(ticket.viewedBy || []), employeeId];
        const newActivity: TicketActivity = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          action: 'Viewed',
          employee: employeeName
        };
        const activities = [...(ticket.activities || []), newActivity];
        
        onUpdate(ticket.id, { viewedBy, activities });
      }
    }
  }, [ticket, employeeId]);

  if (!ticket) return null;

  const handleSubmit = () => {
    const previousStatus = ticket.status;
    const updates: Partial<Ticket> = {
      response,
      adminNotes,
      estimatedResolutionTime: callbackTime,
      status: newStatus,
      assignedTo: employeeId
    };

    // Add activity log
    const newActivity: TicketActivity = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action: previousStatus !== newStatus ? `Status changed to ${statusColors[newStatus].label}` : 'Updated ticket',
      employee: employeeName,
      details: response ? 'Added customer response' : undefined
    };

    const activities = [...(ticket.activities || []), newActivity];
    updates.activities = activities;

    if (newStatus === 'resolved') {
      updates.resolvedAt = new Date().toISOString();
    }

    onUpdate(ticket.id, updates);
    onClose();
  };

  const statusStyle = statusColors[ticket.status];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0">
        <DialogTitle className="sr-only">
          Ticket Details - {ticket.id}
        </DialogTitle>
        <DialogDescription className="sr-only">
          View and update ticket information for {ticket.customerName}. Track ticket progress and provide responses.
        </DialogDescription>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <div>
                <p className="text-sm opacity-90">Ticket ID</p>
                <p>{ticket.id}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <Badge className={`${statusStyle.bg} ${statusStyle.text} border-0`}>
              {statusStyle.label}
            </Badge>
            <div className={`w-3 h-3 rounded-full ${priorityColors[ticket.priority]} ring-2 ring-white`}></div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-6 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Left Column - Main Content */}
          <div className="flex-1 space-y-6">
            {/* Customer Information */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-indigo-600" />
                <h3>Customer Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm">{ticket.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm truncate">{ticket.customerEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created Date</p>
                  <p className="text-sm">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Department</p>
                  <p className="text-sm capitalize">{ticket.department}</p>
                </div>
              </div>
            </div>

            {/* Problem Details */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h3 className="mb-4">Problem Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Issue Title</p>
                  <p>{ticket.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
                </div>
              </div>
            </div>

            {/* Action Form */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <h3>Response & Actions</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Update Status</Label>
                  <Select value={newStatus} onValueChange={(value: any) => setNewStatus(value)}>
                    <SelectTrigger id="status" className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="response" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Customer Resolution Message
                  </Label>
                  <Textarea
                    id="response"
                    placeholder="Explain the solution or response for the customer..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    This message will be shared with the customer
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="callback-time" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Callback/Follow-up Time
                  </Label>
                  <Input
                    id="callback-time"
                    placeholder="e.g., 24h, 2 days, Within 1 week"
                    value={callbackTime}
                    onChange={(e) => setCallbackTime(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-notes" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Internal Admin Notes
                  </Label>
                  <Textarea
                    id="admin-notes"
                    placeholder="Add internal notes visible only to admins and team members..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    className="resize-none bg-amber-50 border-amber-200"
                  />
                  <p className="text-xs text-gray-500">
                    Private notes - not visible to customers
                  </p>
                </div>
              </div>
            </div>

            {/* Previous Responses */}
            {(ticket.response || ticket.adminNotes) && (
              <div className="space-y-3">
                {ticket.response && (
                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <p className="text-sm text-blue-600">Previous Customer Response</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{ticket.response}</p>
                    {ticket.estimatedResolutionTime && (
                      <p className="text-xs text-gray-600">
                        Callback: {ticket.estimatedResolutionTime}
                      </p>
                    )}
                  </div>
                )}
                
                {ticket.adminNotes && (
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-amber-600" />
                      <p className="text-sm text-amber-600">Previous Admin Notes</p>
                    </div>
                    <p className="text-sm text-gray-700">{ticket.adminNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Activity Timeline */}
          <div className="w-80 bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3>Activity Timeline</h3>
            </div>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {ticket.activities && ticket.activities.length > 0 ? (
                ticket.activities.map((activity, index) => (
                  <div key={activity.id} className="relative">
                    {index !== ticket.activities!.length - 1 && (
                      <div className="absolute left-2 top-8 bottom-0 w-px bg-gray-300"></div>
                    )}
                    <div className="flex gap-3">
                      <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                        activity.action.includes('Resolved') ? 'bg-green-500' :
                        activity.action.includes('Progress') ? 'bg-blue-500' :
                        activity.action.includes('Viewed') ? 'bg-gray-400' :
                        'bg-indigo-500'
                      }`}></div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm mb-1">{activity.action}</p>
                        <p className="text-xs text-gray-500 mb-1">
                          by {activity.employee}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                        {activity.details && (
                          <p className="text-xs text-gray-600 mt-1 italic">
                            {activity.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No activity yet</p>
                </div>
              )}
              
              {/* Created Activity */}
              <div className="relative">
                <div className="flex gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-300 mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm mb-1">Ticket Created</p>
                    <p className="text-xs text-gray-400">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Send className="w-4 h-4" />
            Submit & Update Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
