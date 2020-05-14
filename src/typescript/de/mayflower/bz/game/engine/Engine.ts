
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Manages all game engine components.
    *******************************************************************************************************************/
    export class Engine
    {
        /** The canvas system. */
        private                     canvasSystem                :bz.CanvasSystem                    = null;
        /** The key system. */
        private                     keySystem                   :bz.KeySystem                       = null;
        /** The babylon.JS engine. */
        private                     babylonEngine               :BABYLON.Engine                     = null;
        /** The custom loading screen. */
        private                     loadingScreen               :bz.LoadingScreen                   = null;

        /** ************************************************************************************************************
        *   Inits all components of the game engine.
        ***************************************************************************************************************/
        public init() : void
        {
            bz.Debug.init.log( 'Init canvas' );
            this.canvasSystem = new bz.CanvasSystem();
            this.canvasSystem.updateDimensions();

            // create custom loading screen
            this.loadingScreen = new bz.LoadingScreen( this.canvasSystem.getNativeCanvas() );

            // init babylon.JS engine, set and show custom loading screen
            bz.Debug.init.log( 'Init babylon.JS engine' );
            this.babylonEngine = new BABYLON.Engine( this.canvasSystem.getNativeCanvas(), true );
            if ( bz.SettingEngine.CUSTOM_LOADING_SCREEN )
            {
                this.babylonEngine.loadingScreen = this.loadingScreen;
            }
            this.babylonEngine.displayLoadingUI();

            // add resize event listener
            bz.Debug.init.log( 'Init window resize handler' );
            window.addEventListener( 'resize', () => { this.onWindowResize(); } );

            // create key system
            this.keySystem = new bz.KeySystem();

            // set the window blur handler
            bz.Debug.init.log( 'Initing window blur handler' );
            window.addEventListener( 'blur', () => { this.onWindowBlur(); } );
        }

        /** ************************************************************************************************************
        *   Returns the current FPS of the babylon.JS engine.
        *
        *   @return The current Frames Per Second as a floating number.
        ***************************************************************************************************************/
        public getFps() : number
        {
            return this.babylonEngine.getFps();
        }

        /** ************************************************************************************************************
        *   Sets the visibility for the babylon.JS engine's loading UI.
        *
        *   @param visible Whether to show or to hide the loading UI.
        ***************************************************************************************************************/
        public setLoadingUiVisibility( visible:boolean ) : void
        {
            if ( visible )
            {
                bz.Debug.stage.log( 'Showing loading UI' );

                this.babylonEngine.displayLoadingUI();
            }
            else
            {
                bz.Debug.init.log( 'Hiding loading UI' );

                this.babylonEngine.hideLoadingUI();
            }
        }

        /** ************************************************************************************************************
        *   Sets the execution for the babylon.JS engine's render loop.
        *
        *   @param active     Whether to start or to stop the render loop.
        *   @param renderLoop The method to execute as the render loop.
        ***************************************************************************************************************/
        public setRenderLoopExecution( active:boolean, renderLoop:() => void ) : void
        {
            if ( active )
            {
                bz.Debug.init.log( 'Starting render loop' );

                this.babylonEngine.runRenderLoop( renderLoop );
            }
            else
            {
                bz.Debug.stage.log( 'Stopping render loop' );

                this.babylonEngine.stopRenderLoop( renderLoop );
            }
        }

        /** ************************************************************************************************************
        *   Creates a new babylon.JS native scene.
        *
        *   @return The native babylon.JS scene created from the native babylon.JS engine.
        ***************************************************************************************************************/
        public createNewScene() : BABYLON.Scene
        {
            return new BABYLON.Scene( this.babylonEngine );
        }

        /** ************************************************************************************************************
        *   Returns the canvas system.
        *
        *   @return The canvas system.
        ***************************************************************************************************************/
        public getCanvasSystem() : bz.CanvasSystem
        {
            return this.canvasSystem;
        }

        /** ************************************************************************************************************
        *   Returns the key system.
        *
        *   @return The key system.
        ***************************************************************************************************************/
        public getKeySystem() : bz.KeySystem
        {
            return this.keySystem;
        }

        /** ************************************************************************************************************
        *   Being invoked when the size of the browser window is changed.
        ***************************************************************************************************************/
        private onWindowResize() : void
        {
            // resize loading screen
            this.loadingScreen.resizeLoadingDivToCanvasDimensions();

            // update canvas dimensions and check if they actually changed
            const dimensionsChanged:boolean = this.canvasSystem.updateDimensions();

            if ( dimensionsChanged )
            {
                // resize GUIs
                bz.Main.game.adjustGameSizeToCanvasSize();

                // resize babylon.JS
                this.babylonEngine.resize();
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when the browser window loses the application focus.
        ***************************************************************************************************************/
        private onWindowBlur() : void
        {
            bz.Debug.canvas.log( 'Detected window focus lost - Releasing all keys' );
            this.keySystem.releaseAllKeys();
        }
    }
