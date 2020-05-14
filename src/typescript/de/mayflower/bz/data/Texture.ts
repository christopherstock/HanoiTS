
    /* eslint-disable max-len */
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Specifies all textures to load.
    *******************************************************************************************************************/
    export class Texture
    {
        /** The texture 'wall test'. */
        public      static  readonly    WALL_TEST                   :Texture                = new Texture( 'test.jpg',              bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall mayflower logo'. */
        public      static  readonly    WALL_MAYFLOWER_LOGO         :Texture                = new Texture( 'mfLogo.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall ground'. */
        public      static  readonly    WALL_GROUND                 :Texture                = new Texture( 'ground.png',            bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'wall soil'. */
        public      static  readonly    WALL_SOIL                   :Texture                = new Texture( 'soil.png',              bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'grass'. */
        public      static  readonly    WALL_GRASS                  :Texture                = new Texture( 'grass.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall elevator'. */
        public      static  readonly    WALL_ELEVATOR               :Texture                = new Texture( 'elevator.png',          bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );

        /** The texture 'house bank'. */
        public      static  readonly    HOUSE_BANK                  :Texture                = new Texture( 'house_bank.png',        bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'house hospital'. */
        public      static  readonly    HOUSE_HOSPITAL              :Texture                = new Texture( 'house_hospital.png',    bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'house saloon'. */
        public      static  readonly    HOUSE_SALOON                :Texture                = new Texture( 'house_saloon.png',      bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'house store'. */
        public      static  readonly    HOUSE_STORE                 :Texture                = new Texture( 'house_store.png',       bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );

        /** The texture 'deco table'. */
        public      static  readonly    DECO_TABLE                  :Texture                = new Texture( 'table.png',             bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'deco cactus'. */
        public      static  readonly    DECO_CACTUS                 :Texture                = new Texture( 'cactus.png',            bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'deco bird'. */
        public      static  readonly    DECO_BIRD                   :Texture                = new Texture( 'bird.png',              bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );

        /** The texture 'minor stand right'. */
        public      static  readonly    MINER_STAND_RIGHT           :Texture                = new Texture( 'miner_stand_right.png', bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'minor stand left'. */
        public      static  readonly    MINER_STAND_LEFT            :Texture                = new Texture( 'miner_stand_left.png',  bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );

        /** The texture 'soil empty'. */
        public      static  readonly    SOIL_EMPTY                  :Texture                = new Texture( 'empty.png',             bz.TextureHasAlpha.NO, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'soil finding'. */
        public      static  readonly    SOIL_HINT_STONE             :Texture                = new Texture( 'hint_stone.png',        bz.TextureHasAlpha.NO, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'soil gold'. */
        public      static  readonly    SOIL_GOLD                   :Texture                = new Texture( 'gold.png',              bz.TextureHasAlpha.NO, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'soil granite'. */
        public      static  readonly    SOIL_GRANITE                :Texture                = new Texture( 'granite.png',           bz.TextureHasAlpha.NO, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'soil platinum'. */
        public      static  readonly    SOIL_PLATINUM               :Texture                = new Texture( 'platinum.png',          bz.TextureHasAlpha.NO, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'soil sandstone'. */
        public      static  readonly    SOIL_SANDSTONE              :Texture                = new Texture( 'sandstone.png',         bz.TextureHasAlpha.NO, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'soil silver'. */
        public      static  readonly    SOIL_SILVER                 :Texture                = new Texture( 'silver.png',            bz.TextureHasAlpha.NO, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'soil water'. */
        public      static  readonly    SOIL_WATER                  :Texture                = new Texture( 'water.png',             bz.TextureHasAlpha.NO, bz.TextureUV.ALL_TO_ONE    );

        /** The model texture 'crate'. */
        public      static  readonly    MODEL_CRATE                 :Texture                = new Texture( 'crate1.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE    );

        /** Contains all texture data objects. */
        public      static  readonly    ALL_TEXTURES                :Texture[]              =
        [
            Texture.WALL_TEST,
            Texture.WALL_MAYFLOWER_LOGO,
            Texture.WALL_GROUND,
            Texture.WALL_SOIL,
            Texture.WALL_GRASS,
            Texture.WALL_ELEVATOR,

            Texture.HOUSE_BANK,
            Texture.HOUSE_HOSPITAL,
            Texture.HOUSE_SALOON,
            Texture.HOUSE_STORE,

            Texture.DECO_TABLE,
            Texture.DECO_CACTUS,
            Texture.DECO_BIRD,

            Texture.MINER_STAND_RIGHT,
            Texture.MINER_STAND_LEFT,

            Texture.SOIL_EMPTY,
            Texture.SOIL_HINT_STONE,
            Texture.SOIL_GOLD,
            Texture.SOIL_GRANITE,
            Texture.SOIL_PLATINUM,
            Texture.SOIL_SANDSTONE,
            Texture.SOIL_SILVER,
            Texture.SOIL_WATER,

            Texture.MODEL_CRATE,
        ];

        /** The filename of this texture's image. */
        private             readonly    fileName                    :string                 = null;
        /** The according bullet hole texture for this texture. */
        private             readonly    bulletHoleTexture           :bz.Texture             = null;
        /** Specifies if this texture has an alpha channel. */
        private             readonly    textureHasAlpha             :bz.TextureHasAlpha     = null;
        /** The UV tiling strategy to apply for this texture. */
        private             readonly    strategyUV                  :bz.TextureUV           = null;
        /** Specifies the type of texture. */
        private             readonly    textureType                 :bz.TextureType         = null;

        /** The babylon.JS texture data. */
        private                         nativeTexture               :BABYLON.Texture        = null;

        /** ************************************************************************************************************
        *   Creates a texture configuration.
        *
        *   @param fileName          The filename of the image to load for this material.
        *   @param textureHasAlpha   Specifies alpha occurance in texture image.
        *   @param strategyUV        The UV tiling strategy for this texture.
        *   @param bulletHoleTexture The texture for bullet holes that occur onto this texture.
        *   @param textureType       The type of this texture.
        ***************************************************************************************************************/
        public constructor
        (
            fileName          :string,
            textureHasAlpha   :bz.TextureHasAlpha,
            strategyUV        :bz.TextureUV,
            bulletHoleTexture :bz.Texture = null,
            textureType       :bz.TextureType = bz.TextureType.WALL
        )
        {
            this.textureType       = textureType;

            this.fileName          = this.getFileName( fileName );
            this.textureHasAlpha   = textureHasAlpha;
            this.strategyUV        = strategyUV;
            this.bulletHoleTexture = bulletHoleTexture;
        }

        /** ************************************************************************************************************
        *   Loads the texture image.
        *
        *   @param scene The babylon.JS scene to append all textures to.
        ***************************************************************************************************************/
        public loadTexture( scene:BABYLON.Scene ) : void
        {
            switch ( this.textureType )
            {
                case bz.TextureType.WALL:
                {
                    // create default texture
                    this.nativeTexture = new BABYLON.Texture( this.fileName, scene );
                    this.nativeTexture.hasAlpha = ( this.textureHasAlpha === bz.TextureHasAlpha.YES );
                    break;
                }

                case bz.TextureType.MODEL:
                {
                    // do not load model textures explicitly
                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Returns a clone of this texture's babylon.JS data.
        *
        *   @return A clone of this texture's native texture data.
        ***************************************************************************************************************/
        public cloneNativeTexture() : BABYLON.Texture
        {
            return this.nativeTexture.clone();
        }

        /** ************************************************************************************************************
        *   Returns the texture's babylon.JS data.
        *
        *   @return The texture's native texture data.
        ***************************************************************************************************************/
        public getNativeTexture() : BABYLON.Texture
        {
            return this.nativeTexture;
        }

        /** ************************************************************************************************************
        *   Determines if this texture uses an alpha channel.
        *
        *   @return <code>true</code> if this texture makes use of an alpha channel.
        ***************************************************************************************************************/
        public hasAlpha() : boolean
        {
            return ( this.textureHasAlpha === bz.TextureHasAlpha.YES );
        }

        /** ************************************************************************************************************
        *   Determines this texture's UV strategy.
        *
        *   @return The UV strategy of this texture.
        ***************************************************************************************************************/
        public getStrategyUV() : bz.TextureUV
        {
            return this.strategyUV;
        }

        /** ************************************************************************************************************
        *   Delivers the full qualified filename to this texture resource file.
        *
        *   @param fileName The partial filename to this texture resource file.
        *
        *   @return The full qualified filename to this texture resource file.
        ***************************************************************************************************************/
        private getFileName( fileName:string ) : string
        {
            switch ( this.textureType )
            {
                case bz.TextureType.WALL:
                {
                    return bz.SettingResource.PATH_IMAGE_TEXTURE + fileName;
                }

                case bz.TextureType.MODEL:
                {
                    return fileName;
                }
            }

            return '';
        }
    }
