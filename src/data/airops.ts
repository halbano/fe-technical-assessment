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
      // Get hashed user ID from server if function is available
      let hashedUserId = this.config.hashedUserId;
      if (this.config.getHashedUserId && this.config.userId) {
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
        // Fall back to public mode
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
      return this.airopsInstance;
    }
    return this.airopsInstance;
  }

  // Convenience methods for common operations
  public async getWorkflows(): Promise<any[]> {
    try {
        const instance = await this.getAirOpsInstance();
        // Execute an app
        const response = await instance.apps.execute({
            appId: this.config.appId,
            version: 1,
            payload: {
              inputs: {
                  filter: 'Workflow',
              },
            },
        });
    
        // Wait for result
        const result = await response.result();
        const content = result.output[0]?.content;
        return JSON.parse(content);
    } catch (error) {
        console.error('Error fetching workflows:', error);
        throw error;
    }
  }

  
  // Method to update configuration if needed
  public updateConfig(newConfig: Partial<AirOpsConfig>): void {
    if (this.isInitialized) {
      console.warn('Cannot update config after initialization. Create a new instance if needed.');
      return;
    }
    this.config = { ...this.config, ...newConfig };
  }

  // Method to reset the service (useful for testing)
  public reset(): void {
    this.airopsInstance = null;
    this.isInitialized = false;
    AirOpsService.instance = null as any;
  }

  // Getter for current configuration
  public getConfig(): AirOpsConfig {
    return { ...this.config };
  }

  public isServiceInitialized(): boolean {
    return this.isInitialized;
  }
}

// Export the singleton instance
export const airopsService = AirOpsService.getInstance();

// Export for backward compatibility (but recommend using the service methods)
export const airopsInstance = {
  getWorkflows: () => airopsService.getWorkflows(),
};

// Auto-initialize with environment-specific config (now async)
airopsService.initialize().catch(error => {
  console.error('Failed to auto-initialize AirOps service:', error);
});