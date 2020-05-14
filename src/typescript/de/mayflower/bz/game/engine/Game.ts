
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Manages the game logic.
    *******************************************************************************************************************/
    export class Game
    {
        /** The game engine. */
        public                      engine                      :bz.Engine                  = null;
        /** The current stage. */
        public                      stage                       :bz.Stage                   = null;
        /** The current game scene. */
        public                      scene                       :bz.Scene                   = null;

        /** ************************************************************************************************************
        *   Inits the game from scratch.
        ***************************************************************************************************************/
        public init() : void
        {
            bz.Debug.init.log( 'Init game engine' );

            // init the engine
            this.engine = new bz.Engine();
            this.engine.init();

            // init the scene
            bz.Debug.init.log( 'Init scene' );
            this.scene = new bz.Scene();
            this.scene.init( this.engine, () => { this.onInitGameEngineCompleted(); } );
        }

        /** ************************************************************************************************************
        *   Switches the current stage to the specified target stage.
        ***************************************************************************************************************/
        public switchStage() : void
        {
            bz.Debug.stage.log( '' );
            bz.Debug.stage.log( 'Switching to target stage' );

            // stop physics engine immediately
            // this.scene.enablePhysics( false );

            // check existent stage unload
            if ( this.stage !== null )
            {
                this.engine.setLoadingUiVisibility( true );
                this.engine.setRenderLoopExecution( false, () => { this.render(); } );

                // dispose existent stage
                bz.Debug.stage.log( 'Disposing the current stage' );
                this.stage.dispose();
            }

            // assign the new stage
            this.stage = new bz.Stage( this.scene, this.engine.getCanvasSystem() );

            // init the new stage
            bz.Debug.stage.log( ' Initializing target stage' );
            this.stage.init();

            // specify callback to invoke when the scene is fully loaded
            this.scene.getNativeScene().executeWhenReady( () => { this.initSceneCompleted(); } );
        }

        /** ************************************************************************************************************
        *   Delivers the game engine's key system.
        *
        *   @return The key system.
        ***************************************************************************************************************/
        public getKeySystem() : bz.KeySystem
        {
            return this.engine.getKeySystem();
        }

        /** ************************************************************************************************************
        *   Returns the current FPS of the babylon.JS engine.
        *
        *   @return The current Frames Per Second as a floating number.
        ***************************************************************************************************************/
        public getFps() : number
        {
            return this.engine.getFps();
        }

        /** ************************************************************************************************************
        *   Adjusts all game elements to the current canvas size.
        ***************************************************************************************************************/
        public adjustGameSizeToCanvasSize() : void
        {
            if ( this.stage !== null )
            {
                this.stage.adjustGuiSizeToCanvasSize();
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when the game engine is completely initialized.
        ***************************************************************************************************************/
        private onInitGameEngineCompleted() : void
        {
            bz.Debug.init.log( 'onInitGameEngineCompleted being invoked' );

            this.switchStage();
        }

        /** ************************************************************************************************************
        *   Being invoked when the scene is set up.
        ***************************************************************************************************************/
        private initSceneCompleted() : void
        {
            bz.Debug.init.log( 'System callback: Scene initialization completed' );

            this.engine.setLoadingUiVisibility( false );
            this.engine.setRenderLoopExecution( true, () => { this.render(); } );

            // start physics engine not before now in order to prevent unwanted physical startup impulses! :)
            // this.scene.enablePhysics( true );
        }

        /** ************************************************************************************************************
        *   The render loop being invoked each game tick.
        ***************************************************************************************************************/
        private render() : void
        {
            // render stage
            this.stage.render();

            // render scene
            this.scene.render();

            // handle global keys ( pause, camera changes, level switches etc. )
            this.handleGlobalKeys( this.engine.getKeySystem() );
        }

        /** ************************************************************************************************************
        *   Handles all keys for the menu.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        private handleGlobalKeys( keySystem:bz.KeySystem ) : void
        {
            if ( bz.SettingDebug.ENABLE_DEBUG_KEYS )
            {
                this.handleDebugKeys( keySystem );
            }
        }

        /** ************************************************************************************************************
        *   Handles all debug keys in the menu state.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        private handleDebugKeys( keySystem:bz.KeySystem ) : void
        {
            // camera switches

            if ( keySystem.isPressed( bz.KeyCodes.KEY_1 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_1 );
                this.stage.setActiveCamera( bz.CameraType.FREE_CAMERA );
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_2 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_2 );
                this.stage.setActiveCamera( bz.CameraType.STATIONARY );
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_3 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_3 );
                this.stage.setActiveCamera( bz.CameraType.FOLLOW );
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_4 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_4 );
                this.stage.setActiveCamera( bz.CameraType.FIRST_PERSON );
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_5 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_5 );
                this.stage.setActiveCamera( bz.CameraType.ARC_ROTATE );
            }

            // toggle pause menu
            if ( keySystem.isPressed( bz.KeyCodes.KEY_ESCAPE ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_ESCAPE );
                this.stage.togglePause();
            }
        }
    }
