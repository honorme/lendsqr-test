export const capsuleAccent = (status: string): CapsuleAccent => {
  switch (status) {
    case 'True':
    case 'Successful':
    case 'Success':
    case 'Sent':
    case 'Confirmed':
    case 'Fully Paid':
    case 'Paid':
    case 'Pass':
    case 'Good':
    case 'Linked':
    case 'Approved':
    case 'Approve':
    case 'Active':
    case 'Activate':
    case 'Activated':
    case 'Granted':
    case 'Uploaded':
    case 'Closed':
    case 'Completed':
      return 'green'
    case 'Pending':
    case 'Processing':
    case 'In Progress':
    case 'PushBack':
    case 'Initiated':
    case 'Reversing':
    case 'Awaiting Consent':
    case 'AwaitingConfirmation':
    case 'Awaiting Confirmation':
    case 'AwaitingDisbursement':
    case 'Awaiting Disbursement':
      return 'amber'
    case 'Group':
    case 'Update':
    case 'Disbursed':
    case 'Offer Sent':
    case 'Mandatory':
    case 'Validated':
    case 'Valid':
    case 'Waived':
    case 'Recalled':
    case 'Accepted':
    case 'Performing':
    case 'Secondary':
    case 'BankOneOFI':
      return 'purple'
    case 'False':
    case 'Fail':
    case 'Failed':
    case 'Bad':
    case 'Expired':
    case 'Cancelled':
    case 'Unpaid':
    case 'Decline':
    case 'Rejected':
    case 'Inactive':
    case 'Deactivate':
    case 'Deactivated':
      return 'red'
    case 'Corporate':
    case 'Collection':
    case 'Data Entry':
    case 'Open':
    case 'Create':
    case 'Optional':
    case 'Deferred':
      return 'blue'
    case 'Individual':
    case 'Recovery':
    case 'RecoveryMode':
    case 'Recovery Mode':
    case 'Recova':
    case 'OFI':
    case 'Primary':
      return 'recova'
    case 'New':
      return 'pink'
    case 'Pending':
      return 'grey'
    default:
      return 'natural'
  }
}

export type CapsuleAccent =
  | 'recova'
  | 'amber'
  | 'purple'
  | 'pink'
  | 'blue'
  | 'sky-blue'
  | 'red'
  | 'green'
  | 'grey'
  | 'indigo'
  | 'natural'
