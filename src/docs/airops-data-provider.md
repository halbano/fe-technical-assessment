# AirOps Data Provider

This document explains how to use the AirOps singleton service in the application.

## Overview

The AirOps singleton pattern ensures that only one instance of the AirOps client exists throughout the application, providing better resource management and configuration consistency.

## Features

- ✅ **Singleton Pattern**: Only one instance exists
- ✅ **Environment-based Configuration**: Automatic config loading
- ✅ **Error Handling**: Comprehensive error catching and logging
- ✅ **TypeScript Support**: Full type safety
- ✅ **Backward Compatibility**: Legacy API support
- ✅ **Easy Testing**: Reset functionality for tests

## Configuration

### Environment Variables

```env
# AirOps Configuration
VITE_AIROPS_USER_ID=your_user_id_here
VITE_AIROPS_WORKSPACE_ID=1
API_KEY=your_key
```

### Environment-specific Configs

The service automatically loads configuration based on `NODE_ENV`:

- **Development**: Uses hardcoded defaults for quick setup
- **Production**: Requires all environment variables

## Usage

### Basic Usage (Recommended)

```typescript
import { airopsService } from '../data/airops';

// Get workflows
// This method calls a specific application with id: 92412
const workflows = await airopsService.getWorkflows();
```