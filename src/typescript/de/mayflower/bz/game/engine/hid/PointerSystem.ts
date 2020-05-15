
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
                    for ( const ring of bz.Main.game.stage.rings )
                    {
                        if ( mesh === ring.getModel().getMesh( 0 ) )
                        {
                            return true;
                        }
                    }

                    return false;
/*
                    return (
                        // true // mesh === bz.Main.game.stage.ground.getModel().getMesh( 0 )
                    );
*/
                }
            );

            if (pickinfo.hit) {
                return pickinfo.pickedPoint;
            }

            return null;
        }

        private getFreePickPosition( evt:PointerEvent ) : BABYLON.Vector3
        {
            // Use a predicate to get position on the ground
            const pickinfo :BABYLON.PickingInfo = bz.Main.game.scene.getNativeScene().pick(
                bz.Main.game.scene.getNativeScene().pointerX,
                bz.Main.game.scene.getNativeScene().pointerY,

                function ( mesh :BABYLON.AbstractMesh )
                {
                    return true;
                }
            );

            if (pickinfo.hit) {
                return pickinfo.pickedPoint;
            }

            return null;
        }

        private onPointerDown( evt:PointerEvent ) : void
        {
            if ( evt.button !== 0 ) {
                return;
            }

            // check if we are under a ring
            const pickInfo :BABYLON.PickingInfo = bz.Main.game.scene.getNativeScene().pick(
                bz.Main.game.scene.getNativeScene().pointerX,
                bz.Main.game.scene.getNativeScene().pointerY,
                (mesh :BABYLON.AbstractMesh ) => {

                    // return true; // mesh !== ground;

                    for ( const ring of bz.Main.game.stage.rings )
                    {
                        if ( mesh === ring.getModel().getMesh( 0 ) )
                        {
                            return true;
                        }
                    }

                    return false;
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

            const current :BABYLON.Vector3 = this.getFreePickPosition(evt);

            if ( !current ) {
                return;
            }

            const diff :BABYLON.Vector3 = current.subtract( this.startingPoint );

            const oldY :number = this.currentMesh.position.y;
            this.currentMesh.position.addInPlace( diff );

            // clip current Mesh to bounds! TODO extract to Stage
            this.currentMesh.position.y = oldY;
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
