
    /** ****************************************************************************************************************
    *   Offers additional mathematical functionality.
    *******************************************************************************************************************/
    export class MathUtil
    {
        /** ************************************************************************************************************
        *   Converts an angle from degrees to radians.
        *   The formula is: ( angleInDegrees * Math.PI / 180.0 )
        *
        *   @param angleInDegrees The angle in degrees.
        *
        *   @return The angle in radians.
        ***************************************************************************************************************/
        public static degreesToRad( angleInDegrees:number ) : number
        {
            return BABYLON.Angle.FromDegrees( angleInDegrees ).radians();
        }

        /** ************************************************************************************************************
        *   Converts an angle from radians to degrees.
        *   The formula is: ( angleInRad * 180.0 / Math.PI )
        *
        *   @param angleInRad The angle in radians.
        *
        *   @return The angle in degrees.
        ***************************************************************************************************************/
        public static radToDegrees( angleInRad:number ) : number
        {
            return BABYLON.Angle.FromRadians( angleInRad ).degrees();
        }

        /** ************************************************************************************************************
        *   Returns a random integer between the given mininum and maximum.
        *
        *   @param min The minimum value to return by random.
        *   @param max The maximum value to return by random.
        *
        *   @return A random integer inside the specified tange.
        ***************************************************************************************************************/
        public static getRandomInt( min:number, max:number ) : number
        {
            return Math.floor( ( Math.random() * ( max + 1 - min ) ) + min );
        }

        /** ************************************************************************************************************
        *   Normalizes any angle to => 0.0 and < 360.0 degrees.
        *
        *   @param angleDegrees The angle to normalize.
        *
        *   @return The normalized angle.
        ***************************************************************************************************************/
        public static normalizeAngleDegrees( angleDegrees:number ) : number
        {
            while ( angleDegrees > 360.0 )
            {
                angleDegrees -= 360.0;
            }

            while ( angleDegrees < 0.0 )
            {
                angleDegrees += 360.0;
            }

            return angleDegrees;
        }

        /** ************************************************************************************************************
        *   Delivers the sine value of the given angle in degrees.
        *
        *   @param angleInDegrees An angle in degrees to get the sine for.
        *
        *   @return The sine value for the specified angle.
        ***************************************************************************************************************/
        public static sinDegrees( angleInDegrees:number ) : number
        {
            return Math.sin( MathUtil.degreesToRad( angleInDegrees ) );
        }

        /** ************************************************************************************************************
        *   Delivers the cosine value of the given angle in degrees.
        *
        *   @param angleInDegrees An angle to get the cosine for.
        *
        *   @return The cosine value for the specified angle.
        ***************************************************************************************************************/
        public static cosDegrees( angleInDegrees:number ) : number
        {
            return Math.cos( MathUtil.degreesToRad( angleInDegrees ) );
        }

        /** ************************************************************************************************************
        *   Calculates the volume of a cube.
        *
        *   @param width  Width  of the cube.
        *   @param height Height of the cube.
        *   @param depth  Depth  of the cube.
        *
        *   @return The volume of the cube.
        ***************************************************************************************************************/
        public static getCubeVolume( width:number, height:number, depth:number ) : number
        {
            return ( width * height * depth );
        }

        /** ************************************************************************************************************
        *   Calculates the volume of a cylinder.
        *
        *   @param diameter Diameter of the cylinder.
        *   @param height   The height of the cylinder.
        *
        *   @return The volume of the cylinder.
        ***************************************************************************************************************/
        public static getCylinderVolume( diameter:number, height:number ) : number
        {
            return ( ( Math.pow( ( diameter / 2 ), 2 ) * Math.PI ) * height );
        }

        /** ************************************************************************************************************
        *   Calculates the volume of a sphere.
        *
        *   @param diameter Diameter of the sphere.
        *
        *   @return The volume of the sphere.
        ***************************************************************************************************************/
        public static getSphereVolume( diameter:number ) : number
        {
            return ( ( Math.pow( ( diameter / 2 ), 3 ) * Math.PI ) * 4 / 3 );
        }

        /** ************************************************************************************************************
        *   Gets the distant point from the given source vector, rotated by the specified rotation.
        *
        *   @param source   The source vector.
        *   @param rotation The desired rotation of the distant point.
        *   @param distance The distance from the source point.
        *
        *   @return The rotated distant point.
        ***************************************************************************************************************/
        public static rotateVector
        (
            source   :BABYLON.Vector3,
            rotation :BABYLON.Vector3,
            distance :number
        )
        : BABYLON.Vector3
        {
            const distantVector  :BABYLON.Vector3 = new BABYLON.Vector3( 0.0, 0.0, distance );
            const rotationMatrix :BABYLON.Matrix  = BABYLON.Matrix.RotationYawPitchRoll
            (
                MathUtil.degreesToRad( rotation.y ),
                MathUtil.degreesToRad( rotation.x ),
                MathUtil.degreesToRad( rotation.z )
            );

            const rotatedDistantVector:BABYLON.Vector3 = BABYLON.Vector3.TransformCoordinates
            (
                distantVector,
                rotationMatrix
            );

            return source.add( rotatedDistantVector );
        }
    }
