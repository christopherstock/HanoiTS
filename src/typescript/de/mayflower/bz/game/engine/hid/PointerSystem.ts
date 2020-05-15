
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   The pointer system that manages all pointer interactions.
    *******************************************************************************************************************/
    export class PointerSystem
    {
        /** The starting point of a drag operation. */
        private         startingPoint       :BABYLON.Vector3        = null;
        /** The mesh currently being dragged. */
        private         currentMesh         :BABYLON.AbstractMesh   = null;

        /** ************************************************************************************************************
        *   Adds pointer drag support for the level.
        ***************************************************************************************************************/
        public addDragSupport() : void
        {
            bz.Main.game.engine.getCanvasSystem().getNativeCanvas().addEventListener(
                'pointerdown',
                ( evt :PointerEvent ) => { this.onPointerDown( evt ); },
                false
            );
            bz.Main.game.engine.getCanvasSystem().getNativeCanvas().addEventListener(
                'pointerup',
                ( evt :PointerEvent ) => { this.onPointerUp( evt ); },
                false
            );
            bz.Main.game.engine.getCanvasSystem().getNativeCanvas().addEventListener(
                'pointermove',
                ( evt :PointerEvent ) => { this.onPointerMove( evt ); },
                false
            );
        }

        private getGroundPosition( evt:PointerEvent ) : BABYLON.Vector3
        {
            // Use a predicate to get position on the ground
            const pickinfo :BABYLON.PickingInfo = bz.Main.game.scene.getNativeScene().pick(
                bz.Main.game.scene.getNativeScene().pointerX,
                bz.Main.game.scene.getNativeScene().pointerY,

                function ( mesh :BABYLON.AbstractMesh )
                {
                    return (
                        mesh === bz.Main.game.stage.ground.getModel().getMesh( 0 )
                    );
                }
            );

            if (pickinfo.hit) {
                return pickinfo.pickedPoint;
            }

            return null;
        }

        private onPointerDown( evt:PointerEvent ) : void
        {
            if (evt.button !== 0) {
                return;
            }

            // check if we are under a mesh
            const pickInfo :BABYLON.PickingInfo = bz.Main.game.scene.getNativeScene().pick(
                bz.Main.game.scene.getNativeScene().pointerX,
                bz.Main.game.scene.getNativeScene().pointerY,
                (mesh :BABYLON.AbstractMesh ) => {

                    // return true; // mesh !== ground;

                    return (
                        mesh === bz.Main.game.stage.rings[ 0 ].getModel().getMesh( 0 )
                    );
                }
            );
            if ( pickInfo.hit ) {
                this.currentMesh = pickInfo.pickedMesh;
                this.startingPoint = this.getGroundPosition(evt);

                if ( this.startingPoint ) { // we need to disconnect camera from canvas
                    setTimeout(function () {
                        bz.Main.game.stage.cameraSystem.getArcRotateCamera().detachControl(
                            bz.Main.game.engine.getCanvasSystem().getNativeCanvas()
                        )

                    },
                    0);
                }
            }
        }

        private onPointerUp( evt:PointerEvent ) : void
        {
            if ( this.startingPoint )
            {
                bz.Main.game.stage.cameraSystem.getArcRotateCamera().attachControl(
                    bz.Main.game.engine.getCanvasSystem().getNativeCanvas(),
                    true
                )

                this.startingPoint = null;
                return;
            }
        }

        private onPointerMove( evt:PointerEvent ) : void
        {
            if ( !this.startingPoint ) {
                return;
            }

            const current :BABYLON.Vector3 = this.getGroundPosition(evt);

            if ( !current ) {
                return;
            }

            const diff :BABYLON.Vector3 = current.subtract( this.startingPoint );
            this.currentMesh.position.addInPlace( diff );

            // clip current Mesh to bounds! TODO extract to Stage
            this.currentMesh.position.y = ( bz.SettingGame.RING_THICKNESS / 2 );
            this.currentMesh.position.z = 0;

            if ( this.currentMesh.position.x < -bz.SettingGame.LEVEL_SIZE_X / 4 )
            {
                this.currentMesh.position.x = -bz.SettingGame.LEVEL_SIZE_X / 4;
            }
            if ( this.currentMesh.position.x > bz.SettingGame.LEVEL_SIZE_X / 4 )
            {
                this.currentMesh.position.x = bz.SettingGame.LEVEL_SIZE_X / 4;
                this.currentMesh.position.x = bz.SettingGame.LEVEL_SIZE_X / 4;
                this.currentMesh.position.x = bz.SettingGame.LEVEL_SIZE_X / 4;
                this.currentMesh.position.x = bz.SettingGame.LEVEL_SIZE_X / 4;
                this.currentMesh.position.x = bz.SettingGame.LEVEL_SIZE_X / 4;
            }

            this.startingPoint = current;
        }
    }