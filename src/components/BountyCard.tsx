import React from 'react';

interface BountyCardProps {
  bountyAmount: number;
  tokenType: string;
  deadline: string;
  status: 'open' | 'in-progress' | 'completed' | 'expired';
  title?: string;
  description?: string;
  className?: string;
}

const BountyCard: React.FC<BountyCardProps> = ({
  bountyAmount,
  tokenType,
  deadline,
  status,
  title,
  description,
  className = ''
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-600 text-sm mb-3">
              {description}
            </p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              {bountyAmount.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-gray-500 ml-1 uppercase">
              {tokenType}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-1">Deadline</div>
          <div className="text-sm font-medium text-gray-900">
            {formatDeadline(deadline)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyCard;