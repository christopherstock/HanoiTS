
    /* eslint-disable max-len */

    /** ****************************************************************************************************************
    *   Specifies all debug adjustments for the application.
    *******************************************************************************************************************/
    export class SettingDebug
    {
        /** The global switch for the debug mode. */
        public  static  readonly    DEBUG_MODE                              :boolean            = true;

        /** Show FPS counter. */
        public  static  readonly    SHOW_FPS                                :boolean            = ( true && SettingDebug.DEBUG_MODE );

        /** Enabled menu debug keys for switching camera and stages. */
        public  static  readonly    ENABLE_DEBUG_KEYS                       :boolean            = ( true  && SettingDebug.DEBUG_MODE );

        /** The ellipsoid for the free debug camera (only when collisions are active). */
        public  static  readonly    DEBUG_CAMERA_ELLIPSOID                  :BABYLON.Vector3    = new BABYLON.Vector3( 2.0, 2.0, 2.0 );
        /** Enabled collisions for the free debug camera. */
        public  static  readonly    DEBUG_CAMERA_ENABLE_COLLISIONS          :boolean            = ( false && SettingDebug.DEBUG_MODE );

        /** Show the bounding boxes for all meshes. */
        public  static  readonly    SHOW_MESH_BOUNDING_BOXES                :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** Show the babylon.JS scene debug panel. */
        public  static  readonly    SHOW_BJS_DEBUG_LAYER                    :boolean            = ( false && SettingDebug.DEBUG_MODE );

        /** Show the world coordinate axis. */
        public  static  readonly    DEBUG_COORDINATE_AXIS_ENABLED           :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** The length of the world coordinate axis. */
        public  static  readonly    DEBUG_COORDINATE_AXIS_LENGTH            :number             = 25.0;
    }
