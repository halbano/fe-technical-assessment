import React from 'react';

interface WorkflowNameProps {
  iconType: string;
  name: string;
  iconColor?: string;
}

const getEmojiForIconType = (iconType: string) => {
  switch (iconType) {
    case 'document':
      return '📄';
    case 'lightbulb':
      return '💡';
    case 'spreadsheet':
      return '🍎';
    case 'exclamation':
      return '✏️';
    default:
      return '📄';
  }
};

export const WorkflowName: React.FC<WorkflowNameProps> = ({
  iconType = 'document',
  name,
  iconColor = "text-gray-500"
}) => {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-5 h-5 ${iconColor}`}>
        {getEmojiForIconType(iconType)}
      </div>
      <span className="text-sm font-medium text-gray-900">{name}</span>
    </div>
  );
}; 