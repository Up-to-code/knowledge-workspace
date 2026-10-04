import { defineConfig } from '@neon/config/v1';

export default defineConfig({
  auth: true,
  branch: branch => branch.exists ? {} : {
    postgres: {
      computeSettings: {
        autoscalingLimitMinCu: 0.25,
        autoscalingLimitMaxCu: 0.25,
        suspendTimeout: '5m',
      },
    },
  },
});
