
    import * as bz      from '../../../..';

    /** ****************************************************************************************************************
    *   Represents a collection of meshes that may be compound.
    *******************************************************************************************************************/
    export class Model
    {
        /** All meshes belonging to this model. */
        private             readonly            meshes                  :BABYLON.AbstractMesh[]             = null;

        /** ************************************************************************************************************
        *   Creates a new model consisting of the specified meshes.
        *
        *   @param meshes All meshes that belong to this model.
        ***************************************************************************************************************/
        public constructor( meshes:BABYLON.AbstractMesh[] )
        {
            this.meshes = meshes;
        }

        /** ************************************************************************************************************
        *   Returns the mesh with the specified index.
        *
        *   @param index The index of the mesh to return.
        *
        *   @return The mesh with the specified index.
        ***************************************************************************************************************/
        public getMesh( index:number ) : BABYLON.AbstractMesh
        {
            return this.meshes[ index ];
        }

        /** ************************************************************************************************************
        *   Returns the number of meshes this model consists of.
        *
        *   @return The mesh count of this model.
        ***************************************************************************************************************/
        public getMeshCount() : number
        {
            return this.meshes.length;
        }

        /** ************************************************************************************************************
        *   Disposes all meshes of this model.
        ***************************************************************************************************************/
        public dispose() : void
        {
            for ( const mesh of this.meshes )
            {
                mesh.parent = null;
                mesh.dispose();
            }
        }

        /** ************************************************************************************************************
        *   Sets visibility for all meshes of this model.
        *   Invisible meshes become non pickable.
        *
        *   @param visible The new visibility for this model.
        ***************************************************************************************************************/
        public setVisible( visible:boolean ) : void
        {
            for ( const mesh of this.meshes )
            {
                mesh.isVisible  = visible;
                mesh.isPickable = visible;
            }
        }

        /** ************************************************************************************************************
        *   Translates all meshes of the model by the given delta.
        *
        *   @param delta The translation to apply onto this model.
        ***************************************************************************************************************/
        public translatePosition( delta:BABYLON.Vector3 ) : void
        {
            for ( const mesh of this.meshes )
            {
                bz.MeshManipulation.translatePosition( mesh, delta )
            }
        }

        /** ************************************************************************************************************
        *   Returns a cloned instance of this model.
        *   The cloned model does NOT contain any physical impostors!
        *
        *   @return A cloned instance of this model.
        ***************************************************************************************************************/
        public clone() : Model
        {
            const clonedMeshes:BABYLON.AbstractMesh[] = this.cloneMeshes();

            // setup all cloned meshes
            for ( const clonedMesh of clonedMeshes )
            {
                clonedMesh.id = bz.MeshFactory.createNextMeshId();

                // show this mesh
                clonedMesh.isVisible = true;

                // specify debug settings for the cloned mesh
                clonedMesh.checkCollisions = bz.SettingDebug.DEBUG_CAMERA_ENABLE_COLLISIONS;
                clonedMesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;
                clonedMesh.isPickable = true;
            }

            return new bz.Model( clonedMeshes );
        }

        /** ************************************************************************************************************
        *   Returns a cloned collection of this models' meshes.
        *   All physic impostors are gone on all cloned meshes.
        *
        *   @return All cloned meshes from this model.
        ***************************************************************************************************************/
        private cloneMeshes() : BABYLON.AbstractMesh[]
        {
            const clonedMeshes:BABYLON.AbstractMesh[] = [];

            for ( const mesh of this.meshes )
            {
                // remove physical impostors of all meshes if still present
                if ( mesh.physicsImpostor !== null )
                {
                    mesh.physicsImpostor.dispose();
                    mesh.physicsImpostor = null;
                }

                // clone this mesh ( without a physics impostor )
                const clonedMesh:BABYLON.AbstractMesh = mesh.clone( mesh.name, null );
                clonedMeshes.push( clonedMesh );
            }

            return clonedMeshes;
        }
    }
