export interface Employee {
  id: string;
  name: string;
  email: string;
  department: 'payment' | 'document' | 'application';
  password: string;
}

export interface TicketActivity {
  id: string;
  timestamp: string;
  action: string;
  employee: string;
  details?: string;
}

export type IssueType = 
  | 'solved_no_response'        // Solved but customer ko response nahi gaya
  | 'stuck_in_progress'         // Bahut time se in-progress me hai
  | 'high_priority_unsolved'    // High priority lekin abhi tak unsolved
  | 'employee_marked_issue'     // Employee ne khud issue mark kiya
  | 'customer_complaint'        // Customer ne complaint ki hai
  | 'none';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  department: 'payment' | 'document' | 'application';
  status: 'todo' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  assignedTo?: string;
  response?: string;
  adminNotes?: string;
  estimatedResolutionTime?: string;
  resolvedAt?: string;
  viewedBy?: string[];
  activities?: TicketActivity[];
  issueType?: IssueType;
  issueDescription?: string;
  hasIssue?: boolean;
}