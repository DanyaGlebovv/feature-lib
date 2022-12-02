import { Config } from '../../models';

export const validateConfig = (config: Config) => {
  if (!config.criterias || !config.features) {
    throw new Error('Missed required fields');
  }

  const invalidFeatures = config.features.filter((feature) => {
    if (feature.disabled) {
      return false;
    }
    if (!feature.disableCriteria) {
      if (!feature.hasOwnProperty('criteria')) {
        return true;
      }
      if (!Array.isArray(feature.criteria)) {
        return true;
      }
    }
    return false;
  });

  if (!!invalidFeatures.length) {
    throw new Error(`${invalidFeatures.map(({ id }) => id).join(', ')} - have no "enabled" and "criteria" field`);
  }

  const invalidCriterias = config.criterias.filter((criteria) => !criteria.id || !criteria.check);
  if (!!invalidCriterias.length) {
    throw new Error(`${invalidCriterias.map(({ id }) => id).join(', ')} - have no "id" or "check" field`);
  }
};
