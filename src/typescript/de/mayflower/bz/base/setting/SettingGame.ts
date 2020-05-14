
    /* eslint-disable max-len */

    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the spaceship player.
    *******************************************************************************************************************/
    export class SettingGame
    {
        /** Ground size X. */
        public  static  readonly    LEVEL_SIZE_X                        :number             = 15.0;
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
