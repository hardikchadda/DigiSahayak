import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Calendar,
  Phone,
  Send,
  ArrowLeft,
  MessageSquare,
  Shield,
  AlertOctagon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Ticket } from "../types";

interface TicketDetailDialogProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (
    ticketId: string,
    updates: Partial<Ticket>,
  ) => void;
  employeeId: string;
  employeeName: string;
}

const priorityColors = {
  low: "bg-gray-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export function TicketDetailDialog({
  ticket,
  isOpen,
  onClose,
  onUpdate,
  employeeId,
  employeeName,
}: TicketDetailDialogProps) {
  const [response, setResponse] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [callbackTime, setCallbackTime] = useState("");
  const [newStatus, setNewStatus] = useState("in-progress");
  const [markAsIssue, setMarkAsIssue] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");

  useEffect(() => {
    if (ticket) {
      setResponse(ticket.response || "");
      setAdminNotes(ticket.adminNotes || "");
      setCallbackTime(ticket.estimatedResolutionTime || "");
      setNewStatus(ticket.status);
      setMarkAsIssue(ticket.hasIssue || false);
      setIssueDescription(ticket.issueDescription || "");
    }
  }, [ticket]);

  if (!ticket) return null;

  const handleSubmit = () => {
    const updates: Partial<Ticket> = {
      response,
      estimatedResolutionTime: callbackTime,
      status: newStatus,
      assignedTo: employeeId,
      adminNotes,
      hasIssue: markAsIssue,
      issueDescription: markAsIssue
        ? issueDescription
        : undefined,
      issueType: markAsIssue ? "employee_marked_issue" : "none",
    };

    if (newStatus === "resolved") {
      updates.resolvedAt = new Date().toISOString();
    }

    onUpdate(ticket.id, updates);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-full m-0 p-0 rounded-none">
        <DialogTitle className="sr-only">
          Ticket Details - {ticket.id}
        </DialogTitle>
        <DialogDescription className="sr-only">
          View and update ticket information for{" "}
          {ticket.customerName}. Analyze the customer problem
          and provide a response with callback time.
        </DialogDescription>

        {/* Header */}
        <div className="bg-indigo-600 text-white px-4 py-4 flex items-center gap-3">
          <button onClick={onClose} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <p className="text-sm opacity-90">Ticket Details</p>
            <p className="font-medium">{ticket.id}</p>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${priorityColors[ticket.priority]}`}
          ></div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto pb-28 px-4">
          {/* Customer Information Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-4 my-4 border border-indigo-100">
            <p className="text-sm text-gray-600 mb-3">
              Customer Information
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm">
                    {ticket.customerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm truncate">
                    {ticket.customerEmail}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    Created
                  </p>
                  <p className="text-sm">
                    {new Date(
                      ticket.createdAt,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Details */}
          <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-200">
            <h3 className="mb-3">Problem Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Title
                </p>
                <p className="text-sm">{ticket.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Description
                </p>
                <p className="text-sm text-gray-600">
                  {ticket.description}
                </p>
              </div>
            </div>
          </div>

          {/* Analysis & Response */}
          <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-200">
            <h3 className="mb-4">Your Analysis & Response</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewStatus("todo")}
                    className={`h-14 rounded-xl flex items-center justify-center transition-all border-2 ${
                      newStatus === "todo"
                        ? "bg-blue-500 border-blue-600 text-white shadow-lg scale-105"
                        : "bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    <span className="font-medium">To Do</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewStatus("in-progress")}
                    className={`h-14 rounded-xl flex items-center justify-center transition-all border-2 ${
                      newStatus === "in-progress"
                        ? "bg-yellow-500 border-yellow-600 text-white shadow-lg scale-105"
                        : "bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200"
                    }`}
                  >
                    <span className="font-medium">In Progress</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewStatus("resolved")}
                    className={`h-14 rounded-xl flex items-center justify-center transition-all border-2 ${
                      newStatus === "resolved"
                        ? "bg-green-500 border-green-600 text-white shadow-lg scale-105"
                        : "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    <span className="font-medium">Resolved</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="response"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Customer Resolution Message
                </Label>
                <Textarea
                  id="response"
                  placeholder="Explain the solution or response for the customer..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={5}
                  className="rounded-xl"
                />
                <p className="text-xs text-gray-500">
                  This message will be shared with the customer
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="callback-time"
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Callback/Follow-up Time
                </Label>
                <Input
                  id="callback-time"
                  placeholder="e.g., 24h, 2 days, Within 1 week"
                  value={callbackTime}
                  onChange={(e) =>
                    setCallbackTime(e.target.value)
                  }
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="admin-notes"
                  className="flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Internal Admin Notes
                </Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add internal notes visible only to admins and team members..."
                  value={adminNotes}
                  onChange={(e) =>
                    setAdminNotes(e.target.value)
                  }
                  rows={4}
                  className="rounded-xl bg-amber-50 border-amber-200"
                />
                <p className="text-xs text-gray-500">
                  Private notes - not visible to customers
                </p>
              </div>

              <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <Checkbox
                  id="mark-as-issue"
                  checked={markAsIssue}
                  onCheckedChange={(checked) =>
                    setMarkAsIssue(checked as boolean)
                  }
                />
                <Label
                  htmlFor="mark-as-issue"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <AlertOctagon className="w-4 h-4 text-yellow-600" />
                  <span>
                    Mark this ticket as problematic/issue
                  </span>
                </Label>
              </div>

              {markAsIssue && (
                <div className="space-y-2 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <Label
                    htmlFor="issue-description"
                    className="flex items-center gap-2 text-yellow-700"
                  >
                    <AlertOctagon className="w-4 h-4" />
                    Issue Description
                  </Label>
                  <Textarea
                    id="issue-description"
                    placeholder="Describe the problem or issue you're facing with this ticket..."
                    value={issueDescription}
                    onChange={(e) =>
                      setIssueDescription(e.target.value)
                    }
                    rows={3}
                    className="rounded-xl bg-white"
                  />
                  <p className="text-xs text-yellow-700">
                    This will flag the ticket in the Issues tab
                    for immediate attention
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Previous Responses if exist */}
          {(ticket.response || ticket.adminNotes) && (
            <div className="space-y-3">
              {ticket.response && (
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <p className="text-sm text-blue-600">
                      Previous Customer Response
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {ticket.response}
                  </p>
                  {ticket.estimatedResolutionTime && (
                    <p className="text-xs text-gray-600">
                      Callback: {ticket.estimatedResolutionTime}
                    </p>
                  )}
                </div>
              )}

              {ticket.adminNotes && (
                <div className="bg-amber-50 rounded-2xl p-4 mb-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <p className="text-sm text-amber-600">
                      Previous Admin Notes
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    {ticket.adminNotes}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <Button
            onClick={handleSubmit}
            className="w-full h-14 rounded-xl"
          >
            <Send className="mr-2 h-5 w-5" />
            Submit Response
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}