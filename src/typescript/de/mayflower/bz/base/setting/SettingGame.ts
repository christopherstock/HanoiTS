
    /* eslint-disable max-len */

    import * as BABYLON from 'babylonjs'

    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the spaceship player.
    *******************************************************************************************************************/
    export class SettingGame
    {
        /** Ground size X. */
        public  static  readonly    LEVEL_SIZE_X                        :number             = 18.0;
        /** Ground size Y. */
        public  static  readonly    LEVEL_SIZE_Y                        :number             = 0.25;
        /** Ground size Z. */
        public  static  readonly    LEVEL_SIZE_Z                        :number             = 10.0;

        /** Pole diameter. */
        public  static  readonly    POLE_DIAMETER                       :number             = 0.5;
        /** Pole size Y. */
        public  static  readonly    POLE_SIZE_Y                         :number             = 4.0;

        /** Ring thickness. */
        public  static  readonly    RING_THICKNESS                      :number             = 0.5;
        /** Number of Rings. */
        public  static  readonly    RING_COUNT                          :number             = 6;
        /** Ring Size of the smallest Ring. */
        public  static  readonly    RING_SIZE_SMALLEST_RING             :number             = 1.0;
        /** Ring Difference between one ring size. */
        public  static  readonly    RING_SIZE_DIFFERENCE                :number             = 0.5;
        /** Ring distance Y between rings. */
        public  static  readonly    RING_DISTANCE_Y                     :number             = 0.1;
        /** Ring distance Y to ground. */
        public  static  readonly    RING_DISTANCE_Y_GROUND              :number             = 0.2;
        /** Ring color for bottom ring. */
        public  static  readonly    RING_COLOR_LOWEST                   :BABYLON.Color3     = new BABYLON.Color3( 0.92, 0.45, 0.01 );

        /** The number of level tiles y for the soil. */
        public  static  readonly    SOIL_SIZE_Y                         :number             = 30;

        /** The player start position x. */
        public  static  readonly    PLAYER_START_X                      :number             = 30;

        /** The dimension of one site of the crate. */
        public  static  readonly    TILE_SIZE_X                         :number             = 1.6;
        /** The dimension of one site of the crate. */
        public  static  readonly    TILE_SIZE_Y                         :number             = 2.5;
        /** The dimension of one site of the crate. */
        public  static  readonly    TILE_SIZE_Z                         :number             = 1.6;

        /** The dimension of one site of the crate. */
        public  static  readonly    CAMERA_DISTANCE_Z                   :number             = -10.0;

        /** The fov zoom speed. */
        public  static  readonly    CAMERA_ZOOM_SPEED                   :number             = 0.1;

        /** The number of frames the player movement is blocked after soil open. */
        public  static  readonly    DELAY_AFTER_SOIL_OPEN               :number             = 20;

        /** May random int to choose from when picking random int for soil hint. */
        public  static  readonly    SOIL_HINT_LUCK_MAX_RANDOM           :number             = 8;
    }
