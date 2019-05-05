const config = {
    srcDir: 'src',
    mainModuleFileName: 'index.js',
    mainModuleName: 'Module',
    /**
     * allowed file extensions
     */
    fileExtensions: ['.js', '.ts'],
    /**
     * defines string of file patterns to process
     */
    include: ['*'],
    /**
     * defines string of file patterns to ignore. by default, type definition files are ignore
     */
    exclude: [],
    /**
     * boolean value indicating if files that are not part of the listed allowed
     * fileExtensions and are not type definition files should be copied over
     */
    copyAssets: true,
    /**
     * boolean indicating if generated output files should be uglified, you must
     * pass in an uglifier plugin if set to true
     */
    uglify: false,
    /**
     * boolean indicating if the interop rollup setting should be enabled
     */
    interop: false,
    /**
     * boolean indicating if sourcemap should be generated, can be true, false, or 'inline'
     */
    sourcemap: true,
    /**
     * rollup watch config, you must pass in the --watch command line argument for this to
     * work
     */
    watch: {},
    /**
     * rollup globals config
     */
    globals: {},
    /**
     * defines config settings for generating distributed codes. such as browser iife outputs
     */
    distConfig: {
        /**
         * defines if dist is enabled
         */
        enabled: false,
        /**
         * defines output directory
         */
        outDir: 'dist',
        format: 'iife',
        /**
         * boolean value indicating if typescript type definition files should be copied to the
         * specified typings directory
         */
        copyTypings: true,
        /**
         * defines folder to copy all type definition files to, if the copy typings option
         * is set to true
         */
        typingsDir: 'dist/typings',
    },
    /**
     * defines config settings for generating lib codes. output format is cjs.
     */
    libConfig: {
        /**
         * defines if lib is enabled
         */
        enabled: true,
        /**
         * defines output directory
         */
        outDir: 'lib',
        format: 'cjs',
        /**
         * boolean value indicating if typescript type definition files should be copied to the
         * specified typings directory
         */
        copyTypings: true,
        /**
         * defines folder to copy all type definition files to, if the copy typings option
         * is set to true
         */
        typingsDir: 'lib/typings',
    }
};
export default config;
