import { loadersTypes } from './';

const switchLoader = (name, value) => ({
  type: loadersTypes.SWITCH_LOADER,
  name,
  value
});

export default { switchLoader };
