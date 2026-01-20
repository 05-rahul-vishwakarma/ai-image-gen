import { apiClient, endpoints } from '@/http';
import type {
  CreateGenerationRequest,
  CreateGenerationResponse,
  GenerationsListResponse,
} from '@/http';

/**
 * Create a new image generation
 */
export const createGeneration = async (
  data: CreateGenerationRequest
): Promise<CreateGenerationResponse> => {
  const response = await apiClient.post<CreateGenerationResponse>(
    endpoints.generations.create,
    data
  );
  return response.data;
};

/**
 * Get list of all user's generations
 */
export const getGenerations = async (): Promise<GenerationsListResponse> => {
  const response = await apiClient.get<GenerationsListResponse>(
    endpoints.generations.list
  );
  return response.data;
};
