import { defaultConfig } from '../../config';
import { Config, Options } from '../../models';
import { validateConfig } from './validators';

let config: Config = defaultConfig;

export const setConfig = (newConfig: Config) => {
  validateConfig(newConfig);
  config = newConfig;
};

export const getConfig = () => config;

export const init = (newConfig?: Config, options?: Options) => {
  if (options?.replace) {
    setConfig(newConfig);
  } else {
    const config = getConfig();
    const updatedConfig: Config = {
      criterias: [...config.criterias, ...newConfig.criterias],
      features: [...config.features, ...newConfig.features],
    };
    setConfig(updatedConfig);
  }
};
