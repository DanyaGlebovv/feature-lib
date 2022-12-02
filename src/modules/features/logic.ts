import { Feature } from 'models';
import { getConfig, getCriteriasForFeature } from '../../modules';

export const checkFeatureCriterias = (feature: Feature, user: any) => {
  return !!feature.criteria.find((featureCriteria) => {
    const criterias = getCriteriasForFeature(Object.keys(featureCriteria));
    if (!criterias.length) {
      return true;
    }
    return criterias.every((criteria) => criteria.check(user, featureCriteria[criteria.id]));
  });
};

const isFeatureAvailable = (feature: Feature, user: any) => {
  if (!feature || feature.disabled) {
    return false;
  }
  if (feature.disableCriteria) {
    return feature.disableCriteria;
  }
  return checkFeatureCriterias(feature, user);
};

export const getAvailableFeaturesForUser = (user: any) => {
  const { features } = getConfig();
  return features.filter((feature) => !!isFeatureAvailable(feature, user));
};

export const isFeatureAvailableForUser = (featureId: string, user: any) => {
  const { features } = getConfig();
  const feature = features.find(({ id }) => id === featureId);
  return isFeatureAvailable(feature, user);
};

export const areFeaturesAvailableForUser = (featureIds: string[], user: any) => {
  const { features } = getConfig();
  const selectedFeatures = features.filter(({ id }) => featureIds.includes(id));
  return selectedFeatures.every((feature) => isFeatureAvailable(feature, user));
};

export const isFeatureEnabled = (featureId: string) => {
  const { features } = getConfig();
  const feature = features.find(({ id }) => id === featureId);
  return !feature.disabled;
};

export const areFeaturesEnabled = (featureIds: string[]) => {
  const { features } = getConfig();
  const selectedFeatures = features.filter(({ id }) => featureIds.includes(id));
  return selectedFeatures.every((feature) => !feature.disabled);
};

export const getEnabledFeatures = () => {
  const { features } = getConfig();
  return features.filter((feature) => !feature.disabled);
};
