import path from 'path';
import webpack from 'webpack';  
import TerserPlugin from 'terser-webpack-plugin';
import * as Repack from '@callstack/repack';

const STANDALONE = Boolean(process.env.STANDALONE);
export default env => {
  const {
    mode = 'development',
    context = Repack.getDirname(import.meta.url),
    entry = './index.js',
    platform = process.env.PLATFORM,
    minimize = mode === 'production',
    devServer = undefined,
    bundleFilename = undefined,
    sourceMapFilename = undefined,
    assetsPath = undefined,
    reactNativePath = new URL('./node_modules/react-native', import.meta.url)
      .pathname,
  } = env;
  const dirname = Repack.getDirname(import.meta.url);

  if (!platform) {
    throw new Error('Missing platform');
  }

  process.env.BABEL_ENV = mode;

  return {
    mode,
 
    devtool: false,
    context,
 
    entry: [
      ...Repack.getInitializationEntries(reactNativePath, {
        hmr: devServer && devServer.hmr,
      }),
      entry,
    ],
    resolve: {

      ...Repack.getResolveOptions(platform),

    },
    output: {
      clean: true,
      hashFunction: 'xxhash64',
      path: path.join(dirname, 'build/generated', platform),
      filename: 'index.bundle',
      chunkFilename: '[name].chunk.bundle',
      publicPath: Repack.getPublicPath({platform, devServer}),
    },

    optimization: {
      /** Enables minification based on values passed from React Native CLI or from fallback. */
      minimize,
      /** Configure minimizer to process the bundle. */
      minimizer: [
        new TerserPlugin({
          test: /\.(js)?bundle(\?.*)?$/i,
          /**
           * Prevents emitting text file with comments, licenses etc.
           * If you want to gather in-file licenses, feel free to remove this line or configure it
           * differently.
           */
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
      chunkIds: 'named',
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          include: [
            /node_modules(.*[/\\])+react/,
            /node_modules(.*[/\\])+@react-native/,
            /node_modules(.*[/\\])+@react-navigation/,
            /node_modules(.*[/\\])+@react-native-community/,
            /node_modules(.*[/\\])+@expo/,
            /node_modules(.*[/\\])+react-freeze/,
            /node_modules(.*[/\\])+pretty-format/,
            /node_modules(.*[/\\])+metro/,
            /node_modules(.*[/\\])+abort-controller/,
            /node_modules(.*[/\\])+@callstack\/repack/,
          ],
          use: 'babel-loader',
        },
        /**
         * Here you can adjust loader that will process your files.
         *
         * You can also enable persistent caching with `cacheDirectory` - please refer to:
         * https://github.com/babel/babel-loader#options
         */
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              /** Add React Refresh transform only when HMR is enabled. */
              plugins:
                devServer && devServer.hmr
                  ? ['module:react-refresh/babel']
                  : undefined,
            },
          },
        },
        /**
         * This loader handles all static assets (images, video, audio and others), so that you can
         * use (reference) them inside your application.
         *
         * If you wan to handle specific asset type manually, filter out the extension
         * from `ASSET_EXTENSIONS`, for example:
         * ```
         * Repack.ASSET_EXTENSIONS.filter((ext) => ext !== 'svg')
         * ```
         */
        {
          test: Repack.getAssetExtensionsRegExp(Repack.ASSET_EXTENSIONS),
          use: {
            loader: '@callstack/repack/assets-loader',
            options: {
              platform,
              devServerEnabled: Boolean(devServer),
              /**
               * Defines which assets are scalable - which assets can have
               * scale suffixes: `@1x`, `@2x` and so on.
               * By default all images are scalable.
               */
              scalableAssetExtensions: Repack.SCALABLE_ASSETS,
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        isStandAlone: JSON.stringify(STANDALONE),
      }),
      
      new Repack.RepackPlugin({
        context,
        mode,
        platform,
        devServer,
        output: {
          bundleFilename,
          sourceMapFilename,
          assetsPath,
        },
      }),
      new Repack.plugins.ModuleFederationPlugin({
        name: 'MiniApp',
        exposes: {
          './MiniAppNavigator': './src/navigation/MainNavigator',
          './DeviceIdentifier': './src/native/DeviceIdentifier',
          './GenerateToken':     './src/utils/GenerateToken',
        },
        shared: {
          react: {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: '18.2.0',
          },
          'react-native': {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: '0.72.3',
          },
          '@react-navigation/native': {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: '6.1.6',
          },
          '@react-navigation/native-stack': {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: '6.9.12',
          },
          'react-native-safe-area-context': {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: '4.5.0',
          },
          'react-native-screens': {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: '3.20.0',
          },
          '@react-native-async-storage/async-storage': {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: '2.1.2',
          },
        },
      }),
    ],
  };
};
