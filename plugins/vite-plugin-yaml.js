import yaml from 'js-yaml'

export default function createPlugin(){
  return {
    name: 'vite-plugin-yaml',
    transform(src, id) {
      if (/\.ya?ml$/.test(id)) {
        return {
          code: `export default ${JSON.stringify(yaml.load(src), null, 2)}`,
          map: null,
        }
      }
    },
  }
}