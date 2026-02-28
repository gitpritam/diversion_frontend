/**
 * Architecture and Data Structure Types
 */

export interface NodeData {
  id: string;
  label: string;
  type: string;
  service: string;
  provider: string;
}

export interface EdgeData {
  source: string;
  target: string;
}

export interface CloudCost {
  Compute: string;
  Database: string;
  Storage: string;
  OtherServices: string;
  EstimatedMonthlyCost: string;
}

export interface ArchitectureData {
  projectName: string;
  nodes: NodeData[];
  edges: EdgeData[];
  cloudEstimation: CloudCost;
}

/** Shape returned directly by the backend before normalisation */
export interface IdeaApiResponse {
  success: boolean;
  data: {
    projectName: string;
    architecture: {
      nodes: NodeData[];
      edges: EdgeData[];
    };
    cloudEstimation: CloudCost;
  };
}
