module.exports={
   resolve: {
      extensions:['.js','.jsx']
    },
    externals: [nodeExternals({
        modulesDir: path.resolve(__dirname, '../node_modules'),
    }),  nodeExternals()],
}