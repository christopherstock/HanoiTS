
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a custom stage set.
    *******************************************************************************************************************/
    export class Stage
    {
        /** The scene that represents this stage. */
        private             readonly        scene                   :bz.Scene                               = null;
        /** The canvas system this stage is displayed on. */
        private             readonly        canvas                  :bz.CanvasSystem                        = null;

        /** Specifies the ambient color of the babylon.JS scene and is set as the emissive color of all faces. */
        private             readonly        ambientColor            :BABYLON.Color3                         = null;
        /** The clear color of this stage is the background color of all mesh materials. */
        private             readonly        clearColor              :BABYLON.Color4                         = null;
        /** The initial camera to set for this stage. */
        private             readonly        initialCamera           :bz.CameraType                          = null;
        /** A collection of all debug meshes in this stage. */
        private             readonly        debugMeshes             :BABYLON.Mesh[]                         = [];

        /** A collection of all walls in this stage. */
        private                             walls                   :bz.Wall[]                              = [];

        /** The game GUI. */
        private                             gui                     :bz.GUI                                 = null;
        /** The camera system that manages all scene cameras. */
        public                              cameraSystem            :bz.CameraSystem                        = null;

        /** The skybox that surrounds the whole stage. */
        private                             skybox                  :BABYLON.Mesh                           = null;

        /** Indicates pause state. */
        private                             pause                   :boolean                                = false;

        /** All three poles. */
        private                             poles                   :bz.Pole[]                              = [];
        /** All rings. */
        public                              rings                   :bz.Ring[]                              = null;
        /** The level ground plane. */
        public                              ground                  :bz.Wall                                = null;

        /** The pointer system. */
        private                             pointerSystem           :bz.PointerSystem                       = null;

        /** ************************************************************************************************************
        *   Creates a new custom stage.
        *
        *   @param scene         The scene representing this stage.
        *   @param canvas        The canvas system this stage is displayed on.
        *
        *   @param ambientColor  Specifies the ambient color of the babylon.JS scene
        *                        and is set as the emissive color of all faces.
        *   @param clearColor    The clear color of the stage is the background color of the scene.
        *   @param initialCamera The initial camera for this stage.
        ***************************************************************************************************************/
        public constructor
        (
            scene         :bz.Scene,
            canvas        :bz.CanvasSystem,
            ambientColor  :BABYLON.Color3 = bz.SettingColor.COLOR_RGB_WHITE,
            clearColor    :BABYLON.Color4 = bz.SettingColor.COLOR_RGBA_WHITE_OPAQUE,
            initialCamera :bz.CameraType  = bz.CameraType.ARC_ROTATE
        )
        {
            this.scene         = scene;
            this.canvas        = canvas;

            this.ambientColor  = ambientColor;
            this.clearColor    = clearColor;
            this.initialCamera = initialCamera;
        }

        /** ************************************************************************************************************
        *   Inits the stage.
        ***************************************************************************************************************/
        public init() : void
        {
            // set ambient color and scene bg color
            this.scene.getNativeScene().ambientColor = this.ambientColor;
            this.scene.getNativeScene().clearColor   = this.clearColor;

            // create all game objects
            this.cameraSystem  = this.createCameraSystem();
            this.walls         = this.createWalls();
            this.poles         = this.createPoles();
            this.rings         = this.createRings();
            this.skybox        = this.createSkybox();
            this.gui           = this.createGUI();

            // add all rings to the 2nd pole
            for ( const ring of this.rings )
            {
                this.poles[ 1 ].rings.push( ring );
            }

            // set camera system
            this.setActiveCamera( this.initialCamera );

            // create debug axis
            if ( bz.SettingDebug.DEBUG_COORDINATE_AXIS_ENABLED )
            {
                this.createCoordinalAxis();
            }

            // adjust GUI size
            this.adjustGuiSizeToCanvasSize();

            // invoke init complete callback
            this.onInitComplete();

            // create pointer system
            this.pointerSystem = new bz.PointerSystem();
            this.pointerSystem.addDragSupport();
        }

        /** ************************************************************************************************************
        *   Returns the native babylon.JS scene.
        *
        *   @return The player instance.
        ***************************************************************************************************************/
        public getScene() : BABYLON.Scene
        {
            return this.scene.getNativeScene();
        }

        /** ************************************************************************************************************
        *   Returns this stage's camera system.
        *
        *   @return The camera system of this stage.
        ***************************************************************************************************************/
        public getCameraSystem() : bz.CameraSystem
        {
            return this.cameraSystem;
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // consider pause
            if ( !this.pause )
            {
                // handle level specific keys
                Stage.handleLevelKeys();

                // render walls
                for ( const wall of this.walls )
                {
                    wall.render();
                }

                // render rings
                for ( const ring of this.rings )
                {
                    ring.render();
                }

                for ( const pole of this.poles )
                {
                    pole.render();
                }
            }

            // render GUI
            this.gui.render( this.pause );
        }

        /** ************************************************************************************************************
        *   Disposes all babylon.JS resources of this level.
        ***************************************************************************************************************/
        public dispose() : void
        {
            // dispose all walls
            for ( const wall of this.walls )
            {
                wall.dispose();
            }

            // dispose all rings
            for ( const ring of this.rings )
            {
                ring.dispose();
            }

            for (const pole of this.poles )
            {
                pole.dispose();
            }

            // dispose all debug meshes
            for ( const debugLine of this.debugMeshes )
            {
                debugLine.dispose();
            }

            // dispose skybox
            if ( this.skybox !== null )
            {
                this.skybox.dispose();
            }

            // dispose camera system
            this.cameraSystem.dispose();

            // dispose GUI
            this.gui.dispose();
        }

        /** ************************************************************************************************************
        *   Sets the active camera for this stage.
        ***************************************************************************************************************/
        public setActiveCamera( cameraId:bz.CameraType ) : void
        {
            this.cameraSystem.setActiveCamera( cameraId );
        }

        /** ************************************************************************************************************
        *   Resizes fg and bg GUIs so they fit the current canvas size.
        ***************************************************************************************************************/
        public adjustGuiSizeToCanvasSize() : void
        {
            this.gui.updateSize
            (
                this.canvas.getWidth(),
                this.canvas.getHeight()
            );
        }

        /** ************************************************************************************************************
        *   Toggles the stage to the pause state or vice versa.
        ***************************************************************************************************************/
        public togglePause() : void
        {
            // toggle pause
            this.pause = !this.pause;

            bz.Debug.game.log(
                'Toggle pause to ['
                + String( this.pause )
                + ']'
            );

            // propagate pause state to gui
            this.setGuiPause();
        }

        /** ************************************************************************************************************
        *   Drops the ring on its new dragged position. The ring will snap to the pole it is over.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        public dropRingOnNewPosition( currentRing:bz.Ring ) : void
        {
            // TMP drop on center pole
            currentRing.getModel().getMesh( 0 ).position.x = (
                this.poles[ 1 ].getModel().getMesh( 0 ).position.x
                + ( bz.SettingGame.POLE_DIAMETER / 2 )
            );

            // TMP drop on 1st pole
            currentRing.getModel().getMesh( 0 ).position.x = (
                this.poles[ 0 ].getModel().getMesh( 0 ).position.x
                + ( bz.SettingGame.POLE_DIAMETER / 2 )
            );

            // TMP drop on 3rd pole
            currentRing.getModel().getMesh( 0 ).position.x = (
                this.poles[ 2 ].getModel().getMesh( 0 ).position.x
                + ( bz.SettingGame.POLE_DIAMETER / 2 )
            );



        }

        /** ************************************************************************************************************
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        private createCameraSystem() : bz.CameraSystem
        {
            return new bz.CameraSystem
            (
                this.scene.getNativeScene(),
                this.canvas.getNativeCanvas(),

                new BABYLON.Vector3(
                    0.0,
                    0.0,
                    bz.SettingGame.CAMERA_DISTANCE_Z
                ),
                new BABYLON.Vector3(
                    0.0,
                    0.0,
                    bz.SettingGame.CAMERA_DISTANCE_Z
                ),
                new BABYLON.Vector3(
                    0.0,
                    0.0,
                    0.0
                ),
                new BABYLON.Vector3(
                    0.0,
                    0.0,
                    bz.SettingGame.CAMERA_DISTANCE_Z
                )
            );
        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        private createWalls() : bz.Wall[]
        {
            const walls :bz.Wall[] = [];

            // ground pane
            this.ground = new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        bz.MeshFactory.createBox
                        (
                            this.scene,
                            this.ambientColor,
                            bz.Texture.WALL_TEST,
                            new BABYLON.Vector3(
                                -( bz.SettingGame.LEVEL_SIZE_X / 2 ),
                                -( bz.SettingGame.LEVEL_SIZE_Y     ),
                                -( bz.SettingGame.LEVEL_SIZE_Z / 2 )
                            ),
                            new BABYLON.Vector3(
                                bz.SettingGame.LEVEL_SIZE_X,
                                bz.SettingGame.LEVEL_SIZE_Y,
                                bz.SettingGame.LEVEL_SIZE_Z
                            ),
                            null,
                            null,
                            0.25
                        ),
                    ]
                )
            );
            walls.push( this.ground );

            return walls;
        }

        /**
         * Creates the poles
         *
         * @return bz.Pole[]
         */
        private createPoles(): bz.Pole[]
        {
            const poles: bz.Pole[] = [];

            // pole A
            poles.push(
                new bz.Pole
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createCylinder
                            (
                                this.scene,
                                new BABYLON.Vector3(
                                    -( bz.SettingGame.POLE_DIAMETER / 2 ) + ( bz.SettingGame.LEVEL_SIZE_X / 4 ),
                                    ( 0.0                           ),
                                    -( bz.SettingGame.POLE_DIAMETER / 2 )
                                ),
                                bz.SettingGame.POLE_DIAMETER,
                                bz.SettingGame.POLE_SIZE_Y,
                                null,
                                bz.Texture.WALL_TEST,
                                null,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                )
            );

            // pole B
            poles.push(
                new bz.Pole
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createCylinder
                            (
                                this.scene,
                                new BABYLON.Vector3(
                                    -( bz.SettingGame.POLE_DIAMETER / 2 ),
                                    ( 0.0                           ),
                                    -( bz.SettingGame.POLE_DIAMETER / 2 )
                                ),
                                bz.SettingGame.POLE_DIAMETER,
                                bz.SettingGame.POLE_SIZE_Y,
                                null,
                                bz.Texture.WALL_TEST,
                                null,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                )
            );

            // pole C
            poles.push(
                new bz.Pole
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createCylinder
                            (
                                this.scene,
                                new BABYLON.Vector3(
                                    -( bz.SettingGame.POLE_DIAMETER / 2 ) - ( bz.SettingGame.LEVEL_SIZE_X / 4 ),
                                    ( 0.0                           ),
                                    -( bz.SettingGame.POLE_DIAMETER / 2 )
                                ),
                                bz.SettingGame.POLE_DIAMETER,
                                bz.SettingGame.POLE_SIZE_Y,
                                null,
                                bz.Texture.WALL_TEST,
                                null,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                )
            );

            return poles;
        }

        /** ************************************************************************************************************
        *   Creates and returns all rings this stage consists of.
        *
        *   @return All rings of this stage.
        ***************************************************************************************************************/
        private createRings() : bz.Ring[]
        {
            const rings :bz.Ring[] = [];

            for ( let i:number = 0; i < bz.SettingGame.RING_COUNT; ++i )
            {
                let ringColor :BABYLON.Color3 = bz.SettingGame.RING_COLOR_LOWEST.clone();
                ringColor = ringColor.add( new BABYLON.Color3( 0.1 * i, 0.1 * i, 0.1 * i ) );

                const newRing :bz.Ring = new bz.Ring
                (
                    ( bz.SettingGame.RING_COUNT - i ),
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createTorus(
                                this.scene,
                                new BABYLON.Vector3(
                                    0.0,
                                    (
                                        ( bz.SettingGame.RING_THICKNESS / 2 )
                                        + bz.SettingGame.RING_DISTANCE_Y_GROUND
                                        + ( ( bz.SettingGame.RING_THICKNESS + bz.SettingGame.RING_DISTANCE_Y ) * i )
                                    ),
                                    0.0
                                ),
                                bz.SettingGame.RING_SIZE_SMALLEST_RING
                                + (
                                    ( bz.SettingGame.RING_COUNT - 1 -  i ) * bz.SettingGame.RING_SIZE_DIFFERENCE
                                ),
                                bz.SettingGame.RING_THICKNESS,
                                null,
                                null, // bz.Texture.WALL_TEST,
                                null, // new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                                1.0,
                                ringColor // this.ambientColor
                            ),
                        ]
                    )
                );

                rings.push( newRing );
            }

            return rings;
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        private createSkybox() : BABYLON.Mesh
        {
            return bz.MeshFactory.createSkyBoxCube( this.scene.getNativeScene(), 'blueSky', 1.0 );
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        private onInitComplete() : void
        {
            // do nothing ..
        }

        /** ************************************************************************************************************
        *   Creates the GUI for this stage.
        ***************************************************************************************************************/
        private createGUI() : bz.GUI
        {
            const gui:bz.GUIGame = new bz.GUIGame( this.scene.getNativeScene() );
            gui.init();

            return gui;
        }

        /** ************************************************************************************************************
        *   Sets up the coordinal axis lines. X Y and Z axes are aligned by the LEFT HAND RULE.
        *
        *   @return A collection of all meshes that build the coordinal axis lines.
        ***************************************************************************************************************/
        private createCoordinalAxis() : void
        {
            this.debugMeshes.push
            (
                // axis x
                bz.MeshFactory.createLine
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0,  0.0, 0.0 ),
                    new BABYLON.Vector3( bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH, 0.0, 0.0 ),
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_RED_OPAQUE
                ),

                // axis y
                bz.MeshFactory.createLine
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                    new BABYLON.Vector3( 0.0, bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH, 0.0 ),
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_GREEN_OPAQUE
                ),

                // axis z
                bz.MeshFactory.createLine
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                    new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH ),
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_BLUE_OPAQUE
                )
            );
        }

        /** ************************************************************************************************************
        *   Alters the pause state for the GUI.
        ***************************************************************************************************************/
        private setGuiPause() : void
        {
            this.gui.setPauseGuiVisibility( this.pause );
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        private static handleLevelKeys() : void
        {
            // const keySystem :bz.KeySystem = bz.Main.game.getKeySystem();
/*
            if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );
            }
*/
        }
    }
