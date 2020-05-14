
    /* eslint-disable max-len */

    /** ****************************************************************************************************************
    *   Specifies the filenames of all model files to import.
    *******************************************************************************************************************/
    export abstract class ModelFile
    {
        /** The model 'crate'. */
        public      static  readonly    CRATE                   :string                 = 'furniture/crate1.babylon';

        /** All filenames for all meshes. */
        public      static  readonly    ALL_MESH_FILES          :string[]               =
        [
            ModelFile.CRATE,
        ];
    }
