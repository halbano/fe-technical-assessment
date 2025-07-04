import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../shared/Button';
import { Tag, TagValue } from '../shared/Tag';
import { WorkflowName } from './WorkflowName';
// import mockData from '../../data/workflows.json';
import { airopsInstance } from '../../data/airops';
// TODO: Use types for the workflow data
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
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const workflows = await airopsInstance.getWorkflows();
        setWorkflows(workflows);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  if (loading) {
    return <div><span className="text-muted">Loading workflows from AirOps...</span></div>;
  }

  if (workflows.length === 0) {
    return <div>No workflows found</div>;
  }

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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                scope="col"
                role="columnheader"
                aria-sort="none"
              >
                <span>Type</span>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                scope="col"
                role="columnheader"
                aria-sort="none"
              >
                <span>Name</span>
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
                <span>Last Updated</span>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                scope="col"
                role="columnheader"
              >
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" role="rowgroup">
            {workflows.map((workflow: any, index: number) => (
              <tr
                key={workflow.id}
                className="hover:bg-gray-50 focus-within:bg-gray-50"
                role="row"
                aria-rowindex={index + 2} // +2 because thead counts as row 1
              >
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <span className="text-sm text-secondary">{workflow.type}</span>
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
                  <time className="text-sm text-secondary" dateTime={workflow.lastUpdated}>
                    {workflow.lastUpdated}
                  </time>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <div className="flex items-center space-x-2" role="group" aria-label={`Actions for ${workflow.name}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label={`Edit ${workflow.name} workflow`}
                    >
                      <PencilIcon className="w-4 h-4" aria-hidden="true" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label={`Delete ${workflow.name} workflow`}
                    >
                      <TrashIcon className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table summary for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Table showing {workflows.length} workflows
      </div>
    </div>
  );
}; 