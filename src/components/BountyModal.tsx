import React, { useState } from 'react';

interface BountyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bountyData: BountyData) => void;
  issueUrl?: string;
}

interface BountyData {
  issueUrl: string;
  bountyAmount: number;
  description: string;
  deadline: string;
}

const BountyModal: React.FC<BountyModalProps> = ({ isOpen, onClose, onSubmit, issueUrl = '' }) => {
  const [formData, setFormData] = useState<BountyData>({
    issueUrl,
    bountyAmount: 0,
    description: '',
    deadline: ''
  });

  const [errors, setErrors] = useState<Partial<BountyData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'bountyAmount' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BountyData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BountyData> = {};

    if (!formData.issueUrl.trim()) {
      newErrors.issueUrl = 'Issue URL is required';
    } else if (!formData.issueUrl.includes('github.com')) {
      newErrors.issueUrl = 'Please enter a valid GitHub issue URL';
    }

    if (formData.bountyAmount <= 0) {
      newErrors.bountyAmount = 'Bounty amount must be greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      issueUrl: '',
      bountyAmount: 0,
      description: '',
      deadline: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create Bounty</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="issueUrl" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Issue URL
            </label>
            <input
              type="url"
              id="issueUrl"
              name="issueUrl"
              value={formData.issueUrl}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.issueUrl ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://github.com/owner/repo/issues/123"
            />
            {errors.issueUrl && <p className="text-red-500 text-sm mt-1">{errors.issueUrl}</p>}
          </div>

          <div>
            <label htmlFor="bountyAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Bounty Amount (USDC)
            </label>
            <input
              type="number"
              id="bountyAmount"
              name="bountyAmount"
              value={formData.bountyAmount || ''}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bountyAmount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="100.00"
            />
            {errors.bountyAmount && <p className="text-red-500 text-sm mt-1">{errors.bountyAmount}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe the bounty requirements and acceptance criteria..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.deadline ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Bounty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BountyModal;