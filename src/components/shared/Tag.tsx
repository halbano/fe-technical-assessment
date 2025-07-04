import React from 'react';

export interface TagValue {
  color: 'blue' | 'purple' | 'gray' | 'green' | 'red' | 'yellow';
  label: string;
}

interface TagProps {
  values: TagValue[] | null;
}

export const Tag: React.FC<TagProps> = ({
  values,
}) => {
  if (values !== null && Array.isArray(values) && values.length > 0) {
    const dotColorClasses = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      gray: "bg-gray-500",
      green: "bg-green-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
    };

    const count = values.length;
    const colorDescriptions = values.map(color => color).join(', ');
    const tagNames = values.map(value => value.label).join(', ');

    return (
      <div
        className="inline-flex items-center space-x-2 border border-gray-200 rounded-full px-2 py-1"
        role="group"
        aria-label={`${count} tags with colors: ${colorDescriptions}`}
      >
        <div className="flex items-center space-x-1" aria-hidden="true">
          {values.map((value, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${dotColorClasses[value.color]}`}
              title={`${value.color} tag`}
            />
          ))}
        </div>
        {count > 1 && (
          <span className={`text-gray-700 font-medium cursor-pointer`} title={tagNames} >
            {count} tags
          </span>
        )}
        {count === 1 && (
          <span className={`text-gray-700 font-medium`}>
            {values[0].label}
          </span>
        )}
      </div>
    );
  }
  return null;
};