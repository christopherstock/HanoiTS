
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Offers different scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** Next ID to assign for animation creation. */
        private     static              nextCameraAnimationId           :number                                 = 0;

        /** The currently active camera type. */
        private                         activeCameraType                :bz.CameraType                          = null;

        /** The native babylon.JS scene these cameras belong to. */
        private             readonly    scene                           :BABYLON.Scene                          = null;
        /** The canvas this camera system is connected with. */
        private             readonly    canvas                          :HTMLCanvasElement                      = null;

        /** The free controllable babylon.JS (debug) camera. */
        private             readonly    freeCamera                      :BABYLON.FreeCamera                     = null;
        /** The stationary and targeted babylon.JS camera. */
        private             readonly    stationaryCamera                :BABYLON.TargetCamera                   = null;
        /** The follow babylon.JS camera. */
        private             readonly    followCamera                    :BABYLON.FollowCamera                   = null;
        /** The first person babylon.JS camera. */
        private             readonly    firstPersonCamera               :BABYLON.FreeCamera                     = null;
        /** The babylon.JS axis camera. */
        private             readonly    arcRotateCamera                 :BABYLON.ArcRotateCamera                = null;

        /** ************************************************************************************************************
        *   Sets up all scene cameras.
        *
        *   @param scene                     The babylon.JS scene to create these cameras for.
        *   @param canvas                    The canvas this camera system is linked to.
        *
        *   @param positionFreeCamera        The startup position for the free camera.
        *   @param positionStationaryCamera  The startup position for the stationary camera.
        *   @param positionFollowCamera      The startup position for the follow camera.
        *   @param positionFirstPersonCamera The startup position for the follow camera.
        ***************************************************************************************************************/
        public constructor
        (
            scene                     :BABYLON.Scene,
            canvas                    :HTMLCanvasElement,

            positionFreeCamera        :BABYLON.Vector3,
            positionStationaryCamera  :BABYLON.Vector3,
            positionFollowCamera      :BABYLON.Vector3,
            positionFirstPersonCamera :BABYLON.Vector3
        )
        {
            this.scene  = scene;
            this.canvas = canvas;

            this.freeCamera        = bz.CameraFactory.createFreeCamera
            (
                this.scene,
                positionFreeCamera,
                BABYLON.Vector3.Zero()
            );
            this.stationaryCamera  = bz.CameraFactory.createStationaryTargetCamera
            (
                this.scene,
                positionStationaryCamera,
                bz.SettingEngine.DEFAULT_FOV
            );
            this.followCamera      = bz.CameraFactory.createFollowCamera
            (
                this.scene,
                positionFollowCamera,
                bz.SettingEngine.DEFAULT_FOV
            );
            this.firstPersonCamera = bz.CameraFactory.createFirstPersonCamera
            (
                this.scene,
                positionFirstPersonCamera,
                bz.SettingEngine.DEFAULT_FOV
            );
            this.arcRotateCamera   = bz.CameraFactory.createArcRotateCamera
            (
                this.scene,
                70.0,
                225.0,
                15.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                15.0,
                150.0
            );
        }

        /** ************************************************************************************************************
        *   Delivers the active babylon.JS camera.
        *
        *   @return The currently active native camera.
        ***************************************************************************************************************/
        public getActiveCamera() : BABYLON.Camera
        {
            return this.scene.activeCamera;
        }

        /** ************************************************************************************************************
        *   Assigns a new camera position to the stationary camera.
        *
        *   @param type   The camera to apply animation to.
        *   @param pos    The position to apply to the stationary camera.
        *   @param frames Number of frames for animation.
        ***************************************************************************************************************/
        public animateCameraPositionTo( type:bz.CameraType, pos:BABYLON.Vector3, frames:number ) : void
        {
            // this.stationaryCamera.position = pos;

            this.animateCameraPosition(
                type,
                pos,
                frames
            );
        }

        /** ************************************************************************************************************
        *   Sets the specified camera as the scene's active camera.
        *
        *   @param cameraType The type of camera to set as the scene's active camera.
        ***************************************************************************************************************/
        public setActiveCamera( cameraType :bz.CameraType ) : void
        {
            this.activeCameraType   = cameraType;
            this.scene.activeCamera = this.getCameraFromType( cameraType );

            switch ( cameraType )
            {
                case bz.CameraType.FREE_CAMERA:
                {
                    CameraSystem.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    CameraSystem.setCameraControlsEnabled( this.arcRotateCamera, false, this.canvas );

                    // if ( player != null ) player.setVisible( true );
                    // if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.STATIONARY:
                {
                    CameraSystem.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    CameraSystem.setCameraControlsEnabled( this.arcRotateCamera, false, this.canvas );

                    // if ( player != null ) player.setVisible( true );
                    // if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.FOLLOW:
                {
                    CameraSystem.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    CameraSystem.setCameraControlsEnabled( this.arcRotateCamera, false, this.canvas );

                    // if ( player != null ) player.setVisible( true );
                    // if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.FIRST_PERSON:
                {
                    CameraSystem.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    CameraSystem.setCameraControlsEnabled( this.arcRotateCamera, false, this.canvas );

                    // if ( player != null ) player.setVisible( false );
                    // if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( true );

                    break;
                }

                case bz.CameraType.ARC_ROTATE:
                {
                    CameraSystem.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    CameraSystem.setCameraControlsEnabled( this.arcRotateCamera, true,  this.canvas );

                    // if ( player != null ) player.setVisible( true );
                    // if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Checks if the first person camera is currently active.
        *
        *   @return <code>true</code> if the first person camera is currently active.
        ***************************************************************************************************************/
        public isFirstPersonCameraActive() : boolean
        {
            return ( this.activeCameraType === bz.CameraType.FIRST_PERSON );
        }

        /** ************************************************************************************************************
        *   Set light to arc rotation camera.
        *
        *   @param light The light to append to the arc rotation camera by setting the camera as parent.
        ***************************************************************************************************************/
        public setLightToArcRotationCamera( light:BABYLON.Light ) : void
        {
            light.parent = this.arcRotateCamera;
        }

        /** ************************************************************************************************************
        *   Removes all cameras from the babylon.JS scene.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.freeCamera.dispose();
            this.stationaryCamera.dispose();
            this.followCamera.dispose();
            this.firstPersonCamera.dispose();
            this.arcRotateCamera.dispose();
        }

        /** ************************************************************************************************************
        *   Returns the arc rotation camera from the system.
        *
        *   @return The arc rotation camera of the system.
        ***************************************************************************************************************/
        public getArcRotateCamera() : BABYLON.ArcRotateCamera
        {
            return this.arcRotateCamera;
        }

        /** ************************************************************************************************************
        *   Sets the field of view for the first person camera.
        *
        *   @param fov The field of view to set for the first person camera.
        ***************************************************************************************************************/
        public setFirstPersonCameraFieldOfView( fov:number ) : void
        {
            this.firstPersonCamera.fov = fov;
        }

        /** ************************************************************************************************************
        *   Sets the field of view for the first person camera.
        *
        *   @param fov The field of view to set for the first person camera.
        ***************************************************************************************************************/
        public setFollowCameraFieldOfView( fov:number ) : void
        {
            this.followCamera.fov = fov;
        }

        /** ************************************************************************************************************
        *   Sets the field of view for the stationary person camera.
        *
        *   @param fov The field of view to set for the stationary camera.
        ***************************************************************************************************************/
        public setStationaryCameraFieldOfView( fov:number ) : void
        {
            this.stationaryCamera.fov = fov;
        }

        /** ************************************************************************************************************
        *   Animates the position of the specified camera to the desired destination.
        *
        *   @param cameraType  The camera to animate.
        *   @param destination The destination of the camera position.
        *   @param frames      The number of frames for the animation to take.
        *   @param ease        The easing class instance or <code>null</code> for no easing.
        *   @param onFinish    Being invoked when the target is reached.
        ***************************************************************************************************************/
        public animateCameraPosition
        (
            cameraType  :bz.CameraType,
            destination :BABYLON.Vector3,
            frames      :number,
            ease        :BABYLON.EasingFunction = null,
            onFinish    :() => void             = null
        )
        : void
        {
            const camera     :BABYLON.Camera = this.getCameraFromType( cameraType );
            const frameCount :number         = frames;

            if ( ease !== null )
            {
                ease.setEasingMode( BABYLON.EasingFunction.EASINGMODE_EASEINOUT );
            }

            BABYLON.Animation.CreateAndStartAnimation
            (
                CameraSystem.createNextCameraAnimationId(),
                camera,
                'position',
                bz.SettingEngine.CAMERA_ANIMATION_FRAMES_PER_SECOND,
                frameCount,
                camera.position,
                destination,
                0,
                ease,
                onFinish
            );
        }

        /** ************************************************************************************************************
        *   Animates the target of the specified camera to the desired destination.
        *
        *   @param camera      The target camera.
        *   @param destination The destination of the camera target.
        *   @param seconds     The seconds for the animation to take.
        *   @param ease        The easing class instance or <code>null</code> for no easing.
        *   @param onFinish    Being invoked when the target is reached.
        ***************************************************************************************************************/
        public animateCameraTarget
        (
            camera      :BABYLON.ArcRotateCamera,
            destination :BABYLON.Vector3,
            seconds     :number,
            ease        :BABYLON.EasingFunction,
            onFinish    :() => void
        )
        : void
        {
            const frameCount:number = ( seconds * bz.SettingEngine.CAMERA_ANIMATION_FRAMES_PER_SECOND );

            if ( ease !== null )
            {
                ease.setEasingMode( BABYLON.EasingFunction.EASINGMODE_EASEINOUT );
            }

            BABYLON.Animation.CreateAndStartAnimation
            (
                CameraSystem.createNextCameraAnimationId(),
                camera,
                'target',
                bz.SettingEngine.CAMERA_ANIMATION_FRAMES_PER_SECOND,
                frameCount,
                camera.target,
                destination,
                0,
                ease,
                onFinish
            );
        }

        /** ************************************************************************************************************
        *   Returns the according camera for the specified camera type.
        *
        *   @param cameraType The camera type to deliver the according camera for.
        *
        *   @return The concrete camera instance for the asked camera type.
        ***************************************************************************************************************/
        private getCameraFromType( cameraType:bz.CameraType ) : BABYLON.Camera
        {
            switch ( cameraType )
            {
                case bz.CameraType.ARC_ROTATE:
                {
                    return this.arcRotateCamera;
                }

                case bz.CameraType.FIRST_PERSON:
                {
                    return this.firstPersonCamera;
                }

                case bz.CameraType.FOLLOW:
                {
                    return this.followCamera;
                }

                case bz.CameraType.FREE_CAMERA:
                {
                    return this.freeCamera;
                }

                case bz.CameraType.STATIONARY:
                {
                    return this.stationaryCamera;
                }
            }

            return null;
        }

        /** ************************************************************************************************************
        *   Locks the stationary camera to the specified target.
        *
        *   @param mesh The mesh to lock the stationary camera to.
        ***************************************************************************************************************/
        private lockStationaryTargetCameraTo( mesh:any ) : void
        {
            this.stationaryCamera.lockedTarget = mesh;
        }

        /** ************************************************************************************************************
        *   Locks the follow camera to the specified target.
        *
        *   @param mesh The mesh to lock the follow camera to.
        ***************************************************************************************************************/
        private lockFollowCameraTo( mesh:any ) : void
        {
            this.followCamera.lockedTarget = mesh;
        }

        /** ************************************************************************************************************
        *   Locks the first person camera inside the specified target.
        *
        *   @param mesh The mesh to lock the first person camera to.
        ***************************************************************************************************************/
        private setFirstPersonCameraTo( mesh:BABYLON.AbstractMesh ) : void
        {
            this.firstPersonCamera.parent = mesh;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new animation to create.
        *
        *   @return The next free unique id for a new animation to create.
        ***************************************************************************************************************/
        private static createNextCameraAnimationId() : string
        {
            return 'cameraAnimation' + String( CameraSystem.nextCameraAnimationId++ );
        }

        /** ************************************************************************************************************
        *   Enables or disables the debug controls for the specified camera.
        *
        *   @param camera The camera to attach or detach control to.
        *   @param enable Whether to enable the canvas controls or not.
        *   @param canvas The HTML canvas to enable or disable debug controls.
        ***************************************************************************************************************/
        private static setCameraControlsEnabled
        (
            camera :BABYLON.Camera,
            enable :boolean,
            canvas :HTMLCanvasElement
        )
        : void
        {
            if ( enable )
            {
                camera.attachControl( canvas );
            }
            else
            {
                camera.detachControl( canvas );
            }
        }
    }
