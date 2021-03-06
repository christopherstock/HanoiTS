
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

        public                              gameSolved              :boolean                                = false;

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
            ambientColor  :BABYLON.Color3 = new BABYLON.Color3( 0.0, 0.0, 0.0 ),
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

            // add lights
            this.addLights();
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
        public dropRingOnNewPosition( ring:bz.Ring ) : void
        {
            // check if the ring is over a pole
            let ringIsOverPole :boolean = false;
            for ( const pole of this.poles )
            {
                if (
                    ring.getModel().getMesh( 0 ).position.x + ( ring.diameter / 2 )
                    > pole.getModel().getMesh( 0 ).position.x - bz.SettingGame.POLE_DIAMETER
                    &&
                    ring.getModel().getMesh( 0 ).position.x - ( ring.diameter / 2 )
                    < pole.getModel().getMesh( 0 ).position.x + bz.SettingGame.POLE_DIAMETER
                ) {

                    // check if ring may be assigned to this pole
                    if ( this.ringIsAssignableToPole( ring, pole ) )
                    {
                        ringIsOverPole = true;

                        // set ring to new pole
                        this.setNewPoleForRing( ring, pole );

                        // set new position for ring
                        this.moveRingToPole(ring, pole);

                        // check if the game is solved
                        this.checkGameSolved();

                        break;
                    }
                }
            }

            // snap back the ring to the currently assigned pole if not over new pole
            if ( !ringIsOverPole )
            {
                const assignedPole :bz.Pole = this.getPoleForRing( ring );
                this.moveRingToPole(ring, assignedPole);
            }
        }

        /**
         * Visually assign a ring to a pole
         *
         * @param ring
         * @param pole
         */
        private moveRingToPole(ring: bz.Ring, pole: bz.Pole): void
        {
            const ringMesh : BABYLON.AbstractMesh = ring.getModel().getMesh( 0 );

            const targetX = (
                pole.getModel().getMesh( 0 ).position.x
                + ( bz.SettingGame.POLE_DIAMETER / 2 )
            );

            BABYLON.Animation.CreateAndStartAnimation(
                'ringSlideSnap',
                ringMesh,
                'position.x',
                30,
                5,
                ringMesh.position.x,
                targetX,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            );

            BABYLON.Animation.CreateAndStartAnimation(
                'ringFallDown',
                ringMesh,
                'position.y',
                30,
                5,
                ringMesh.position.y,
                this.getRingYPosition(pole.rings.length-1),
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            );
        }

        /**
         * Checks whenever a ring is assignable to a pole
         *
         * @param ring
         * @param pole
         */
        private ringIsAssignableToPole(ring: bz.Ring, pole: bz.Pole): boolean
        {
            if (pole.rings.length === 0) {
                return true;
            }

            const lastRing : bz.Ring = pole.rings[pole.rings.length-1];

            return lastRing.size > ring.size;
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
                            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                            bz.Texture.WALL_GLASS,
                            new BABYLON.Vector3(
                                -( bz.SettingGame.LEVEL_SIZE_X / 2 ),
                                -( bz.SettingGame.LEVEL_SIZE_Y     ) - bz.MeshFactory.FACE_DEPTH,
                                -( bz.SettingGame.LEVEL_SIZE_Z / 2 )
                            ),
                            new BABYLON.Vector3(
                                bz.SettingGame.LEVEL_SIZE_X,
                                bz.SettingGame.LEVEL_SIZE_Y,
                                bz.SettingGame.LEVEL_SIZE_Z
                            ),
                            null,
                            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                            0.5
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
                                Stage.getPoleHeight(),
                                null,
                                bz.Texture.WALL_WOOD,
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
                                Stage.getPoleHeight(),
                                null,
                                bz.Texture.WALL_WOOD,
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
                                Stage.getPoleHeight(),
                                null,
                                bz.Texture.WALL_WOOD,
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

        /**
         * Calculates the pole height from the nr of rings
         */
        public static getPoleHeight(): number
        {
            return bz.SettingGame.RING_DISTANCE_Y_GROUND
                + ( ( bz.SettingGame.RING_THICKNESS + bz.SettingGame.RING_DISTANCE_Y ) * bz.SettingGame.RING_COUNT );
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

                const ringDiameter = bz.SettingGame.RING_SIZE_SMALLEST_RING
                + (
                    ( bz.SettingGame.RING_COUNT - 1 -  i ) * bz.SettingGame.RING_SIZE_DIFFERENCE
                );

                const newRing :bz.Ring = new bz.Ring
                (
                    ( bz.SettingGame.RING_COUNT - i ),
                    ringDiameter,
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createTorus(
                                this.scene,
                                new BABYLON.Vector3(
                                    0.0,
                                    (
                                        this.getRingYPosition(i)
                                    ),
                                    0.0
                                ),
                                ringDiameter,
                                bz.SettingGame.RING_THICKNESS,
                                null,
                                null, // bz.Texture.WALL_TEST,
                                ringColor, // new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                                1.0,
                                new BABYLON.Color3( 0.0, 0.0, 0.0 ) // this.ambientColor
                            ),
                        ]
                    )
                );

                rings.push( newRing );
            }

            return rings;
        }

        /**
         * Returns the height (y coord) where the nth ring of a pyramid should be placed
         *
         * @param n
         */
        private getRingYPosition(n: number): number
        {
            return ( bz.SettingGame.RING_THICKNESS / 2 )
                + bz.SettingGame.RING_DISTANCE_Y_GROUND
                + ( ( bz.SettingGame.RING_THICKNESS + bz.SettingGame.RING_DISTANCE_Y ) * n );
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
        private handleLevelKeys() : void
        {
            // const keySystem :bz.KeySystem = bz.Main.game.getKeySystem();
/*
            if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );
            }
*/
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        public getPoleForRing( ringToCheck:bz.Ring ) : bz.Pole
        {
            for ( const pole of this.poles )
            {
                for ( const ring of pole.rings )
                {
                    if ( ringToCheck === ring )
                    {
                        return pole;
                    }
                }
            }

            return null;
        }

        /** ************************************************************************************************************
        *   Assigns a new pole for the specified ring.
        ***************************************************************************************************************/
        private setNewPoleForRing( aRing:bz.Ring, aPole:bz.Pole ) : void
        {
            for ( const pole of this.poles )
            {
                pole.rings = pole.rings.filter(
                    ( obj :bz.Ring ) => { return ( obj !== aRing ); }
                );
            }

            aPole.rings.push( aRing );

            // debug out all poles
            bz.Debug.game.log( 'Set new pole for ring [' + String( aRing.size ) + ']' );
            for ( let i:number = 0; i < this.poles.length; ++i )
            {
                for ( const ring of this.poles[ i ].rings )
                {
                    bz.Debug.game.log( ' Pole [' + String( i ) + '] Ring [' + String( ring.size ) + ']' );
                }
            }
        }

        private checkGameSolved() : void
        {
            if (
                this.poles[ 0 ].rings.length === bz.SettingGame.RING_COUNT
                || this.poles[ 2 ].rings.length === bz.SettingGame.RING_COUNT
            ) {
                alert( 'The game has been solved!' );

                this.gameSolved = true;
            }
        }

        private addLights() : void
        {
            const pointLight1 :BABYLON.PointLight = bz.LightFactory.createPoint(
                this.scene.getNativeScene(),
                new BABYLON.Vector3( 0.0, 5.0, ( bz.SettingGame.LEVEL_SIZE_Z / 2 ) ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                25.0,
                1.25,
                true
            );
            const pointLight2 :BABYLON.PointLight = bz.LightFactory.createPoint(
                this.scene.getNativeScene(),
                new BABYLON.Vector3( 0.0, 5.0, -( bz.SettingGame.LEVEL_SIZE_Z / 2 ) ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                25.0,
                1.25,
                true
            );

            this.scene.getNativeScene().addLight( pointLight1 );
            this.scene.getNativeScene().addLight( pointLight2 );
        }
    }
