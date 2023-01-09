export const getIsShallowEqual = (
  object: Record<never, never> | null,
  secondObject: Record<any, any> | null
): boolean => {
  if (!object || !secondObject) return false;

  let result = true;

  Object.entries(object).forEach(([key, value]) => {
    if (secondObject[key] === undefined || secondObject[key] !== value)
      result = false;
  });

  return result;
};
