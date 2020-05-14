
    /* eslint-disable max-len */

    /** ****************************************************************************************************************
    *   Specifies all settings for any file and memory resources the application imports.
    *******************************************************************************************************************/
    export class SettingResource
    {
        /** Relative path from index.html where all loading images reside. */
        public  static  readonly    PATH_IMAGE_LOADING                      :string             = 'res/image/loading/';
        /** Relative path from index.html where all skybox images reside. */
        public  static  readonly    PATH_IMAGE_SKYBOX                       :string             = 'res/image/skybox/';
        /** Relative path from index.html where all GUI images reside. */
        public  static  readonly    PATH_IMAGE_GUI                          :string             = 'res/image/gui/';
        /** Relative path from index.html where all favicons reside. */
        public  static  readonly    PATH_IMAGE_FAVICON                      :string             = 'res/image/favicon/';

        /** Relative path from index.html where all 3d models reside. */
        public  static  readonly    PATH_MODEL                              :string             = 'res/model/';

        /** Relative path from index.html where all texture images reside. */
        public  static  readonly    PATH_IMAGE_TEXTURE                      :string             = 'res/image/texture/';
        /** Relative path from index.html where all video textures reside. */
        public  static  readonly    PATH_VIDEO_TEXTURE                      :string             = 'res/video/texture/';
    }
