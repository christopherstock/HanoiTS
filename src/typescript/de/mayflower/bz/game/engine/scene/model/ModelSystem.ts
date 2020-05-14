
    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   Imports all .babylon model files from 3ds max.
    *******************************************************************************************************************/
    export class ModelSystem
    {
        /** All model file names to load. */
        private             readonly    fileNames                       :string[]                       = null;
        /** The method to invoke when all model files are loaded. */
        private             readonly    onLoadComplete                  :()=>void                       = null;

        /** The number of currently loaded model files. */
        private                         loadedModelCount                :number                         = 0;
        /** All loaded mesh objects. */
        private                         models                          :bz.Model[]                     = [];

        /** ************************************************************************************************************
        *   Creates a new model import system.
        *
        *   @param fileNames      The names of all model files to load.
        *   @param onLoadComplete The method to invoke when all model files are loaded.
        ***************************************************************************************************************/
        public constructor( fileNames:string[], onLoadComplete:()=>void )
        {
            this.fileNames      = fileNames;
            this.onLoadComplete = onLoadComplete;
        }

        /** ************************************************************************************************************
        *   Loads all specified model files into system memory.
        ***************************************************************************************************************/
        public load( scene:BABYLON.Scene ) : void
        {
            bz.Debug.init.log(
                ' Importing ['
                + String( this.fileNames.length )
                + '] model files'
            );

            for ( const fileName of this.fileNames )
            {
                const fullPath      :string = ( bz.SettingResource.PATH_MODEL + fileName );
                const lastSeparator :number = fullPath.lastIndexOf( '/' );
                const directory     :string = fullPath.substr( 0, lastSeparator + 1 );
                const file          :string = fullPath.substr( lastSeparator    + 1 );

                BABYLON.SceneLoader.ImportMesh
                (
                    // first parameter specifies the name of the mesh to import - an empty string will import all meshes
                    '',
                    directory,
                    file,
                    scene,
                    ( importedMeshes:BABYLON.AbstractMesh[] ) => {

                        // bz.Debug.init.log( '  Imported [' + importedMeshes.length + '] meshes' );

                        // hide all meshes
                        for ( const importedMesh of importedMeshes )
                        {
                            importedMesh.isVisible = false;

                            // disable backface culling by default
                            if ( importedMesh.material !== null )
                            {
                                importedMesh.material.backFaceCulling = false;
                            }
                        }

                        // save in models array
                        this.models[ fileName ] = new bz.Model( importedMeshes );

                        // notify load
                        this.onLoadModel();
                    },
                    null,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ( callbackScene:BABYLON.Scene, callbackMessage:string, callbackException?:any ) => {

                        bz.Debug.init.err( 'ERROR on importing model [' + file + ']' );

                        // simulate load
                        this.onLoadModel();
                    }
                );
            }
        }

        /** ************************************************************************************************************
        *   Returns the original model of the specified imported model file.
        *
        *   @return The original model of the given imported model file.
        ***************************************************************************************************************/
        public getOriginalModel( fileName:string ) : bz.Model
        {
            return this.models[ fileName ];
        }

        /** ************************************************************************************************************
        *   Being invoked when one mesh was loaded completely.
        ***************************************************************************************************************/
        private onLoadModel() : void
        {
            if ( ++this.loadedModelCount >= this.fileNames.length )
            {
                bz.Debug.init.log( ' All [' + String( this.fileNames.length ) + '] models loaded' );

                this.onLoadComplete();
            }
        }
    }
