import { useState } from 'react';
import { createGeneration, getGenerations, getGenerationById } from '@/services';
import type {
  CreateGenerationRequest,
  CreateGenerationResponse,
  GenerationsListResponse,
  GenerationResponse,
  Generation,
} from '@/http';

export const useCreateGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<CreateGenerationResponse | null>(null);

  const generate = async (request: CreateGenerationRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createGeneration(request);
      setData(response);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error,
    data,
  };
};

export const useGenerationsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);

  const fetchGenerations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getGenerations();
      setGenerations(response.data);
      return response.data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      setGenerations([]);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generations,
    isLoading,
    error,
    fetchGenerations,
  };
};

export const useGenerationById = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [generation, setGeneration] = useState<Generation | null>(null);

  const fetchGeneration = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getGenerationById(id);
      setGeneration(response.data);
      return response.data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      setGeneration(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generation,
    isLoading,
    error,
    fetchGeneration,
  };
};
