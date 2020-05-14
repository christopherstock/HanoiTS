
    import * as bz  from '../../..';

    /** ****************************************************************************************************************
    *   Creates instances for all scene cameras.
    *******************************************************************************************************************/
    export abstract class CameraFactory
    {
        /** The ID for the next created camera to assign. */
        private     static              nextCameraId                    :number                         = 0;

        /** ************************************************************************************************************
        *   Creates the free debug camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        *   @param startupTarget   The camera startup target.
        ***************************************************************************************************************/
        public static createFreeCamera
        (
            scene           :BABYLON.Scene,
            startupPosition :BABYLON.Vector3,
            startupTarget   :BABYLON.Vector3
        )
        : BABYLON.FreeCamera
        {
            const freeCamera:BABYLON.FreeCamera = new BABYLON.FreeCamera
            (
                bz.CameraFactory.getNextCameraId(),
                startupPosition,
                scene
            );

            // set startup direction
            freeCamera.setTarget( startupTarget );

            // disable collisions and gravity
            freeCamera.checkCollisions = bz.SettingDebug.DEBUG_CAMERA_ENABLE_COLLISIONS;
            freeCamera.applyGravity    = bz.SettingDebug.DEBUG_CAMERA_ENABLE_COLLISIONS;

            // set the ellipsoid around the camera (the collision area if collisions are enabled)
            freeCamera.ellipsoid       = bz.SettingDebug.DEBUG_CAMERA_ELLIPSOID;
            freeCamera.ellipsoidOffset = BABYLON.Vector3.Zero();

            freeCamera.keysUp    = [ 38 ];
            freeCamera.keysDown  = [ 40 ];
            freeCamera.keysLeft  = [ 37 ];
            freeCamera.keysRight = [ 39 ];

            return freeCamera;
        }

        /** ************************************************************************************************************
        *   Creates the stationary camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        *   @param fov             Initial field of view.
        ***************************************************************************************************************/
        public static createStationaryTargetCamera
        (
            scene           :BABYLON.Scene,
            startupPosition :BABYLON.Vector3,
            fov             :number
        )
        : BABYLON.TargetCamera
        {
            const camera:BABYLON.TargetCamera = new BABYLON.TargetCamera
            (
                bz.CameraFactory.getNextCameraId(),
                startupPosition,
                scene
            );

            camera.fov   = fov;
            // camera.speed = 0.1;

            return camera;
        }

        /** ************************************************************************************************************
        *   Creates the follow camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        *   @param fov             Initial field of view.
        *
        *   @return The follow camera.
        ***************************************************************************************************************/
        public static createFollowCamera(
            scene           :BABYLON.Scene,
            startupPosition :BABYLON.Vector3,
            fov             :number
        )
        : BABYLON.FollowCamera
        {
            const followCamera:BABYLON.FollowCamera = new BABYLON.FollowCamera
            (
                bz.CameraFactory.getNextCameraId(),
                startupPosition,
                scene
            );

            followCamera.heightOffset       = bz.SettingEngine.CAMERA_FOLLOW_HEIGHT_OFFSET;
            followCamera.radius             = bz.SettingEngine.CAMERA_FOLLOW_RADIUS;
            followCamera.rotationOffset     = bz.SettingEngine.CAMERA_FOLLOW_ROTATION_OFFSET;
            followCamera.cameraAcceleration = bz.SettingEngine.CAMERA_FOLLOW_ACCELERATION_SPEED;
            followCamera.maxCameraSpeed     = bz.SettingEngine.CAMERA_FOLLOW_MAX_SPEED;
            followCamera.fov                = fov;

            return followCamera;
        }

        /** ************************************************************************************************************
        *   Creates the first person camera.
        *
        *   @param scene       The babylon.JS scene.
        *   @param position    Initial camera position / offset to target.
        *   @param fieldOfView The initial field of view for the camera.
        *
        *   @return A free camera.
        ***************************************************************************************************************/
        public static createFirstPersonCamera(
            scene       :BABYLON.Scene,
            position    :BABYLON.Vector3,
            fieldOfView :number
        )
        : BABYLON.FreeCamera
        {
            const freeCamera:BABYLON.FreeCamera = new BABYLON.FreeCamera
            (
                bz.CameraFactory.getNextCameraId(),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                scene
            );
            freeCamera.fov      = fieldOfView;
            freeCamera.position = position;

            return freeCamera;
        }

        /** ************************************************************************************************************
        *   Creates the arc rotation camera.
        *
        *   @param scene            The babylon.JS scene.
        *   @param rotX             Initial rotation X of the camera in degrees.
        *   @param rotY             Initial rotation Y of the camera in degrees.
        *   @param distance         The distance of the camera from the center point.
        *   @param center           The center point for the camera to rotate around.
        *   @param lowerRadiusLimit The minimum distance from the camera to the center.
        *   @param upperRadiusLimit The maximum distance from the camera to the center.
        *
        *   @return An arc rotation camera.
        ***************************************************************************************************************/
        public static createArcRotateCamera
        (
            scene            :BABYLON.Scene,
            rotX             :number,
            rotY             :number,
            distance         :number,
            center           :BABYLON.Vector3,
            lowerRadiusLimit :number,
            upperRadiusLimit :number
        )
        : BABYLON.ArcRotateCamera
        {
            const arcRotateCamera:BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera
            (
                bz.CameraFactory.getNextCameraId(),
                bz.MathUtil.degreesToRad( rotY ),
                bz.MathUtil.degreesToRad( rotX ),
                distance,
                center,
                scene
            );

            arcRotateCamera.lowerRadiusLimit = lowerRadiusLimit;
            arcRotateCamera.upperRadiusLimit = upperRadiusLimit;

            arcRotateCamera.lowerAlphaLimit  = null;
            arcRotateCamera.upperAlphaLimit  = null;
/*
            arcRotateCamera.lowerBetaLimit   = null;
            arcRotateCamera.upperBetaLimit   = null;
*/
            arcRotateCamera.keysUp    = [ 40 ];
            arcRotateCamera.keysDown  = [ 38 ];
            arcRotateCamera.keysLeft  = [ 39 ];
            arcRotateCamera.keysRight = [ 37 ];

            return arcRotateCamera;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new camera to create.
        *
        *   @return The next free unique id for a new camera to create.
        ***************************************************************************************************************/
        private static getNextCameraId() : string
        {
            return 'camera' + String( CameraFactory.nextCameraId++ );
        }
   }
