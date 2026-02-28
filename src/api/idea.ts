import axiosInstance from "../config/axios";
import type { ArchitectureData, IdeaApiResponse } from "../@types";

/**
 * POST /idea
 * Send a project description and receive the generated architecture.
 * Normalises the nested API response into a flat ArchitectureData shape.
 */
export const sendIdea = async (query: string): Promise<ArchitectureData> => {
  const response = await axiosInstance.post<IdeaApiResponse>("/idea", {
    idea: query,
  });
  const { projectName, architecture, cloudEstimation } = response.data.data;
  return {
    projectName,
    nodes: architecture.nodes,
    edges: architecture.edges,
    cloudEstimation,
  };
};
