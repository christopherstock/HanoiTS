
    /* eslint-disable max-len */
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Specifies all settings for the engine.
    *******************************************************************************************************************/
    export class SettingEngine
    {
        /** The title. */
        public  static  readonly    TITLE                                   :string             = 'HanoiTS, (c) 2020 Mayflower GmbH, v.1.0';
        /** The favicon. */
        public  static  readonly    FAVICON                                 :string             = bz.SettingResource.PATH_IMAGE_FAVICON + 'mayflower.ico';
        /** The loading logo. */
        public  static  readonly    LOADING_LOGO                            :string             = bz.SettingResource.PATH_IMAGE_LOADING + 'loadingMf.png';

        /** The minimum canvas width. */
        public  static  readonly    CANVAS_MIN_WIDTH                        :number             = 800;
        /** The minimum canvas height. */
        public  static  readonly    CANVAS_MIN_HEIGHT                       :number             = 600;

        /** Follow camera height offset. */
        public  static  readonly    CAMERA_FOLLOW_HEIGHT_OFFSET             :number             = 0.0; // 6.0;
        /** How far from the object to follow. */
        public  static  readonly    CAMERA_FOLLOW_RADIUS                    :number             = 15.0;
        /** Offset rotation (for front following etc.). */
        public  static  readonly    CAMERA_FOLLOW_ROTATION_OFFSET           :number             = 180.0;
        /** Camera acceleration after target change. defaults to 0.05 */
        public  static  readonly    CAMERA_FOLLOW_ACCELERATION_SPEED        :number             = 0.01; // 0.03;
        /** Max camera moving speed. defaults to 20. */
        public  static  readonly    CAMERA_FOLLOW_MAX_SPEED                 :number             = 100.0;
        /** The default speed for camera animations. */
        public  static  readonly    CAMERA_ANIMATION_FRAMES_PER_SECOND      :number             = 50;

        /** Specifies if the custom loading screen shall be used. */
        public  static  readonly    CUSTOM_LOADING_SCREEN                   :boolean            = true;

        /** The default field of view of the 1st person camera. */
        public  static  readonly    DEFAULT_FOV                             :number             = 1.1;
    }
