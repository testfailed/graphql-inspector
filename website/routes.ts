import {IRoutes, GenerateRoutes} from '@guild-docs/server';

export function getRoutes(): IRoutes {
  const Routes: IRoutes = {
    _: {
      docs: {
        $name: 'Docs',
        $routes: ['introduction', 'essentials', 'recipes','products', 'products', 'api'],
        _: {
          introduction: {
            $name: 'Introduction',
            $routes: ['index', 'installation']
          },
          essentials: {
            $name: 'Essentials',
            $routes: ['diff', 'notifications', 'validate', 'coverage', 'similar', 'serve', 'introspect']
          },
          recipes: {
            $name: 'Recipes',
            $routes: ['environments', 'endpoints', 'intercept', 'annotations', 'pull-requests']
          },
          products: {
            $name: 'Products',
            $routes: ['ci', 'github', 'action']
          },
          api: {
            $name: 'API',
            $routes: ['schema', 'documents']
          }
        }
      }
      ,
    },
  };
  GenerateRoutes({
    Routes,
    folderPattern: 'docs',
    basePath: 'docs',
    basePathLabel: 'Documentation',
  });

  return Routes;
}
