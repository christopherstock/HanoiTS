
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Offers static functionality for manipulating meshes.
    *******************************************************************************************************************/
    export abstract class MeshManipulation
    {
        /** Next ID to assign for mesh animation creation. */
        private             static              nextMeshAnimationId             :number                     = 0;

        /** ************************************************************************************************************
        *   Specifies the absolute rotation of the specified mesh for all axis.
        *
        *   @param mesh The mesh to set the rotation for.
        *   @param rotX The x axis rotation (pitch)
        *   @param rotY The y axis rotation (yaw).
        *   @param rotZ The z axis rotation (roll).
        ***************************************************************************************************************/
        public static setAbsoluteRotationXYZ( mesh:BABYLON.AbstractMesh, rotX:number, rotY:number, rotZ:number ) : void
        {
            mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotY ),
                bz.MathUtil.degreesToRad( rotX ),
                bz.MathUtil.degreesToRad( rotZ )
            );
        }

        /** ************************************************************************************************************
        *   Sets the position to the specified mesh.
        *
        *   @param mesh     The mesh to apply position and pivot to.
        *   @param position Where to place this mesh.
        ***************************************************************************************************************/
        public static translatePosition
        (
            mesh     :BABYLON.AbstractMesh,
            position :BABYLON.Vector3
        )
        : void
        {
            mesh.position.x += position.x;
            mesh.position.y += position.y;
            mesh.position.z += position.z;
        }

        /** ************************************************************************************************************
        *   Sets the position for the specified mesh.
        *
        *   @param mesh     The mesh to apply position and pivot to.
        *   @param position Where to place this mesh.
        ***************************************************************************************************************/
        public static setPosition
        (
            mesh     :BABYLON.AbstractMesh,
            position :BABYLON.Vector3
        )
        : void
        {
            mesh.position = position;
        }

        /** ************************************************************************************************************
        *   Sets the position and pivot for the specified mesh.
        *
        *   @param mesh     The mesh to apply position and pivot to.
        *   @param position Where to place this mesh.
        *   @param width    The dimension x of this mesh.
        *   @param height   The dimension y of this mesh.
        *   @param depth    The dimension z of this mesh.
        ***************************************************************************************************************/
        public static setPositionAndPivot
        (
            mesh     :BABYLON.AbstractMesh,
            position :BABYLON.Vector3,

            width    :number = bz.SettingGame.TILE_SIZE_X,
            height   :number = bz.SettingGame.TILE_SIZE_Y,
            depth    :number = bz.SettingGame.TILE_SIZE_Z
        )
        : void
        {
/*
            mesh.position = position;
*/
/*
            mesh.position = new BABYLON.Vector3(
                position.x + ( width  / 2 ),
                position.y + ( height / 2 ),
                position.z + ( depth  / 2 )
            );
*/
            mesh.position = position;
            mesh.setPivotMatrix
            (
                BABYLON.Matrix.Translation
                (
                    ( width  / 2 ),
                    ( height / 2 ),
                    ( depth  / 2 )
                ),
                false
            );
        }

        /** ************************************************************************************************************
        *   Starts a stored animation for the given mesh in the specified frame range.
        *
        *   @param scene      The scene to perform the animation in.
        *   @param mesh       The mesh to perform a predefined animation.
        *   @param startFrame The number of the frame to start the animation.
        *   @param endFrame   The number of the frame to end the animation.
        *   @param loop       Specifies if the animation shall be looped.
        *   @param onFinish   The method to perform when the amimation has completed.
        *                     Will never be invoked if the animation is looped.
        ***************************************************************************************************************/
        public static performAnimation
        (
            scene       :BABYLON.Scene,
            mesh        :BABYLON.AbstractMesh,
            startFrame  :number,
            endFrame    :number,
            loop        :boolean,
            onFinish    :() => void
        )
        : void
        {
            const SPEED_RATIO:number = 1.0;

            scene.beginAnimation
            (
                mesh,
                startFrame,
                endFrame,
                loop,
                SPEED_RATIO,
                onFinish
            );
        }

        /** ************************************************************************************************************
        *   Animates the position of the specified mesh to the desired destination.
        *
        *   @param mesh        The mesh to animate.
        *   @param destination The destination of the camera position.
        *   @param frames      Number of frames for the animation to take.
        *   @param ease        The easing class instance or <code>null</code> for no easing.
        *   @param onFinish    Being invoked when the target is reached.
        *
        *   @deprecated buggy on synchronous and repeated animations :/
        ***************************************************************************************************************/
        public static animateMeshPosition
        (
            mesh        :BABYLON.AbstractMesh,
            destination :BABYLON.Vector3,
            frames      :number,
            ease        :BABYLON.EasingFunction = null,
            onFinish    :() => void             = null
        )
        : void
        {
            if ( ease !== null )
            {
                ease.setEasingMode( BABYLON.EasingFunction.EASINGMODE_EASEINOUT );
            }

            BABYLON.Animation.CreateAndStartAnimation
            (
                MeshManipulation.createNextMeshAnimationId(),
                mesh,
                'position',
                bz.SettingEngine.CAMERA_ANIMATION_FRAMES_PER_SECOND,
                frames,
                mesh.position,
                destination,
                0,
                ease,
                onFinish
            );
        }

        /** ************************************************************************************************************
        *   Assigns a new texture to the specified mesh.
        *
        *   @param mesh    The mesh to apply a new texture to.
        *   @param texture The new texture to apply to the mesh.
        ***************************************************************************************************************/
        public static assignNewTexture( mesh:BABYLON.AbstractMesh, texture:bz.Texture ) : void
        {
            ( mesh.material as BABYLON.StandardMaterial ).diffuseTexture = texture.getNativeTexture();
        }

        /** ************************************************************************************************************
        *   Assigns a new alpha for the texture of the specified mesh.
        *
        *   @param mesh  The mesh to apply a new texture to.
        *   @param alpha The new alpha value to assign to.
        ***************************************************************************************************************/
        public static assignTextureAlpha(mesh:BABYLON.AbstractMesh, alpha:number ) : void
        {
            ( mesh.material as BABYLON.StandardMaterial ).alpha = alpha;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new animation to create.
        *
        *   @return The next free unique id for a new animation to create.
        ***************************************************************************************************************/
        private static createNextMeshAnimationId() : string
        {
            return 'meshAnimation' + String( MeshManipulation.nextMeshAnimationId++ );
        }
    }
