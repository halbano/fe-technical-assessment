import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../shared/IconButton';
import { Tag, TagValue } from '../shared/Tag';
import { WorkflowName } from './WorkflowName';
import { DocumentIcon, LightbulbIcon, SpreadsheetIcon, ExclamationCircleIcon } from '../shared/WorkflowIcons';
import mockData from '../../data/workflows.json';

// TODO: Integrate with AirOps API
// interface WorkflowData {
//   id: string;
//   type: 'Workflow' | 'Agent';
//   name: string;
//   iconType: 'document' | 'lightbulb' | 'spreadsheet' | 'exclamation';
//   iconColor: string;
//   tags?: {
//     type: 'single';
//     label: string;
//     variant: 'blue' | 'purple' | 'gray' | 'green' | 'red' | 'yellow';
//   } | {
//     type: 'multiple';
//     colors: Array<'blue' | 'purple' | 'gray' | 'green' | 'red' | 'yellow'>;
//     count: number;
//   };
//   lastUpdated: string;
//   showAddTag?: boolean;
// }

export const WorkflowsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-gray-200"
          role="table"
          aria-label="Workflows data table"
        >
          <thead>
            <tr role="row">
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                scope="col"
                role="columnheader"
                aria-sort="none"
              >
                <button
                  className="group inline-flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Sort by type"
                >
                  <span>Type</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
                role="columnheader"
                aria-sort="none"
              >
                <button
                  className="group inline-flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Sort by name"
                >
                  <span>Name</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                scope="col"
                role="columnheader"
              >
                Tags
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                scope="col"
                role="columnheader"
                aria-sort="none"
              >
                <button
                  className="group inline-flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Sort by last updated date"
                >
                  <span>Last Updated</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                scope="col"
                role="columnheader"
              >
                <span className="sr-only">Actions</span>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" role="rowgroup">
            {mockData.map((workflow, index) => (
              <tr
                key={workflow.id}
                className="hover:bg-gray-50 focus-within:bg-gray-50"
                role="row"
                aria-rowindex={index + 2} // +2 because thead counts as row 1
              >
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <span className="text-sm text-gray-500">{workflow.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <WorkflowName
                    iconType={workflow.iconType}
                    name={workflow.name}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <div className="flex items-center space-x-2">
                    <Tag values={workflow.tags as TagValue[]} />
                    {workflow.showAddTag && (
                      <button
                        className="text-gray-400 hover:text-gray-600 focus:text-gray-600 text-sm flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                        aria-label={`Add tag to ${workflow.name}`}
                      >
                        <span aria-hidden="true">+</span>
                        <span>Add Tag</span>
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <time className="text-sm text-gray-500" dateTime={workflow.lastUpdated}>
                    {workflow.lastUpdated}
                  </time>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <div className="flex items-center space-x-2" role="group" aria-label={`Actions for ${workflow.name}`}>
                    <IconButton
                      size="sm"
                      aria-label={`Edit ${workflow.name} workflow`}
                    >
                      <PencilIcon className="w-4 h-4" aria-hidden="true" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      aria-label={`Delete ${workflow.name} workflow`}
                    >
                      <TrashIcon className="w-4 h-4" aria-hidden="true" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table summary for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Table showing {mockData.length} workflows with columns for type, name, tags, last updated date, and actions.
      </div>
    </div>
  );
}; 