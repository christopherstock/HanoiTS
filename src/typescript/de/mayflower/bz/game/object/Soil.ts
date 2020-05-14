
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a diggable block of Soil.
    *******************************************************************************************************************/
    export class Soil extends bz.GameObject
    {
        /** The type of soil. */
        private         readonly            type                    :bz.SoilType                    = null;
        /** Flags if this soil has been open. */
        private                             opened                  :boolean                        = false;
        /** Flags if the 'soil hint stone' has been shown. */
        private                             showSoilHintStone       :boolean                        = false;

        /** ************************************************************************************************************
        *   Creates a new wall instance.
        *
        *   @param type  The type of soil.
        *   @param stage The stage this wall belongs to.
        *   @param model The model that represents this wall.
        ***************************************************************************************************************/
        public constructor( type:bz.SoilType, stage:bz.Stage, model:bz.Model )
        {
            super( stage, model );

            this.type = type;
        }

        /** ************************************************************************************************************
        *   Renders one tick of the game loop for this game object.
        ***************************************************************************************************************/
        public render() : void
        {
            // own behaviour ..
        }

        /** ************************************************************************************************************
        *   Returns closed state.
        *
        *   @return If the wall is closed.
        ***************************************************************************************************************/
        public isClosed() : boolean
        {
            return ( !this.opened );
        }

        /** ************************************************************************************************************
        *   Checks if this Soil is an empty soil.
        *
        *   @return <code>true</code> if this soil contains nothing.
        ***************************************************************************************************************/
        public containsNothing() : boolean
        {
            return ( this.type === bz.SoilType.NOTHING );
        }

        /** ************************************************************************************************************
        *   Opens this wall. Hides the texture.
        ***************************************************************************************************************/
        public openSoil() : void
        {
            // flag 'opened'
            this.opened = true;

            // show the secret content
            this.showSoilContent();

            // push back opened soil block behind the miner - only if enterable
            if ( this.isEnterable() )
            {
                this.getModel().translatePosition
                (
                    new BABYLON.Vector3( 0.0, 0.0, bz.MeshFactory.FACE_DEPTH + 0.5 * bz.SettingGame.TILE_SIZE_Z )
                );
            }
        }

        /** ************************************************************************************************************
        *   Clears this soil and possibly hides the texture.
        ***************************************************************************************************************/
        public clearSoil() : void
        {
            switch ( this.type )
            {
                case bz.SoilType.WATER:
                case bz.SoilType.GRANITE:
                {
                    // do NOT hide soil
                    break;
                }

                default:
                {
                    // hide soil
                    this.hideSoilMesh();
                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Tells the Soil to show a hint. On first invocation, the 'soil hint stone' is shown.
        *   As second invocation, the actual secret content is shown!
        ***************************************************************************************************************/
        public triggerSoilHint() : void
        {
            // check if the 'soil hint stone' is currently shown.
            if ( this.showSoilHintStone )
            {
                this.showSoilContent()
            }
            else
            {
                this.showSoilHintStone = true;

                bz.MeshManipulation.assignNewTexture( this.model.getMesh( 0 ), bz.Texture.SOIL_HINT_STONE );
            }
        }

        /** ************************************************************************************************************
        *   Shows this soil's content by changing its texture or hiding the soil mesh.
        ***************************************************************************************************************/
        public showSoilContent() : void
        {
            // open soil and show type
            let newTexture :bz.Texture = null;

            switch ( this.type )
            {
                case bz.SoilType.GOLD:
                {
                    newTexture = bz.Texture.SOIL_GOLD;
                    break;
                }

                case bz.SoilType.SILVER:
                {
                    newTexture = bz.Texture.SOIL_SILVER;
                    break;
                }

                case bz.SoilType.PLATINUM:
                {
                    newTexture = bz.Texture.SOIL_PLATINUM;
                    break;
                }

                case bz.SoilType.SANDSTONE:
                {
                    newTexture = bz.Texture.SOIL_SANDSTONE;
                    break;
                }

                case bz.SoilType.WATER:
                {
                    newTexture = bz.Texture.SOIL_WATER;
                    break;
                }

                case bz.SoilType.GRANITE:
                {
                    newTexture = bz.Texture.SOIL_GRANITE;
                    break;
                }

                case bz.SoilType.NOTHING:
                {
                    this.hideSoilMesh();
                    break;
                }
            }

            if ( newTexture !== null )
            {
                bz.MeshManipulation.assignNewTexture( this.model.getMesh( 0 ), newTexture );
            }
        }

        /** ************************************************************************************************************
        *   Determines if this soil can be entered by the player.
        *
        *   @return <code>true</code> if this soil can be entered. Otherwise <code>false</code>.
        ***************************************************************************************************************/
        public isEnterable() : boolean
        {
            switch ( this.type )
            {
                case bz.SoilType.NOTHING:
                case bz.SoilType.GOLD:
                case bz.SoilType.SILVER:
                case bz.SoilType.PLATINUM:
                case bz.SoilType.SANDSTONE:
                {
                    return true;
                }

                case bz.SoilType.WATER:
                case bz.SoilType.GRANITE:
                {
                    return false;
                }
            }

            return false;
        }

        /** ************************************************************************************************************
        *   Hides the texture.
        ***************************************************************************************************************/
        private hideSoilMesh() : void
        {
            this.setVisible( false );

            // bz.MeshManipulation.assignTextureAlpha( this.model.getMesh( 0 ), 0.0 );
        }
    }
