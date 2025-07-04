import AirOps from '@airops/airops-js';
import { getCurrentConfig } from '../config/airops.config';

interface AirOpsConfig {
  userId: string;
  workspaceId: number;
  hashedUserId: string;
  apiKey?: string;
  environment?: 'development' | 'staging' | 'production';
  getHashedUserId?: (userId: string) => Promise<string>;
  appId: number;
}

class AirOpsService {
  private static instance: AirOpsService;
  private airopsInstance: AirOps | null = null;
  private config: AirOpsConfig;
  private isInitialized: boolean = false;

  private constructor() {
    this.config = getCurrentConfig() as any;
  }

  public static getInstance(): AirOpsService {
    if (!AirOpsService.instance) {
      AirOpsService.instance = new AirOpsService();
    }
    return AirOpsService.instance;
  }

  public async initialize(config?: Partial<AirOpsConfig>): Promise<void> {
    if (this.isInitialized) {
      console.warn('AirOps service is already initialized');
      return;
    }

    if (config) {
      this.config = { ...this.config, ...config };
    }

    try {
      // Get hashed user ID from server
      let hashedUserId = this.config.hashedUserId;
      if (!hashedUserId && this.config.getHashedUserId && this.config.userId) {
        try {
          hashedUserId = await this.config.getHashedUserId(this.config.userId);
          this.isInitialized = true;
        } catch (error) {
          this.isInitialized = false;
          console.warn('Failed to get hashed user ID from server, falling back to public mode:', error);
          return;
        }
      }

      // Initialize with authentication if we have all required data
      if (this.config.userId && this.config.workspaceId && hashedUserId) {
        this.airopsInstance = AirOps.identify({
          userId: this.config.userId,
          workspaceId: this.config.workspaceId,
          hashedUserId: hashedUserId,
        });
      } else {
        // Fall back
        this.airopsInstance = new AirOps();
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize AirOps service:', error);
      throw new Error('AirOps initialization failed');
    }
  }

  public async getAirOpsInstance(): Promise<any> {
    if (!this.isInitialized || !this.airopsInstance) {
      await this.initialize();
    }
    return this.airopsInstance;
  }

  public async getWorkflows(): Promise<any[]> {
    try {
        const instance = await this.getAirOpsInstance();
        // Execute the app
        const response = await instance.apps.execute({
            appId: this.config.appId,
            version: 1,
            payload: {
              inputs: {
                  filter: 'Workflow',
              },
            },
        });
        const result = await response.result();
        const content = result.output[0]?.content;
        return JSON.parse(content);
    } catch (error) {
        console.error('Error fetching workflows:', error);
        throw error;
    }
  }

  // Getter for current configuration
  public getConfig(): AirOpsConfig {
    return { ...this.config };
  }

  public isServiceInitialized(): boolean {
    return this.isInitialized;
  }
}

export const airopsService = AirOpsService.getInstance();

export const airopsInstance = {
  getWorkflows: () => airopsService.getWorkflows(),
};