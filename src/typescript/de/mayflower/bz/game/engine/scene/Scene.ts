
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents the game scene. It wraps the native babylon.JS scene and physics engine
    *   and contains loaders for all resource systems ( materials/textures, sprites, sounds, models ).
    *******************************************************************************************************************/
    export class Scene
    {
        /** The current babylon.JS scene. */
        private                     babylonScene                :BABYLON.Scene                      = null;

        /** The material system. */
        private                     materialSystem              :bz.MaterialSystem                  = null;
        /** The mesh import system. */
        private                     modelSystem                 :bz.ModelSystem                     = null;

        /** The callback to invoke when the scene is fully loaded. */
        private                     onLoadingComplete           :() => void                         = null;

        /** ************************************************************************************************************
        *   Inits the babylon.JS scene.
        *
        *   @param engine            The game engine.
        *   @param onLoadingComplete The callback to invoke when the scene is fully loaded.
        ***************************************************************************************************************/
        public init( engine:bz.Engine, onLoadingComplete:() => void ) : void
        {
            this.onLoadingComplete = onLoadingComplete;

            // create babylon.JS scene
            this.babylonScene = engine.createNewScene();

            // set default scene clear color
            this.babylonScene.clearColor = bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE;

            // enable debug collisions for free debug camera
            this.babylonScene.collisionsEnabled = bz.SettingDebug.DEBUG_CAMERA_ENABLE_COLLISIONS;

            // show the babylon.JS debug layer
            if ( bz.SettingDebug.SHOW_BJS_DEBUG_LAYER )
            {
                this.babylonScene.debugLayer.show()
                    .then(  () :void => {
                        // no need to handle this promise fullfillment
                    } )
                    .catch( () :void => {
                        // no need to catch this promise error
                    } );
            }

            // create physics engine
            // this.createPhysicsEngine();

            // init all materials
            bz.Debug.init.log( 'Init materials' );
            this.materialSystem = new bz.MaterialSystem( bz.Texture.ALL_TEXTURES );
            this.materialSystem.load( this.babylonScene );

            this.onSoundsLoaded();
        }

        /** ************************************************************************************************************
        *   Delivers a reference to the native babylon.JS scene.
        *
        *   @return The babylon.JS scene.
        ***************************************************************************************************************/
        public getNativeScene() : BABYLON.Scene
        {
            return this.babylonScene;
        }

        /** ************************************************************************************************************
        *   Delivers the material system.
        *
        *   @return The material system.
        ***************************************************************************************************************/
        public getMaterialSystem() : bz.MaterialSystem
        {
            return this.materialSystem;
        }

        /** ************************************************************************************************************
        *   Delivers the model system.
        *
        *   @return The model system.
        ***************************************************************************************************************/
        public getModelSystem() : bz.ModelSystem
        {
            return this.modelSystem;
        }

        /** ************************************************************************************************************
        *   Renders the babylon.JS scene.
        ***************************************************************************************************************/
        public render() : void
        {
            this.babylonScene.render();
        }

        /** ************************************************************************************************************
        *   Being invoked when all sounds are loaded completely.
        ***************************************************************************************************************/
        private onSoundsLoaded() : void
        {
            // init model importer
            bz.Debug.init.log( 'Init model importer' );
            this.modelSystem = new bz.ModelSystem
            (
                bz.ModelFile.ALL_MESH_FILES,
                this.onLoadingComplete
            );
            this.modelSystem.load( this.babylonScene );
        }
    }
