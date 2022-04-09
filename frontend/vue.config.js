module.exports = {
  devServer: {
    port: 60080,
    disableHostCheck: true,
    watchOptions: {
      poll: true,
    },
  },
  // アセットはLaravelのpublicのappに作成されるようにする
  outputDir: '../public/app',

  // // app配下にjs, cssなどが置かれるので、publicPathを調整する
  publicPath: '/app',

  pages: {
    // appのエントリポイント、テンプレート、出力先を調整
    app: {
      entry: 'src/app/main.js',
      template: 'public/index.html',
      filename: '../../resources/views/app.blade.php',
    },
  },
}
