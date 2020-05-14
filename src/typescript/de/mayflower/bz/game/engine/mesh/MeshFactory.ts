
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Constructs meshes.
    *******************************************************************************************************************/
    export class MeshFactory
    {
        /** Implicit depth for 2D faces ( e.g. planes or polygons ). */
        public              static  readonly    FACE_DEPTH              :number                     = 0.0001;

        /** Next ID to assign for mesh creation. */
        private             static              nextMeshId              :number                     = 0;

        /** ************************************************************************************************************
        *   Returns the next id for a new mesh to create.
        *
        *   @return The next free unique id for a new mesh to create.
        ***************************************************************************************************************/
        public static createNextMeshId() : string
        {
            return 'mesh' + String( MeshFactory.nextMeshId++ );
        }

        /** ************************************************************************************************************
        *   Creates a box mesh.
        *
        *   @param scene         The scene where this mesh will be applied.
        *   @param emissiveColor The emissive color for this material.
        *   @param texture       The texture to apply.
        *   @param position      Where to place this mesh.
        *   @param size          The dimensions of this mesh for all axis.
        *   @param rotation      The initial rotation for all axis.
        *   @param color         The solid color to apply.
        *   @param materialAlpha The opacity for this mesh.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createBox
        (
            scene         :bz.Scene,
            emissiveColor :BABYLON.Color3,
            texture       :bz.Texture,
            position      :BABYLON.Vector3,
            size          :BABYLON.Vector3,
            rotation      :BABYLON.Vector3 = null,
            color         :BABYLON.Color3  = null,
            materialAlpha :number          = 1.0
        )
        : BABYLON.Mesh
        {
            let faceUV:BABYLON.Vector4[] = [];

            if ( texture !== null )
            {
                switch ( texture.getStrategyUV() )
                {
                    case bz.TextureUV.ALL_TO_ONE:
                    {
                        faceUV =
                        [
                            new BABYLON.Vector4( 0.0, 0.0, -1.0, -1.0 ),
                            new BABYLON.Vector4( 0.0, 0.0, 1.0,  1.0  ),

                            new BABYLON.Vector4( 0.0, 0.0, -1.0, -1.0 ),
                            new BABYLON.Vector4( 0.0, 0.0, 1.0,  1.0  ),

                            new BABYLON.Vector4( 0.0, 0.0, -1.0, -1.0 ),
                            new BABYLON.Vector4( 0.0, 0.0, 1.0,  1.0  ),
                        ];
                        break;
                    }

                    case bz.TextureUV.TILED_BY_SIZE:
                    {
                        faceUV =
                        [
                            new BABYLON.Vector4( 0.0, 0.0, -size.x, -size.y ),
                            new BABYLON.Vector4( 0.0, 0.0, size.x,  size.y  ),

                            new BABYLON.Vector4( 0.0, 0.0, -size.y, -size.z ),
                            new BABYLON.Vector4( 0.0, 0.0, size.y,  size.z  ),

                            new BABYLON.Vector4( 0.0, 0.0, -size.z, -size.x ),
                            new BABYLON.Vector4( 0.0, 0.0, size.z,  size.x  ),
                        ];
                        break;
                    }
                }
            }

            const box:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox
            (
                MeshFactory.createNextMeshId(),
                {
                    width:  size.x,
                    height: size.y,
                    depth:  size.z,

                    faceUV: faceUV,
                },
                scene.getNativeScene()
            );

            bz.MeshManipulation.setPositionAndPivot
            (
                box,
                position,
                size.x,
                size.y,
                size.z
            );

            const material:BABYLON.StandardMaterial = scene.getMaterialSystem().createMaterial
            (
                scene.getNativeScene(),
                texture,
                true,
                size.x,
                size.z,
                color,
                materialAlpha,
                emissiveColor
            );

            return MeshFactory.decorateMesh
            (
                scene.getNativeScene(),
                box,
                rotation,
                material
            );
        }

        /** ************************************************************************************************************
        *   Creates a cylinder mesh.
        *
        *   @param scene           The scene where this mesh will be applied.
        *   @param position        Where to place this mesh.
        *   @param diameter        The diameter of the cylinder.
        *   @param height          The height of the cylinder.
        *   @param rotation        The initial rotation for all axis.
        *   @param texture         The texture to apply.
        *   @param color           The solid color to apply.
        *   @param materialAlpha   The opacity for this mesh.
        *   @param emissiveColor   The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createCylinder
        (
            scene         :bz.Scene,
            position      :BABYLON.Vector3,
            diameter      :number,
            height        :number,
            rotation      :BABYLON.Vector3,
            texture       :bz.Texture,
            color         :BABYLON.Color3,
            materialAlpha :number,
            emissiveColor :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            let faceUV:BABYLON.Vector4[] = [];

            if ( texture !== null )
            {
                switch ( texture.getStrategyUV() )
                {
                    case bz.TextureUV.ALL_TO_ONE:
                    {
                        faceUV =
                        [
                            new BABYLON.Vector4( 0.0, 0.0, 1.0, 1.0 ),
                            new BABYLON.Vector4( 0.0, 0.0, 1.0, 1.0  ),
                            new BABYLON.Vector4( 0.0, 0.0, 1.0, 1.0 ),
                        ];
                        break;
                    }

                    case bz.TextureUV.TILED_BY_SIZE:
                    {
                        faceUV =
                        [
                            new BABYLON.Vector4( 0.0, 0.0, -diameter,               diameter ),
                            new BABYLON.Vector4( 0.0, 0.0, -( diameter * Math.PI ), height   ),
                            new BABYLON.Vector4( 0.0, 0.0, diameter,                diameter ),
                        ];
                        break;
                    }
                }
            }

            const cylinder:BABYLON.Mesh = BABYLON.MeshBuilder.CreateCylinder
            (
                MeshFactory.createNextMeshId(),
                {
                    diameter: diameter,
                    height:   height,

                    faceUV:   faceUV,
                },
                scene.getNativeScene()
            );

            bz.MeshManipulation.setPositionAndPivot
            (
                cylinder,
                position,
                diameter,
                height,
                diameter
            );

            const material:BABYLON.StandardMaterial = scene.getMaterialSystem().createMaterial
            (
                scene.getNativeScene(),
                texture,
                true,
                diameter,
                height,
                color,
                materialAlpha,
                emissiveColor
            );

            return MeshFactory.decorateMesh
            (
                scene.getNativeScene(),
                cylinder,
                rotation,
                material
            );
        }

        /** ************************************************************************************************************
        *   Creates a sphere.
        *
        *   @param scene         The scene where this mesh will be applied.
        *   @param position      Where to place this mesh.
        *   @param diameter      The diameter of the sphere.
        *   @param rotation      The initial rotation for all axis.
        *   @param texture       The texture to apply.
        *   @param color         The solid color to apply.
        *   @param materialAlpha The opacity for this mesh.
        *   @param emissiveColor The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createSphere
        (
            scene         :bz.Scene,
            position      :BABYLON.Vector3,
            diameter      :number,
            rotation      :BABYLON.Vector3,
            texture       :bz.Texture,
            color         :BABYLON.Color3,
            materialAlpha :number,
            emissiveColor :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            const sphere:BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere
            (
                MeshFactory.createNextMeshId(),
                {
                    diameter: diameter,
                },
                scene.getNativeScene()
            );

            bz.MeshManipulation.setPositionAndPivot
            (
                sphere,
                position,
                diameter,
                diameter,
                diameter
            );

            const material:BABYLON.StandardMaterial = scene.getMaterialSystem().createMaterial
            (
                scene.getNativeScene(),
                texture,
                false,
                diameter,
                diameter,
                color,
                materialAlpha,
                emissiveColor
            );

            return MeshFactory.decorateMesh
            (
                scene.getNativeScene(),
                sphere,
                rotation,
                material
            );
        }

        /** ************************************************************************************************************
        *   Creates a plane mesh. Shouldn't be used in a free 3d space because the side orientation is explicitly
        *   required in order to calculate light effects correctly.
        *
        *   @param scene           The scene where this mesh will be applied.
        *   @param position        Where to place this mesh.
        *   @param width           Width  of the plane.
        *   @param height          Height of the plane.
        *   @param rotation        The initial rotation for all axis.
        *   @param texture         The texture to apply.
        *   @param color           The solid color to apply.
        *   @param materialAlpha   The opacity for this mesh.
        *   @param emissiveColor   The emissive color for this material.
        *   @param sideOrientation The orientation sattribute is required for correct light effects.
        *
        *   @return The created mesh.
        *
        *   @deprecated Lights will not automatically be calculated correctly by the babylon.JS engine!
        ***************************************************************************************************************/
        public static createPlane
        (
            scene           :bz.Scene,

            position        :BABYLON.Vector3,
            width           :number,
            height          :number,
            rotation        :BABYLON.Vector3,

            texture         :bz.Texture,

            color           :BABYLON.Color3,

            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3,
            sideOrientation :number
        )
        : BABYLON.Mesh
        {
            const plane:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane
            (
                MeshFactory.createNextMeshId(),
                {
                    width:           width,
                    height:          height,
                    sideOrientation: sideOrientation,
                },
                scene.getNativeScene()
            );

            bz.MeshManipulation.setPositionAndPivot
            (
                plane,
                position,
                width,
                height,
                0.0
            );

            const material:BABYLON.StandardMaterial = scene.getMaterialSystem().createMaterial
            (
                scene.getNativeScene(),
                texture,
                false,
                width,
                height,
                color,
                materialAlpha,
                emissiveColor
            );

            return MeshFactory.decorateMesh
            (
                scene.getNativeScene(),
                plane,
                rotation,
                material
            );
        }

        /** ************************************************************************************************************
        *   Creates a line mesh.
        *
        *   @param scene       The scene where this mesh will be applied.
        *   @param start       Start point of the line mesh.
        *   @param end         End point of the line mesh.
        *   @param rotation    The initial rotation for all axis.
        *   @param color       The solid color to apply.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createLine
        (
            scene       :BABYLON.Scene,

            start       :BABYLON.Vector3,
            end         :BABYLON.Vector3,
            rotation    :BABYLON.Vector3,

            color       :BABYLON.Color4
        )
        : BABYLON.Mesh
        {
            const line:BABYLON.Mesh = BABYLON.MeshBuilder.CreateLines
            (
                MeshFactory.createNextMeshId(),
                {
                    points:
                    [
                        start,
                        end,
                    ],
                    colors:
                    [
                        color,
                        color,
                    ],
                    useVertexAlpha: true,
                },
                scene
            );

            bz.MeshManipulation.setPositionAndPivot
            (
                line,
                BABYLON.Vector3.Zero(),
                0.0,
                0.0,
                0.0
            );

            return MeshFactory.decorateMesh
            (
                scene,
                line,
                rotation,
                null
            );
        }

        /** ************************************************************************************************************
        *   Creates a polygon mesh.
        *
        *   @param scene         The scene where this mesh will be applied.
        *   @param points        All corner points for this polygon to create.
        *   @param rotation      The initial rotation for all axis.
        *   @param color         The solid color to apply.
        *   @param emissiveColor The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createPolygon
        (
            scene         :bz.Scene,

            points        :BABYLON.Vector3[],

            rotation      :BABYLON.Vector3,

            color         :BABYLON.Color3,

            emissiveColor :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            const polygon:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePolygon
            (
                MeshFactory.createNextMeshId(),
                {
                    shape: points,
/*
                    faceColors:
                    [
                        color,
                        color,
                        color,
                    ],
*/
                    depth: MeshFactory.FACE_DEPTH,
                },
                scene.getNativeScene()
            );

            bz.MeshManipulation.setPositionAndPivot
            (
                polygon,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                0.0,
                0.0
            );
            const material:BABYLON.StandardMaterial = scene.getMaterialSystem().createMaterial
            (
                scene.getNativeScene(),
                null,
                false,
                0.0,
                0.0,
                color,
                1.0,
                emissiveColor
            );

            return MeshFactory.decorateMesh
            (
                scene.getNativeScene(),
                polygon,
                rotation,
                material
            );
        }

        /** ************************************************************************************************************
        *   Creates a decal.
        *
        *   @param scene         The scene where this mesh will be applied.
        *   @param position      Where to place this mesh.
        *   @param parentMesh    The mesh to apply this decal to.
        *   @param normal        The normal of the mesh to apply the decal to.
        *   @param size          The dimensions of this mesh for all axis.
        *   @param rotation      The initial rotation for all axis.
        *   @param indexZ        The z index for this material that prevents overlapping materials.
        *   @param texture       The texture to apply.
        *   @param color         The solid color to apply.
        *   @param materialAlpha The opacity for this mesh.
        *   @param emissiveColor The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createDecal
        (
            scene         :bz.Scene,
            position      :BABYLON.Vector3,
            parentMesh    :BABYLON.AbstractMesh,
            normal        :BABYLON.Vector3,
            size          :BABYLON.Vector3,
            rotation      :number,
            indexZ        :number,
            texture       :bz.Texture,
            color         :BABYLON.Color3,
            materialAlpha :number,
            emissiveColor :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            const decal:BABYLON.Mesh = BABYLON.MeshBuilder.CreateDecal
            (
                MeshFactory.createNextMeshId(),
                parentMesh,
                {
                    position: position,
                    normal:   normal,
                    size:     size,
                    angle:    rotation,
                }
            );

            const material:BABYLON.StandardMaterial = scene.getMaterialSystem().createMaterial
            (
                scene.getNativeScene(),
                texture,
                true,
                size.x,
                size.y,
                color,
                materialAlpha,
                emissiveColor
            );
            material.zOffset = ( -1 - indexZ );
/*
            // why is the 1st bullet hole always flickering?
            console.log( '>> parentMesh material z: ' + parentMesh.material.zOffset );
            console.log( '>>>>>> bullet hole z: '     + material.zOffset );
*/
            return MeshFactory.decorateMesh
            (
                scene.getNativeScene(),
                decal,
                null,
                material
            );
        }

        /** ************************************************************************************************************
        *   Creates a skybox mesh from a cube texture ( six images ).
        *
        *   @param scene   The scene to apply this mesh to.
        *   @param skyBox  The skybox to create.
        *   @param opacity The alpha value for the skybox texture.
        *
        *   @return The created skybox mesh.
        ***************************************************************************************************************/
        public static createSkyBoxCube
        (
            scene   :BABYLON.Scene,
            skyBox  :string,
            opacity :number
        )
        : BABYLON.Mesh
        {
            const skyboxMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial
            (
                bz.MaterialSystem.createNextMaterialId(),
                scene
            );

            skyboxMaterial.backFaceCulling   = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture
            (
                bz.SettingResource.PATH_IMAGE_SKYBOX + skyBox + '/' + skyBox,
                scene
            );
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

            skyboxMaterial.diffuseColor  = bz.SettingColor.COLOR_RGB_BLACK;
            skyboxMaterial.specularColor = bz.SettingColor.COLOR_RGB_BLACK;
/*
            skyboxMaterial.emissiveColor = bz.SettingGame.COLOR_BLACK;
*/
            skyboxMaterial.alpha = opacity;
            skyboxMaterial.disableLighting = true;

            const skybox:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox
            (
                MeshFactory.createNextMeshId(),
                { size: 1000.0 },
                scene
            );
            skybox.infiniteDistance = true;
            skybox.material         = skyboxMaterial;

            return skybox;
        }

        /** ************************************************************************************************************
        *   Returns a clone of the imported model with the specified filename.
        *
        *   @param scene        The scene where this imported mesh is cloned into.
        *   @param fileName     The filename of the imported mesh to return a clone for.
        *   @param position     The position for this mesh to show up.
        *
        *   @return A clone of the model with the specified filename.
        ***************************************************************************************************************/
        public static createImportedModel
        (
            scene        :bz.Scene,
            fileName     :string,
            position     :BABYLON.Vector3
        )
        : bz.Model
        {
            const originalModel :bz.Model = scene.getModelSystem().getOriginalModel( fileName );
            const clonedModel   :bz.Model = originalModel.clone();

            // translate cloned model by position
            clonedModel.translatePosition( position );

            return clonedModel;
        }

        /** ************************************************************************************************************
        *   Creates a pile of boxes.
        *
        *   @param scene        The babylon.js scene.
        *   @param ambientColor The ambient color to apply to the scene.
        *   @param pos          The position offset for the pile to apply.
        *   @param texture      Texture for all blocks to create.
        *   @param sizeX        Number of blocks X to create.
        *   @param sizeY        Number of blocks Y to create.
        *   @param sizeZ        Number of blocks Z to create.
        ***************************************************************************************************************/
        public static createBoxLine
        (
            scene        :bz.Scene,
            ambientColor :BABYLON.Color3,
            pos          :BABYLON.Vector3,
            texture      :bz.Texture,
            sizeX        :number,
            sizeY        :number,
            sizeZ        :number
        )
        : bz.Model
        {
            const walls :BABYLON.AbstractMesh[] = [];

            for ( let x :number = 0; x < sizeX; x += 1 )
            {
                for ( let y :number = 0; y < sizeY; y += 1 )
                {
                    for ( let z :number = 0; z < sizeZ; z += 1 )
                    {
                        walls.push(
                            bz.MeshFactory.createBox
                            (
                                scene,
                                ambientColor,
                                texture,
                                new BABYLON.Vector3(
                                    pos.x + ( x * bz.SettingGame.TILE_SIZE_X ),
                                    pos.y + ( y * bz.SettingGame.TILE_SIZE_Y ),
                                    pos.z + ( z * bz.SettingGame.TILE_SIZE_Z )
                                ),
                                new BABYLON.Vector3(
                                    bz.SettingGame.TILE_SIZE_X,
                                    bz.SettingGame.TILE_SIZE_Y,
                                    bz.SettingGame.TILE_SIZE_Z
                                )
                            )
                        );
                    }
                }
            }

            return new bz.Model( walls );
        }

        /** ************************************************************************************************************
        *   Adds general mesh properties.
        *
        *   @param scene               The scene where this mesh will be applied.
        *   @param mesh                The mesh to decorate.
        *   @param rotation            The initial rotation for all axis.
        *   @param material            The material to apply on this mesh.
        ***************************************************************************************************************/
        private static decorateMesh
        (
            scene               :BABYLON.Scene,
            mesh                :BABYLON.Mesh,
            rotation            :BABYLON.Vector3,
            material            :BABYLON.StandardMaterial
        )
        : BABYLON.Mesh
        {
            mesh.material       = material;

            if ( rotation !== null )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ( mesh, rotation.x, rotation.y, rotation.z );
            }

            return mesh;
        }
    }
