
    /* eslint-disable max-len */
    import * as BABYLON from 'babylonjs'

    /** ****************************************************************************************************************
    *   Specifies all colors the application makes use of.
    *******************************************************************************************************************/
    export class SettingColor
    {
        /** The CSS color 'transparent'. */
        public  static  readonly    COLOR_CSS_TRANSPARENT                       :string             = 'rgba( 0,   0,   0,   0.0 )';
        /** The CSS color 'white' with full opacity. */
        public  static  readonly    COLOR_CSS_WHITE_OPAQUE                      :string             = 'rgba( 255, 255, 255, 1.0 )';
        /** The CSS color 'black' with full opacity. */
        public  static  readonly    COLOR_CSS_BLACK_OPAQUE                      :string             = 'rgba( 0,   0,   0,   1.0 )';

        /** The RGB color 'white' without alpha information. */
        public  static  readonly    COLOR_RGB_WHITE                             :BABYLON.Color3     = new BABYLON.Color3( 1.0, 1.0, 1.0 );
        /** The RGB color 'black' without alpha information. */
        public  static  readonly    COLOR_RGB_BLACK                             :BABYLON.Color3     = new BABYLON.Color3( 0.0, 0.0, 0.0 );

        /** The RGBA color 'black' with full opacity. */
        public  static  readonly    COLOR_RGBA_BLACK_OPAQUE                     :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 0.0, 1.0 );
        /** The RGBA color 'red' with full opacity. */
        public  static  readonly    COLOR_RGBA_RED_OPAQUE                       :BABYLON.Color4     = new BABYLON.Color4( 1.0, 0.0, 0.0, 1.0 );
        /** The RGBA color 'green' with full opacity. */
        public  static  readonly    COLOR_RGBA_GREEN_OPAQUE                     :BABYLON.Color4     = new BABYLON.Color4( 0.0, 1.0, 0.0, 1.0 );
        /** The RGBA color 'blue' with full opacity. */
        public  static  readonly    COLOR_RGBA_BLUE_OPAQUE                      :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 1.0, 1.0 );
        /** The RGBA color 'white' with full opacity. */
        public  static  readonly    COLOR_RGBA_WHITE_OPAQUE                     :BABYLON.Color4     = new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 );
    }
