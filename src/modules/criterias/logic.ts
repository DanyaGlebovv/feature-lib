import { Criteria } from '../../models';
import { getConfig, setConfig } from '..';

export const appendCriterias = (criterias: Criteria[]) => {
  const config = getConfig();
  const updatedConfig = {
    ...config,
    criterias: [...config.criterias, ...criterias],
  };
  setConfig(updatedConfig);
};

export const getAllCriterias = () => getConfig().criterias;

export const getCriteriaById = (criteriaId: string) => getConfig().criterias.find(({ id }) => id === criteriaId);

export const getCriteriasForFeature = (criteriaIds: string[]) =>
  getConfig().criterias.filter(({ id }) => criteriaIds.includes(id));
