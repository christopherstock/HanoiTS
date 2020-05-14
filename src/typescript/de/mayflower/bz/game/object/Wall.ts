
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a static wall object.
    *******************************************************************************************************************/
    export class Wall extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Creates a new wall instance.
        *
        *   @param stage  The stage this wall belongs to.
        *   @param model  The model that represents this wall.
        ***************************************************************************************************************/
        public constructor( stage:bz.Stage, model:bz.Model )
        {
            super( stage, model );
        }
    }
